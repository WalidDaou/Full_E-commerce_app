import React from 'react'

interface Product {
  _id: number;
  name: string;
  category: string;
  description: string;
  price: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {

  return (
    <div className='productCard' style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', padding: '20px', borderBlockEnd:'' }}>
      <span>ProductCard:{product._id}</span>
      <span>Name:{product.name}</span>
      <span>category:{product.category} </span>
      <span>Price:{product.price}</span>
      <span>Description:{product.description}</span>
    </div>
  )
}

export default ProductCard