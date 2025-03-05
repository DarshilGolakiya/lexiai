import React, { useEffect, useState } from "react";

const Topics = () => {
  const [topics, setTopics] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("https://your-backend-api.com/topics")
      .then((response) => response.json())
      .then((data) => setTopics(data))
      .catch((error) => console.error("Error fetching topics:", error));

    fetch("https://your-backend-api.com/categories")
      .then((response) => response.json())
      .then((data) => setCategories(["All", ...data]))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const filteredTopics = topics.filter((topic) => {
    return (
      (selectedCategory === "All" || topic.category === selectedCategory) &&
      topic.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-600 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Topics</h1>

      {/* Search and Filter Section */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search topics..."
          className="p-2 w-full md:w-1/2 bg-gray-700 text-white rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="p-2 bg-gray-700 text-white rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Topics Table */}
      <div className="mt-10 w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4">Your Topics</h2>
        <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="p-3">Topic</th>
              <th className="p-3">Your Score</th>
              <th className="p-3">High Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredTopics.length > 0 ? filteredTopics.map((topic, index) => (
              <tr key={index} className="border-b border-gray-700 text-center">
                <td className="p-3">{topic.name}</td>
                <td className="p-3">{topic.yourScore}</td>
                <td className="p-3">{topic.highScore}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No topics available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Topics;
