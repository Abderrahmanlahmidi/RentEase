import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {FiTrash2, FiUser} from "react-icons/fi";
import {ToastContainer} from "react-toastify";
import {showToast} from "../../../utils/toastUtils.jsx";

export default function UsersDashboard() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectRole, setSelectRole] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Animation variants
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
      showToast("success", "Successfully updated user");
    } catch (err) {
      console.log(err.message);
      showToast("error", "Error updating user");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);
      const updatedData = data.filter(user => user.id !== id);
      setData(updatedData);
      setFilteredData(updatedData);
      showToast("success", "Successfully deleted user");

    } catch (err) {
      console.log(err.message);
      showToast("error", "Error delete user");
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
      <div className="relative w-full rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800">
        <ToastContainer />

        {/* Table Header */}
        <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r dark:from-gray-700 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 md:mb-0">
            User Management
          </h2>
          <div>
            <input
                type="text"
                placeholder="Search blog..."
                onChange={(e) => searchInputChangeHandler(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="relative overflow-auto max-h-[600px] w-full">
          {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
          ) : (
              <motion.table
                  variants={container}
                  initial="hidden"
                  animate="show"
                  className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
              >
                <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr >
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
                            className="bg-white border-gray-200 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                    src={item.profile_image || '/default-profile.jpg'}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-full object-cover border-2 border-white shadow"
                                />
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            <div>
                              <div className="font-semibold">{item.firstName} {item.lastName}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-gray-600 dark:text-gray-300">{item.email}</div>
                          </td>
                          <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {item.age}
                      </span>
                          </td>
                          <td className="px-6 py-4">
                            <select
                                value={item.role_id}
                                onChange={(e) => handleRoleChange(Number(e.target.value), item.id)}
                                className="block w-full p-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                              {selectRole.map((role) => (
                                  <option key={role.id} value={role.id}>{role.name}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => deleteUser(item.id)}
                                className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all"
                            >
                              <FiTrash2 className="mr-1" />
                              Delete
                            </button>
                          </td>
                        </motion.tr>
                    ))
                ) : (
                    <motion.tr variants={item}>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                          <FiUser className="w-12 h-12 mb-4 opacity-50" />
                          <p className="text-lg">No users found</p>
                          {searchInput && (
                              <button
                                  onClick={() => searchInputChangeHandler("")}
                                  className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
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