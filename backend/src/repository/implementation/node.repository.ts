import Node, { INode } from "../../model/node.model";
import { INodeRepository } from "../interface/INodeRepository";
import { BaseRepository } from "./base.repository";

export class NodeRepository extends BaseRepository<INode> implements INodeRepository {
    constructor() {
        super(Node)
    }
}