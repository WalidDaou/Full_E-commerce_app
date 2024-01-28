import React from 'react'
import { useCommerceStore } from '../../store'

function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory
  } = useCommerceStore()

  const categories = [
    { name: 'Electronics', image: '/categories/clothes.png' },
    { name: 'Clothing', image: 'clothing.jpg' },
    // Add more categories with their respective images
  ];

  // const categories = [
  //   // keep the empty string for matching all items
  //   '',
  //   'clothes',
  //   'furniture',
  //   'arts',
  //   'vases',
  //   'paintings',
  // ]



  return (

    <>
      {/* <div className="categories flex gap-4 items-center">
        {categories.map((category) => {
          if (!category) {
            return <p>
              All
            </p>
          }
          return <div>
            <img  src={'/categories/' + category + '.png'} alt="" />
            <img src="frontend/public/categories/clothes.png" alt="" />
            <img src="frontend/public/categories/clothes.png" alt="" />
            <img src="frontend/public/categories/clothes.png" alt="" />
          </div>
        }
        )}
      </div> */}

      {categories.map((category) => (
        <img
          key={category.name}
          src={category.image}
          alt={category.name}
          onClick={() => setSelectedCategory(category.name)}
          style={{ cursor: 'pointer', margin: '5px' }}
        />
      ))}


      {/* <option value="All">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Furniture">Furniture</option>
      <option value="Beauty">Beauty</option> */}
      {/* Add more categories */}
      {/* <select
        value={selectedCategory}

      >
        <img className="h-10" src="/categories/clothes.png" alt="Electronics" />
        <img className="h-10" src="/categories/furniture.png" alt="" />
        <img className="h-10" src="/categories/arts.png" alt="" />
        <img className="h-10" src="/categories/vases.png" alt="" />
        <img className="h-10" src="/categories/paintings.png" alt="" />
      </select> */}

    </>
  )
}

export default CategoryFilter