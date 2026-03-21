import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "@/components/ui/sonner"
import {ProtectedRoute} from "@/ProtectedRoute.tsx";
import axios from 'axios'
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
    withCredentials: true,
    validateStatus: function (_status) {
        return true;
    }
})

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<ProtectedRoute/>}>
                        <Route path="/" element={<HomePage />}/>
                    </Route>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                </Routes>
            </BrowserRouter>
            <Toaster />
        </>
    )
}

export default App
