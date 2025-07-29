import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import * as FiIcons from 'react-icons/fi';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import SafeIcon from '../components/common/SafeIcon';
import { mockProducts } from '../data/mockData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const { FiStar, FiShoppingBag, FiHeart, FiShare2, FiChevronRight } = FiIcons;

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [relatedProducts, setRelatedProducts] = useState([]);

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    // Find product by ID
    const foundProduct = mockProducts.find(p => p.id.toString() === id);
    
    if (foundProduct) {
      setProduct(foundProduct);
      // Set default selections
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
      if (foundProduct.colors && foundProduct.colors.length > 0) {
        setSelectedColor(foundProduct.colors[0]);
      }
      
      // Find related products (same category, excluding current product)
      const related = mockProducts
        .filter(p => p.category === foundProduct.category && p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity, selectedSize, selectedColor);
    }
  };

  const handleWishlist = () => {
    if (product) {
      if (isInWishlist(product.id)) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sorry, the product you are looking for does not exist or has been removed.
        </p>
        <Link to="/products" className="inline-flex items-center px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
          Browse Products
        </Link>
      </div>
    );
  }

  const inWishlist = isInWishlist ? isInWishlist(product.id) : false;

  return (
    <>
      <Helmet>
        <title>{product.name} | Worldofbrandsey</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="pt-24 pb-12">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex">
              <ol className="flex items-center space-x-2">
                <li>
                  <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
                </li>
                <SafeIcon icon={FiChevronRight} className="text-gray-400 text-xs" />
                <li>
                  <Link to="/products" className="text-gray-500 hover:text-gray-700">Products</Link>
                </li>
                <SafeIcon icon={FiChevronRight} className="text-gray-400 text-xs" />
                <li>
                  <Link to={`/products/${product.category}`} className="text-gray-500 hover:text-gray-700 capitalize">
                    {product.category}
                  </Link>
                </li>
                <SafeIcon icon={FiChevronRight} className="text-gray-400 text-xs" />
                <li className="text-gray-700 font-medium truncate max-w-[150px] sm:max-w-xs">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Product Details */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Product Images */}
            <div className="lg:w-1/2">
              <Carousel
                showArrows={true}
                showIndicators={true}
                showThumbs={true}
                infiniteLoop={true}
                swipeable={true}
                emulateTouch={true}
                thumbWidth={80}
                className="product-carousel"
              >
                {product.images.map((image, index) => (
                  <div key={index} className="aspect-square bg-gray-100">
                    <img 
                      src={image} 
                      alt={`${product.name} - Image ${index + 1}`} 
                      className="object-cover h-full w-full"
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <SafeIcon 
                        key={i}
                        icon={FiStar} 
                        className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} text-lg`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews} reviews)</span>
                </div>

                <div className="mb-6">
                  {product.originalPrice ? (
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
                      <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-sm bg-pink-100 text-pink-800 px-2 py-1 rounded">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </span>
                    </div>
                  ) : (
                    <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  )}
                  <p className="text-sm text-gray-600 mt-1">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map(color => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1 border rounded-full text-sm ${
                            selectedColor === color
                              ? 'border-pink-600 bg-pink-50 text-pink-600'
                              : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && product.sizes.length > 0 && (
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-medium text-gray-900">Size</h3>
                      <button className="text-sm text-pink-600 hover:text-pink-800">Size Guide</button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map(size => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm ${
                            selectedSize === size
                              ? 'bg-pink-600 text-white'
                              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={decrementQuantity}
                      disabled={quantity <= 1}
                      className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <div className="w-14 h-10 border-t border-b border-gray-300 flex items-center justify-center">
                      {quantity}
                    </div>
                    <button
                      onClick={incrementQuantity}
                      className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 flex items-center justify-center py-3 px-8 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <SafeIcon icon={FiShoppingBag} className="mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleWishlist}
                    className={`flex items-center justify-center py-3 px-6 border rounded-lg transition-colors ${
                      inWishlist
                        ? 'bg-pink-100 border-pink-300 text-pink-600 hover:bg-pink-50'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <SafeIcon icon={FiHeart} className={`mr-2 ${inWishlist ? 'fill-current' : ''}`} />
                    {inWishlist ? 'Saved' : 'Wishlist'}
                  </button>
                  <button
                    className="flex items-center justify-center py-3 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <SafeIcon icon={FiShare2} />
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900">Material</h4>
                      <p className="text-gray-600 mt-1">{product.material}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Care</h4>
                      <p className="text-gray-600 mt-1">{product.care}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'description'
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('details')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'details'
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Details & Care
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-pink-600 text-pink-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews ({product.reviews})
              </button>
            </nav>
          </div>

          <div className="py-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl eget ultricies aliquam, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam auctor, nisl eget ultricies aliquam, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Nullam auctor, nisl eget ultricies aliquam, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl. Nullam auctor, nisl eget ultricies aliquam, nisl nisl aliquet nisl, eget aliquet nisl nisl eget nisl.
                </p>
              </div>
            )}

            {activeTab === 'details' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Product Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Features</h4>
                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                      <li>Premium quality materials</li>
                      <li>Ethically sourced and produced</li>
                      <li>Comfortable fit and feel</li>
                      <li>Durable construction</li>
                      <li>Stylish design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Materials & Care</h4>
                    <p className="text-gray-700 mb-2"><strong>Material:</strong> {product.material}</p>
                    <p className="text-gray-700 mb-4"><strong>Care Instructions:</strong> {product.care}</p>
                    
                    <h4 className="font-medium text-gray-900 mb-2">Shipping & Returns</h4>
                    <p className="text-gray-700 mb-2">Free shipping on orders over $75</p>
                    <p className="text-gray-700">30-day hassle-free returns</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                  <button className="py-2 px-4 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="border-b pb-6 mb-6">
                  <div className="flex items-center mb-4">
                    <div className="flex mr-2">
                      {[...Array(5)].map((_, i) => (
                        <SafeIcon 
                          key={i}
                          icon={FiStar} 
                          className="text-yellow-400 fill-current text-lg"
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Based on {product.reviews} reviews</span>
                  </div>
                  
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <div className="w-20 text-sm text-gray-600">{rating} stars</div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 ml-2">
                          <div 
                            className="bg-yellow-400 h-2.5 rounded-full" 
                            style={{ 
                              width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%` 
                            }}
                          ></div>
                        </div>
                        <div className="w-10 text-right text-sm text-gray-600 ml-2">
                          {rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 5 : rating === 2 ? 3 : 2}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sample Reviews */}
                <div className="space-y-6">
                  {[
                    {
                      name: 'Sarah Johnson',
                      date: '3 months ago',
                      rating: 5,
                      comment: 'Absolutely love this! The quality is amazing and it fits perfectly. Shipping was fast and the packaging was beautiful.',
                      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b5e5?w=60&h=60&fit=crop&crop=face'
                    },
                    {
                      name: 'Emily Chen',
                      date: '1 month ago',
                      rating: 4,
                      comment: 'Great product, very happy with my purchase. The only reason I\'m not giving 5 stars is because the color is slightly different from what I expected.',
                      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face'
                    }
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center mb-2">
                        <img 
                          src={review.image} 
                          alt={review.name} 
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <div className="flex items-center">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <SafeIcon 
                                  key={i}
                                  icon={FiStar} 
                                  className={`${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'} text-sm`}
                                />
                              ))}
                            </div>
                            <span className="ml-2 text-xs text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center mt-8">
                  <button className="py-2 px-6 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                    Load More Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">You May Also Like</h2>
              <Link to="/products" className="text-pink-600 hover:text-pink-800">
                View All
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-300">
                  <Link to={`/product/${product.id}`} className="block aspect-[3/4] overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </Link>
                  
                  <div className="p-4">
                    <Link to={`/product/${product.id}`} className="block">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{product.name}</h3>
                    </Link>
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
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProductDetail;