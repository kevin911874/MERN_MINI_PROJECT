import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BorrowedItemsPage = () => {
  const [borrowedItems, setBorrowedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch items when component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get('/api/borrow'); // Make sure your API is running
        setBorrowedItems(response.data);
      } catch (err) {
        setError('Error fetching borrowed items');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-semibold text-center mb-6">Borrowed Items</h2>
      {borrowedItems.length === 0 ? (
        <p className="text-center">No borrowed items available</p>
      ) : (
        <ul className="space-y-4">
          {borrowedItems.map((item) => (
            <li
              key={item._id}
              className="border border-gray-300 rounded-md p-4 hover:bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{item.itemName}</h3>
              <p><strong>Issued By:</strong> {item.issuedBy}</p>
              <p><strong>Issued To:</strong> {item.issuedTo}</p>
              <p><strong>Purpose:</strong> {item.purpose}</p>
              <p><strong>Issue Date:</strong> {item.issueDate}</p>
              <p><strong>Return Date:</strong> {item.returnDate}</p>
              <p><strong>Received By:</strong> {item.receivedBy}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BorrowedItemsPage;
