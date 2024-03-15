"use client";

import React, { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";

const ImagePicker = ({ label, name }) => {
  const ImageRef = useRef();
  const [image, setImage] = useState(null);
  const handlePickClick = (event) => {
    ImageRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={classes["picker"]}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.controls}>
        <div className={classes["preview"]}>
          {image && <Image src={image} alt="Preview" fill />}
          {!image && <p>No image picked yet.</p>}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png image/jpeg image/jpg"
          name={name}
          ref={ImageRef}
          onChange={handleImageChange}
        />
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
