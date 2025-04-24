import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="flex justify-between items-center">
      <Link to="/">  <h1 className="text-2xl font-bold">Borrow Management System</h1></Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-gray-200">Home</Link></li>
          <li><Link to="/pending" className="hover:text-gray-200">Pending Items</Link></li>
          <li><Link to="/submitted" className="hover:text-gray-200">Submitted Items</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
