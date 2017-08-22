declare module 'config' {
  export const database: {
    name: string;
    host: string;
    port: number;
    username: string;
    password: string;
    sync: 0 | 1;
  }

  export const cache: {
    host: string;
    port: number;
    db: number;
    prefix: string;
    password: string;
  }

  export const discuz: {
    urlPrefix: string;
    xApiKey: string;
    styleid: string;
  }

  export const jwt: {
    secret: string;
    algorithm: string;
    exp: number;
  }

  export const app: {
    commentOrder: 'ASC' | 'DESC';
    topCommentLimitCount: number;
    topCommentMinialLike: number;
  }

  export const env: string
  export const port: number
}
