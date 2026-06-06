import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/Shared/LoadingSpinner";
import { MdDelete, MdMarkEmailRead, MdMarkEmailUnread } from "react-icons/md";
import { format } from "date-fns";
import toast from "react-hot-toast";


const ContactMessages = () => {
  const axiosSecure = useAxiosSecure();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const { data } = await axiosSecure.get("/contact-messages");
      setMessages(data);
    } catch (err) {
      toast.error("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await axiosSecure.patch(`/contact-messages/${id}`);
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, isRead: true } : msg))
      );
      toast.success("Marked as read");
    } catch {
      toast.error("Failed to update");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/contact-messages/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      toast.success("Message deleted");
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (loading) return <LoadingSpinner />;

  const unreadCount = messages.filter((m) => !m.isRead).length;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Contact Messages</h2>
          <p className="text-sm text-gray-500 mt-1">
            Total: {messages.length} &nbsp;|&nbsp;
            <span className="text-rose-500 font-medium">Unread: {unreadCount}</span>
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <MdMarkEmailRead className="text-6xl mx-auto mb-4 text-gray-300" />
          <p className="text-lg">No messages yet</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`rounded-xl border p-5 shadow-sm transition-all ${
                msg.isRead
                  ? "bg-white border-gray-200"
                  : "bg-rose-50 border-rose-200"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    {!msg.isRead && (
                      <span className="bg-rose-500 text-white text-xs px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                    <h3 className="font-semibold text-gray-800 text-base">
                      {msg.name}
                    </h3>
                    <span className="text-sm text-gray-400">{msg.email}</span>
                  </div>
                  <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                    {msg.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-3">
                    {format(new Date(msg.timestamp), "dd MMM yyyy — hh:mm a")}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2 shrink-0">
                  {!msg.isRead && (
                    <button
                      onClick={() => handleMarkRead(msg._id)}
                      title="Mark as read"
                      className="flex items-center gap-1 text-xs bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-lg transition"
                    >
                      <MdMarkEmailRead className="text-base" />
                      Read
                    </button>
                  )}
                  {msg.isRead && (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <MdMarkEmailUnread className="text-base" />
                      Read
                    </span>
                  )}
                  <button
                    onClick={() => handleDelete(msg._id)}
                    title="Delete message"
                    className="flex items-center gap-1 text-xs bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-lg transition"
                  >
                    <MdDelete className="text-base" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ContactMessages;
