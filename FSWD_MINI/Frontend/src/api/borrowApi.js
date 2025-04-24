import axios from 'axios';

const API_BASE_URL = "http://localhost:5000"; // Ensure this matches your backend

export const createBorrowRecord = async (data) => {
    return await axios.post(`${API_BASE_URL}/api/borrow/create`, data);
};
