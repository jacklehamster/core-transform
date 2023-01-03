import SourceData from "../source/source-data";

export default class DokData {
  source: SourceData;
  parent: DokData | null;
  properties: Record<string, any> = {};

  constructor(data: SourceData, parent: DokData | null) {
    this.source = data;
    this.parent = parent;
  }

  setProperty(key: string, value: any) {
    this.properties[key] = value;
  }

  toJSON() {
    return {
      ...this.source,
    };
  }
}