import { Request, Response, NextFunction } from "express";
import { INodeService } from "../../service/interface/INodeService";
import { INodeController } from "../interface/INodeController";
import { HttpStatus } from "../../constants/status.constants";
import { Messages } from "../../constants/message.constants";

export class NodeController implements INodeController {
    constructor(private _nodeService: INodeService) { }
    
    async createNode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { name, parentId } = req.body;

            if (!name || typeof name !== 'string' || !name.trim()) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.NAME_REQUIRED });
                return
            }

            const node = await this._nodeService.createNode(name.trim(), parentId || null);
            res.status(HttpStatus.OK).json({ data: node });
        } catch (error) {
            next(error)
        }
    };

    async getTree(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const tree = await this._nodeService.getTree(null);
            res.json(tree)
        } catch (error) {
            next(error)
        }
    };

    async deleteNode(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id) {
                res.status(HttpStatus.BAD_REQUEST).json({ message: Messages.ID_REQUIRED });
                return
            }

            await this._nodeService.deleteNode(id);
            res.status(HttpStatus.OK).json({message: Messages.NODE_DELETED})
        } catch (error) {
            next(error)
        }
    };
}