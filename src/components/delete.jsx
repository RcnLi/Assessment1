import React from 'react';

function Delete({ closeModal, deleteProduct, productId, product }) {
  const handleDelete = () => {
    deleteProduct(productId);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 justify-center items-center flex">
      <div className='bg-white w-[40%] h-[40%] font-bold text-red-700 p-4 rounded-xl shadow-lg flex justify-center items-center flex-col'>
        <div className='mb-5'>
          Are you sure you want to delete this product?
        </div>
        
        <div className="flex justify-center mt-4 space-x-4">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-bold"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded-lg font-bold"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Delete;
