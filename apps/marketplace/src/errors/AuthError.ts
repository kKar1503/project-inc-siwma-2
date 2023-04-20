import { arrayToString, capitalizeFirstLetter } from "@/utils/stringUtils";
import { ApiError } from "./BaseError";

//-- Type Definitions --//
type tokenType = "access" | "refresh";

export class AuthError extends ApiError {
  public static readonly status = 401;
  public static readonly code = 1000;

  constructor() {
    super();
    this.message = "Not signed in";
    this.detail = "User is not signed in";
    this.status = AuthError.status;
    this.code = AuthError.code;
  }
}

/**
 * Thrown on admin routes
 */
export class ForbiddenError extends ApiError {
  public static readonly status = 403;
  public static readonly code = 1001;

  constructor(user?: string | null) {
    super();
    this.message = "Insufficient privileges";
    this.detail = `User ${user} does not have sufficient privileges to access this resource`;
    this.status = ForbiddenError.status;
    this.code = ForbiddenError.code;
  }
}

/**
 * Used when the access/refresh token provided is expired/invalid/missing
 */
export class InvalidTokenError extends ApiError {
  public static readonly status = 401;
  public static readonly code: number = 1002;

  constructor(tokenType: tokenType | tokenType[]) {
    super();
    this.message = `Invalid ${typeof tokenType === "string" ? tokenType : arrayToString(tokenType, "and")} token provided`;
    this.status = InvalidTokenError.status;
    this.code = InvalidTokenError.code;
  }
}

/**
 * Used when the access/refresh token provided is expired/invalid/missing
 */
export class TokenExpiredError extends InvalidTokenError {
  public static readonly status = 401;
  public static readonly code = 1003;

  constructor(tokenType: tokenType) {
    super(tokenType);
    this.message = `${capitalizeFirstLetter(tokenType)} token is expired`;
    this.status = TokenExpiredError.status;
    this.code = TokenExpiredError.code;
  }
}

/**
 * Used when the access/refresh token provided is expired/invalid/missing
 */
export class TokenRevokedError extends InvalidTokenError {
  public static readonly status = 401;
  public static readonly code = 1004;

  constructor(tokenType: tokenType) {
    super(tokenType);
    this.message = `${capitalizeFirstLetter(tokenType)} token is revoked`;
    this.status = TokenExpiredError.status;
    this.code = TokenExpiredError.code;
  }
}
