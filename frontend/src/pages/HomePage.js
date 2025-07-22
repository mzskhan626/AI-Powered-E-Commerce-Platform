import React from 'react';
import { Sparkles, Search, TrendingUp, Gift } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import ProductGrid from '../components/ProductGrid';
import Filters from '../components/Filters';
import Recommendations from '../components/Recommendations';
import { useApp } from '../contexts/AppContext';

const HeroSection = () => {
  const { state, dispatch } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0 px-4 py-2 text-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Shopping Experience
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Discover Technology That Transforms Your World
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of shopping with AI-powered recommendations, 
            intelligent search, and premium tech products curated just for you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 px-8 py-3 text-lg hover:scale-105 transition-transform"
              onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'new' })}
            >
              <Search className="w-5 h-5 mr-2" />
              Explore Products
            </Button>
            
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-3 text-lg hover:scale-105 transition-transform"
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'smartphones' })}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Trending Now
            </Button>
          </div>
        </div>
        
        {/* Floating Cards */}
        <div className="absolute top-20 left-10 hidden lg:block animate-float">
          <Card className="w-48 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <Gift className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Free Shipping</div>
                  <div className="text-xs text-muted-foreground">On orders over $50</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="absolute top-32 right-10 hidden lg:block animate-float-delayed">
          <Card className="w-48 bg-white/80 backdrop-blur-sm shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Recommendations</div>
                  <div className="text-xs text-muted-foreground">Personalized for you</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: Search,
      title: "AI-Powered Search",
      description: "Find exactly what you need with intelligent search that understands context and intent.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Sparkles,
      title: "Smart Recommendations",
      description: "Discover products you'll love with our advanced recommendation engine.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Real-time Analytics",
      description: "Track trends and get insights into the hottest products and deals.",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-accent/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Why Choose TechStore?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the future of online shopping with cutting-edge AI technology 
            and premium product curation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-2xl transition-shadow duration-300 border-0 bg-background/50 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <FeaturesSection />
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Recommendations />
        </div>
      </section>
      
      <section className="py-16 bg-accent/20">
        <div className="container mx-auto px-4 space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">
              Featured Products
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our handpicked selection of the latest technology products
            </p>
          </div>
          
          <Filters />
          <ProductGrid />
        </div>
      </section>
    </div>
  );
};

export default HomePage;