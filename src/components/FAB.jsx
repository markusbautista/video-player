import "./FAB.css";

const FAB = ({ onClick, isPlaying, isMuted, volume, onTogglePlay, onToggleMute, onVolumeChange }) => {
  return (
    <div className="fab-island">
      <button className="fab-control-btn" onClick={onTogglePlay} title={isPlaying ? "Pause All" : "Play All"}>
        {isPlaying ? "⏸" : "▶️"}
      </button>
      <button className="fab-control-btn" onClick={onToggleMute} title={isMuted ? "Unmute All" : "Mute All"}>
        {isMuted ? "🔇" : "🔊"}
      </button>
      <div className="fab-volume-control">
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.01" 
          value={isMuted ? 0 : volume} 
          onChange={onVolumeChange}
          className="fab-volume-slider"
          title="Volume"
        />
      </div>
      <div className="fab-divider"></div>
      <button className="fab-add-btn" onClick={onClick} title="Add Video">
        <span className="fab-icon">+</span>
      </button>
    </div>
  );
};

export default FAB;
