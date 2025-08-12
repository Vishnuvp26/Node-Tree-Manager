import { Router } from "express";
import { NodeService } from "../service/implementation/node.service";
import { NodeRepository } from "../repository/implementation/node.repository";
import { NodeController } from "../controller/implementation/node.controller";

const route = Router();

const nodeRepository = new NodeRepository();
const nodeService = new NodeService(nodeRepository);
const nodeController = new NodeController(nodeService);

route.post(
    '/create-node',
    nodeController.createNode.bind(nodeController)
);

route.get(
    '/get-tree',
    nodeController.getTree.bind(nodeController)
);

route.delete(
    '/delete-node/:id',
    nodeController.deleteNode.bind(nodeController)
);

export default route;