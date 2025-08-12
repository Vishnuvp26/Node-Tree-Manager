import { useState, useEffect } from "react";
import InputFeild from "@/components/input/Input";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Tree from "@/components/tree/Tree";
import { getTree } from "@/api/node.api";

const Home = () => {
    const [showInput, setShowInput] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTreeData();
    }, []);

    const fetchTreeData = async () => {
        try {
            const data = await getTree();
            setTreeData(data);
        } catch (error) {
            console.error("Failed to fetch tree data:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full bg-black">
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,#1a1a1a,#444,#1a1a1a,#555,#1a1a1a)] opacity-30 blur-[100px] animate-spin-slow"></div>
                <div className="absolute inset-0 border border-transparent rounded-lg [border-image:linear-gradient(90deg,#666,#888)_1] opacity-30 animate-pulse"></div>
            </div>
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px] animate-slow-pan"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative z-10 flex flex-col items-center justify-start h-full px-4 pt-8 sm:pt-12 md:pt-16 text-center"
            >
                <h1 className="text-white mt-4 max-w-[15ch] text-3xl font-bold sm:text-4xl lg:text-[2.75rem] xl:text-4xl">
                    Node Tree Manager
                </h1>
                <p className="mt-3 text-gray-300 text-sm sm:text-[16px] max-w-xl">
                    Manage your hierarchical data structure with ease.
                </p>

                {!showInput && (
                    <Button
                        variant="secondary"
                        className="mt-6 min-h-[44px] sm:min-h-[48px] px-3 flex items-center gap-2"
                        onClick={() => setShowInput(true)}
                    >
                        <Plus className="w-4 h-4" />
                        Add Root Node
                    </Button>
                )}

                {showInput && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-6 w-full flex justify-center"
                    >
                        <InputFeild
                            parentId={null}
                            onCancel={() => setShowInput(false)}
                            onSuccess={fetchTreeData}
                        />
                    </motion.div>
                )}

                {!loading && treeData.length > 0 && (
                    <Tree data={treeData} onDataChange={fetchTreeData} />
                )}

            </motion.div>
        </div>
    );
};

export default Home;