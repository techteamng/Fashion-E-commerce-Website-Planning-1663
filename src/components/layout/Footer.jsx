import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import SafeIcon from '../common/SafeIcon';

const { FiMail, FiPhone, FiMapPin, FiFacebook, FiTwitter, FiInstagram, FiYoutube } = FiIcons;
const { HiOutlineSparkles } = HiIcons;

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Dresses', path: '/products/dresses' },
        { name: 'Shoes', path: '/products/shoes' },
        { name: 'Bags', path: '/products/bags' },
        { name: 'Jewelry', path: '/products/jewelry' },
        { name: 'Accessories', path: '/products/accessories' }
      ]
    },
    {
      title: 'Customer Care',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Size Guide', path: '/size-guide' },
        { name: 'Shipping Info', path: '/shipping' },
        { name: 'Returns', path: '/returns' },
        { name: 'FAQ', path: '/faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Sustainability', path: '/sustainability' },
        { name: 'Affiliate Program', path: '/affiliate' }
      ]
    }
  ];

  const socialLinks = [
    { icon: FiFacebook, url: 'https://facebook.com/worldofbrandsey', name: 'Facebook' },
    { icon: FiInstagram, url: 'https://instagram.com/worldofbrandsey', name: 'Instagram' },
    { icon: FiTwitter, url: 'https://twitter.com/worldofbrandsey', name: 'Twitter' },
    { icon: FiYoutube, url: 'https://youtube.com/worldofbrandsey', name: 'YouTube' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold mb-4">Stay in Style</h3>
            <p className="text-gray-400 mb-6">
              Subscribe to our newsletter and be the first to know about new collections, exclusive offers, and style tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent text-white placeholder-gray-400"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <SafeIcon icon={HiOutlineSparkles} className="text-2xl text-pink-600" />
              <span className="text-xl font-bold">Worldofbrandsey</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Discover the latest in women's fashion with our curated collection of premium dresses, shoes, bags, and jewelry. Express your unique style with confidence.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMail} className="text-pink-600" />
                <span className="text-gray-400">hello@worldofbrandsey.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiPhone} className="text-pink-600" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiMapPin} className="text-pink-600" />
                <span className="text-gray-400">New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={section.title}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Payment Methods */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 mr-2">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-gray-800 rounded-lg hover:bg-pink-600 transition-colors"
                  aria-label={social.name}
                >
                  <SafeIcon icon={social.icon} className="text-lg" />
                </a>
              ))}
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400">We accept:</span>
              <div className="flex space-x-2">
                {['Visa', 'Mastercard', 'PayPal', 'Apple Pay'].map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1 bg-gray-800 rounded text-xs font-medium"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
              <p className="text-gray-400">
                © {currentYear} Worldofbrandsey. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;