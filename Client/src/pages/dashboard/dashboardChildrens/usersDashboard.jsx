import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FiTrash2, FiUser } from "react-icons/fi";
import { ToastContainer } from "react-toastify";
import { showToast } from "../../../utils/toastUtils.jsx";

export default function UsersDashboard() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectRole, setSelectRole] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 200 } }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { data: response } = await axios.get("http://127.0.0.1:8000/api/users");
        setData(response.users);
        setFilteredData(response.users);
      } catch (err) {
        console.log(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const searchInputChangeHandler = (searchValue) => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
      const filtered = data.filter((item) =>
        Object.values(item).join('').toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  };

  const handleRoleChange = async (role_id, id) => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/user/updateRole/${id}`, { role_id: role_id });
      const updatedData = data.map((user) =>
        user.id === id ? { ...user, role_id: role_id } : user
      );
      setData(updatedData);
      setFilteredData(updatedData);
      showToast("success", "Role updated successfully");
    } catch (err) {
      console.log(err.message);
      showToast("error", "Error updating role");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
      const updatedData = data.filter(user => user.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      showToast("success", "User deleted successfully");
    } catch (err) {
      console.log(err.message);
      showToast("error", "Error deleting user");
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/roles");
        setSelectRole(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRoles();
  }, []);

  const displayedData = searchInput === "" ? data : filteredData;

  return (
    <div className="w-full bg-white border border-gray-200 rounded-none overflow-hidden">
      <ToastContainer />


      <div className="flex flex-col md:flex-row items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-2xl font-light text-gray-900 mb-4 md:mb-0">
          User Management
        </h2>
        <div>
          <input
            type="text"
            placeholder="Search users..."
            onChange={(e) => searchInputChangeHandler(e.target.value)}
            className="px-4 py-2 text-sm border border-gray-300 rounded-none focus:ring-1 focus:ring-black focus:border-black outline-none"
          />
        </div>
      </div>


      <div className="relative overflow-auto max-h-[600px] w-full">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
          <div className="h-12 w-12 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        </div>
        
        ) : (
          <motion.table
            variants={container}
            initial="hidden"
            animate="show"
            className="w-full text-sm text-left text-gray-600"
          >
            <thead className="sticky top-0 z-10 text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4">Profile</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Age</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedData.length > 0 ? (
                displayedData.map((item, index) => (
                  <motion.tr
                    variants={item}
                    key={index}
                    className="bg-white border-b border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img
                            src={`http://localhost:8000/storage/${item.profile_image}`}
                            alt="Profile"
                            className="h-10 w-10 rounded-none object-cover border border-gray-200"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      <div>
                        <div className="font-light">{item.firstName} {item.lastName}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-600">{item.email}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300">
                        {item.age}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={item.role_id}
                        onChange={(e) => handleRoleChange(Number(e.target.value), item.id)}
                        className="block w-full p-2 text-sm text-gray-900 bg-white border border-gray-300 focus:ring-1 focus:ring-black focus:border-black outline-none"
                      >
                        {selectRole.map((role) => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => deleteUser(item.id)}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 transition-all"
                      >
                        <FiTrash2 className="mr-1" />
                        Delete
                      </motion.button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <motion.tr variants={item}>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500">
                      <FiUser className="w-12 h-12 mb-4 opacity-50" />
                      <p className="text-lg">No users found</p>
                      {searchInput && (
                        <button
                          onClick={() => searchInputChangeHandler("")}
                          className="mt-4 text-black hover:underline"
                        >
                          Clear search
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              )}
            </tbody>
          </motion.table>
        )}
      </div>
    </div>
  );
}