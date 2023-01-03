import Transform, { Context, Data } from "../transform/transform";
export interface Process {
    transform: Transform;
    data: Data;
}
export default class TransformHandler {
    transforms: Record<string, Transform[]>;
    processes: Process[];
    add(transform: Transform): void;
    process(data: Data, context?: Context, callback?: (result: Data, output?: string) => void): void;
}
