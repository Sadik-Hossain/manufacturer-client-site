import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const Ratingx = () => {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  return (
    <div className="App">
      <Rating
        onClick={handleRating}
        ratingValue={rating} /* Available Props */
        iconsCount={5}
        allowHover={false}
      />
    </div>
  );
};
export default Ratingx;
