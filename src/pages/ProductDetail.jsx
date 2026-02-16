import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import SketchfabViewer from "../components/SketchfabViewer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator"; // I might need to install separator
import { ArrowLeft } from "lucide-react";

export default function ProductDetail() {
    const { id } = useParams();
    const { products } = useProducts();
    const { addToCart } = useCart();
    const product = products.find((p) => p.id === id);

    if (!product) {
        return <div className="p-10 text-center">Product not found</div>;
    }

    return (
        <div className="container mx-auto py-6">
            <Link to="/" className="inline-flex items-center text-sm mb-6 hover:underline text-muted-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 aspect-video bg-muted rounded-lg border shadow-sm">
                    <SketchfabViewer modelId={product.modelId} />
                </div>

                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-bold">{product.name}</h1>
                        <div className="flex items-center gap-4 mt-2">
                            <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
                            <span className={`text-sm font-medium px-3 py-1 rounded-full ${product.stock > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'}`}>
                                {product.stock > 0 ? `${product.stock} Units Available` : 'Out of Stock'}
                            </span>
                        </div>
                    </div>

                    <div className="h-px bg-border" />

                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg">Description</h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {product.description}
                        </p>
                    </div>

                    <div className="pt-6">
                        <Button size="lg" className="w-full" onClick={() => addToCart(product)} disabled={product.stock === 0}>
                            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
