import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthDialog from "./AuthDialog";
import { Button } from "@/components/ui/button";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";
import { Switch } from "@/components/ui/switch";
import { ShoppingCart, Sun, Moon, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";

export default function Layout() {
    const { user, logout } = useAuth();
    const { setIsOpen, totalItems } = useCart();
    const { setTheme, theme } = useTheme();
    const [isAuthOpen, setIsAuthOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background font-sans antialiased">
            <header className="border-b sticky top-0 bg-background/95 backdrop-blur z-50">
                <div className="container mx-auto flex h-16 items-center justify-between px-4">
                    <Link to="/" className="text-2xl font-bold">3commerc3</Link>
                    <nav className="flex gap-4 items-center">
                        <Link to="/admin" className="text-sm font-medium hover:underline">Admin</Link>

                        <Button variant="ghost" size="icon" className="relative" onClick={() => setIsOpen(true)}>
                            <ShoppingCart className="h-5 w-5" />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <User className="h-5 w-5" />
                                    <span className="sr-only">User menu</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                    {user ? `Hi, ${user.username}` : "My Account"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <div className="flex items-center justify-between px-2 py-1.5 text-sm">
                                    <div className="flex items-center gap-2">
                                        {theme === 'dark' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                                        <span>Dark Mode</span>
                                    </div>
                                    <Switch
                                        checked={theme === 'dark'}
                                        onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                                    />
                                </div>
                                <DropdownMenuSeparator />
                                {user ? (
                                    <DropdownMenuItem onClick={logout}>
                                        Logout
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => setIsAuthOpen(true)}>
                                        Login / Register
                                    </DropdownMenuItem>
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
                    </nav>
                </div>
            </header>
            <CartSidebar />
            <main className="container mx-auto py-6 px-4">
                <Outlet />
            </main>
        </div>
    );
}
