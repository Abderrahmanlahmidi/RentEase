import { useState, useEffect } from "react";
import axios from "axios";
import {motion} from "framer-motion";

export default function UsersDashboard() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState({});
  const [userDeleteMessage, setUserDeleteMessage] = useState("");
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: response } = await axios.get("http://127.0.0.1:8000/api/users");
        setData(response.users);
      } catch (err) {
        console.log(err.message);
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
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteUser = async (id) => {
    try {

      await axios.delete(`http://127.0.0.1:8000/api/user/delete/${id}`);

      setUserDeleteMessage("User deleted successfully.");
      setShowDeleteMessage(true);

      setTimeout(() => {
        setShowDeleteMessage(false);
      }, 2000);

    } catch (err) {
      console.log(err.message);
    }
  };


  const displayedData = searchInput === "" ? data : filteredData;

  return (
      <div className="relative overflow-x-auto w-full sm:rounded-lg">
        {showDeleteMessage && (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.3 }}
                className="fixed bottom-6 right-6 z-50"
            >
              <div
                  className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
                  role="alert"
              >
                <svg
                    className="shrink-0 inline w-4 h-4 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                  {userDeleteMessage}
                </div>
              </div>
            </motion.div>
        )}

        <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">User Management</h2>
          <div>
            <input
                type="text"
                placeholder="Search..."
                onChange={(e) => searchInputChangeHandler(e.target.value)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>
        </div>

        <div className="relative overflow-auto max-h-[600px] w-full sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Age</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
            </thead>
            <tbody>
            {displayedData.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.firstName}
                  </td>
                  <td className="px-6 py-4">{item.lastName}</td>
                  <td className="px-6 py-4">{item.email}</td>
                  <td className="px-6 py-4">{item.age}</td>
                  <td className="px-6 py-4">
                    <select
                        className="block w-full p-2 border border-gray-300 rounded text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={item.role_id}
                        onChange={(e) => handleRoleChange(Number(e.target.value), item.id)}
                    >
                      <option value="2">Admin</option>
                      <option value="1">Client</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                        onClick={() => deleteUser(item.id)}
                        className="bg-red-500 text-white px-3 py-1 cursor-pointer rounded hover:bg-red-600 text-xs"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
}
