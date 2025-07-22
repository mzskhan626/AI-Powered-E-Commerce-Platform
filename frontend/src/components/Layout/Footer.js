import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-background border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              TechStore
            </h3>
            <p className="text-muted-foreground">
              Your one-stop destination for the latest technology and electronics. 
              Discover cutting-edge products with AI-powered recommendations.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <Twitter className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform">
                <Youtube className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info', 'Returns', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2">
              {['Smartphones', 'Laptops', 'Headphones', 'Smartwatches', 'Tablets', 'Gaming'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">123 Tech Street, San Francisco, CA 94105</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <span className="text-muted-foreground">support@techstore.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 TechStore. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Powered by AI</span>
            <div className="flex items-center space-x-4">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=20&fit=crop" 
                alt="Visa" 
                className="h-6 opacity-60"
              />
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=20&fit=crop" 
                alt="Mastercard" 
                className="h-6 opacity-60"
              />
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=40&h=20&fit=crop" 
                alt="PayPal" 
                className="h-6 opacity-60"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;