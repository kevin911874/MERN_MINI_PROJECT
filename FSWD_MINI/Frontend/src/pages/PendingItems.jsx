import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingItems = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchPendingItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrow");
        const filteredItems = response.data.filter(
          (item) => item.status === "pending"
        );
        setPendingItems(filteredItems);
      } catch (error) {
        console.error("Error fetching pending items:", error);
      }
    };
    fetchPendingItems();
  }, []);

  const handleChange = (id, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const markAsSubmitted = async (id, returnDate, receivedBy) => {
    try {
      if (!returnDate) {
        alert("Please select a return date");
        return;
      }
      
      if (!receivedBy || receivedBy.trim() === "") {
        alert("Please enter who received the item");
        return;
      }
      
      await axios.put(`http://localhost:5000/api/borrow/submit/${id}`, {
        returnDate: new Date(returnDate).toISOString(),
        receivedBy,
      });
      setPendingItems(pendingItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error marking item as submitted:", error);
      alert("Error updating return date: " + error.message);
    }
  };

  const filteredItems = pendingItems.filter(
    (item) =>
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.issuedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Pending Items</h2>

      <input
        type="text"
        placeholder="Search by item, issued by, or issued to..."
        className="w-full p-2 mb-4 border rounded"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {filteredItems.length === 0 ? (
        <p className="text-gray-600 text-center">No matching pending items.</p>
      ) : (
        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div
              key={item._id}
              className="border p-4 rounded-lg shadow-md bg-gray-50"
            >
              <p>
                <strong>Item:</strong> {item.itemName}
              </p>
              <p>
                <strong>Issued By:</strong> {item.issuedBy}
              </p>
              <p>
                <strong>Issued To:</strong> {item.issuedTo}
              </p>
              <p>
                <strong>Issue Date:</strong>{" "}
                {new Date(item.issueDate).toLocaleDateString()}
              </p>
              {item.imageUrl && (
                <img
                  src={`http://localhost:5000${item.imageUrl}`}
                  alt="Borrowed Item"
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}

              <div className="flex flex-col mt-4">
                <label
                  htmlFor={`returnDate-${item._id}`}
                  className="text-gray-700 font-semibold mb-2"
                >
                  Return Date
                </label>
                <input
                  type="date"
                  id={`returnDate-${item._id}`}
                  name="returnDate"
                  value={formData[item._id]?.returnDate || ""}
                  required
                  className="w-full p-2 mt-2 border rounded-md"
                  onChange={(e) =>
                    handleChange(item._id, "returnDate", e.target.value)
                  }
                />
              </div>

              <div className="flex flex-col mt-4">
                <label
                  htmlFor={`receivedBy-${item._id}`}
                  className="text-gray-700 font-semibold mb-2"
                >
                  Received By
                </label>
                <input
                  type="text"
                  id={`receivedBy-${item._id}`}
                  name="receivedBy"
                  required
                  className="w-full p-2 mt-2 border rounded-md"
                  value={formData[item._id]?.receivedBy || ""}
                  onChange={(e) =>
                    handleChange(item._id, "receivedBy", e.target.value)
                  }
                />
              </div>

              <button
                onClick={() =>
                  markAsSubmitted(
                    item._id,
                    formData[item._id]?.returnDate,
                    formData[item._id]?.receivedBy
                  )
                }
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Mark as Submitted
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingItems;
