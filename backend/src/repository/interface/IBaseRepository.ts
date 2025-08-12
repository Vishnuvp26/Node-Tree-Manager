import { FilterQuery, UpdateQuery, Document } from "mongoose";

export interface IBaseRepo<T extends Document> {
    create(data: Partial<T>): Promise<T>;
    findById(id: string): Promise<T | null>;
    find(filter: FilterQuery<T>): Promise<T[]>;
    update(id: string, data: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
};