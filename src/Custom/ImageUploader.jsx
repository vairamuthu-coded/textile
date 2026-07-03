import React from "react";
import defaultimage from "../Images/win.png";
const ImageUploader = ({ images, setImage, name, value }) => {
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
    <div className="card p-2">
      <div className="mt-2 text-center">
        <img src={images?.imagesrc || defaultimage} value={value} alt="Preview" className="img-fluid img-thumbnail" />
      </div>
      <input type="file" name={name} className="form-control mt-3" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUploader;
