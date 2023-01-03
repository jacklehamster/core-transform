import Transform, { Context, Data } from "./transform";
declare enum State {
    LOADING = "LOADING",
    DONE = "DONE"
}
export interface LoaderData extends Data {
    path?: string;
    state?: State;
    data?: Data;
}
export default class Loader implements Transform {
    supportedTypes: string[];
    process(obj: Data, context: Context, callback?: (data: Data, output?: string) => void): void;
}
export {};
