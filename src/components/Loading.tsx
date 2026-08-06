import React from "react";

interface LoadingProps {
  inline?: boolean;
}

const Loading: React.FC<LoadingProps> = ({ inline = false }) => {
  return (
    <div className={`loading-container ${inline ? "inline" : ""}`}>
      <div className="loading-spinner"></div>
    </div>
  );
};

export default Loading;
