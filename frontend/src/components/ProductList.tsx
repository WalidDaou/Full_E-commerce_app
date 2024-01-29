import React, { useEffect, useState } from 'react'
import ProductCard from "./ProductCard"
import { homeURL } from "../shared/constants"
import { useCommerceStore } from '../store'

const PriceRange = {
    display: 'flex',
    marginBottom: '10px',
    marginLeft: '35px',
    marginTop: '10px',
    gap: '20px'

}
const cardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    border: '1px solid #ccc',
};

function ProductList() {

    const {
        // decodedToken,
        token,
        names,
        setDecodedToken,
        products,
        setProducts,
        selectedCategory,
        setSelectedCategory,
        setNames,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        filteredProducts,
        searchTerm
    } = useCommerceStore();

    const fetchDecodedToken = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/decoded-token', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Add your authorization header if needed
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const decodedToken = data.decodedToken;
            setDecodedToken(decodedToken)

            console.log('Decoded Token:', decodedToken);
            console.log(decodedToken.user.email)
            // setNames(decodedToken?.user.name)
            alert(decodedToken.user.email)

            // Now you can use the decoded token in your frontend
        } catch (error: any) {
            console.error('Error fetching decoded token:', error.message);
            // Handle errors as needed
        }
    };


    // const handelEmail = ()=>{
    //     console.log(name)
    //     alert(name)
    // }


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

            <div style={PriceRange}>
                <button onClick={fetchDecodedToken}>hehehe</button>
                <div>
                    <label>Min Price:</label>
                    <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        style={{ border: '1px solid black', borderRadius: '10px', }}
                    />
                </div>

                <div>
                    <label>Max Price:</label>
                    <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        style={{ border: '1px solid black', borderRadius: '10px' }}
                    />
                </div>
            </div>
            {/*@ts-ignore*/}
            <div style={cardStyle} className='box-border'>
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </>
    )
}

export default ProductList