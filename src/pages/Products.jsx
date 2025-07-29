import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../components/common/SafeIcon';
import { mockProducts, mockCategories } from '../data/mockData';

const { FiFilter, FiChevronDown, FiGrid, FiList, FiX, FiHeart, FiShoppingBag, FiStar } = FiIcons;

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: category || 'all',
    priceRange: [0, 1000],
    colors: [],
    sizes: [],
    sort: 'newest'
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  useEffect(() => {
    // Update category filter when URL param changes
    if (category) {
      setFilters(prev => ({ ...prev, category }));
    } else {
      setFilters(prev => ({ ...prev, category: 'all' }));
    }
  }, [category]);

  useEffect(() => {
    // Filter products based on all criteria
    let filteredProducts = [...mockProducts];
    
    // Filter by category
    if (filters.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === filters.category
      );
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProducts = filteredProducts.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }
    
    // Filter by price range
    filteredProducts = filteredProducts.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );
    
    // Filter by colors
    if (filters.colors.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.colors && filters.colors.some(color => 
          product.colors.includes(color)
        )
      );
    }
    
    // Filter by sizes
    if (filters.sizes.length > 0) {
      filteredProducts = filteredProducts.filter(product => 
        product.sizes && filters.sizes.some(size => 
          product.sizes.includes(size)
        )
      );
    }
    
    // Apply sorting
    switch (filters.sort) {
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        filteredProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
      default:
        // Assume newer products have higher IDs for mock data
        filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
    
    setProducts(filteredProducts);
  }, [filters, searchQuery, category]);

  const availableColors = Array.from(
    new Set(mockProducts.flatMap(product => product.colors || []))
  );
  
  const availableSizes = Array.from(
    new Set(mockProducts.flatMap(product => product.sizes || []))
  );

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      if (filterType === 'colors' || filterType === 'sizes') {
        // Toggle array values
        const currentValues = prev[filterType];
        const newValues = currentValues.includes(value)
          ? currentValues.filter(item => item !== value)
          : [...currentValues, value];
        return { ...prev, [filterType]: newValues };
      }
      // For other filter types
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      category: category || 'all',
      priceRange: [0, 1000],
      colors: [],
      sizes: [],
      sort: 'newest'
    });
  };

  // Get current category data for header
  const currentCategory = category 
    ? mockCategories.find(cat => cat.slug === category) 
    : null;

  return (
    <>
      <Helmet>
        <title>
          {searchQuery 
            ? `Search Results for "${searchQuery}" | Worldofbrandsey`
            : currentCategory 
              ? `${currentCategory.name} | Worldofbrandsey` 
              : 'All Products | Worldofbrandsey'}
        </title>
      </Helmet>

      <div className="pt-24 pb-12">
        {/* Header */}
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {searchQuery 
                  ? `Search Results for "${searchQuery}"`
                  : currentCategory 
                    ? currentCategory.name
                    : 'All Products'}
              </h1>
              <p className="text-lg text-gray-600">
                {searchQuery
                  ? `${products.length} products found`
                  : currentCategory 
                    ? currentCategory.description
                    : 'Discover our entire collection of premium fashion items'}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row">
            {/* Filters - Desktop */}
            <div className="hidden lg:block w-64 mr-8">
              <div className="sticky top-24">
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Categories</h2>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => handleFilterChange('category', 'all')}
                        className={`w-full text-left py-1 px-2 rounded ${
                          filters.category === 'all' ? 'bg-pink-100 text-pink-600' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All Products
                      </button>
                    </li>
                    {mockCategories.map(cat => (
                      <li key={cat.id}>
                        <button
                          onClick={() => handleFilterChange('category', cat.slug)}
                          className={`w-full text-left py-1 px-2 rounded ${
                            filters.category === cat.slug ? 'bg-pink-100 text-pink-600' : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {cat.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Price Range</h2>
                  <div className="flex items-center">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      value={filters.priceRange[1]}
                      onChange={e => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Colors</h2>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(color => (
                      <button
                        key={color}
                        onClick={() => handleFilterChange('colors', color)}
                        className={`px-3 py-1 rounded-full text-sm border ${
                          filters.colors.includes(color)
                            ? 'bg-pink-100 border-pink-300 text-pink-600'
                            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-3">Sizes</h2>
                  <div className="flex flex-wrap gap-2">
                    {availableSizes.map(size => (
                      <button
                        key={size}
                        onClick={() => handleFilterChange('sizes', size)}
                        className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                          filters.sizes.includes(size)
                            ? 'bg-pink-600 text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={clearFilters}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </div>

            {/* Products */}
            <div className="flex-1">
              {/* Mobile Filter Button & Sort */}
              <div className="lg:hidden mb-6">
                <button
                  onClick={() => setIsFilterOpen(true)}
                  className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded flex items-center justify-center"
                >
                  <SafeIcon icon={FiFilter} className="mr-2" />
                  Filter Products
                </button>
              </div>

              {/* Sort & View Options */}
              <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
                <div className="flex items-center">
                  <label htmlFor="sort" className="mr-2 text-gray-700">Sort by:</label>
                  <select
                    id="sort"
                    value={filters.sort}
                    onChange={e => handleFilterChange('sort', e.target.value)}
                    className="border border-gray-300 rounded py-1 px-2 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  >
                    <option value="newest">Newest</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name-asc">Name: A to Z</option>
                    <option value="name-desc">Name: Z to A</option>
                  </select>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">{products.length} Products</span>
                  <div className="border-l border-gray-300 h-6 mx-2" />
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-200' : ''}`}
                    aria-label="Grid view"
                  >
                    <SafeIcon icon={FiGrid} className="text-gray-700" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1 rounded ${viewMode === 'list' ? 'bg-gray-200' : ''}`}
                    aria-label="List view"
                  >
                    <SafeIcon icon={FiList} className="text-gray-700" />
                  </button>
                </div>
              </div>

              {/* Products Grid/List */}
              {products.length > 0 ? (
                <div className={`${
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }`}>
                  {products.map(product => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-2xl font-semibold text-gray-700 mb-4">No Products Found</h3>
                  <p className="text-gray-600 mb-6">
                    We couldn't find any products matching your current filters.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="py-2 px-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Filter Drawer */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsFilterOpen(false)} />
            
            <div className="absolute inset-y-0 right-0 max-w-full flex">
              <motion.div
                className="relative w-screen max-w-xs bg-white"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="h-full flex flex-col overflow-y-scroll">
                  <div className="p-4 flex justify-between items-center border-b">
                    <h2 className="text-lg font-semibold">Filters</h2>
                    <button
                      onClick={() => setIsFilterOpen(false)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiX} className="text-gray-700" />
                    </button>
                  </div>
                  
                  <div className="p-4 space-y-6">
                    <div>
                      <h3 className="text-base font-semibold mb-3">Categories</h3>
                      <ul className="space-y-2">
                        <li>
                          <button
                            onClick={() => {
                              handleFilterChange('category', 'all');
                              setIsFilterOpen(false);
                            }}
                            className={`w-full text-left py-1 px-2 rounded ${
                              filters.category === 'all' ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                            }`}
                          >
                            All Products
                          </button>
                        </li>
                        {mockCategories.map(cat => (
                          <li key={cat.id}>
                            <button
                              onClick={() => {
                                handleFilterChange('category', cat.slug);
                                setIsFilterOpen(false);
                              }}
                              className={`w-full text-left py-1 px-2 rounded ${
                                filters.category === cat.slug ? 'bg-pink-100 text-pink-600' : 'text-gray-700'
                              }`}
                            >
                              {cat.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-3">Price Range</h3>
                      <div className="flex items-center">
                        <input
                          type="range"
                          min="0"
                          max="1000"
                          value={filters.priceRange[1]}
                          onChange={e => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${filters.priceRange[0]}</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-3">Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {availableColors.map(color => (
                          <button
                            key={color}
                            onClick={() => handleFilterChange('colors', color)}
                            className={`px-3 py-1 rounded-full text-sm border ${
                              filters.colors.includes(color)
                                ? 'bg-pink-100 border-pink-300 text-pink-600'
                                : 'bg-white border-gray-300 text-gray-700'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold mb-3">Sizes</h3>
                      <div className="flex flex-wrap gap-2">
                        {availableSizes.map(size => (
                          <button
                            key={size}
                            onClick={() => handleFilterChange('sizes', size)}
                            className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                              filters.sizes.includes(size)
                                ? 'bg-pink-600 text-white'
                                : 'bg-white border border-gray-300 text-gray-700'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 mt-auto border-t">
                    <div className="flex space-x-4">
                      <button
                        onClick={clearFilters}
                        className="flex-1 py-2 px-4 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                      >
                        Clear All
                      </button>
                      <button
                        onClick={() => setIsFilterOpen(false)}
                        className="flex-1 py-2 px-4 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const ProductCard = ({ product, viewMode }) => {
  if (viewMode === 'grid') {
    return (
      <motion.div
        className="group bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative">
          <a href={`#/product/${product.id}`} className="block aspect-[3/4] overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </a>
          <div className="absolute top-0 left-0 m-2">
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
          <div className="absolute top-2 right-2 flex flex-col space-y-2">
            <button 
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Add to wishlist"
            >
              <SafeIcon icon={FiHeart} className="text-gray-700" />
            </button>
            <button 
              className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
              aria-label="Add to cart"
            >
              <SafeIcon icon={FiShoppingBag} className="text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <a href={`#/product/${product.id}`} className="block">
            <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
          </a>
          <div className="flex justify-between items-center">
            <div>
              {product.originalPrice ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-pink-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-900">${product.price}</span>
              )}
            </div>
            <div className="flex items-center">
              <SafeIcon icon={FiStar} className="text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
            </div>
          </div>
        </div>
      </motion.div>
    );
  } else {
    return (
      <motion.div
        className="flex flex-col sm:flex-row bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="relative sm:w-48 md:w-64">
          <a href={`#/product/${product.id}`} className="block aspect-square sm:h-full overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </a>
          <div className="absolute top-0 left-0 m-2">
            {product.originalPrice && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                Sale
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-1 p-4 flex flex-col">
          <div className="mb-2">
            <a href={`#/product/${product.id}`} className="block">
              <h3 className="text-xl font-medium text-gray-900 mb-1">{product.name}</h3>
            </a>
            <div className="flex items-center mb-2">
              <SafeIcon icon={FiStar} className="text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
            </div>
            <p className="text-gray-600 line-clamp-2 mb-3">{product.description}</p>
          </div>
          
          <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              {product.originalPrice ? (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-semibold text-pink-600">${product.price}</span>
                  <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                </div>
              ) : (
                <span className="text-lg font-semibold text-gray-900">${product.price}</span>
              )}
            </div>
            
            <div className="flex space-x-2 mt-3 sm:mt-0">
              <button 
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Add to wishlist"
              >
                <SafeIcon icon={FiHeart} className="text-gray-700" />
              </button>
              <button 
                className="flex-1 py-2 px-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
};

export default Products;