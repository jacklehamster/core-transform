import { Data } from "../transform/transform";
export default class DataWrapper {
    data: Data;
    constructor(data: Data);
    toJSON(): Data;
}
