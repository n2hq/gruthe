// OnlineStatusContext.tsx
import { createContext, useContext, useEffect, useState } from "react";

const OnlineStatusContext = createContext<boolean | null>(null);

export function useOnlineStatusContext() {
    const context = useContext(OnlineStatusContext);

    if (context) {
        return context
        //throw new Error("useOnlineStatusContext must be used within an OnlineStatusProvider");
    }
    return null
}

export const OnlineStatusProvider = ({ children }: { children: React.ReactNode }) => {
    const [isOnline, setIsOnline] = useState<boolean>(navigator?.onLine);

    useEffect(() => {
        const updateStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateStatus);
        window.addEventListener("offline", updateStatus);

        return () => {
            window.removeEventListener("online", updateStatus);
            window.removeEventListener("offline", updateStatus);
        };
    }, []);

    return (
        <OnlineStatusContext.Provider value={isOnline}>
            {children}

            {/* Automatically show offline banner */}
            {!isOnline && (
                <div className={`fixed bottom-4 w-fit px-6 py-2 right-2 bg-black text-white rounded-3xl`}>
                    Check internet connection
                </div>
            )}
        </OnlineStatusContext.Provider>
    );
};
