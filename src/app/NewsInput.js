import React, { useState } from "react";

const NewsInput = (props) => {
  const [headline, setHeadline] = useState("");
  const [content, setContent] = useState("");
  const saveNews = () => {
    props.saveNews(headline, content);
  };
  return (
    <main className="h-screen">
      <div className="flex flex-col items-center justify-center h-96">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-1/2">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="headline"
            >
              Rubrik
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="headline"
              type="text"
              placeholder="Ange en rubrik"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="content"
            >
              Innehåll
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="content"
              placeholder="Vad blir din nyhet idag?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={saveNews}
            >
              Spara nyhet
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};
export default NewsInput;
