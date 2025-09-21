import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../COMPONENTS/Title';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';

const Cart = () => {
  const {
    products,
    cartItems,
    updateQuantity,
    getCartAmount,
    currency,
    delivery_fee,
    cartLoading,
    cartError,
  } = useContext(ShopContext);

  // Get cart data with product info
  const getCartData = () => {
    const cartData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          const productInfo = products.find((product) => product._id === itemId);
          if (productInfo) {
            // Normalize image (always array)
            const normalizedImage = Array.isArray(productInfo.image)
              ? productInfo.image
              : [productInfo.image].filter(Boolean);

            cartData.push({
              _id: itemId,
              size,
              quantity: cartItems[itemId][size],
              ...productInfo,
              image: normalizedImage,
            });
          }
        }
      }
    }
    return cartData;
  };

  const cartData = getCartData();
  const subtotal = getCartAmount();

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={'YOUR'} text2={'CART'} />
      </div>

      {cartLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="animate-pulse w-32 h-32 mb-6 bg-gray-200 rounded-full"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      ) : cartError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-red-600 text-sm">{cartError}</p>
          <Link
            to="/collection"
            className="bg-black text-white px-8 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors mt-4"
          >
            Continue Shopping
          </Link>
        </div>
      ) : cartData.length === 0 ? (
        // Empty Cart State
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-32 h-32 mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <img
              src={assets.cart_icon}
              alt="Empty cart"
              className="w-16 h-16 opacity-50"
            />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            Your cart is empty
          </h3>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/collection"
            className="bg-black text-white px-8 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartData.map((item) => (
                <div
                  key={`${item._id}-${item.size}`}
                  className="py-4 border-b border-gray-200 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
                >
                  {/* Product Info */}
                  <div className="flex items-start gap-6">
                    <img
                      className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded"
                      src={item.image?.[0] || assets.cart_icon}
                      alt={item.name}
                      onError={(e) => {
                        e.target.src = assets.cart_icon;
                      }}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-xs sm:text-lg font-medium text-gray-800">
                        {item.name}
                      </p>
                      <div className="flex items-center gap-5 mt-2">
                        <p className="font-semibold">
                          {currency}
                          {item.price}
                        </p>
                        <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50 text-xs sm:text-sm">
                          {item.size}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity - 1)
                      }
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.size, item.quantity + 1)
                      }
                      className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      +
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    className="w-6 h-6 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <img
                      src={assets.bin_icon}
                      alt="Remove"
                      className="w-full h-full"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl mb-4">
                <Title text1={'CART'} text2={'TOTALS'} />
              </div>

              <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p>
                    {currency}
                    {subtotal.toFixed(2)}
                  </p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <p>Shipping Fee</p>
                  <p>
                    {currency}
                    {delivery_fee.toFixed(2)}
                  </p>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <b>Total</b>
                  <b>
                    {currency}
                    {(subtotal + delivery_fee).toFixed(2)}
                  </b>
                </div>
              </div>

              <div className="w-full text-end mt-6">
                <Link
                  to="/checkoutPage"
                  className="bg-black text-white text-sm px-8 py-3 rounded hover:bg-gray-800 transition-colors inline-block"
                >
                  PROCEED TO CHECKOUT
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
