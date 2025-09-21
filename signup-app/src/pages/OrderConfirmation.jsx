import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Title from '../COMPONENTS/Title';

const OrderConfirmation = () => {
  const { isAuthenticated, user } = useContext(ShopContext);
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || null; // Get order details from navigation state

  // Redirect to login if not authenticated
  if (!isAuthenticated || !user?._id) {
    navigate('/login');
    return null;
  }

  return (
    <div className="my-12 px-4 sm:px-6 lg:px-8 pt-12">
      {/* Header Section */}
      <div className="text-center py-12">
        <Title text1="ORDER" text2="CONFIRMED" />
        <p className="w-11/12 sm:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto text-base sm:text-lg text-gray-600 mt-4 leading-relaxed">
          Thank you for your order! We've received it and will process it soon.
        </p>
      </div>

      {/* Order Details */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-2xl shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Confirmation</h2>
          {order ? (
            <>
              <p className="text-sm text-gray-600 mb-2">
                Order #{order._id} - Placed on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Status: <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">{order.status}</span>
              </p>
              <div className="flex justify-between text-sm font-semibold">
                <span>Total Amount:</span>
                <span>R{order.totalAmount.toFixed(2)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">Your order has been received. You'll receive a confirmation soon.</p>
          )}
        </div>

        {/* Continue Shopping Button */}
        <button
          onClick={() => navigate('/')}
          className="w-full sm:w-auto bg-black text-white px-8 py-3 text-sm font-medium rounded hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;