import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { useAuth } from '../context/AuthContext';

const { 
  FiUser, FiMail, FiPhone, FiHome, FiShoppingBag, 
  FiHeart, FiCreditCard, FiLogOut, FiEdit, FiUpload 
} = FiIcons;

const Profile = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      country: user?.country || ''
    }
  });

  // Redirect if not logged in
  if (!user) {
    navigate('/login');
    return null;
  }

  const onSubmit = async (data) => {
    try {
      const result = await updateProfile(data);
      if (result.success) {
        setUpdateSuccess(true);
        setIsEditing(false);
        setTimeout(() => setUpdateSuccess(false), 3000);
      }
    } catch (error) {
      console.error('Profile update failed:', error);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'orders', name: 'Orders', icon: FiShoppingBag },
    { id: 'wishlist', name: 'Wishlist', icon: FiHeart },
    { id: 'addresses', name: 'Addresses', icon: FiHome },
    { id: 'payment', name: 'Payment', icon: FiCreditCard },
  ];

  return (
    <>
      <Helmet>
        <title>My Profile | Worldofbrandsey</title>
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">My Account</h1>
            <p className="text-gray-600">Manage your profile and preferences</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <div className="text-center">
                  <div className="relative inline-block">
                    <img
                      src={user.avatar || 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face'}
                      alt={user.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <button className="absolute bottom-0 right-0 bg-pink-600 text-white rounded-full p-1 hover:bg-pink-700 transition-colors">
                      <SafeIcon icon={FiUpload} className="text-xs" />
                    </button>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-gray-600">{user.email}</p>
                </div>
              </div>

              <nav className="bg-white rounded-lg shadow">
                <ul className="py-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                          activeTab === tab.id ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600' : 'text-gray-700'
                        }`}
                      >
                        <SafeIcon icon={tab.icon} className="mr-3" />
                        {tab.name}
                      </button>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-6 py-3 text-left text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <SafeIcon icon={FiLogOut} className="mr-3" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow">
                {/* Profile Tab */}
                {activeTab === 'profile' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Profile Information</h2>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                      >
                        <SafeIcon icon={FiEdit} className="mr-2" />
                        {isEditing ? 'Cancel' : 'Edit'}
                      </button>
                    </div>

                    {updateSuccess && (
                      <div className="mb-6 p-3 bg-green-50 text-green-700 rounded-lg">
                        Profile updated successfully!
                      </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            {...register('name', { required: 'Name is required' })}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : ''
                            } ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.name && (
                            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Invalid email address'
                              }
                            })}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : ''
                            } ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            {...register('phone')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Country
                          </label>
                          <select
                            {...register('country')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select Country</option>
                            <option value="US">United States</option>
                            <option value="CA">Canada</option>
                            <option value="UK">United Kingdom</option>
                            <option value="AU">Australia</option>
                          </select>
                        </div>

                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Address
                          </label>
                          <input
                            type="text"
                            {...register('address')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            {...register('city')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            State/Province
                          </label>
                          <input
                            type="text"
                            {...register('state')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            ZIP/Postal Code
                          </label>
                          <input
                            type="text"
                            {...register('zipCode')}
                            disabled={!isEditing}
                            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                              !isEditing ? 'bg-gray-50' : 'border-gray-300'
                            }`}
                          />
                        </div>
                      </div>

                      {isEditing && (
                        <div className="mt-6 flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                          >
                            Save Changes
                          </button>
                        </div>
                      )}
                    </form>
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === 'orders' && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Order History</h2>
                    <div className="text-center py-12">
                      <SafeIcon icon={FiShoppingBag} className="text-6xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No orders yet</h3>
                      <p className="text-gray-600 mb-6">
                        You haven't placed any orders yet. Start shopping to see your orders here.
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                      >
                        Start Shopping
                      </Link>
                    </div>
                  </div>
                )}

                {/* Wishlist Tab */}
                {activeTab === 'wishlist' && (
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">My Wishlist</h2>
                    <div className="text-center py-12">
                      <SafeIcon icon={FiHeart} className="text-6xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Your wishlist is empty</h3>
                      <p className="text-gray-600 mb-6">
                        Save items you love to your wishlist and come back to them later.
                      </p>
                      <Link
                        to="/products"
                        className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                      >
                        Browse Products
                      </Link>
                    </div>
                  </div>
                )}

                {/* Addresses Tab */}
                {activeTab === 'addresses' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                        Add New Address
                      </button>
                    </div>
                    <div className="text-center py-12">
                      <SafeIcon icon={FiHome} className="text-6xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No saved addresses</h3>
                      <p className="text-gray-600">
                        Add addresses to make checkout faster and easier.
                      </p>
                    </div>
                  </div>
                )}

                {/* Payment Tab */}
                {activeTab === 'payment' && (
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
                      <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                        Add New Card
                      </button>
                    </div>
                    <div className="text-center py-12">
                      <SafeIcon icon={FiCreditCard} className="text-6xl text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-700 mb-2">No payment methods</h3>
                      <p className="text-gray-600">
                        Add a payment method to make checkout quick and secure.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;