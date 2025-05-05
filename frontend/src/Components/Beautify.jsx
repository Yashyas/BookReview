import { useState, useEffect } from "react";
import toast from "react-hot-toast";


const Beautify = ({ isOpen, onClose, originalText, onSubmit }) => {
  const [beautifiedText, setBeautifiedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && originalText) {
      generateBeautifiedText(originalText);
    }
  }, [isOpen]);

  const generateBeautifiedText = async (text) => {
    setLoading(true);
    try {
      const response = await fetch("https://api.languagetoolplus.com/v2/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          text,
          language: "en-US",
        }),
      });

      const data = await response.json();

      let correctedText = text;
      data.matches?.forEach((match) => {
        if (match.replacements?.length > 0) {
          const replacement = match.replacements[0].value;
          const offset = match.offset;
          const length = match.length;
          correctedText =
            correctedText.slice(0, offset) +
            replacement +
            correctedText.slice(offset + length);
        }
      });

      setBeautifiedText(correctedText);
    } catch (error) {
      console.error("LanguageTool Error:", error);
      toast.error("Failed to beautify review.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="mt-4 bg-white rounded-lg p-4  w-full max-w-2xl">
      <div className="bg-white rounded-lg p-6 w-full  shadow-lg">
        <h2 className="text-xl font-bold mb-4">AI Beautified Review</h2>
        {loading ? (
          <p>Beautifying...</p>
        ) : (
          <textarea
            value={beautifiedText}
            onChange={(e) => setBeautifiedText(e.target.value)}
            className="w-full p-3 border rounded mb-4"
            rows="6"
          />
        )}
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => onSubmit(beautifiedText)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default Beautify;
