import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";

export default function CartSidebar() {
    const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetContent className="flex flex-col h-full w-[400px] sm:w-[540px]">
                <SheetHeader>
                    <SheetTitle>Shopping Cart</SheetTitle>
                    <SheetDescription>
                        Review and manage your selected products.
                    </SheetDescription>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {cart.length === 0 ? (
                        <div className="text-center text-muted-foreground py-10">
                            Your cart is empty.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border bg-muted">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="h-full w-full object-cover object-center"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col">
                                        <div>
                                            <div className="flex justify-between text-base font-medium">
                                                <h3>{item.name}</h3>
                                                <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{item.description}</p>
                                        </div>
                                        <div className="flex flex-1 items-end justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-4 text-center">{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-8 w-8"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>

                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-destructive hover:text-destructive/90"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-1" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <Separator />

                <SheetFooter className="mt-6">
                    <div className="w-full space-y-4">
                        <div className="flex justify-between text-base font-medium">
                            <p>Subtotal</p>
                            <p>${totalPrice.toFixed(2)}</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Shipping and taxes calculated at checkout.
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" onClick={clearCart} disabled={cart.length === 0}>
                                Clear Cart
                            </Button>
                            <Button className="w-full" disabled={cart.length === 0}>Checkout</Button>
                        </div>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
