import {BrowserRouter, Routes, Route} from "react-router";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "@/components/ui/sonner"
import {ProtectedRoute} from "@/ProtectedRoute.tsx";
import axios from 'axios'
import { ThemeProvider } from "@/components/theme-provider"
export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL + "/api",
    withCredentials: true,
    validateStatus: function (_status) {
        return true;
    }
})

function App() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
        </ThemeProvider>
    )
}

export default App
