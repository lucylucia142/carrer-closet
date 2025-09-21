import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  // Safe image handling
  let displayImage = '';
  if (Array.isArray(image) && image.length > 0) {
    displayImage = image[0];
  } else if (typeof image === 'string') {
    displayImage = image;
  } else {
    displayImage = '/placeholder.png'; // fallback image
  }

  return (
    <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
      <div className='overflow-hidden'>
        <img
          className='hover:scale-110 transition ease-in-out'
          src={displayImage}
          alt={name || 'Product'}
        />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <p className='text-sm font-medium'>{currency}{price}</p>
    </Link>
  );
};

export default ProductItem;
