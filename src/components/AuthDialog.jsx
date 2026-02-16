import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AnimatePresence, motion } from "framer-motion";

export default function AuthDialog({ open, onOpenChange }) {
    // If props are provided, use them; otherwise use local state (though mostly we'll use props now)
    const [internalOpen, setInternalOpen] = useState(false);

    const isControlled = open !== undefined && onOpenChange !== undefined;
    const isOpen = isControlled ? open : internalOpen;
    const setIsOpen = isControlled ? onOpenChange : setInternalOpen;

    const [view, setView] = useState("login"); // 'login' or 'register'
    const { login, register } = useAuth();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (view === "login") {
            if (login(formData.username, formData.password)) {
                setIsOpen(false);
            } else {
                alert("Login failed");
            }
        } else {
            if (formData.username && formData.password) {
                register(formData.username, formData.password);
                setIsOpen(false);
            } else {
                alert("Register failed");
            }
        }
    };

    const toggleView = () => {
        setView(view === "login" ? "register" : "login");
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            {/* Trigger removed to allow external control via Dropdown */}
            <DialogContent className="sm:max-w-[425px] overflow-hidden">
                <DialogHeader>
                    <DialogTitle>{view === "login" ? "Login" : "Register"}</DialogTitle>
                    <DialogDescription>
                        {view === "login"
                            ? "Enter your credentials to access your account."
                            : "Create a new account to get started."}
                    </DialogDescription>
                </DialogHeader>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, x: view === "login" ? -20 : 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: view === "login" ? 20 : -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="******"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {view === "login" ? "Login" : "Register"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            {view === "login" ? "Don't have an account? " : "Already have an account? "}
                            <button
                                type="button"
                                onClick={toggleView}
                                className="underline text-primary hover:text-primary/90 transition-colors"
                            >
                                {view === "login" ? "Register" : "Login"}
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </DialogContent>
        </Dialog>
    );
}
