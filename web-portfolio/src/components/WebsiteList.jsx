import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { PlusCircleIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import logo from "../assets/logo.png";

function WebsiteList({ websites, updateWebsite, deleteWebsite }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(-1);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editedWebsite, setEditedWebsite] = useState({
    title: "",
    url: "", 
    thumbnail: "",
  });

  const handleEdit = (index) => {
    setIsEditing(index);
    setEditedWebsite(websites[index]);
  };

  const handleUpdate = (index) => {
    updateWebsite(index, editedWebsite);
    setIsEditing(-1);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    window.location.reload();
    navigate('/login');
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-black min-h-screen">
      {/* Responsive Navbar */}
      <nav className="bg-gradient-to-r from-gray-900 to-black shadow-lg w-full">
        <div className="max-w-full mx-4 py-2">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <img src={logo} alt="Logo" className="h-16 sm:h-20 w-40 sm:w-56" />
            </div>
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => setShowAddForm(true)}
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold font-serif px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <PlusCircleIcon className="h-5 w-5 mr-2" />
                Add Website
              </button>
              <button
                onClick={handleLogout}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 font-semibold font-serif text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Responsive Add Website Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 p-4 sm:p-8 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-serif text-center font-bold mb-4 sm:mb-6 text-white">Add New Website</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 font-mono font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={editedWebsite.title}
                  onChange={(e) => setEditedWebsite({...editedWebsite, title: e.target.value})}
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-mono font-semibold mb-2">URL</label>
                <input
                  type="url"
                  value={editedWebsite.url}
                  onChange={(e) => setEditedWebsite({...editedWebsite, url: e.target.value})}
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-gray-300 font-mono font-semibold mb-2">Thumbnail URL</label>
                <input
                  type="url"
                  value={editedWebsite.thumbnail}
                  onChange={(e) => setEditedWebsite({...editedWebsite, thumbnail: e.target.value})}
                  className="w-full p-2 border rounded bg-gray-700 text-white"
                />
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                <button 
                  onClick={() => {
                    updateWebsite(websites.length, editedWebsite);
                    setShowAddForm(false);
                    setEditedWebsite({ title: "", url: "", thumbnail: "" });
                  }}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-2 rounded"
                >
                  Add Website
                </button>
                <button
                  onClick={() => {
                    setShowAddForm(false);
                    setEditedWebsite({ title: "", url: "", thumbnail: "" });
                  }}
                  className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-center mb-4 bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Welcome to Your Portfolio Dashboard
          </h2>
          <p className="text-gray-300 text-center text-base sm:text-xl font-serif max-w-3xl mx-auto mb-8 sm:mb-12 px-4">
            Manage your website portfolio with ease. Add, edit, or remove websites from your collection.
            Keep track of all your web projects in one convenient place.
          </p>

          <h3 className="text-2xl sm:text-4xl font-mono font-bold mb-8 sm:mb-12 text-center text-white">
            My Websites
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
            {websites.map((website, index) => (
              <div
                key={index}
                className="bg-gray-800 shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105 overflow-hidden rounded-lg"
              >
                {isEditing === index ? (
                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                    <div>
                      <label className="block text-lg sm:text-xl font-medium text-gray-300 mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editedWebsite.title}
                        onChange={(e) =>
                          setEditedWebsite({
                            ...editedWebsite,
                            title: e.target.value,
                          })
                        }
                        className="w-full p-2 sm:p-3 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-base sm:text-lg font-medium text-gray-300 mb-2">
                        URL
                      </label>
                      <input
                        type="url"
                        value={editedWebsite.url}
                        onChange={(e) =>
                          setEditedWebsite({
                            ...editedWebsite,
                            url: e.target.value,
                          })
                        }
                        className="w-full p-2 sm:p-3 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-base sm:text-lg font-medium text-gray-300 mb-2">
                        Thumbnail URL
                      </label>
                      <input
                        type="url"
                        value={editedWebsite.thumbnail}
                        onChange={(e) =>
                          setEditedWebsite({
                            ...editedWebsite,
                            thumbnail: e.target.value,                          
                          })
                        }
                        className="w-full p-2 sm:p-3 border rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                        placeholder="Enter thumbnail URL"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
                      <button
                        onClick={() => handleUpdate(index)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 font-semibold"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setIsEditing(-1)}
                        className="w-full bg-gray-500 hover:bg-gray-600 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-colors duration-200 font-semibold"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <a
                      href={website.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative group">
                        <img
                          src={website.thumbnail || "https://via.placeholder.com/400x300"}
                          alt={website.title}
                          className="w-full h-48 sm:h-64 lg:h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                      </div>
                      <div className="p-4 sm:p-6">
                        <h4 className="font-bold font-serif text-xl sm:text-2xl text-gray-200 text-center mb-2 sm:mb-4 truncate hover:text-blue-400 transition-colors duration-200">
                          {website.title}
                        </h4>
                        <p className="text-gray-400 text-xs sm:text-sm truncate mb-2 sm:mb-4">
                          {website.url}
                        </p>
                      </div>
                    </a>
                    <div className="absolute bottom-0 left-0 right-0 px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 bg-gray-800">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleEdit(index);
                        }}
                        className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-2 px-2 rounded-lg transition-colors duration-200 font-semibold text-sm sm:text-base"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          deleteWebsite(index);
                        }}
                        className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-2 rounded-lg transition-colors duration-200 font-semibold text-sm sm:text-base"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

WebsiteList.propTypes = {
  websites: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      thumbnail: PropTypes.string,
    })
  ).isRequired,
  updateWebsite: PropTypes.func.isRequired,
  deleteWebsite: PropTypes.func.isRequired,
};

export default WebsiteList;
