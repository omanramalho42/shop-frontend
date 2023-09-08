import { spawn } from 'child_process';
import React from 'react'

import { Star } from './styled';

interface RatingProps {
  rating: number;
  numReviews?: number;
  caption?: string;
}

const Rating = ({ rating, numReviews, caption }: RatingProps) => {
  return (
    <div>
      <Star>
        <i 
          className={
            rating >= 1 
            ? 'fas fa-star' 
            : rating >= 0.5 
            ? 'fas fa-star-half-alt' 
            : 'far fa-star'
          }
        />
      </Star>
      <Star>
        <i 
          className={
            rating >= 2 
            ? 'fas fa-star' 
            : rating >= 1.5 
            ? 'fas fa-star-half-alt' 
            : 'far fa-star'
          }
        />
      </Star>
      <Star>
        <i 
          className={
            rating >= 3 
            ? 'fas fa-star' 
            : rating >= 2.5 
            ? 'fas fa-star-half-alt' 
            : 'far fa-star'
          }
        />
      </Star>
      <Star>
        <i 
          className={
            rating >= 4 
            ? 'fas fa-star' 
            : rating >= 3.5 
            ? 'fas fa-star-half-alt' 
            : 'far fa-star'
          }
        />
      </Star>
      <Star>
        <i 
          className={
            rating >= 5 
            ? 'fas fa-star' 
            : rating >= 4.5 
            ? 'fas fa-star-half-alt' 
            : 'far fa-star'
          }
        />
      </Star>
      {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' reviews'}</span>
      )}
    </div>
  )
}

export default Rating