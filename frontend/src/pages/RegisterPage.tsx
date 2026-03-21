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
import {useRef} from "react";
import {toast} from "sonner";
import {Link, Navigate} from "react-router"
import {axiosInstance} from "@/App.tsx";

function RegisterPage() {
    const nameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);

    async function register(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();

        const name = nameRef.current?.value.trim() || "";
        const username = usernameRef.current?.value.trim() || "";
        const password = passwordRef.current?.value.trim() || "";
        const confirmPassword = confirmPasswordRef.current?.value.trim() || "";

        if (!name || !username || !password) {
            return toast.error("All fields are required");
        }
        if (password !== confirmPassword) {
            return toast.error("Passwords don't match");
        }
        if (password.length < 8) {
            return toast.error("Password must be at least 8 characters");
        }

        try {
            const response = await axiosInstance.post("/auth/register",
                { name, username, password }
            ) as {
                data: {
                    success: boolean;
                    message: string;
                }
            };

            if (response.data.success) {
                toast.success("Registered successfully");
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
        <Card>
            <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                    Enter your information below to create your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="name">Name</FieldLabel>
                            <Input ref={nameRef} id="name" type="text" placeholder="John Doe" required />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                ref={usernameRef}
                                id="username"
                                type="text"
                                placeholder="tester123"
                                required
                            />
                            {/*<FieldDescription>*/}
                            {/*TODO : add some desc*/}
                            {/*</FieldDescription>*/}
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <Input ref={passwordRef} id="password" type="password" required />
                            <FieldDescription>
                                Must be at least 8 characters long.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>
                            <Input ref={confirmPasswordRef} id="confirm-password" type="password" required />
                            <FieldDescription>Please confirm your password.</FieldDescription>
                        </Field>
                        <FieldGroup>
                            <Field>
                                <Button
                                   onClick={(e)=>register(e)}
                                    type="submit">Create Account</Button>
                                <FieldDescription className="px-6 text-center">
                                    Already have an account? <Link to="/login">Login in</Link>
                                </FieldDescription>
                            </Field>
                        </FieldGroup>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
            </div></div>
    )
}
export default RegisterPage;