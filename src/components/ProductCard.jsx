import { useCart } from "../context/CartContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();

    return (
        <Card className="overflow-hidden flex flex-col">
            <div className="aspect-square bg-muted relative group">
                <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400?text=No+Image" }}
                />
            </div>
            <CardHeader>
                <CardTitle className="line-clamp-1">{product.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <div className="flex justify-between items-center mt-2">
                    <p className="text-xl font-bold text-primary">${product.price.toFixed(2)}</p>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                        {product.stock > 0 ? `${product.stock} in stock` : 'Out of Stock'}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{product.description}</p>
            </CardContent>
            <CardFooter className="gap-2">
                <Button asChild variant="outline" className="flex-1">
                    <Link to={`/product/${product.id}`}>View 3D</Link>
                </Button>
                <Button className="flex-1" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add
                </Button>
            </CardFooter>
        </Card>
    );
}
