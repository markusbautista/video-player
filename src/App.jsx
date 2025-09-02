import { useState, useCallback } from "react";
import VideoGrid from "./components/VideoGrid";
import FAB from "./components/FAB";
import VideoModal from "./components/VideoModal";
import "./App.css";

function App() {
  const [videoData, setVideoData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  return (
    <div className="app">
      <VideoGrid videoData={videoData} />
      <FAB onClick={showModal} />
      <VideoModal
        isOpen={isModalOpen}
        onClose={hideModal}
        onAddVideo={addVideo}
      />
    </div>
  );
}

export default App;
