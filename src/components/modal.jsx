import React, { useState, useEffect } from 'react';

function Modal({ closeModal, product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];

  useEffect(() => {
  
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-full max-w-5xl h-full max-h-[95vh] relative shadow-2xl flex flex-col overflow-hidden">
       
        <div className="flex justify-between border-b-1 border-gray-200 p-4">
          <p className="text-2xl font-bold">{product.title}</p>
          <button className="text-lg font-bold text-red-600" onClick={() => closeModal(false)}>X</button>
        </div>

      
        <div className="overflow-y-auto flex-1 p-4">
          <div className="flex flex-col items-center">
            {images.length > 0 ? (
              <div className="relative max-w-full">
                <img
                  src={images[currentImageIndex]}
                  alt={product.title}
                  className="w-full max-h-96 object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-80">
                  {currentImageIndex + 1} of {images.length}
                </div>
              </div>
            ) : (
              <p className="text-lg text-gray-600">No images available</p>
            )}
          </div>

          <div className="flex justify-between mt-6">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer"
              onClick={handlePreviousImage}
              disabled={images.length <= 1}
            >
              Previous
            </button>

            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 cursor-pointer"
              onClick={handleNextImage}
              disabled={images.length <= 1}
            >
              Next
            </button>
          </div>

  
          <div className="border-t-2 border-gray-500 mt-4 pt-4">
            <div className="text-xl font-semibold text-blue-600">Price: ₱{product.price}</div>

            <div className="mt-4">
              <div className="text-sm text-gray-600">Discount: </div>
              <div className="text-red-600 text-xl">{product.discountPercentage}% OFF</div>
            </div>

            <div className="mt-4 text-gray-600">Description:</div>
            <div>{product.description}</div>

            <div className="mt-4 text-gray-600">Brand: {product.brand}</div>
            <div className="mt-4 text-gray-600">Category: {product.category}</div>
            <div className="mt-4 text-gray-600">Stock: {product.stock}</div>
            <div className="mt-4 text-gray-600">Rating: {product.rating}</div>
          </div>
        </div>


        <div className="border-t-1 border-gray-200 p-4 flex justify-end">
          <button
            className="p-3 text-blue-400 hover:bg-gray-400 rounded-md"
            onClick={() => closeModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
