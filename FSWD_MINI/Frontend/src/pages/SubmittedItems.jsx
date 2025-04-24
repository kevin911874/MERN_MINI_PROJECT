import React, { useEffect, useState } from "react";
import axios from "axios";

const SubmittedItems = () => {
  const [submittedItems, setSubmittedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchSubmittedItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrow");
        const filteredItems = response.data.filter((item) => item.status === "submitted");
        setSubmittedItems(filteredItems);
      } catch (error) {
        console.error("Error fetching submitted items:", error);
      }
    };
    fetchSubmittedItems();
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [selectedItem]);

  // Format date safely for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid date";
    }
  };

  const filteredItems = submittedItems.filter((item) =>
    item.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.issuedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.issuedTo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewDetails = (item) => {
    console.log("Viewing item:", item);
    setSelectedItem(item);
  };

  const handleCloseDetailView = () => {
    setSelectedItem(null);
  };

  return (
    <div className="max-w-6xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Submitted Items</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by item, issued by, or issued to..."
          className="w-full sm:w-1/3 p-2 mb-4 border rounded-md shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {filteredItems.length === 0 ? (
        <p className="text-gray-600 text-center">No matching submitted items.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b text-gray-700">Item</th>
                <th className="py-2 px-4 border-b text-gray-700">Issued By</th>
                <th className="py-2 px-4 border-b text-gray-700">Issued To</th>
                <th className="py-2 px-4 border-b text-gray-700">Issue Date</th>
                <th className="py-2 px-4 border-b text-gray-700">Return Date</th>
                <th className="py-2 px-4 border-b text-gray-700">Received By</th>
                <th className="py-2 px-4 border-b text-gray-700">Image</th>
                <th className="py-2 px-4 border-b text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.itemName}</td>
                  <td className="py-2 px-4 border-b">{item.issuedBy}</td>
                  <td className="py-2 px-4 border-b">{item.issuedTo}</td>
                  <td className="py-2 px-4 border-b">{formatDate(item.issueDate)}</td>
                  <td className="py-2 px-4 border-b">{formatDate(item.returnDate)}</td>
                  <td className="py-2 px-4 border-b">{item.receivedBy || "Not specified"}</td>
                  <td className="py-2 px-4 border-b">
                    {item.imageUrl && (
                      <img
                        src={`http://localhost:5000${item.imageUrl}`}
                        alt="Item Thumbnail"
                        className="w-16 h-16 object-cover rounded-md cursor-pointer"
                        onClick={() => setSelectedImage(`http://localhost:5000${item.imageUrl}`)}
                      />
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-semibold mb-4">Item Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Item Name:</strong> {selectedItem.itemName}</p>
                <p><strong>Issued By:</strong> {selectedItem.issuedBy}</p>
                <p><strong>Issued To:</strong> {selectedItem.issuedTo}</p>
                <p><strong>Issue Date:</strong> {formatDate(selectedItem.issueDate)}</p>
                <p><strong>Return Date:</strong> {formatDate(selectedItem.returnDate)}</p>
                <p><strong>Received By:</strong> {selectedItem.receivedBy || "Not specified"}</p>
              </div>

              {selectedItem.imageUrl && (
                <div className="mt-4">
                  <img
                    src={`http://localhost:5000${selectedItem.imageUrl}`}
                    alt="Item"
                    className="w-full h-auto object-contain rounded-md max-h-[300px]"
                  />
                </div>
              )}
            </div>

            <button
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
              onClick={handleCloseDetailView}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmittedItems;
