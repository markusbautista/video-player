import { useState, useEffect } from "react";
import "./VideoGrid.css";

const VideoGrid = ({ videoData }) => {
  const [gridLayout, setGridLayout] = useState({ columns: 1, rows: 1 });
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const updateGrid = () => {
      const numVideos = videoData.length;

      if (numVideos === 0) {
        setGridLayout({ columns: 1, rows: 1 });
        setVideoDimensions({ width: 0, height: 0 });
        return;
      }

      // Calculate grid layout based on rules
      let columns, rows;

      if (numVideos <= 2) {
        columns = numVideos;
        rows = 1;
      } else if (numVideos <= 4) {
        columns = 2;
        rows = 2;
      } else {
        columns = 4;
        rows = Math.ceil(numVideos / 4);
      }

      // Calculate the size to maintain 16:9 aspect ratio
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Calculate maximum possible size while maintaining 16:9
      const maxVideoWidth = viewportWidth / columns;
      const maxVideoHeight = viewportHeight / rows;

      // Use the limiting dimension to maintain 16:9
      let videoWidth, videoHeight;
      if (maxVideoWidth / maxVideoHeight > 16 / 9) {
        // Height is limiting
        videoHeight = maxVideoHeight;
        videoWidth = videoHeight * (16 / 9);
      } else {
        // Width is limiting
        videoWidth = maxVideoWidth;
        videoHeight = videoWidth / (16 / 9);
      }

      setGridLayout({ columns, rows });
      setVideoDimensions({ width: videoWidth, height: videoHeight });
    };

    updateGrid();

    // Handle window resize to maintain aspect ratio
    window.addEventListener("resize", updateGrid);
    return () => window.removeEventListener("resize", updateGrid);
  }, [videoData]);

  const renderVideo = (videoItem, index) => {
    if (videoItem.type === "url") {
      // Add autoplay and loop parameters to the URL
      let videoUrl = videoItem.source;
      if (videoUrl.includes("?")) {
        videoUrl += "&autoplay=1&loop=1&mute=1";
      } else {
        videoUrl += "?autoplay=1&loop=1&mute=1";
      }

      return (
        <iframe
          key={index}
          src={videoUrl}
          allow="autoplay; fullscreen; clipboard-write"
          allowFullScreen
          loading="lazy"
        />
      );
    } else if (videoItem.type === "file") {
      return (
        <video
          key={index}
          src={videoItem.source}
          controls
          autoPlay
          loop
          muted
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      );
    }
  };

  const totalSlots = gridLayout.columns * gridLayout.rows;
  const emptySlots = Math.max(0, totalSlots - videoData.length);

  return (
    <div
      className="video-grid"
      style={{
        gridTemplateColumns: `repeat(${gridLayout.columns}, ${videoDimensions.width}px)`,
        gridTemplateRows: `repeat(${gridLayout.rows}, ${videoDimensions.height}px)`,
      }}
    >
      {videoData.map((videoItem, index) => (
        <div key={index} className="gdrive-video">
          {renderVideo(videoItem, index)}
        </div>
      ))}

      {/* Add empty spaces for odd numbers when needed */}
      {Array.from({ length: emptySlots }, (_, index) => (
        <div
          key={`empty-${index}`}
          className="gdrive-video"
          style={{ backgroundColor: "transparent" }}
        />
      ))}
    </div>
  );
};

export default VideoGrid;
