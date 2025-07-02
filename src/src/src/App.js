import React, { useState } from 'react';

function App() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [summary, setSummary] = useState('');
  const [script, setScript] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlSubmit = async () => {
    if (!videoUrl) return;
    setLoading(true);

    try {
      const res = await fetch('https://your-backend-api.onrender.com/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: videoUrl }),
      });

      const data = await res.json();
      setSummary(data.summary);
      setScript(data.script);
      setThumbnail(data.thumbnail);
      setMainImage(data.main_image);
    } catch (err) {
      alert("API Error: " + err.message);
    }

    setLoading(false);
  };

  const handleFileSubmit = async () => {
    if (!videoFile) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('video', videoFile);

    try {
      const res = await fetch('https://your-backend-api.onrender.com/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setSummary(data.summary);
      setScript(data.script);
      setThumbnail(null);
      setMainImage(null);
    } catch (err) {
      alert("Upload API Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-6 space-y-6">
        <h1 className="text-2xl font-bold">🎬 YouTube & Video Script Generator</h1>

        {/* URL Input */}
        <input
          type="text"
          placeholder="🔗 YouTube Video URL"
          className="w-full border rounded p-2"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <button
          onClick={handleUrlSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Get Script from URL'}
        </button>

        {/* OR Upload */}
        <div className="border-t pt-4">
          <input
            type="file"
            accept="video/*"
            className="w-full"
            onChange={(e) => setVideoFile(e.target.files[0])}
          />
          <button
            onClick={handleFileSubmit}
            className="bg-green-600 text-white px-4 py-2 rounded w-full mt-2"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Upload Video & Get Script'}
          </button>
        </div>

        {/* Results */}
        {thumbnail && <img src={thumbnail} alt="Thumbnail" className="rounded" />}
        {mainImage && <img src={mainImage} alt="Main" className="rounded" />}

        {summary && (
          <div>
            <h2 className="text-xl font-semibold">🧠 Summary</h2>
            <p className="text-gray-800">{summary}</p>
          </div>
        )}

        {script && (
          <div>
            <h2 className="text-xl font-semibold">📜 Full Script</h2>
            <pre className="bg-gray-50 p-3 rounded whitespace-pre-wrap text-sm">{script}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
