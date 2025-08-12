import { NextFunction, Request, Response } from "express";

export interface INodeController {
    createNode(req: Request, res: Response, next: NextFunction): Promise<void>;
    getTree(req: Request, res: Response, next: NextFunction): Promise<void>;
    deleteNode(req: Request, res: Response, next: NextFunction): Promise<void>;
}