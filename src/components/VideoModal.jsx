import { useState, useRef, useEffect } from "react";
import "./VideoModal.css";

const VideoModal = ({ isOpen, onClose, onAddVideo }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const videoInputRef = useRef(null);
  const fileInputRef = useRef(null);

  // Focus on URL input when modal opens
  useEffect(() => {
    if (isOpen && videoInputRef.current) {
      videoInputRef.current.focus();
    }
  }, [isOpen]);

  const handleAddVideo = () => {
    const url = videoUrl.trim();

    if (url) {
      // Add URL-based video
      onAddVideo({ type: "url", source: url });
      resetForm();
    } else if (selectedFile) {
      // Add file-based video
      const fileURL = URL.createObjectURL(selectedFile);
      onAddVideo({
        type: "file",
        source: fileURL,
        fileName: selectedFile.name,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    setVideoUrl("");
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddVideo();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  if (!isOpen) return null;

  return (
    <div className="popup-overlay" onClick={handleOverlayClick}>
      <div className="popup">
        <h3>Add Video</h3>

        <input
          ref={videoInputRef}
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter video URL..."
        />

        <div className="file-input-section">
          <p>Or select a local file:</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="popup-buttons">
          <button className="btn-cancel" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="btn-add"
            onClick={handleAddVideo}
            disabled={!videoUrl.trim() && !selectedFile}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
