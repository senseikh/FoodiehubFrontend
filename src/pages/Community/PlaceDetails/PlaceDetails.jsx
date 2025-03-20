import React from "react";
import { MapPin, Phone } from "lucide-react";

const PlaceDetails = ({ place, selected, refProp }) => {
  if (selected)
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
      <img
        src={
          place.photo
            ? place.photo.images.large.url
            : "https://cdn.profoto.com/cdn/05238cd/globalassets/tips-and-tricks/profoto-c1-plus-food-photography-anders-hannola.jpg?width=1280&quality=75&format=jpg&mode=crop&height=1280"
        }
        alt={place.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{place.name}</h2>

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Price</p>
          <p>{place.price_level}</p>
        </div>

        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <p>Ranking</p>
          <p>{place.ranking}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {place.cuisine?.map(({ name }) => (
            <span
              key={name}
              className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full"
            >
              {name}
            </span>
          ))}
        </div>

        {place?.address && (
          <div className="flex items-center text-sm text-gray-600 mb-2">
            <MapPin className="w-4 h-4 text-blue-500 mr-2" />
            <p>{place.address}</p>
          </div>
        )}

        {place?.phone && (
          <div className="flex items-center text-sm text-gray-600">
            <Phone className="w-4 h-4 text-green-500 mr-2" />
            <p>{place.phone}</p>
          </div>
        )}
      </div>

      <div className="flex justify-between px-4 pb-4">
        <button
          onClick={() => window.open(place.web_url, "_blank")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Trip Advisor
        </button>
        <button
          onClick={() => window.open(place.website, "_blank")}
          className="border border-blue-500 text-blue-500 px-4 py-2 rounded-lg hover:bg-blue-50 transition"
        >
          Website
        </button>
      </div>
    </div>
  );
};

export default PlaceDetails;
