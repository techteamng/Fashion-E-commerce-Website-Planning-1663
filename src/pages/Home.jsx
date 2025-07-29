import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import * as HiIcons from 'react-icons/hi';
import SafeIcon from '../components/common/SafeIcon';

const { FiArrowRight, FiStar, FiTruck, FiShield, FiRefreshCw } = FiIcons;
const { HiOutlineSparkles } = HiIcons;

const Home = () => {
  const featuredCategories = [
    {
      id: 1,
      name: 'Dresses',
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop',
      description: 'Elegant dresses for every occasion',
      path: '/products/dresses'
    },
    {
      id: 2,
      name: 'Shoes',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop',
      description: 'Step out in style',
      path: '/products/shoes'
    },
    {
      id: 3,
      name: 'Bags',
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop',
      description: 'Luxury handbags & accessories',
      path: '/products/bags'
    },
    {
      id: 4,
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop',
      description: 'Sparkle with confidence',
      path: '/products/jewelry'
    }
  ];

  const features = [
    {
      icon: FiTruck,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $75'
    },
    {
      icon: FiShield,
      title: 'Secure Payment',
      description: '100% secure payment processing'
    },
    {
      icon: FiRefreshCw,
      title: 'Easy Returns',
      description: '30-day hassle-free returns'
    },
    {
      icon: FiStar,
      title: 'Premium Quality',
      description: 'Curated high-quality fashion'
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing quality and fast shipping! The dress I ordered fits perfectly.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 2,
      name: 'Emily Chen',
      rating: 5,
      comment: 'Love the AI styling recommendations. Found my perfect outfit!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    },
    {
      id: 3,
      name: 'Jessica Williams',
      rating: 5,
      comment: 'Best online fashion store! Great customer service and beautiful pieces.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Worldofbrandsey - Premium Fashion for Women</title>
        <meta name="description" content="Discover the latest in women's fashion with our curated collection of dresses, shoes, bags, and jewelry. AI-powered styling and premium quality." />
      </Helmet>

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-pink-50 to-purple-50">
          <div className="absolute inset-0 bg-black/20" />
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=1080&fit=crop)'
            }}
          />
          
          <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Fashion
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                  Redefined
                </span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
                Discover your unique style with AI-powered recommendations and premium fashion pieces curated just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors font-semibold text-lg"
                >
                  Shop Now
                  <SafeIcon icon={FiArrowRight} className="ml-2" />
                </Link>
                <Link
                  to="/ai-stylist"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors font-semibold text-lg border border-white/30"
                >
                  <SafeIcon icon={HiOutlineSparkles} className="mr-2" />
                  AI Stylist
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </motion.div>
        </section>

        {/* Featured Categories */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Shop by Category
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Explore our carefully curated collections designed to make you look and feel amazing.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={category.path}>
                    <div className="relative overflow-hidden rounded-2xl aspect-[4/5] mb-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-4 left-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <SafeIcon icon={FiArrowRight} className="text-2xl" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2">{category.name}</h3>
                    <p className="text-gray-600">{category.description}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600">
                Experience the difference with our premium service and quality.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={feature.icon} className="text-2xl text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                What Our Customers Say
              </h2>
              <p className="text-xl text-gray-600">
                Join thousands of satisfied customers who love our fashion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  className="bg-gray-50 p-8 rounded-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <div className="flex text-yellow-400">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <SafeIcon key={i} icon={FiStar} className="text-sm fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.comment}"</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-pink-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Wardrobe?
              </h2>
              <p className="text-xl mb-8 text-pink-100">
                Join our fashion community and discover your perfect style with AI-powered recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/register"
                  className="inline-flex items-center px-8 py-4 bg-white text-pink-600 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
                >
                  Get Started
                  <SafeIcon icon={FiArrowRight} className="ml-2" />
                </Link>
                <Link
                  to="/products"
                  className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white rounded-full hover:bg-white/30 transition-colors font-semibold text-lg border border-white/30"
                >
                  Browse Collection
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;