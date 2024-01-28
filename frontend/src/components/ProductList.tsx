import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeURL } from "../shared/constants"
import { useCommerceStore } from '../store'

function ProductList() {

    const {
        products,
        setProducts,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        filteredProducts,
        searchTerm
    } = useCommerceStore();

    useEffect(() => {
        fetch(homeURL + '/products/list')
            .then((response) => { return response.json() })
            .then((response: any) => {
                console.log(response)
                // TODO check if response no errors
                setProducts(response)
            })
    }, [setProducts])

    useEffect(() => {
        const filtered = products.filter((product) => {
            const categoryFilter =
                selectedCategory === 'All' || product.category === selectedCategory;
            const priceFilter =
                (minPrice === 0 || product.price >= minPrice) &&
                (maxPrice === 0 || product.price <= maxPrice);
            const searchTermFilter =
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.category.toLowerCase().includes(searchTerm.toLowerCase());


            return categoryFilter && searchTermFilter && priceFilter;
        });

        useCommerceStore.setState({ filteredProducts: filtered });
    }, [products, selectedCategory, minPrice, maxPrice, searchTerm]);

    return (
        <>
          
            {/* Price range input */}
            <div>
                <label>Min Price:</label>
                <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                />
            </div>

            <div>
                <label>Max Price:</label>
                <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
            </div>

            <div>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList