import React, { Suspense } from "react";
import Loader from "./components/ui/Loader";
import { Toaster } from "./components/ui/sonner";

const HomePage = React.lazy(() => import('@/pages/Home'))

const App = () => {
    return (
        <>
            <Toaster theme="system" />
            <Suspense fallback={<Loader />}>
                <HomePage />
            </Suspense>
        </>
    );
}

export default App