import SourceData from "../source/source-data";
export default class DokData {
    source: SourceData;
    parent: DokData | null;
    properties: Record<string, any>;
    constructor(data: SourceData, parent: DokData | null);
    setProperty(key: string, value: any): void;
    toJSON(): {
        [x: string]: any;
        type: string | undefined;
        path?: string | undefined;
    };
}
