type DataType = "ref" | string | undefined;

export default interface SourceData {
  type: DataType;
  path?: string;
  [key: string]: any | SourceData;
}