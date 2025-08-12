import { INode } from "../../model/node.model";

export interface INodeService {
    createNode(name: string, parentId?: string | null): Promise<INode>;
    getTree(parentId?: string | null): Promise<any[]>;
    deleteNode(nodeId: string): Promise<void>;
}