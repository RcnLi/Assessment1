import React, { useState } from 'react';

function Add({ closeModal, addProduct, lastProductId }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  const handleAddProduct = () => {
    const newProduct = {
      id: lastProductId + 1,
      title,
      price,
      description,
      category,
      images: [image],
    };
    addProduct(newProduct);
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[60%] h-auto p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Add Product</h2>
          <button 
            className="text-gray-500 hover:text-gray-800 text-lg font-bold" 
            onClick={() => closeModal(false)}
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 flex flex-col">
          <input 
            className="w-full p-2 border rounded-md" 
            type="text" 
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input 
            className="w-full p-2 border rounded-md" 
            type="number" 
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <textarea 
            className="w-full p-2 border rounded-md" 
            rows="3" 
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="border p-4 rounded-md flex flex-col items-center">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="mb-2" />
            {image && (
              <img src={image} alt="Uploaded Preview" className="w-32 h-32 object-cover rounded-md mt-2" />
            )}
          </div>
          <input 
            className="w-full p-2 border rounded-md" 
            type="text" 
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <button 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}

export default Add;
