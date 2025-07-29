import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../../components/common/SafeIcon';
import { useAuth } from '../../context/AuthContext';

const { 
  FiHome, FiShoppingBag, FiUsers, FiBarChart3, 
  FiSettings, FiPackage, FiTrendingUp, FiDollarSign 
} = FiIcons;

const AdminDashboard = () => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Redirect if not admin
  if (!user || user.role !== 'admin') {
    return (
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">
            You don't have permission to access the admin dashboard.
          </p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const sidebarItems = [
    { id: 'dashboard', name: 'Dashboard', icon: FiHome, path: '/admin' },
    { id: 'products', name: 'Products', icon: FiPackage, path: '/admin/products' },
    { id: 'orders', name: 'Orders', icon: FiShoppingBag, path: '/admin/orders' },
    { id: 'customers', name: 'Customers', icon: FiUsers, path: '/admin/customers' },
    { id: 'analytics', name: 'Analytics', icon: FiBarChart3, path: '/admin/analytics' },
    { id: 'settings', name: 'Settings', icon: FiSettings, path: '/admin/settings' },
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Worldofbrandsey</title>
      </Helmet>

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 bg-white rounded-lg shadow mr-6">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Admin Panel</h2>
                <p className="text-gray-600">Welcome back, {user.name}</p>
              </div>
              <nav className="py-4">
                {sidebarItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors ${
                      location.pathname === item.path ? 'bg-pink-50 text-pink-600 border-r-2 border-pink-600' : ''
                    }`}
                  >
                    <SafeIcon icon={item.icon} className="mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Routes>
                <Route path="/" element={<DashboardOverview />} />
                <Route path="/products" element={<ProductsManagement />} />
                <Route path="/orders" element={<OrdersManagement />} />
                <Route path="/customers" element={<CustomersManagement />} />
                <Route path="/analytics" element={<Analytics />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const DashboardOverview = () => {
  const stats = [
    { name: 'Total Revenue', value: '$45,231', icon: FiDollarSign, change: '+20.1%', color: 'green' },
    { name: 'Orders', value: '1,234', icon: FiShoppingBag, change: '+15.3%', color: 'blue' },
    { name: 'Customers', value: '892', icon: FiUsers, change: '+8.2%', color: 'purple' },
    { name: 'Products', value: '156', icon: FiPackage, change: '+5.1%', color: 'orange' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome to your admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="bg-white rounded-lg shadow p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm ${
                  stat.color === 'green' ? 'text-green-600' : 
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`}>
                  {stat.change} from last month
                </p>
              </div>
              <div className={`p-3 rounded-full ${
                stat.color === 'green' ? 'bg-green-100' : 
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <SafeIcon icon={stat.icon} className={`text-xl ${
                  stat.color === 'green' ? 'text-green-600' : 
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <SafeIcon icon={FiTrendingUp} className="text-4xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">No recent activity to display</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductsManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-900">Products Management</h2>
          <button className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
            Add Product
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiPackage} className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Product management interface coming soon</p>
        </div>
      </div>
    </div>
  );
};

const OrdersManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Orders Management</h2>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiShoppingBag} className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Orders management interface coming soon</p>
        </div>
      </div>
    </div>
  );
};

const CustomersManagement = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Customers Management</h2>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiUsers} className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Customer management interface coming soon</p>
        </div>
      </div>
    </div>
  );
};

const Analytics = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Analytics</h2>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiBarChart3} className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Analytics dashboard coming soon</p>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b">
        <h2 className="text-lg font-semibold text-gray-900">Settings</h2>
      </div>
      <div className="p-6">
        <div className="text-center py-8">
          <SafeIcon icon={FiSettings} className="text-4xl text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600">Settings interface coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;