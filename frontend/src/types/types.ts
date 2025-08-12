export interface InputFeildProps {
    onCancel?: () => void;
    onSubmit?: (name: string) => void;
    loading?: boolean;
}

export interface TreeNode {
    _id: string;
    name: string;
    parentId: string | null;
    children: TreeNode[];
}

export interface TreeProps {
    data: TreeNode[];
    onDataChange: () => void;
}

export interface NodeProps {
    node: TreeNode;
    level: number;
    onDelete: (id: string) => void;
    onDataChange: () => void;
}

export interface SkeletonLoaderProps {
    rows?: number;
}