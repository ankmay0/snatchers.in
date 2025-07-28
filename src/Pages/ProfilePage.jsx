import React, { useEffect, useState } from "react";
import { LogOut, Mail, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Avatar from "react-avatar";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/user/me`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!res.ok) throw new Error("Unauthorized");
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch user error:", error);
        navigate("/login");
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user || !user.email) return;
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(
          `${process.env.REACT_APP_API_BASE_URL}/api/orders?email=${encodeURIComponent(user.email)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (err) {
        setOrders([]);
      }
    };
    fetchOrders();
  }, [user]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <section className="bg-white min-h-screen py-14 px-4 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <h1
            className="text-4xl font-bold tracking-tight"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            My Profile
          </h1>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 border border-black rounded hover:bg-black hover:text-white transition"
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-[#f9f9f9] border border-black/10 rounded-xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-8 shadow-md">
          <Avatar
            name={user.name || "Anonymous User"}
            src={user.photoURL || undefined}
            size="128"
            round={true}
            className="border-2 border-black"
          />
          <div className="flex-1 space-y-3 text-gray-800">
            <h2 className="text-2xl font-semibold flex items-center gap-2">
              <User size={20} />
              {user.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
              <p className="flex items-center gap-2">
                <Mail size={16} /> {user.email}
              </p>
            </div>
          </div>
        </div>

        {/* Order Section */}
        <div className="mt-16">
          <h3
            className="text-2xl font-semibold mb-6"
            style={{ fontFamily: "'Italiana', serif" }}
          >
            My Orders
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="border border-black/10 rounded-lg p-4 flex gap-4 items-center bg-[#fafafa] hover:shadow-lg transition cursor-pointer"
                  onClick={() =>
                    order.productId ? navigate(`/product/${order.productId}`) : undefined
                  }
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === "Enter" && order.productId) {
                      navigate(`/products/${order.productId}`);
                    }
                  }}
                  aria-label={order.productTitle}
                >
                  <img
                    src={order.productImage || "/product-placeholder.jpg"}
                    alt={order.productTitle}
                    className="w-20 h-20 object-cover rounded border border-black"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-lg">{order.productTitle}</h4>
                    <p className="text-sm text-gray-600">₹{order.price}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Ordered on {order.orderDate}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`text-xs px-3 py-1 rounded-full border ${
                        order.status === "Delivered"
                          ? "bg-green-100 border-green-400 text-green-800"
                          : order.status === "Shipped"
                          ? "bg-yellow-100 border-yellow-400 text-yellow-800"
                          : "bg-red-100 border-red-400 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No orders found.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
