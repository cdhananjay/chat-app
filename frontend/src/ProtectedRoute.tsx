import { Navigate, Outlet } from "react-router";
import {useEffect, useState} from "react";
import {axiosInstance} from "@/App.tsx";
import {toast} from "sonner";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useUserStore} from "@/store/user.ts";

export function ProtectedRoute() {
    const [loading, setLoading] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const setUser = useUserStore((state)=>state.setUser);
    useEffect(() => {
        getCurrentUser();
    }, [])
    async function getCurrentUser() {
        const {data} = await axiosInstance.get("/user");
        if (!data.success) {
            toast.error(data.message)
            setLoading(false)
            return;
        }
        setUser(data.user);
        console.log(data.user);
        setIsLoggedIn(true);
        setLoading(false);
    }
    if (loading) {
        return <div className={"min-h-screen w-full flex items-center justify-center"}><Spinner /></div>;
    }
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />;
}