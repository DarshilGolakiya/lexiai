import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Topics = () => {
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      // Fetch categories
      fetch(`${API_BASE_URL}/category`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((response) => response.json())
        .then((data) => setCategories([{ id: "All", name: "All" }, ...data]))
        .catch((error) => console.error("Error fetching categories:", error));
    }
  }, [token]);

  const fetchTopics = () => {
    if (!token) return;
    let topicUrl = `${API_BASE_URL}/topic`;
    if (selectedCategory !== "All") {
      topicUrl += `?category_name=${selectedCategory}`;
    }
    fetch(topicUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          setTopics([]);
        }
      })
      .catch((error) => console.error("Error fetching topics:", error));
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedCategory]);

  // Filter topics based on search query
  const filteredTopics = topics.filter((topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Topics</h1>

      {/* Search and Filter Section */}
      <div className="mt-6 flex flex-col md:flex-row gap-10 items-center w-full max-w-7xl">
        <input
          type="text"
          placeholder="Search topics..."
          className="p-2 px-5 w-full md:w-1/2 bg-gray-700 text-white rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 bg-gray-700 text-white rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Topics Table */}
      <div className="mt-10 w-full max-w-full overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">Your Topics</h2>
        <table className="min-w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">Topic</th>
              <th className="p-3">Description</th>
              <th className="p-3">Your Score</th>
              <th className="p-3">High Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 text-left"
                >
                  <td className="p-3">{topic.name}</td>
                  <td className="p-3">{topic.description}</td>
                  <td className="p-3">{topic.yourScore}</td>
                  <td className="p-3">{topic.highScore}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No topics available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topics;
