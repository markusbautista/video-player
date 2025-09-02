import "./FAB.css";

const FAB = ({ onClick }) => {
  return (
    <button className="fab" onClick={onClick}>
      <span className="fab-icon">+</span>
    </button>
  );
};

export default FAB;
