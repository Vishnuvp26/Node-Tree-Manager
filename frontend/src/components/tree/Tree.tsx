import { useState } from 'react';
import { ChevronRight, ChevronDown, Folder, File, Trash2, Plus } from 'lucide-react';
import { deleteNode } from '@/api/node.api';
import { Button } from '@/components/ui/button';
import InputFeild from "../input/Input";
import { toast } from "sonner";
import type { TreeProps, NodeProps, TreeNode } from '@/types/types';

const TreeNode = ({ node, level, onDelete, onDataChange }: NodeProps) => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [showInput, setShowInput] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        try {
            await deleteNode(id);
            if (typeof onDelete === 'function') {
                onDelete(id);
            }
            onDataChange();
        } catch (error) {
            console.error("Failed to delete node:", error);
            toast.error("Failed to delete node. Please try again.");
        }
    };

    return (
        <div className="select-none">
            <div
                className="flex items-center gap-1 py-1 px-2 hover:bg-gray-800 rounded-md cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ marginLeft: `${level * 20}px` }}
            >
                <span className="text-gray-400">
                    {hasChildren ? (
                        isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />
                    ) : (
                        <span className="w-4" />
                    )}
                </span>
                <span className="text-gray-400">
                    {hasChildren ? <Folder className="w-4 h-4" /> : <File className="w-4 h-4" />}
                </span>
                <span className="text-gray-50">{node.name}</span>
                <div className="opacity-0 group-hover:opacity-100 ml-auto flex items-center gap-2" onClick={e => e.stopPropagation()}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6"
                        onClick={() => setShowInput(true)}
                    >
                        <Plus className="w-4 h-4 text-green-500" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 h-6 w-6"
                        onClick={(e) => handleDelete(e, node._id)}
                    >
                        <Trash2 className="w-4 h-4 text-red-500" />
                    </Button>
                </div>
            </div>

            {showInput && (
                <div
                    className="mt-2 flex justify-center w-full"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="w-full max-w-[400px] px-2">
                        <InputFeild
                            parentId={node._id}
                            onCancel={() => setShowInput(false)}
                            onSuccess={onDataChange}
                        />
                    </div>
                </div>
            )}

            {isExpanded && hasChildren && (
                <div>
                    {node.children.map((child) => (
                        <TreeNode
                            key={child._id}
                            node={child}
                            level={level + 1}
                            onDelete={onDelete}
                            onDataChange={onDataChange}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

const Tree = ({ data, onDataChange }: TreeProps) => {
    const handleDelete = () => {
        onDataChange();
    };

    return (
        <div className="w-full max-w-2xl mt-8 bg-zinc-900 rounded-lg p-4 overflow-x-auto sm:overflow-x-visible">
            {data.map((node) => (
                <TreeNode
                    key={node._id}
                    node={node}
                    level={0}
                    onDelete={handleDelete}
                    onDataChange={onDataChange}
                />
            ))}
        </div>
    );
};

export default Tree;