// Added because the default JavaScript Error class does not have statusCode property
export interface IHTTPError extends Error {
  statusCode: number;
}

// Added because the default JavaScript Error class does not have code property
export interface IMongooseError extends Error {
  code: number;
}
