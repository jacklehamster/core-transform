export declare type DataType = string;
export interface Data {
    type?: DataType;
    params?: string[];
    output?: string;
    [key: string]: any | Data;
}
export interface Context {
    depth?: number;
    path?: string;
}
export default interface Transform {
    supportedTypes: DataType[];
    process(obj: Data, context: Context, callback?: (data: Data, output?: string) => void): void;
}
