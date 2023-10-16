export type RequestParameter = { key: string, value: string };

export type RestResponse =
  | { type: "loading"; body: string,}
  | {
  type: 'fail',
  headers: RequestParameter[],
  body: string,
  statusCode: number
}
  | {
  type: 'network_fail',
  error: unknown,
  body: string
}
  | {
  type: "script_fail"
  error: Error,
  body: string
}
  | {
  type: "success"
  headers: RequestParameter[],
  body: string,
  statusCode: number,
  language: string,
  meta: {
    responseSize: number // in bytes
    responseDuration: number // in millis
  }
}
