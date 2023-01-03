export default class Loader {
    cache: Record<string, {
        blob: Blob;
        base64: string | ArrayBuffer | null;
        image: HTMLImageElement;
    }>;
    pendingLoad: Record<string, ((response: any) => void)[]>;
    responses: Record<string, any>;
    filesLoaded: Record<string, any>;
    load(path: string, obj: any): Promise<any>;
    paramsReplacement(obj: any, params?: Record<string, any>): any;
    loadText(path: string, { splitLines, splitCells }: {
        splitLines?: boolean;
        splitCells?: boolean;
    }, property?: string): Promise<any>;
    internalFetch<T>(longpath: string, transform: (response: Response) => Promise<T>): Promise<T>;
}
