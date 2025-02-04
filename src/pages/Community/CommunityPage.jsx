import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MapPin, Hotel, Utensils, Plus, Edit, Trash2 } from "lucide-react";
import Api from "../../api";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = { lat: 40.7128, lng: -74.006 }; // Default: NYC

const CommunityPage = () => {
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [posts, setPosts] = useState([]);
  const [resources, setResources] = useState([]);

  // Form states
  const [hotelForm, setHotelForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [restaurantForm, setRestaurantForm] = useState({
    name: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [postForm, setPostForm] = useState({
    title: "",
    content: "",
  });
  const [resourceForm, setResourceForm] = useState({
    title: "",
    description: "",
    link: "",
    category: "",
  });

  // Modal states
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isResourceModalOpen, setIsResourceModalOpen] = useState(false);

  // Edit states
  const [editingHotel, setEditingHotel] = useState(null);
  const [editingRestaurant, setEditingRestaurant] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [editingResource, setEditingResource] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDEG_df9uZqRg5dWFpclvvZvLCrTo2qXVk"
    // process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          fetchNearbyPlaces(latitude, longitude);
        },
        (error) => console.error("Error getting location:", error)
      );
    }
    fetchCommunityPosts();
    fetchResources();
  }, []);

  const fetchNearbyPlaces = async (lat, lng) => {
    try {
      const [hotelsRes, restaurantsRes] = await Promise.all([
        Api.get(`/api/hotels/nearby/?lat=${lat}&lng=${lng}`),
        Api.get(`/api/restaurants/nearby/?lat=${lat}&lng=${lng}`),
      ]);
      setHotels(hotelsRes.data);
      setRestaurants(restaurantsRes.data);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const fetchCommunityPosts = async () => {
    try {
      const response = await Api.get("/api/community-posts/");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const fetchResources = async () => {
    try {
      const response = await Api.get("/api/resources/");
      setResources(response.data);
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  // Create Operations
  const handleCreateHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/api/hotels/", hotelForm);
      setHotels([...hotels, response.data]);
      setHotelForm({ name: "", address: "", latitude: "", longitude: "" });
      setIsHotelModalOpen(false);
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };

  const handleCreateRestaurant = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/api/restaurants/", restaurantForm);
      setRestaurants([...restaurants, response.data]);
      setRestaurantForm({ name: "", address: "", latitude: "", longitude: "" });
      setIsRestaurantModalOpen(false);
    } catch (error) {
      console.error("Error creating restaurant:", error);
    }
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/api/community-posts/", postForm);
      setPosts([...posts, response.data]);
      setPostForm({ title: "", content: "" });
      setIsPostModalOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleCreateResource = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.post("/api/resources/", resourceForm);
      setResources([...resources, response.data]);
      setResourceForm({ title: "", description: "", link: "", category: "" });
      setIsResourceModalOpen(false);
    } catch (error) {
      console.error("Error creating resource:", error);
    }
  };

  // Update Operations
  const handleUpdateHotel = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(
        `/api/hotels/${editingHotel.id}/`,
        hotelForm
      );
      setHotels(
        hotels.map((hotel) =>
          hotel.id === editingHotel.id ? response.data : hotel
        )
      );
      setEditingHotel(null);
      setIsHotelModalOpen(false);
    } catch (error) {
      console.error("Error updating hotel:", error);
    }
  };

  const handleUpdateRestaurant = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(
        `/api/restaurants/${editingRestaurant.id}/`,
        restaurantForm
      );
      setRestaurants(
        restaurants.map((restaurant) =>
          restaurant.id === editingRestaurant.id ? response.data : restaurant
        )
      );
      setEditingRestaurant(null);
      setIsRestaurantModalOpen(false);
    } catch (error) {
      console.error("Error updating restaurant:", error);
    }
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(
        `/api/community-posts/${editingPost.id}/`,
        postForm
      );
      setPosts(
        posts.map((post) => (post.id === editingPost.id ? response.data : post))
      );
      setEditingPost(null);
      setIsPostModalOpen(false);
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleUpdateResource = async (e) => {
    e.preventDefault();
    try {
      const response = await Api.put(
        `/api/resources/${editingResource.id}/`,
        resourceForm
      );
      setResources(
        resources.map((resource) =>
          resource.id === editingResource.id ? response.data : resource
        )
      );
      setEditingResource(null);
      setIsResourceModalOpen(false);
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  // Delete Operations
  const handleDeleteHotel = async (hotelId) => {
    try {
      await Api.delete(`/api/hotels/${hotelId}/`);
      setHotels(hotels.filter((hotel) => hotel.id !== hotelId));
    } catch (error) {
      console.error("Error deleting hotel:", error);
    }
  };

  const handleDeleteRestaurant = async (restaurantId) => {
    try {
      await Api.delete(`/api/restaurants/${restaurantId}/`);
      setRestaurants(
        restaurants.filter((restaurant) => restaurant.id !== restaurantId)
      );
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
  };

  const handleDeletePost = async (postId) => {
    try {
      await Api.delete(`/api/community-posts/${postId}/`);
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await Api.delete(`/api/resources/${resourceId}/`);
      setResources(resources.filter((resource) => resource.id !== resourceId));
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  // Like Post
  const handleLikePost = async (postId) => {
    try {
      await Api.post(`/api/community-posts/${postId}/like/`);
      fetchCommunityPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>
          </div>
          {children}
        </div>
      </div>
    );
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <MapPin className="mr-2" /> Community Hub
      </h1>

      {/* Map Section */}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={userLocation || defaultCenter}
      >
        {userLocation && <Marker position={userLocation} label="You" />}
        {hotels.map((hotel) => (
          <Marker
            key={hotel.id}
            position={{ lat: hotel.latitude, lng: hotel.longitude }}
          />
        ))}
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            position={{ lat: restaurant.latitude, lng: restaurant.longitude }}
          />
        ))}
      </GoogleMap>

      {/* Hotels Section */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold flex items-center">
            <Hotel className="mr-2" /> Nearby Hotels
          </h2>
          <button
            onClick={() => setIsHotelModalOpen(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center hover:bg-blue-600"
          >
            <Plus className="mr-2 h-5 w-5" /> Add Hotel
          </button>
        </div>
        <ul>
          {hotels.map((hotel) => (
            <li
              key={hotel.id}
              className="border-b py-2 flex justify-between items-center"
            >
              {hotel.name}
              <div>
                <button
                  onClick={() => {
                    setEditingHotel(hotel);
                    setHotelForm({
                      name: hotel.name,
                      address: hotel.address,
                      latitude: hotel.latitude,
                      longitude: hotel.longitude,
                    });
                    setIsHotelModalOpen(true);
                  }}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDeleteHotel(hotel.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Hotel Modal */}
      <Modal
        isOpen={isHotelModalOpen}
        onClose={() => {
          setIsHotelModalOpen(false);
          setEditingHotel(null);
        }}
        title={editingHotel ? "Edit Hotel" : "Add Hotel"}
      >
        <form onSubmit={editingHotel ? handleUpdateHotel : handleCreateHotel}>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Hotel Name"
              value={hotelForm.name}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="text"
              placeholder="Address"
              value={hotelForm.address}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, address: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Latitude"
              step="any"
              value={hotelForm.latitude}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, latitude: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
            <input
              type="number"
              placeholder="Longitude"
              step="any"
              value={hotelForm.longitude}
              onChange={(e) =>
                setHotelForm({ ...hotelForm, longitude: e.target.value })
              }
              className="w-full px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            >
              {editingHotel ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Similar sections for Restaurants, Community Posts, and Resources would follow the same pattern */}
    </div>
  );
};

export default CommunityPage;
