import React, { useState } from 'react';
import Icon from './Icon';

interface StarRatingProps {
  rating?: number;
  totalStars?: number;
  readOnly?: boolean;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  totalStars = 5,
  readOnly = false,
  onRate = (_) => {},
}) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (rate: number) => {
    if (!readOnly) {
      onRate(rate);
    }
  };

  const handleMouseEnter = (rate: number) => {
    if (!readOnly) {
      setHoverRating(rate);
    }
  };

  const handleMouseLeave = () => {
    if (!readOnly) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        let iconName = 'star';
        let colorClass = 'text-gray-300';

        const displayRating = hoverRating > 0 ? hoverRating : rating;

        if (displayRating >= starValue) {
          iconName = 'star';
          colorClass = 'text-yellow-400';
        } else if (displayRating >= starValue - 0.5) {
          iconName = 'star-half-stroke';
          colorClass = 'text-yellow-400';
        }

        return (
          <span
            key={starValue}
            className={!readOnly ? 'cursor-pointer' : ''}
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            aria-label={`Rate ${starValue} star${starValue > 1 ? 's' : ''}`}
          >
            <Icon name={iconName} className={`w-5 h-5 ${colorClass}`} />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;