import React, { useEffect, useState, useContext } from 'react'; 
import { useParams } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import RelatedProducts from '../COMPONENTS/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  // Fetch single product from backend or from context
  const fetchProductData = async () => {
    // First, check if product is in context products
    const existingProduct = products.find((p) => p._id === productId);
    if (existingProduct) {
      setProductData(existingProduct);
      setImage(existingProduct.image && existingProduct.image.length > 0 ? existingProduct.image[0] : '');
      return;
    }

    // Fallback to API fetch
    try {
      const res = await fetch(`http://localhost:3000/products/${productId}`);
      if (!res.ok) throw new Error('Product not found');
      const data = await res.json();
      setProductData(data);
      setImage(data.image && data.image.length > 0 ? data.image[0] : '');
    } catch (err) {
      console.error('Failed to fetch product:', err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (                     
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Main Product Layout */}
      <div className='flex flex-col md:flex-row gap-12 md:gap-16'>
        {/*------------------Product Images---------------------------*/}
        <div className='flex-1 flex flex-col-reverse gap-3 md:flex-row'>
          <div className='flex md:flex-col overflow-x-auto md:overflow-y-auto justify-between md:justify-start md:w-[18%] lg:w-[15%] gap-3 md:gap-4'>
            {productData.image && Array.isArray(productData.image) && productData.image.map((item, index) => (
              <img 
                onClick={() => setImage(item)} 
                src={item} 
                key={index} 
                className='w-[24%] md:w-full flex-shrink-0 cursor-pointer rounded-md' 
                alt={`Product thumbnail ${index + 1}`} 
              />
            ))}
          </div>
          <div className='w-full md:w-[82%] lg:w-[85%]'>
            <img 
              className='w-full h-auto object-cover rounded-md' 
              src={image} 
              alt={productData.name} 
            />
          </div>                                      
        </div>

        {/*------------------------Product Info---------------------------------*/}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl lg:text-3xl mt-2 md:mt-0'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="star" className="w-3.5 lg:w-4" />
            <img src={assets.star_icon} alt="star" className="w-3.5 lg:w-4" />
            <img src={assets.star_icon} alt="star" className="w-3.5 lg:w-4" />
            <img src={assets.star_icon} alt="star" className="w-3.5 lg:w-4" />
            <img src={assets.star_dull_icon} alt="dull star" className="w-3.5 lg:w-4" />
            <p className='pl-2 text-sm lg:text-base'>(122)</p>
          </div>
          <p className='mt-4 md:mt-5 text-2xl lg:text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-4 md:mt-5 text-gray-500 text-sm md:text-base lg:w-4/5'>{productData.description}</p>

          <div className='flex flex-col gap-3 md:gap-4 my-6 md:my-8'>
            <p className='text-sm md:text-base font-medium'>Select Size</p>
            <div className='flex gap-2 flex-wrap'>
              {Array.isArray(productData.sizes) && productData.sizes.map((item, index) => (
                <button 
                  onClick={() => setSize(item)} 
                  className={`border py-2 px-3 md:px-4 bg-gray-100 text-sm md:text-base ${item === size ? 'border-orange-500 bg-orange-50' : ''}`} 
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => {
              if (!size) {
                alert('Please select a size first.');
                return;
              }
              addToCart(productData._id, size);
            }} 
            className='bg-black text-white px-6 py-2 md:px-8 md:py-3 text-sm md:text-base active:bg-gray-700 uppercase'
          >
            Add to Cart
          </button>

          <hr className='mt-6 md:mt-8 sm:w-4/5 border-gray-300'/>
          <div className='text-sm text-gray-500 mt-4 md:mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* ------------Description and Review Section--------- */}
      <div className='mt-16 md:mt-20'>
        <div className='flex border-b border-gray-300'>
          <button className='border border-gray-300 px-4 py-2 md:px-5 md:py-3 text-sm md:text-base font-medium bg-white'>Description</button>
          <button className='border border-gray-300 px-4 py-2 md:px-5 md:py-3 text-sm md:text-base'>Reviews (122)</button>
        </div>
        <div className='flex flex-col gap-3 md:gap-4 border border-t-0 px-4 md:px-6 py-4 md:py-6 text-sm md:text-base text-gray-500'>
          <p>{productData.description}</p>
          <p>Additional details about the product can go here if needed.</p>
        </div>
      </div>

      {/* --------------Related Products------------*/}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'>Loading...</div>;
};

export default Product;