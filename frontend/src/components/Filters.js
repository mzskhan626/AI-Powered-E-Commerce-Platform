import React from 'react';
import { Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { useApp } from '../contexts/AppContext';
import { categories } from '../data/mockData';

const Filters = () => {
  const { state, dispatch } = useApp();

  const handleCategoryChange = (category) => {
    dispatch({ type: 'SET_CATEGORY', payload: category });
  };

  const handleSortChange = (sortValue) => {
    dispatch({ type: 'SET_SORT', payload: sortValue });
  };

  const clearFilters = () => {
    dispatch({ type: 'SET_CATEGORY', payload: 'all' });
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
    dispatch({ type: 'SET_SORT', payload: 'featured' });
  };

  const activeFiltersCount = (state.selectedCategory !== 'all' ? 1 : 0) + 
                            (state.searchQuery ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Top Filter Bar */}
      <Card className="border-0 shadow-md bg-gradient-to-r from-background to-accent/10">
        <CardContent className="p-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto">
              <Button
                variant={state.selectedCategory === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCategoryChange('all')}
                className={`whitespace-nowrap hover:scale-105 transition-transform ${
                  state.selectedCategory === 'all' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                    : ''
                }`}
              >
                All Products
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.slug}
                  variant={state.selectedCategory === category.slug ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.slug)}
                  className={`whitespace-nowrap hover:scale-105 transition-transform ${
                    state.selectedCategory === category.slug 
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600' 
                      : ''
                  }`}
                >
                  <span className="mr-1">{category.icon}</span>
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Sort & View Options */}
            <div className="flex items-center space-x-4">
              {/* Active Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="flex items-center space-x-1">
                    <Filter className="w-3 h-3" />
                    <span>{activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''}</span>
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    Clear all
                  </Button>
                </div>
              )}

              <Separator orientation="vertical" className="h-6" />

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4 text-muted-foreground" />
                <Select value={state.sortBy} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* View Toggle */}
              <div className="flex items-center space-x-1 bg-accent/20 rounded-md p-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 bg-background shadow-sm"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Active Search Query */}
      {state.searchQuery && (
        <Card className="border-l-4 border-l-primary">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Searching for:</p>
                <p className="font-semibold text-lg">"{state.searchQuery}"</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: '' })}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear search
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-green-500 hover:text-white transition-colors"
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'sale' })}
        >
          On Sale
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-yellow-500 hover:text-white transition-colors"
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'new' })}
        >
          New Arrivals
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-blue-500 hover:text-white transition-colors"
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'premium' })}
        >
          Premium
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-purple-500 hover:text-white transition-colors"
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'wireless' })}
        >
          Wireless
        </Badge>
        <Badge 
          variant="outline" 
          className="cursor-pointer hover:bg-red-500 hover:text-white transition-colors"
          onClick={() => dispatch({ type: 'SET_SEARCH_QUERY', payload: 'gaming' })}
        >
          Gaming
        </Badge>
      </div>
    </div>
  );
};

export default Filters;