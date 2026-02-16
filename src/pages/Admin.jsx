import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2 } from "lucide-react";

export default function Admin() {
    const { user } = useAuth();
    const { products, addProduct, deleteProduct, updateProduct } = useProducts();
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        description: "",
        modelId: "",
        image: "",
        stock: "",
    });
    const [isOpen, setIsOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentProductId, setCurrentProductId] = useState(null);

    // Mock protection - in real app check roles
    // if (!user) return <Navigate to="/login" />;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleOpenChange = (open) => {
        setIsOpen(open);
        if (!open) {
            setNewProduct({ name: "", price: "", description: "", modelId: "", image: "", stock: "" });
            setIsEditMode(false);
            setCurrentProductId(null);
        }
    };

    const handleEditClick = (product) => {
        setNewProduct({
            name: product.name,
            price: product.price,
            description: product.description,
            modelId: product.modelId,
            image: product.image,
            stock: product.stock,
        });
        setCurrentProductId(product.id);
        setIsEditMode(true);
        setIsOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const productData = {
            ...newProduct,
            price: parseFloat(newProduct.price) || 0,
            stock: parseInt(newProduct.stock) || 0,
        };

        if (isEditMode && currentProductId) {
            updateProduct(currentProductId, productData);
        } else {
            addProduct(productData);
        }

        handleOpenChange(false);
    };

    return (
        <div className="container mx-auto py-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                    <DialogTrigger asChild>
                        <Button>Add New Product</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>{isEditMode ? "Edit Product" : "Add Product"}</DialogTitle>
                            <DialogDescription>
                                {isEditMode ? "Update product details." : "Add a new 3D product to the catalog."}
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input id="name" name="name" value={newProduct.name} onChange={handleInputChange} className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-right">Price</Label>
                                <Input id="price" name="price" type="number" step="0.01" value={newProduct.price} onChange={handleInputChange} className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="stock" className="text-right">Stock</Label>
                                <Input id="stock" name="stock" type="number" value={newProduct.stock} onChange={handleInputChange} className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="description" className="text-right">Desc</Label>
                                <Textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="modelId" className="text-right">Model ID</Label>
                                <Input id="modelId" name="modelId" placeholder="Sketchfab ID" value={newProduct.modelId} onChange={handleInputChange} className="col-span-3" required />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="image" className="text-right">Image URL</Label>
                                <Input id="image" name="image" placeholder="https://..." value={newProduct.image} onChange={handleInputChange} className="col-span-3" />
                            </div>
                            <DialogFooter>
                                <Button type="submit">{isEditMode ? "Update Product" : "Save Product"}</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Stock</TableHead>
                            <TableHead>Model ID</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <img src={product.image} alt={product.name} className="h-10 w-10 object-cover rounded" />
                                </TableCell>
                                <TableCell className="font-medium">{product.name}</TableCell>
                                <TableCell>${product.price.toFixed(2)}</TableCell>
                                <TableCell>{product.stock}</TableCell>
                                <TableCell className="font-mono text-xs">{product.modelId}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="icon" onClick={() => handleEditClick(product)}>
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button variant="destructive" size="icon" onClick={() => deleteProduct(product.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
