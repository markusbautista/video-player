import { useState, useEffect, useRef } from "react";
import "./VideoGrid.css";

const VideoGrid = ({ videoData, isPlaying, isMuted, volume }) => {
  const [gridLayout, setGridLayout] = useState({ columns: 1, rows: 1 });
  const [videoDimensions, setVideoDimensions] = useState({
    width: 0,
    height: 0,
  });
  
  const videoRefs = useRef([]);

  useEffect(() => {
    // Apply play/pause
    videoRefs.current.forEach((video) => {
      if (video) {
        if (isPlaying) {
          video.play().catch(e => console.log("Play failed:", e));
        } else {
          video.pause();
        }
      }
    });
  }, [isPlaying]);

  useEffect(() => {
    // Apply mute state
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  useEffect(() => {
    // Apply volume
    videoRefs.current.forEach((video) => {
      if (video) {
        video.volume = volume;
      }
    });
  }, [volume]);

  useEffect(() => {
    // Keep refs array size in sync with videoData
    videoRefs.current = videoRefs.current.slice(0, videoData.length);
  }, [videoData]);

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
      
      // Update iframe url based on states if possible. 
      // Note: Changing iframe src reloads the video, which disrupts playback.
      // We only set it on initial render.
      const paramStr = `autoplay=${isPlaying ? 1 : 0}&loop=1&mute=${isMuted ? 1 : 0}`;
      if (videoUrl.includes("?")) {
        videoUrl += `&${paramStr}`;
      } else {
        videoUrl += `?${paramStr}`;
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
          ref={(el) => (videoRefs.current[index] = el)}
          src={videoItem.source}
          controls={false}
          autoPlay={isPlaying}
          loop
          muted={isMuted}
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
