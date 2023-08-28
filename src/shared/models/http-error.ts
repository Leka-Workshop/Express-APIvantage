// Added because the default JavaScript Error class does not have statusCode
export default interface IHTTPError extends Error {
  statusCode: number;
}
