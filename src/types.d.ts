import type { Response, Request } from 'express';

export interface GenericType {
  created_date: Date;
  updated_date: Date;
}

export interface Context {
  req: Request;
  res: Response;
}
