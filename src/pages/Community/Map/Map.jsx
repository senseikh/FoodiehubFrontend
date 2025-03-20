import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { MapPin } from "lucide-react";
import Rating from "react-rating";

const Map = ({
  setBounds,
  setCoordinates,
  coordinates,
  places,
  setChildClicked,
}) => {
  const isMobile = window.innerWidth <= 600;
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <div className="h-full w-full border border-black">
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyDEG_df9uZqRg5dWFpclvvZvLCrTo2qXVk" }}
        center={coordinates}
        defaultZoom={12}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places?.map((place, i) => {
          const lat = Number(place.latitude);
          const lng = Number(place.longitude);

          if (!isNaN(lat) && !isNaN(lng)) {
            return (
              <div
                key={i}
                lat={lat}
                lng={lng}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                  hoveredCard === i ? "z-10" : "z-1"
                }`}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {isMobile ? (
                  <MapPin className="w-8 h-8 text-blue-500" />
                ) : (
                  <div className="bg-white shadow-md rounded-lg p-3 w-40 text-center">
                    <h3 className="text-sm font-semibold mb-1">{place.name}</h3>
                    <img
                      src={
                        place.photo
                          ? place.photo.images.large.url
                          : "https://cdn.profoto.com/cdn/05238cd/globalassets/tips-and-tricks/profoto-c1-plus-food-photography-anders-hannola.jpg?width=1280&quality=75&format=jpg&mode=crop&height=1280"
                      }
                      alt={place.name}
                      className="w-full h-24 object-cover rounded-md mb-2"
                    />
                    <Rating
                      readonly
                      initialRating={Number(place.rating)}
                      emptySymbol="far fa-star text-gray-400"
                      fullSymbol="fas fa-star text-yellow-400"
                      className="text-sm"
                    />
                  </div>
                )}
              </div>
            );
          } else {
            console.warn(`Invalid coordinates for place: ${place.name}`);
            return null;
          }
        })}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
