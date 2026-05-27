import React from "react";
import defaultimage from "../Images/win.png";
const ImageUploader = ({ images, setImage, name = "imageuploader", value }) => {
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setImage((prev) => ({
        ...prev,
        imageFile: null,
        imagesrc: defaultimage,
      }));
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage((prev) => ({
        ...prev,
        imageFile: file,
        imagesrc: reader.result,
        filetype: file.type,
      }));
    };

    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div style={{ marginTop: "10px" }}>
        <img src={images?.imagesrc || defaultimage} value={value} alt="Preview" width="120" height="120" style={{ objectFit: "cover", border: "1px solid #ccc" }} />
      </div>
      <input type="file" name={name} className="form-control" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
