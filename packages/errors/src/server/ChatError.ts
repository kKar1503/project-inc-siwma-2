// ChatError.ts
import { ApiError } from './BaseError';

export class ChatError extends ApiError {
  public static readonly status: number = 400;
  public static readonly code: number = 5000;

  constructor() {
    super();
    this.message = 'Invalid query';
    this.status = ChatError.status;
    this.code = ChatError.code;
  }
}

export class SameBuyerSellerError extends ChatError {
  public static readonly status = 422;
  public static readonly code = 5001;

  constructor() {
    super();
    this.message = `Buyer and seller cannot be the same`;
    this.status = SameBuyerSellerError.status;
    this.code = SameBuyerSellerError.code;
  }
}

export class NotSellerError extends ChatError {
  public static readonly status = 422;
  public static readonly code = 5002;

  constructor() {
    super();
    this.message = `The owner of the listing cannot create the chat room`;
    this.status = NotSellerError.status;
    this.code = NotSellerError.code;
  }
}

export class SellerNotOwnerError extends ChatError {
  public static readonly status = 422;
  public static readonly code = 5003;

  constructor() {
    super();
    this.message = `Seller is not the owner of the listing`;
    this.status = SellerNotOwnerError.status;
    this.code = SellerNotOwnerError.code;
  }
}

export class ChatRoomExistsError extends ChatError {
  public static readonly status = 422;
  public static readonly code = 5004;

  constructor() {
    super();
    this.message = `A chat room with the same buyer and seller already exists`;
    this.status = ChatRoomExistsError.status;
    this.code = ChatRoomExistsError.code;
  }
}

export class MessageError extends ChatError {
  public static readonly status = 500;
  public static readonly code = 5005;

  constructor() {
    super();
    this.message = `Error sending message`;
    this.status = MessageError.status;
    this.code = MessageError.code;
  }
}
