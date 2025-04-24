import React, { useState } from "react";
import axios from "axios";

const BorrowForm = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    issuedBy: "",
    issuedTo: "",
    purpose: "",
    issueDate: new Date().toISOString().split("T")[0],
    image: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post("http://localhost:5000/api/borrow/create", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Success:", response.data);
      alert("Borrow record added!");

      // Reset form after successful submission
      setFormData({
        itemName: "",
        issuedBy: "",
        issuedTo: "",
        purpose: "",
        issueDate: new Date().toISOString().split("T")[0],
        image: null,
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-lg shadow-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl">
      <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Borrow an Item</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col">
          <label htmlFor="itemName" className="text-gray-700 font-medium mb-2">Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            placeholder="Enter item name"
            required
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="issuedBy" className="text-gray-700 font-medium mb-2">Issued By</label>
          <input
            type="text"
            name="issuedBy"
            value={formData.issuedBy}
            onChange={handleChange}
            placeholder="Issued By"
            required
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="issuedTo" className="text-gray-700 font-medium mb-2">Issued To</label>
          <input
            type="text"
            name="issuedTo"
            value={formData.issuedTo}
            onChange={handleChange}
            placeholder="Issued To"
            required
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="purpose" className="text-gray-700 font-medium mb-2">Purpose</label>
          <input
            type="text"
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            placeholder="Purpose of borrowing"
            required
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="issueDate" className="text-gray-700 font-medium mb-2">Issue Date</label>
          <input
            type="date"
            name="issueDate"
            value={formData.issueDate}
            onChange={handleChange}
            required
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="image" className="text-gray-700 font-medium mb-2">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            accept="image/*"
            className="w-full p-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-200"
          />
        </div>

        {formData.image && (
          <div className="mt-4 flex justify-center">
            <img
              src={URL.createObjectURL(formData.image)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-xl shadow-md"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BorrowForm;
