import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useCart } from '../context/CartContext';

const { FiCreditCard, FiCheckCircle, FiChevronLeft } = FiIcons;

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect to cart if empty
  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            You need to add items to your cart before proceeding to checkout.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal >= 75 ? 0 : 5;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const onSubmit = (data) => {
    if (activeStep === 1) {
      setActiveStep(2);
    } else {
      // Process order
      console.log('Order submitted:', { ...data, paymentMethod, items: cartItems, total });
      setOrderPlaced(true);
      clearCart();
    }
  };

  return (
    <>
      <Helmet>
        <title>Checkout | Worldofbrandsey</title>
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {orderPlaced ? (
            <OrderConfirmation />
          ) : (
            <>
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Checkout</h1>
                <div className="flex justify-center">
                  <ol className="flex items-center w-full max-w-3xl">
                    <li className="flex w-full items-center text-pink-600 after:content-[''] after:w-full after:h-1 after:border-b after:border-pink-100 after:border-4 after:inline-block">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        activeStep >= 1 ? 'bg-pink-600' : 'bg-gray-200'
                      } shrink-0`}>
                        <span className="text-white">1</span>
                      </div>
                      <span className="ml-2 text-sm font-medium">Shipping</span>
                    </li>
                    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                        activeStep >= 2 ? 'bg-pink-600' : 'bg-gray-200'
                      } shrink-0`}>
                        <span className={activeStep >= 2 ? 'text-white' : 'text-gray-500'}>2</span>
                      </div>
                      <span className={`ml-2 text-sm font-medium ${activeStep >= 2 ? 'text-pink-600' : 'text-gray-500'}`}>
                        Payment
                      </span>
                    </li>
                    <li className="flex items-center">
                      <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full shrink-0">
                        <span className="text-gray-500">3</span>
                      </div>
                      <span className="ml-2 text-sm font-medium text-gray-500">Confirmation</span>
                    </li>
                  </ol>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-8">
                {/* Checkout Form */}
                <div className="flex-1">
                  <div className="bg-white rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      {activeStep === 1 && (
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                              </label>
                              <input
                                type="text"
                                id="firstName"
                                {...register('firstName', { required: 'First name is required' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                  errors.firstName ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.firstName && (
                                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                              </label>
                              <input
                                type="text"
                                id="lastName"
                                {...register('lastName', { required: 'Last name is required' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                  errors.lastName ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.lastName && (
                                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                              Email Address
                            </label>
                            <input
                              type="email"
                              id="email"
                              {...register('email', { 
                                required: 'Email is required',
                                pattern: {
                                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                  message: 'Invalid email address'
                                }
                              })}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                            )}
                          </div>

                          <div className="mb-6">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              {...register('phone', { required: 'Phone number is required' })}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                errors.phone ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                          </div>

                          <div className="mb-6">
                            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                              Street Address
                            </label>
                            <input
                              type="text"
                              id="address"
                              {...register('address', { required: 'Address is required' })}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                errors.address ? 'border-red-500' : 'border-gray-300'
                              }`}
                            />
                            {errors.address && (
                              <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div>
                              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                              </label>
                              <input
                                type="text"
                                id="city"
                                {...register('city', { required: 'City is required' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                  errors.city ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.city && (
                                <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                State/Province
                              </label>
                              <input
                                type="text"
                                id="state"
                                {...register('state', { required: 'State is required' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                  errors.state ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.state && (
                                <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
                              )}
                            </div>
                            <div>
                              <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                                ZIP/Postal Code
                              </label>
                              <input
                                type="text"
                                id="zipCode"
                                {...register('zipCode', { required: 'ZIP code is required' })}
                                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                  errors.zipCode ? 'border-red-500' : 'border-gray-300'
                                }`}
                              />
                              {errors.zipCode && (
                                <p className="mt-1 text-sm text-red-600">{errors.zipCode.message}</p>
                              )}
                            </div>
                          </div>

                          <div className="mb-6">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                              Country
                            </label>
                            <select
                              id="country"
                              {...register('country', { required: 'Country is required' })}
                              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                errors.country ? 'border-red-500' : 'border-gray-300'
                              }`}
                            >
                              <option value="">Select Country</option>
                              <option value="US">United States</option>
                              <option value="CA">Canada</option>
                              <option value="UK">United Kingdom</option>
                              <option value="AU">Australia</option>
                            </select>
                            {errors.country && (
                              <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
                            )}
                          </div>

                          <div className="flex justify-between mt-8">
                            <Link
                              to="/cart"
                              className="flex items-center text-gray-600 hover:text-gray-800"
                            >
                              <SafeIcon icon={FiChevronLeft} className="mr-1" />
                              Back to Cart
                            </Link>
                            <button
                              type="submit"
                              className="py-2 px-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                            >
                              Continue to Payment
                            </button>
                          </div>
                        </div>
                      )}

                      {activeStep === 2 && (
                        <div>
                          <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
                          
                          <div className="mb-6">
                            <div className="space-y-4">
                              <div className="flex items-center">
                                <input
                                  id="credit-card"
                                  name="paymentMethod"
                                  type="radio"
                                  checked={paymentMethod === 'credit-card'}
                                  onChange={() => setPaymentMethod('credit-card')}
                                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                                />
                                <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                                  Credit Card
                                </label>
                              </div>
                              <div className="flex items-center">
                                <input
                                  id="paypal"
                                  name="paymentMethod"
                                  type="radio"
                                  checked={paymentMethod === 'paypal'}
                                  onChange={() => setPaymentMethod('paypal')}
                                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
                                />
                                <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                                  PayPal
                                </label>
                              </div>
                            </div>
                          </div>

                          {paymentMethod === 'credit-card' && (
                            <div className="border rounded-lg p-4 bg-gray-50 mb-6">
                              <div className="flex items-center mb-4">
                                <SafeIcon icon={FiCreditCard} className="text-gray-600 mr-2" />
                                <h3 className="text-base font-medium text-gray-900">Credit Card Details</h3>
                              </div>
                              
                              <div className="mb-4">
                                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">
                                  Name on Card
                                </label>
                                <input
                                  type="text"
                                  id="cardName"
                                  {...register('cardName', { required: paymentMethod === 'credit-card' ? 'Card name is required' : false })}
                                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                    errors.cardName ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                />
                                {errors.cardName && (
                                  <p className="mt-1 text-sm text-red-600">{errors.cardName.message}</p>
                                )}
                              </div>

                              <div className="mb-4">
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                  Card Number
                                </label>
                                <input
                                  type="text"
                                  id="cardNumber"
                                  placeholder="1234 5678 9012 3456"
                                  {...register('cardNumber', { 
                                    required: paymentMethod === 'credit-card' ? 'Card number is required' : false,
                                    pattern: {
                                      value: /^[0-9]{16}$/,
                                      message: 'Please enter a valid 16-digit card number'
                                    }
                                  })}
                                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                    errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                                  }`}
                                />
                                {errors.cardNumber && (
                                  <p className="mt-1 text-sm text-red-600">{errors.cardNumber.message}</p>
                                )}
                              </div>

                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                                    Expiry Date (MM/YY)
                                  </label>
                                  <input
                                    type="text"
                                    id="expiryDate"
                                    placeholder="MM/YY"
                                    {...register('expiryDate', { 
                                      required: paymentMethod === 'credit-card' ? 'Expiry date is required' : false,
                                      pattern: {
                                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                                        message: 'Please enter a valid date in MM/YY format'
                                      }
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                      errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                  />
                                  {errors.expiryDate && (
                                    <p className="mt-1 text-sm text-red-600">{errors.expiryDate.message}</p>
                                  )}
                                </div>
                                <div>
                                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-1">
                                    CVV
                                  </label>
                                  <input
                                    type="text"
                                    id="cvv"
                                    placeholder="123"
                                    {...register('cvv', { 
                                      required: paymentMethod === 'credit-card' ? 'CVV is required' : false,
                                      pattern: {
                                        value: /^[0-9]{3,4}$/,
                                        message: 'Please enter a valid CVV'
                                      }
                                    })}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                      errors.cvv ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                  />
                                  {errors.cvv && (
                                    <p className="mt-1 text-sm text-red-600">{errors.cvv.message}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          )}

                          {paymentMethod === 'paypal' && (
                            <div className="border rounded-lg p-6 bg-gray-50 mb-6 text-center">
                              <p className="text-gray-700 mb-4">
                                You will be redirected to PayPal to complete your purchase securely.
                              </p>
                              <div className="flex justify-center">
                                <img 
                                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_111x69.jpg" 
                                  alt="PayPal" 
                                  className="h-12" 
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex justify-between mt-8">
                            <button
                              type="button"
                              onClick={() => setActiveStep(1)}
                              className="flex items-center text-gray-600 hover:text-gray-800"
                            >
                              <SafeIcon icon={FiChevronLeft} className="mr-1" />
                              Back to Shipping
                            </button>
                            <button
                              type="submit"
                              className="py-2 px-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                            >
                              Complete Order
                            </button>
                          </div>
                        </div>
                      )}
                    </form>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="lg:w-80">
                  <div className="bg-white rounded-lg shadow p-6 sticky top-24">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h2>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900 font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span className="text-gray-900 font-medium">
                          {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span className="text-gray-900 font-medium">
                          ${tax.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-4 mt-4">
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-900">Total</span>
                          <span className="text-pink-600 text-xl">
                            ${total.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-6">
                      <h3 className="text-sm font-medium text-gray-900 mb-3">Items in Order</h3>
                      <div className="space-y-4">
                        {cartItems.map(item => (
                          <div key={item.cartId} className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>
                            <div className="ml-4 flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                              <p className="text-sm text-gray-500">
                                Qty: {item.quantity} × ${item.price.toFixed(2)}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const OrderConfirmation = () => {
  return (
    <motion.div
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
          <SafeIcon icon={FiCheckCircle} className="text-3xl" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You For Your Order!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Your order has been placed successfully. We've sent a confirmation email with all the details.
        </p>
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="text-left">
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Order Number:</span> WB-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <p className="text-gray-700">
              <span className="font-medium">Estimated Delivery:</span> {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="py-3 px-8 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/products"
          className="py-3 px-8 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
};

export default Checkout;