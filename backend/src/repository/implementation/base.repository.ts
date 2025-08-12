import { Model, Document, FilterQuery, UpdateQuery } from "mongoose";
import { IBaseRepo } from "../interface/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepo<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    async findById(id: string): Promise<T | null> {
        return this.model.findById(id);
    }

    async find(filter: FilterQuery<T>): Promise<T[]> {
        return this.model.find(filter);
    }

    async update(id: string, data: UpdateQuery<T>): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id);
    }
}