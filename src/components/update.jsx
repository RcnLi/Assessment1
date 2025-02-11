import React, { useState } from 'react';
import { updateProductById } from '../services/apiService';

function Update({ closeModal, product, updateProduct }) {
    const [updatedProduct, setUpdatedProduct] = useState({
        title: product?.title || '',
        price: product?.price || '',
        description: product?.description || '',
        category: product?.category || '',
    });

    const handleChange = (e) => {
        setUpdatedProduct({ ...updatedProduct, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const updatedData = await updateProductById(product.id, updatedProduct);
            updateProduct(updatedData); // Update state in parent
            closeModal(); 
        } catch (error) {
            console.error('Update failed', error);
        }
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
            <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className="text-xl font-bold mb-4 text-orange-500">Update Product</h2>
                <input type="text" name="title" value={updatedProduct.title} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Title" />
                <input type="number" name="price" value={updatedProduct.price} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Price" />
                <input type="text" name="description" value={updatedProduct.description} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Description" />
                <input type="text" name="category" value={updatedProduct.category} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Category" />
                
                <div className="flex justify-end gap-2 mt-4">
                    <button onClick={closeModal} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                    <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                </div>
            </div>
        </div>
    );
}

export default Update;
