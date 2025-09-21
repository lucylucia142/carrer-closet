import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

const LatestCollection = () => {
  const { products, currency, addToCart } = useContext(ShopContext)
  const [latestProducts, setLatestProduct] = useState([])

  useEffect(() => {
    setLatestProduct(products.slice(0, 10)) // first 10 products
  }, [products])

  return (
    <div className="my-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center py-12">
        {/* Title with bigger text applied via className */}
        <Title 
          text1="LATEST" 
          text2="COLLECTION" 
          className="text-3xl sm:text-4xl font-bold tracking-wide justify-center"
        />

        <p className="w-11/12 sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
          Discover our freshest arrivals, thoughtfully curated for quality, style, and modern elegance.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
        {latestProducts.length > 0 ? (
          latestProducts.map((item) => (
            <div 
              key={item._id} 
              className="p-4 rounded-2xl shadow hover:shadow-lg transition flex flex-col"
            >
              <img 
                src={Array.isArray(item.image) ? item.image[0] : item.image} 
                alt={item.name} 
                className="w-full h-48 object-cover rounded-xl mb-3"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=600&fit=crop';
                }}
              />
              
              {/* Name & Price */}
              <h3 className="text-sm font-semibold line-clamp-2 mb-1">{item.name}</h3>
              <p className="text-gray-600 text-sm mb-3">
                {currency}{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
              </p>

              {/* Add to Cart Button */}
              <button
                onClick={() => addToCart(item._id)}
                className="mt-auto bg-black text-white text-sm py-2 px-4 rounded-lg hover:bg-gray-800 active:scale-95 transition"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            Loading our latest collection...
          </p>
        )}
      </div>
    </div>
  )
}

export default LatestCollection
