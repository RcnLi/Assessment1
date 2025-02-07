import React, { useState } from 'react';

function Modal({ closeModal, product }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className='fixed inset-0 bg-opacity-100 flex justify-center items-center z-50'>
      <div className='bg-white rounded-2xl h-[90vh] p-6 w-[80%] relative shadow-2xl overflow-y-scroll'>
        <div className='flex justify-between border-b-2 border-gray-500 pb-4 mb-4'>
          <p className='text-2xl font-bold'>{product.title}</p>
          <button className='text-lg font-bold text-red-600' onClick={() => closeModal(false)}>X</button>
        </div>

        <div className='flex flex-col items-center'>
          {images.length > 0 ? (
            <div className='relative max-w-full'>
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className='w-full max-h-96 object-cover rounded-xl shadow-lg transition-transform duration-500 ease-in-out hover:scale-105'
              />
              <div className='absolute top-2 left-2 bg-gray-800 text-white text-sm px-2 py-1 rounded-md opacity-80'>
                {currentImageIndex + 1} of {images.length}
              </div>
            </div>
          ) : (
            <p className='text-lg text-gray-600'>No images available</p>
          )}
        </div>

        <div className='flex justify-between mt-6'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer'
            onClick={handlePreviousImage}
            disabled={images.length <= 1}
          >
            Previous
          </button>

          <button
            className='bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600 cursor-pointer'
            onClick={handleNextImage}
            disabled={images.length <= 1}
          >
            Next
          </button>
        </div>

        <div className='border-t-2 border-gray-500 mt-4 pt-4'>
          <div className='text-xl font-semibold'>Price: ${product.price}</div>
          <div className='mt-2'>Description: {product.description}</div>
          <div className='mt-2'>Brand: {product.category}</div>
        </div>

        <div className='border-t-2 border-gray-500 mt-4'>
          <button className='absolute right-3 p-3 m-1 cursor-pointer bg-gray-300 hover:bg-gray-400 text-black rounded-md' onClick={() => closeModal(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
