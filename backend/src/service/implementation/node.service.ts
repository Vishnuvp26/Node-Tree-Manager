import { Types } from "mongoose";
import { INode } from "../../model/node.model";
import { INodeRepository } from "../../repository/interface/INodeRepository";
import { INodeService } from "../interface/INodeService";

export class NodeService implements INodeService{
    constructor(private _nodeRepository: INodeRepository) { }
    
    async createNode(name: string, parentId?: string | null): Promise<INode> {
        return this._nodeRepository.create({ name, parentId: parentId || null } as Partial<INode>);
    }

    async getTree(parentId?: string | null): Promise<any[]> {
        const nodes = await this._nodeRepository.find({ parentId });

        const tree = await Promise.all(
            nodes.map(async (node) => ({
            ...(node as INode).toObject(),
            children: await this.getTree(((node as INode)._id as Types.ObjectId).toString()),
            }))
        );
        return tree;
    };

    async deleteNode(nodeId: string): Promise<void> {
        const children = await this._nodeRepository.find({ parentId: nodeId });
        
        for (const child of children) {
            await this.deleteNode((child._id as Types.ObjectId).toString());
        }
        await this._nodeRepository.delete(nodeId);
    }
}