import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useCart } from '../context/CartContext';

const { FiTrash2, FiShoppingBag, FiArrowRight } = FiIcons;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const isCartEmpty = cartItems.length === 0;

  return (
    <>
      <Helmet>
        <title>Shopping Cart | Worldofbrandsey</title>
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-gray-600">
              {isCartEmpty
                ? "Your cart is empty. Start shopping to add items to your cart."
                : `You have ${cartItems.length} item${cartItems.length > 1 ? 's' : ''} in your cart.`}
            </p>
          </div>

          {isCartEmpty ? (
            <div className="text-center py-12">
              <div className="mb-6">
                <SafeIcon icon={FiShoppingBag} className="text-6xl text-gray-300 mx-auto" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items */}
              <div className="flex-1">
                <div className="bg-white rounded-lg shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Quantity
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Total
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Remove
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <motion.tr
                          key={item.cartId}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          layout
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-500 mt-1">
                                  {item.selectedColor && (
                                    <span className="mr-2">Color: {item.selectedColor}</span>
                                  )}
                                  {item.selectedSize && (
                                    <span>Size: {item.selectedSize}</span>
                                  )}
                                </div>
                                <div className="text-sm font-medium text-pink-600 sm:hidden mt-1">
                                  ${item.price.toFixed(2)}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm font-medium text-gray-900">
                              ${item.price.toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                className="w-8 h-8 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-100"
                              >
                                -
                              </button>
                              <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                                {item.quantity}
                              </div>
                              <button
                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                className="w-8 h-8 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                            <div className="text-sm font-medium text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <button
                              onClick={() => removeFromCart(item.cartId)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <SafeIcon icon={FiTrash2} className="text-lg" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Cart Actions */}
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={clearCart}
                    className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/products"
                    className="py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:w-80">
                <div className="bg-white rounded-lg shadow p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="text-gray-900 font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="text-gray-900 font-medium">
                        {getCartTotal() >= 75 ? 'Free' : '$5.00'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="text-gray-900 font-medium">
                        ${(getCartTotal() * 0.08).toFixed(2)}
                      </span>
                    </div>
                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-900">Total</span>
                        <span className="text-pink-600 text-xl">
                          ${(
                            getCartTotal() +
                            (getCartTotal() >= 75 ? 0 : 5) +
                            getCartTotal() * 0.08
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to="/checkout"
                      className="w-full py-3 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center"
                    >
                      Proceed to Checkout
                      <SafeIcon icon={FiArrowRight} className="ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;