import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const success = login(username, password);
        if (success) {
            navigate("/");
        } else {
            alert("Please enter username and password");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription>Enter your credentials to access your account.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="******"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-2">
                    <Button className="w-full" onClick={handleSubmit}>Login</Button>
                    <div className="text-sm text-center">
                        Don't have an account? <Link to="/register" className="underline">Register</Link>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
