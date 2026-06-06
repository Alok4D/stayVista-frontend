import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { IoCloseCircle } from "react-icons/io5";
import EmptyState from "../Shared/EmptyState";

const Wishlist = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch wishlist data
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/wishlist?email=${user?.email}`
        );
        if (data.success) {
          setWishlist(data.data);
        } else {
          toast.error("Failed to load wishlist!");
        }
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.email) fetchWishlist();
  }, [user, axiosSecure]);

  // ❌ Remove item from wishlist
  const handleRemove = async (roomId) => {
    try {
      const { data } = await axiosSecure.delete(
        `/wishlist?roomId=${roomId}&userEmail=${user.email}`
      );
      if (data.deletedCount > 0) {
        toast.success("Removed from wishlist!");
        setWishlist(wishlist.filter((item) => item.roomId !== roomId));
      }
    } catch (err) {
      toast.error("Failed to remove!");
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-gray-500">Loading wishlist...</p>
    );
  }

  if (wishlist.length === 0) {
    return (
      <EmptyState
        message="No items in wishlist yet 💔"
        address="/"
        label="Browse Rooms"
      />
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4 md:px-4 lg:px-0">
      <h2 className="text-4xl font-bold mb-8 text-left text-black">Wishlist</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlist.map((item) => (
          <div
            key={item._id}
            className="relative group rounded-xl overflow-hidden shadow-lg"
          >
            {/* 🖼️ Image */}
            <img
              src={item.roomImage}
              alt={item.roomLocation}
              className="h-64 w-full object-cover transform group-hover:scale-105 transition duration-300"
            />

            {/* ❌ Close icon on hover */}
            <button
              onClick={() => handleRemove(item.roomId)}
              className="absolute top-3 left-3 text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:scale-110"
            >
              <IoCloseCircle className="drop-shadow-lg" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
