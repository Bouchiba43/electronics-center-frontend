import React from 'react';
import { ShoppingCart, Star, Search, Truck, CreditCard, HeartIcon } from 'lucide-react';

const HomePage = () => {
  const featuredProducts = [
    { 
      id: 1, 
      name: 'Ultra HD Smart TV', 
      price: 799.99, 
      image: '/api/placeholder/400/300', 
      rating: 4.5 
    },
    { 
      id: 2, 
      name: 'Noise-Canceling Headphones', 
      price: 249.99, 
      image: '/api/placeholder/400/300', 
      rating: 4.7 
    },
    { 
      id: 3, 
      name: 'Smartphone Pro Max', 
      price: 999.99, 
      image: '/api/placeholder/400/300', 
      rating: 4.8 
    }
  ];

  const categories = [
    { name: 'Computers', icon: 'laptop' },
    { name: 'Smartphones', icon: 'smartphone' },
    { name: 'Accessories', icon: 'headphones' },
    { name: 'Gaming', icon: 'gamepad' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 w-full">
    
      {/* Hero Section */}
      <header className="pt-20 pb-16 bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Latest Tech, Best Prices
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Discover cutting-edge electronics and unbeatable deals
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
            Shop Now
          </button>
        </div>
      </header>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
          <div className="grid grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={index} 
                className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition transform hover:-translate-y-2"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  {/* Placeholder for category icon */}
                  <span className="text-blue-600 text-3xl">🖥️</span>
                </div>
                <h4 className="text-xl font-semibold">{category.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">Featured Products</h3>
          <div className="grid grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                    <HeartIcon size={20} className="text-gray-600" />
                  </button>
                </div>
                <div className="p-6">
                  <h4 className="text-xl font-bold mb-2">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                      <Star size={20} className="text-yellow-400 mr-2" />
                      <span>{product.rating}</span>
                    </div>
                  </div>
                  <button className="mt-4 w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck size={36} className="text-blue-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Free Shipping</h4>
              <p className="text-gray-600">On orders over $100</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard size={36} className="text-green-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Secure Payment</h4>
              <p className="text-gray-600">Multiple payment methods</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Star size={36} className="text-purple-600" />
              </div>
              <h4 className="text-xl font-semibold mb-2">Quality Guarantee</h4>
              <p className="text-gray-600">30-day return policy</p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HomePage;