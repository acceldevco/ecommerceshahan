import { useState, useEffect } from 'react';
// import { Product, ProductAttribute } from '@/types/product';

export const useProducts = () => {
  const [products, setProducts] = useState<any>([]);
  const [attributes, setAttributes] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    const savedAttributes = localStorage.getItem('productAttributes');
    
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedAttributes) setAttributes(JSON.parse(savedAttributes));
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('productAttributes', JSON.stringify(attributes));
  }, [attributes]);

  const addProduct = (product: Omit<any, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newProduct: any = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProducts((prev:any) => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<any>) => {
    setProducts((prev:any) => prev.map((product:any) => 
      product.id === id 
        ? { ...product, ...updates, updatedAt: new Date() }
        : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts((prev:any) => prev.filter((product:any) => product.id !== id));
  };

  const addAttribute = (attribute: Omit<any, 'id'>) => {
    const newAttribute: any = {
      ...attribute,
      id: Date.now().toString(),
    };
    setAttributes((prev:any) => [...prev, newAttribute]);
  };

  const deleteAttribute = (id: string) => {
    setAttributes((prev:any) => prev.filter((attr:any) => attr.id !== id));
  };

  return {
    products,
    attributes,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    addAttribute,
    deleteAttribute,
  };
};