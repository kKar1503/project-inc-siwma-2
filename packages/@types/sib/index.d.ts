declare namespace SibApiV3Sdk {
  const ApiClient: IApiClient;

  class TransactionalEmailsApi {
    constructor(apiClient?: IApiClient);
    sendTransacEmail<T extends Record<string, string>>(
      email: SendSmtpEmail<T>
    ): Promise<CreateSmtpEmail>;
  }

  export interface CreateSmtpEmail {
    messageId?: string;
    messageIds?: string[];
  }

  export interface SendSmtpEmail<T extends Record<string, string> = {}> {
    sender?: SendSmtpEmailSender;
    to?: SendSmtpEmailTo[];
    bcc?: SendSmtpEmailBcc[];
    cc?: SendSmtpEmailCc[];
    htmlContent?: string;
    textContent?: string;
    subject?: string;
    replyTo?: SendSmtpEmailReplyTo;
    attachment?: SendSmtpEmailAttachment[];
    headers?: Record<string, string>;
    templateId?: number;
    params?: T;
    messageVersions?: SendSmtpEmailMessageVersions[];
    tags?: string[];
    scheduledAt?: Date;
    batchId?: string;
  }

  export interface SendSmtpEmailMessageVersions {
    to: SendSmtpEmailTo[];
    params?: Record<string, string>;
    bcc?: SendSmtpEmailBcc[];
    cc?: SendSmtpEmailCc[];
    replyTo?: SendSmtpEmailReplyTo;
    subject?: string;
  }

  export interface SendSmtpEmailSender {
    name?: string;
    email?: string;
    id?: number;
  }

  export interface SendSmtpEmailTo {
    email: string;
    name?: string;
  }

  export interface SendSmtpEmailBcc {
    email: string;
    name?: string;
  }

  export interface SendSmtpEmailCc {
    email: string;
    name?: string;
  }

  export interface SendSmtpEmailReplyTo {
    email: string;
    name?: string;
  }

  export interface SendSmtpEmailAttachment {
    url?: string;
    content?: Blob;
    name?: string;
  }

  // ApiClient
  export interface IApiClient {
    basePath: string;
    instance: IApiClient;
    defaultHeaders: {
      'user-agent': `sendinblue_clientAPI/v8.5.0/node`;
    };
    authentications: IApiClientAuthentications;
    timeout: number;
    cache: boolean;
    enableCookies: false;
    agent?: unknown;
    requestAgent?: unknown;
  }

  export interface IApiClientAuthenticationKey {
    type: string;
    in: string;
    name: string;
    apiKey: string;
  }

  export interface IApiClientAuthentications {
    'api-key': IApiClientAuthenticationKey;
    'partner-key': IApiClientAuthenticationKey;
  }
}

export = SibApiV3Sdk;
export as namespace SibApiV3Sdk;
