import React, { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [script, setScript] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!videoUrl) return alert("প্রথমে YouTube URL দেন");
    setLoading(true);
    try {
      const res = await fetch(process.env.REACT_APP_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl })
      });
      const data = await res.json();
      setSummary(data.summary);
      setScript(data.script);
      setThumbnail(data.thumbnail);
      setMainImage(data.main_image);
    } catch (error) {
      alert("Error fetching script. দয়া করে পরে আবার চেষ্টা করুন।");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">🎬 YouTube Script Generator</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="🔗 এখানে YouTube URL দিন"
            className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-blue-400"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            {loading ? '⏳ প্রসেসিং...' : '🚀 জেনারেট'}
          </button>
        </div>

        {thumbnail && <img src={thumbnail} alt="Thumbnail" className="mb-4 rounded-lg w-full shadow-md" />}
        {mainImage && <img src={mainImage} alt="প্রধান ছবি" className="mb-4 rounded-lg w-full shadow-md" />}

        {summary && (
          <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
            <h2 className="text-xl font-bold text-blue-700 mb-2">🧠 সারাংশ</h2>
            <p className="text-gray-800">{summary}</p>
          </div>
        )}

        {script && (
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-bold mb-2">📜 পুরো স্ক্রিপ্ট</h2>
            <pre className="text-gray-700 whitespace-pre-wrap">{script}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
