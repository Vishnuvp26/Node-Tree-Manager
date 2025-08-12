import mongoose, { Schema, model, Document, Types } from "mongoose";

export interface INode extends Document {
    name: string;
    parentId?: Types.ObjectId | null;
    createdAt: Date;
    updatedAt: Date;
};

const nodeSchema = new Schema<INode>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        parentId: {
            type: Schema.Types.ObjectId,
            ref: "Node",
            default: null
        }
    },
    { timestamps: true }
);

export const Node = mongoose.model<INode>("Node", nodeSchema);
export default Node