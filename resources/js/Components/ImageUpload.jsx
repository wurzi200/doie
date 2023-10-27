import { backgroundMain, backgroundSecondary, backgroundTertiary, border, buttonColor, buttonStyle, textMain } from '@/constants';
import { Progress } from 'flowbite-react';
import React, { useState } from 'react';

export default function ImageUpload({ setImageData, image, progress }) {
  const [selectedImage, setSelectedImage] = useState(image || null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
      setImageData(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className='w-full'>
      <div className={`${border} ${backgroundTertiary} ${textMain} border p-4 mt-4 flex justify-center items-center h-48`}>
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className={`max-w-full max-h-full`}
          />
        ) : (
          <span>No image selected</span>
        )}
      </div>
      {progress &&
        <Progress
          progress={progress.percentage}
          progressLabelPosition="inside"
          size="sm"
          className=''
        />
      }
      <div className="relative">
        <label htmlFor="image-upload" className={`${buttonColor} text-white p-2 text-center mt-4 block w-full rounded-lg cursor-pointer`}>
          {selectedImage ? 'Change Image' : 'Upload Image'}
        </label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 opacity-0 z-50 cursor-pointer"
        />
      </div>
    </div>
  );
}