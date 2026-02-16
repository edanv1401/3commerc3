import { createContext, useContext, useState } from "react";
import { products as initialProducts } from "../data/products";

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState(initialProducts);

    const addProduct = (product) => {
        setProducts([...products, { ...product, id: Date.now().toString() }]);
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const updateProduct = (id, updatedProduct) => {
        setProducts(products.map(p => p.id === id ? { ...p, ...updatedProduct } : p));
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
