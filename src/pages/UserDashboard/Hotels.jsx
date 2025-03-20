import React from "react";
import { Building2, MapPin, Star } from "lucide-react";

const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    location: "Nairobi, Kenya",
    rating: 4.5,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Coastal Breeze Resort",
    location: "Mombasa, Kenya",
    rating: 4.7,
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Mountaintop Retreat",
    location: "Naivasha, Kenya",
    rating: 4.3,
    image: "https://via.placeholder.com/300",
  },
];

const HotelList = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Our Top Hotels</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hotels.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden"
          >
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Building2 className="text-blue-500" /> {hotel.name}
              </h2>
              <p className="text-gray-600 flex items-center gap-2 mt-2">
                <MapPin className="text-green-500" /> {hotel.location}
              </p>
              <div className="flex items-center gap-1 mt-3 text-yellow-400">
                {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                  <Star key={i} />
                ))}
                <span className="text-gray-500 text-sm">({hotel.rating})</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
