import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link, useNavigate } from 'react-router-dom';
import Title from '../COMPONENTS/Title';
import { assets } from '../assets/assets';

const CheckoutPage = () => {
  const { products, cartItems, currency, delivery_fee, getCartAmount, updateQuantity, cartLoading, cartError, isAuthenticated, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [error, setError] = useState('');

  // Get cart items with product details and size
  const cartProducts = [];
  for (const itemId in cartItems) {
    for (const size in cartItems[itemId]) {
      if (cartItems[itemId][size] > 0) {
        const product = products.find((p) => p._id === itemId);
        if (product) {
          cartProducts.push({
            _id: itemId,
            size,
            quantity: cartItems[itemId][size],
            ...product,
          });
        }
      }
    }
  }

  // Handle input changes for shipping form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Validate shipping info
  const validateShippingInfo = () => {
    return Object.values(shippingInfo).every((field) => field.trim() !== '');
  };

  // Handle order submission
  const handlePlaceOrder = async () => {
    if (!isAuthenticated || !user?._id) {
      setError('Please log in to place an order.');
      navigate('/login');
      return;
    }
    if (!validateShippingInfo()) {
      setError('Please fill in all shipping details.');
      return;
    }
    if (cartProducts.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    setError('');
    try {
      const orderData = {
        userId: user._id,
        items: cartItems, // Backend expects { [itemId]: { [size]: quantity } }
        totalAmount: getCartAmount() + delivery_fee,
        shippingAddress: shippingInfo,
        paymentMethod,
      };

      const response = await fetch('http://localhost:3000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user._id}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      // Clear cart locally (backend also clears it)
      cartProducts.forEach((item) => updateQuantity(item._id, item.size, 0));
      navigate('/orders');
    } catch (err) {
      setError('Failed to place order: ' + err.message);
      console.error('Order submission error:', err);
    }
  };

  return (
    <div className="my-12 px-4 sm:px-6 lg:px-8 pt-12">
      {/* Header Section */}
      <div className="text-center py-12">
        <Title text1="CHECKOUT" text2="" />
        <p className="w-11/12 sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
          Review your cart, enter your shipping details, and place your order.
        </p>
      </div>

      {cartLoading ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="animate-pulse w-32 h-32 mb-6 bg-gray-200 rounded-full"></div>
          <p className="text-gray-600">Loading your cart...</p>
        </div>
      ) : cartError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-red-600 text-sm">{cartError}</p>
          <Link to="/collection" className="bg-black text-white px-8 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors mt-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Shipping and Payment Form */}
          <div className="lg:w-2/3">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={shippingInfo.firstName}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={shippingInfo.lastName}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  name="city"
                  value={shippingInfo.city}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={shippingInfo.postalCode}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleInputChange}
                  className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black"
                  required
                />
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-6 mb-4">Payment Method</h2>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="creditCard"
                  checked={paymentMethod === 'creditCard'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                Credit Card
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                PayPal
              </label>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="bg-white border border-gray-200 rounded-2xl shadow p-4">
              {cartProducts.length > 0 ? (
                <>
                  {cartProducts.map((item) => (
                    <div key={`${item._id}-${item.size}`} className="flex items-center gap-4 border-b py-3">
                      <img
                        src={Array.isArray(item.image) ? item.image[0] : item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl"
                        onError={(e) => console.warn(`Failed to load image for product ${item.name} (ID: ${item._id})`)}
                        loading="lazy"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold">{item.name}</h3>
                        <p className="text-gray-600 text-sm">
                          {currency}
                          {typeof item.price === 'number' ? (item.price * item.quantity).toFixed(2) : item.price} (
                          {item.quantity} x {currency}
                          {typeof item.price === 'number' ? item.price.toFixed(2) : item.price} - {item.size})
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity - 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, item.quantity + 1)}
                            className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button
                            onClick={() => updateQuantity(item._id, item.size, 0)}
                            className="text-red-600 text-xs hover:text-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mt-4">
                    <p className="flex justify-between text-sm">
                      <span>Subtotal</span>
                      <span>
                        {currency}
                        {getCartAmount().toFixed(2)}
                      </span>
                    </p>
                    <p className="flex justify-between text-sm mt-2">
                      <span>Shipping Fee</span>
                      <span>
                        {currency}
                        {delivery_fee.toFixed(2)}
                      </span>
                    </p>
                    <p className="flex justify-between text-sm font-semibold mt-2">
                      <span>Total</span>
                      <span>
                        {currency}
                        {(getCartAmount() + delivery_fee).toFixed(2)}
                      </span>
                    </p>
                    <button
                      onClick={handlePlaceOrder}
                      disabled={cartLoading || !isAuthenticated}
                      className={`w-full mt-4 py-2 rounded-lg text-sm font-medium transition ${
                        cartLoading || !isAuthenticated
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-black text-white hover:bg-gray-800'
                      }`}
                    >
                      {cartLoading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </>
              ) : (
                <p className="text-gray-600 text-sm">Your cart is empty.</p>
              )}
            </div>
            <Link to="/collection" className="text-sm text-gray-600 hover:text-black mt-4 inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;