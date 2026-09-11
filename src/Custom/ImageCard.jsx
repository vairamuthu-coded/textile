import React from "react";

const ImageCard = ({ src, alt = "Image", borderColor = "#000", className = "", maxHeight = "100px", maxWidth = "150px" }) => {
  if (!src) return null;

  return (
    <div
      className={className}
      style={{
        border: `1px solid ${borderColor}`,
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        maxHeight,
        maxWidth,
        overflow: "hidden",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
};

export default ImageCard;
