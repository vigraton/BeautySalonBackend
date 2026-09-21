export default class ResponseHandler<T = any> extends Error {
  public status: number;
  public body: T;

  constructor(status: number, body: T) {
    super();

    this.status = status;
    this.body = body;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  static toSuccess<T>(status: number, body: T): ResponseHandler<T> {
    return new ResponseHandler(status, body)
  }
  static toError<T>(status: number, body: T): ResponseHandler<T>{
    return new ResponseHandler(status, body)
  }
}
