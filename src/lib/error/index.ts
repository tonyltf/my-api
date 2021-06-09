import { HTTP_STATUS } from "../constant";

export class HttpError extends Error {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  message = '';
  info = '';

  constructor(statusCode: HTTP_STATUS, message: string, info: any) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.info = info;
  }
}
