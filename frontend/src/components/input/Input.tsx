import { useEffect, useRef, useState } from 'react';
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { createNode } from "@/api/node.api";

interface InputFeildProps {
    onCancel: () => void;
    onSuccess: () => void;
    parentId?: string | null;
}

const InputFeild = ({ onCancel, onSuccess, parentId }: InputFeildProps) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = async () => {
        const trimmedName = name.trim();

        if (!trimmedName || !/[a-zA-Z0-9]/.test(trimmedName)) {
            toast.error("Name must contain text", {
                action: {
                    label: "OK",
                    onClick: () => {
                        console.log("OK clicked");
                    },
                },
            });
            return;
        }

        try {
            setLoading(true);
            await createNode({ name: trimmedName, parentId });
            if (typeof onSuccess === 'function') {
                onSuccess();
            }
            onCancel();
        } catch (error) {
            console.error('Error creating node:', error);
            toast.error("Failed to create node");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            <Input
                ref={inputRef}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={parentId ? "Enter child node name" : "Enter root node name"}
                className="
                flex-1 
                min-h-[40px] sm:min-h-[52px] 
                text-sm sm:text-base 
                text-white placeholder:text-gray-400"
            />
    
            <div className="flex justify-end gap-2 sm:gap-2 w-full sm:w-auto">
                <Button
                    variant="secondary"
                    className="min-h-[40px] sm:min-h-[52px] text-sm sm:text-base"
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add"}
                </Button>
                <Button
                    variant="destructive"
                    className="min-h-[40px] sm:min-h-[52px] text-sm sm:text-base"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default InputFeild;