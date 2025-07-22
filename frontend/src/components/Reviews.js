import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Progress } from './ui/progress';
import { useApp } from '../contexts/AppContext';
import { useToast } from '../hooks/use-toast';

const ReviewStats = ({ productId }) => {
  const { state } = useApp();
  const productReviews = state.reviews.filter(review => review.productId === productId);
  
  if (productReviews.length === 0) return null;

  const averageRating = productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length;
  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: productReviews.filter(review => review.rating === rating).length,
    percentage: (productReviews.filter(review => review.rating === rating).length / productReviews.length) * 100
  }));

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span>Customer Reviews</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary">{averageRating.toFixed(1)}</div>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(averageRating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              {productReviews.length} review{productReviews.length !== 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="flex-1 space-y-2">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm w-8">{rating}★</span>
                <Progress value={percentage} className="flex-1" />
                <span className="text-sm text-muted-foreground w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Summary */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg">
          <h4 className="font-medium mb-2 flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            <span>AI Review Summary</span>
          </h4>
          <p className="text-sm text-muted-foreground">
            Customers love the <strong>build quality</strong> and <strong>performance</strong>. 
            Most praise the <strong>camera features</strong> and <strong>battery life</strong>. 
            Some mention the <strong>price point</strong> as a consideration.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const ReviewCard = ({ review }) => {
  const [helpful, setHelpful] = useState(false);

  return (
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <img
            src={review.userAvatar}
            alt={review.userName}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <h4 className="font-medium">{review.userName}</h4>
                {review.verified && (
                  <Badge variant="secondary" className="text-xs flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{review.date}</span>
                </span>
              </div>
            </div>

            <div>
              <h5 className="font-medium mb-2">{review.title}</h5>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>

            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setHelpful(!helpful)}
                className={`hover:scale-105 transition-transform ${
                  helpful ? 'text-green-600 hover:text-green-700' : ''
                }`}
              >
                <ThumbsUp className={`w-4 h-4 mr-2 ${helpful ? 'fill-current' : ''}`} />
                Helpful ({review.helpful + (helpful ? 1 : 0)})
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const WriteReviewForm = ({ productId }) => {
  const { state, dispatch } = useApp();
  const { toast } = useToast();
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!state.isAuthenticated) {
      toast({
        title: "Login required",
        description: "Please log in to write a review.",
        variant: "destructive"
      });
      return;
    }

    const newReview = {
      id: Date.now(),
      productId,
      userId: state.currentUser.id,
      userName: state.currentUser.name,
      userAvatar: state.currentUser.avatar,
      rating,
      title,
      comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true
    };

    dispatch({ type: 'ADD_REVIEW', payload: newReview });
    
    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback. Your review has been posted.",
    });

    // Reset form
    setRating(5);
    setTitle('');
    setComment('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="w-5 h-5" />
          <span>Write a Review</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Rating</label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Button
                  key={star}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setRating(star)}
                  className="p-1 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </Button>
              ))}
              <span className="text-sm text-muted-foreground ml-2">
                {rating} star{rating !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Review Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Summarize your review..."
              className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Your Review</label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              rows={4}
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
          >
            Submit Review
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const Reviews = ({ productId }) => {
  const { state } = useApp();
  const [sortBy, setSortBy] = useState('newest');
  
  let productReviews = state.reviews.filter(review => review.productId === productId);
  
  // Sort reviews
  switch (sortBy) {
    case 'oldest':
      productReviews.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
    case 'highest':
      productReviews.sort((a, b) => b.rating - a.rating);
      break;
    case 'lowest':
      productReviews.sort((a, b) => a.rating - b.rating);
      break;
    case 'helpful':
      productReviews.sort((a, b) => b.helpful - a.helpful);
      break;
    default: // newest
      productReviews.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  return (
    <div className="space-y-6">
      <ReviewStats productId={productId} />
      
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">
          All Reviews ({productReviews.length})
        </h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {productReviews.length > 0 ? (
            productReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <Star className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">No reviews yet</h3>
                <p className="text-muted-foreground">
                  Be the first to share your experience with this product!
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div>
          <WriteReviewForm productId={productId} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;