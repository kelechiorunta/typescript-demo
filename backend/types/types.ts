  // types.ts
  import { Request } from 'express';
  import { Server as SocketIOServer } from 'socket.io';
  
  export interface GraphQLContext {
    req: Request & {
      app: {
        get: (key: string) => SocketIOServer;
      };
    };
  }