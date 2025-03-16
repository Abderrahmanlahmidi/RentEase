import { useState, useEffect } from "react";
import axios from "axios";

export default function UsersDashboard() {

  const [showModal, setShowModal] = useState(false);

  const handleUpdateClick = () => {
    setShowModal(true);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const {data:response} = await axios.get("http://127.0.0.1:8000/api/users");
        setData(response.users);
      }catch(err){
        console.log(err.message);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="relative overflow-x-auto w-full sm:rounded-lg">
      <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">User Management</h2>
        <div>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
          />
        </div>
      </div>
     <div className="relative overflow-auto max-h-[600px] w-full sm:rounded-lg" >
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">First Name</th>
            <th scope="col" className="px-6 py-3">Last Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Age</th>
            <th scope="col" className="px-6 py-3">Role</th>
            <th scope="col" className="px-6 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
        {data.map((item, index) => (
            <tr
                key={index}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
            >
              <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item.firstName}
              </th>
              <td className="px-6 py-4">{item.lastName}</td>
              <td className="px-6 py-4">{item.email}</td>
              <td className="px-6 py-4">{item.age}</td>
              <td className="px-6 py-4">
                <select
                    className="block w-full p-2 border border-gray-300 rounded text-sm bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    defaultValue={item.role?.name}
                >
                  <option>Admin</option>
                  <option>Client</option>
                </select>
              </td>
              <td className="px-6 py-4 text-center space-x-2">
                <button
                    onClick={() => handleUpdateClick(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                >
                  Update
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-xs">
                  Delete
                </button>
              </td>
            </tr>
        ))}
        </tbody>
      </table>
    </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Update User</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input type="text" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input type="number" className="w-full border border-gray-300 p-2 rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Role</label>
                <select className="w-full border border-gray-300 p-2 rounded">
                  <option>Admin</option>
                  <option>Editor</option>
                  <option>User</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
