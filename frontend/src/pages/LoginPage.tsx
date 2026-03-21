import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {Link, Navigate} from "react-router";
import {useRef} from "react";
import {toast} from "sonner";
import {axiosInstance} from "@/App.tsx";

function LoginPage() {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    async function login(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";

        if (!username || !password) {
            return toast.error("All fields are required");
        }

        try {
            const response = await axiosInstance.post( "/auth/login",
                { username, password }
            ) as {
                data: {
                    success: boolean;
                    message: string;
                }
            };

            if (response.data.success) {
                toast.success("logged in successfully");
                return <Navigate to={'/'}/>
            } else {
                return toast.error(response.data.message);
            }
        } catch (error) {
            return toast.error("Something went wrong");
        }
    }
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
        <div className={"flex flex-col gap-6"}>
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="username">Username</FieldLabel>
                                <Input
                                    ref = {usernameRef}
                                    id="username"
                                    type="text"
                                    placeholder="tester123"
                                    required
                                />
                            </Field>
                            <Field>
                                <div className="flex items-center">
                                    <FieldLabel htmlFor="password">Password</FieldLabel>
                                </div>
                                <Input ref={passwordRef} id="password" type="password" required />
                            </Field>
                            <Field>
                                <Button onClick={(e)=>login(e)}  type="submit">Login</Button>
                                <FieldDescription className="text-center">
                                    Don&apos;t have an account? <Link to={"/register"}>Register</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </form>
                </CardContent>
            </Card>
        </div>
            </div></div>
    )
}
export default LoginPage;