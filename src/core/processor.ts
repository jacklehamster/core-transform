import { resolve } from "url";

export default class Loader {
  cache: Record<string, { blob: Blob; base64: string | ArrayBuffer | null; image: HTMLImageElement }> = {};
  pendingLoad: Record<string, ((response: any) => void)[]> = {};
  responses: Record<string, any> = {};
  filesLoaded: Record<string, any> = {};

  async load(path: string, obj: any): Promise<any> {
    const result = await this.internalFetch(path, response => response.json());
    const json = JSON.parse(JSON.stringify(result));
    const replacedJson = this.paramsReplacement(json, obj.params);
    return replacedJson;
  }

  paramsReplacement(obj: any, params?: Record<string, any>): any {
    if (!params) {
      return obj;
    }
    if (typeof (obj) === "string" && typeof (params[obj]) !== "undefined") {
      return params[obj];
    }
    if (typeof (obj) !== 'object' || !obj) {
      return obj;
    }
    if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        obj[i] = this.paramsReplacement(obj[i], params);
      }
    } else {
      for (const i in obj) {
        if (obj.hasOwnProperty(i)) {
          obj[i] = this.paramsReplacement(obj[i], params);
        }
      }
    }
    return obj;
  }

  async loadText(path: string, { splitLines, splitCells }: { splitLines?: boolean; splitCells?: boolean }, property?: string): Promise<any> {
    // console.log(">>", path, property);
    const text = await this.internalFetch(path, response => response.text());
    return splitLines || splitCells ? text.split("\n").map(line => splitCells ? line.match(/.{1,2}/g) : line) : text;
  }

  async internalFetch<T>(longpath: string, transform: (response: Response) => Promise<T>): Promise<T> {
    const path = resolve(location.href, longpath);
    return new Promise((resolve) => {
      if (this.responses[path]) {
        resolve(this.responses[path]);
        return;
      }
      if (!this.pendingLoad[path]) {
        this.pendingLoad[path] = [];
        fetch(path).then(response => transform(response)).then((result) => {
          this.responses[path] = result;
          this.pendingLoad[path].forEach(callback => callback(result));
          delete this.pendingLoad[path];

          this.filesLoaded[path.split(location.href)[1]] = result;

        });
      }
      this.pendingLoad[path].push(result => {
        resolve(result);
      });
    });
  }
}
