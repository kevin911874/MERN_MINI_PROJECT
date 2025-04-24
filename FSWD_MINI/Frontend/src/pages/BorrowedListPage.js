import React, { useEffect, useState } from "react";
import axios from "axios";

const BorrowedList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/borrow");
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching borrow records:", error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-6 p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Borrowed Items</h2>
      {items.length === 0 ? (
        <p className="text-gray-600 text-center">No items borrowed yet.</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="border p-4 rounded-lg shadow-md bg-gray-50">
              <p><strong>Item:</strong> {item.itemName}</p>
              <p><strong>Issued By:</strong> {item.issuedBy}</p>
              <p><strong>Issued To:</strong> {item.issuedTo}</p>
              <p><strong>Issue Date:</strong> {new Date(item.issueDate).toLocaleDateString()}</p>
              <p><strong>Return Date:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>
              {item.imageUrl && (
                <img 
                  src={`http://localhost:5000${item.imageUrl}`} 
                  alt="Borrowed Item" 
                  className="mt-2 w-32 h-32 object-cover rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BorrowedList;
