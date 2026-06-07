import { useState, useCallback } from "react";
import VideoGrid from "./components/VideoGrid";
import FAB from "./components/FAB";
import VideoModal from "./components/VideoModal";
import "./App.css";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1);

  const showModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const hideModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const addVideo = useCallback(
    (videoItem) => {
      setVideoData((prevData) => [...prevData, videoItem]);
      hideModal();
    },
    [hideModal]
  );

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  return (
    <div className="app">
      <VideoGrid 
        videoData={videoData} 
        isPlaying={isPlaying} 
        isMuted={isMuted} 
        volume={volume} 
      />
      <FAB 
        onClick={showModal} 
        isPlaying={isPlaying}
        isMuted={isMuted}
        volume={volume}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
        onVolumeChange={handleVolumeChange}
      />
      <VideoModal
        isOpen={isModalOpen}
        onClose={hideModal}
        onAddVideo={addVideo}
      />
    </div>
  );
}

export default App;
