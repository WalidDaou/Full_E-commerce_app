import React from 'react'
import { useCommerceStore } from '../../store'

function CategoryFilter() {
  const {
    selectedCategory,
    setSelectedCategory
  } = useCommerceStore()

  const categories = [
    { name: 'clothes', image: '/categories/clothes.png' },
    { name: 'Furniture', image: '/categories/furniture.png' },
    { name: 'arts', image: '/categories/arts.png' },
    { name: 'vases', image: '/categories/vases.png' },
    { name: 'paintings', image: '/categories/paintings.png' },
    { name: 'All', image: '/categories/paintings.png', },

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
    
      <div className="categories flex gap-4 items-center ml-2 mr-2 ">
        {categories.map((category) => (

          <img className="h-10"
            key={category.name}
            src={category.image}
            alt={category.name}
            onClick={() => setSelectedCategory(category.name)}
            style={{ cursor: 'pointer', margin: '5px' }}
          />
        ))}
      </div>


      {/* <option value="All">All Categories</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Furniture">Furniture</option>
      <option value="Beauty">Beauty</option> */}
      {/* Add more categories */}
   
    </>
  )
}

export default CategoryFilter