import { useState, useMemo } from "react";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Home() {
    const { products } = useProducts();
    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("default"); // default, price-asc, price-desc, name-asc
    const [stockFilter, setStockFilter] = useState("all"); // all, in-stock, out-of-stock

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description.toLowerCase().includes(query)
            );
        }

        // Stock filter
        if (stockFilter === "in-stock") {
            result = result.filter((p) => p.stock > 0);
        } else if (stockFilter === "out-of-stock") {
            result = result.filter((p) => p.stock === 0);
        }

        // Sort
        if (sortBy === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name-asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        }

        return result;
    }, [products, searchQuery, sortBy, stockFilter]);

    const sortLabels = {
        default: "Default",
        "price-asc": "Price: Low to High",
        "price-desc": "Price: High to Low",
        "name-asc": "Name: A-Z",
    };

    return (
        <div className="py-8">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    Featured Products
                </h1>
                <p className="text-xl text-muted-foreground">
                    Explore our collection of high-quality 3D ready items.
                </p>
            </div>

            {/* Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <ArrowUpDown className="h-4 w-4" />
                            {sortLabels[sortBy]}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {Object.entries(sortLabels).map(([key, label]) => (
                            <DropdownMenuItem
                                key={key}
                                onClick={() => setSortBy(key)}
                                className={sortBy === key ? "font-bold" : ""}
                            >
                                {label}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="gap-2">
                            <SlidersHorizontal className="h-4 w-4" />
                            {stockFilter === "all"
                                ? "All"
                                : stockFilter === "in-stock"
                                    ? "In Stock"
                                    : "Out of Stock"}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Availability</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => setStockFilter("all")}
                            className={stockFilter === "all" ? "font-bold" : ""}
                        >
                            All
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setStockFilter("in-stock")}
                            className={stockFilter === "in-stock" ? "font-bold" : ""}
                        >
                            In Stock
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => setStockFilter("out-of-stock")}
                            className={stockFilter === "out-of-stock" ? "font-bold" : ""}
                        >
                            Out of Stock
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Results Count */}
            <p className="text-sm text-muted-foreground mb-4">
                Showing {filteredProducts.length} of {products.length} products
            </p>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16 text-muted-foreground">
                    <p className="text-lg">No products found.</p>
                    <p className="text-sm mt-2">Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    );
}
