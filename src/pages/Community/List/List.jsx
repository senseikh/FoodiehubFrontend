import React, { useEffect, useState, createRef } from 'react';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const List = ({ places, childClicked, isLoading, setType, type, rating, setRating }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRefs[i] || createRef());
    setElRefs(refs);
  }, [places]);

  const handleTypeChange = (event) => setType(event.target.value);

  const handleRatingChange = (event) => setRating(event.target.value);

  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        Explore Restaurants, Hotels & Attractions
      </h2>

      {/* Filters Section */}
      <div className="flex gap-4 mb-6">
        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600">Type</label>
          <select
            value={type}
            onChange={handleTypeChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="restaurants">Restaurants</option>
            <option value="hotels">Hotels</option>
            <option value="attractions">Attractions</option>
          </select>
        </div>

        <div className="w-1/2">
          <label className="block text-sm font-medium text-gray-600">Rating</label>
          <select
            value={rating}
            onChange={handleRatingChange}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          >
            <option value="all">All</option>
            <option value="above4">Above 4.0</option>
            <option value="above3">Above 3.0</option>
            <option value="above2">Above 2.0</option>
          </select>
        </div>
      </div>

      {/* Loading Indicator */}
      {isLoading ? (
        <div className="flex justify-center items-center py-6">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid gap-4">
          {places?.map((place, index) => (
            <div key={index} ref={elRefs[index]}>
              <PlaceDetails
                place={place}
                selected={Number(childClicked) === index}
                refProp={elRefs[index]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
