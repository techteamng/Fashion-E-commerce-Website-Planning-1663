export const mockProducts = [
  // Dresses
  {
    id: 1,
    name: "Elegant Evening Dress",
    category: "dresses",
    price: 149.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1566479179817-0f2b82e9e8b3?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    description: "A stunning evening dress perfect for special occasions. Made with premium fabric and elegant design.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "Navy", "Burgundy"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ["evening", "formal", "elegant"],
    material: "95% Polyester, 5% Elastane",
    care: "Dry clean only"
  },
  {
    id: 2,
    name: "Casual Summer Dress",
    category: "dresses",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1566479179817-0f2b82e9e8b3?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1566479179817-0f2b82e9e8b3?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=600&fit=crop"
    ],
    description: "Light and breezy summer dress perfect for casual outings and warm weather.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["White", "Light Blue", "Pink"],
    rating: 4.6,
    reviews: 89,
    inStock: true,
    tags: ["casual", "summer", "comfortable"],
    material: "100% Cotton",
    care: "Machine wash cold"
  },
  
  // Shoes
  {
    id: 3,
    name: "Designer High Heels",
    category: "shoes",
    price: 199.99,
    originalPrice: 249.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"
    ],
    description: "Luxurious high heels crafted with premium leather for the ultimate in style and comfort.",
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["Black", "Nude", "Red"],
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ["heels", "formal", "luxury"],
    material: "Genuine Leather",
    care: "Wipe with damp cloth"
  },
  {
    id: 4,
    name: "Comfortable Sneakers",
    category: "shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=600&fit=crop"
    ],
    description: "Stylish and comfortable sneakers perfect for everyday wear and active lifestyle.",
    sizes: ["5", "6", "7", "8", "9", "10", "11"],
    colors: ["White", "Black", "Gray"],
    rating: 4.5,
    reviews: 203,
    inStock: true,
    tags: ["sneakers", "casual", "comfortable"],
    material: "Synthetic and Textile",
    care: "Machine wash cold"
  },

  // Bags
  {
    id: 5,
    name: "Luxury Handbag",
    category: "bags",
    price: 299.99,
    originalPrice: 399.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"
    ],
    description: "Elegant luxury handbag crafted from premium materials with sophisticated design.",
    sizes: ["One Size"],
    colors: ["Black", "Brown", "Tan"],
    rating: 4.9,
    reviews: 87,
    inStock: true,
    tags: ["handbag", "luxury", "leather"],
    material: "100% Genuine Leather",
    care: "Clean with leather conditioner"
  },
  {
    id: 6,
    name: "Casual Tote Bag",
    category: "bags",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&h=600&fit=crop"
    ],
    description: "Spacious and practical tote bag perfect for work, shopping, or daily use.",
    sizes: ["One Size"],
    colors: ["Beige", "Navy", "Gray"],
    rating: 4.4,
    reviews: 145,
    inStock: true,
    tags: ["tote", "casual", "practical"],
    material: "Canvas and Leather",
    care: "Spot clean only"
  },

  // Jewelry
  {
    id: 7,
    name: "Diamond Necklace",
    category: "jewelry",
    price: 899.99,
    originalPrice: 1199.99,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=600&fit=crop"
    ],
    description: "Exquisite diamond necklace featuring brilliant cut diamonds set in 18k gold.",
    sizes: ["One Size"],
    colors: ["Gold", "Silver"],
    rating: 5.0,
    reviews: 23,
    inStock: true,
    tags: ["necklace", "diamond", "luxury"],
    material: "18k Gold, Diamonds",
    care: "Professional cleaning recommended"
  },
  {
    id: 8,
    name: "Pearl Earrings",
    category: "jewelry",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=500&h=600&fit=crop"
    ],
    description: "Classic pearl earrings that add elegance to any outfit. Perfect for both casual and formal wear.",
    sizes: ["One Size"],
    colors: ["White", "Cream"],
    rating: 4.7,
    reviews: 76,
    inStock: true,
    tags: ["earrings", "pearl", "classic"],
    material: "Sterling Silver, Freshwater Pearls",
    care: "Wipe with soft cloth"
  }
];

export const mockCategories = [
  {
    id: 1,
    name: "Dresses",
    slug: "dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    description: "Elegant dresses for every occasion"
  },
  {
    id: 2,
    name: "Shoes",
    slug: "shoes",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=600&fit=crop",
    description: "Step out in style"
  },
  {
    id: 3,
    name: "Bags",
    slug: "bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=600&fit=crop",
    description: "Luxury handbags & accessories"
  },
  {
    id: 4,
    name: "Jewelry",
    slug: "jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&h=600&fit=crop",
    description: "Sparkle with confidence"
  }
];