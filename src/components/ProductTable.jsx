import React, { useEffect, useState } from 'react';
import { getProduct, deleteProductById } from '../services/apiService'; 
import Modal from './modal.jsx';
import Add from './add.jsx';
import Delete from './delete.jsx';
import Update from './update.jsx';

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [input, setInputSearch] = useState('');
  const [showClear, setShowClear] = useState(false);
  const [showAdd, setShowAddModal] = useState(false);
  const [showDelete, setShowDeleteModal] = useState(false);
  const [showUpdate, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToUpdate, setProductToUpdate] = useState(null);
  const [productsPerPage, setProductsPerPage] = useState(5); 
  const [currentPage, setCurrentPage] = useState(1); 
  const [searching, setSearching] = useState(false);

  const updateProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  const addProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const lastProductId = products.length ? products[products.length - 1].id : 0;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProduct();
        if (response) {
          const data = response.products;
          setProducts(data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setInputSearch(value.toLowerCase());
    setShowClear(value.length > 0);
    setSearching(true);
    setTimeout(() => setSearching(false), 500);
  };

  const clearSearch = () => {
    setInputSearch('');
    setShowClear(false);
  };

  const deleteProduct = async (id) => {
    try {
      await deleteProductById(id);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      alert('Product successfully deleted');
    } catch (error) {
      alert('Failed to delete product');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(input)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1); 
  };

  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <div className="my-8 p-4 max-w-6xl mx-auto bg-white shadow-lg rounded-b-xl">
        <div className="flex flex-row justify-center items-center">
          <h1 className="text-orange-500 text-2xl font-bold mb-4">Product List</h1>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md ml-auto hover:bg-blue-600"
            onClick={() => setShowAddModal(true)}
          >
            Add
          </button>
        </div>
        <div className="relative w-full max-w-full mb-4 mx-auto">
          <input
            onChange={handleSearch}
            value={input}
            className="w-full p-3 border border-gray-600 rounded-xl pr-10"
            placeholder="Search smartphone"
          />
          {showClear && (
            <button
              className="absolute top-1/2 right-2 pr-5 transform -translate-y-1/2 text-gray-500 hover:text-black font-bold border-l-2"
              onClick={clearSearch}
            >
              <span className="pl-5">X</span>
            </button>
          )}
        </div>

        {searching ? (
          <div className="text-center text-lg font-semibold text-blue-500">Searching...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="table-auto border-collapse border border-gray-300 w-full max-w-auto mx-auto">
                <thead className="bg-blue-400 text-white">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">ID</th>
                    <th className="border border-gray-300 px-1 py-1">Title</th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-1 py-1">Description</th>
                    <th className="border border-gray-300 px-4 py-2">Category</th>
                    <th className="border border-gray-300 px-4 py-2">Image</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentProducts.map((product) => (
                    <tr key={product.id} className="odd:bg-gray-50 even:bg-gray-100">
                      <td className="border border-gray-300 px-4 py-2 text-sm">{product.id}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{product.title}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">${product.price}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{product.description}</td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">{product.category}</td>
                      <td
                        onClick={() => setSelectedProduct(product)}
                        className="border border-gray-300 px-4 py-2 text-sm cursor-pointer"
                      >
                        {product.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={product.title}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        ))}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-sm">
                        <button
                          onClick={() => {
                            setProductToDelete(product.id);
                            setShowDeleteModal(true);
                          }}
                          className="bg-red-500 cursor-pointer p-3 rounded-md font-bold text-white m-1"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            setProductToUpdate(product);
                            setShowUpdateModal(true);
                          }}
                          className="bg-orange-500 cursor-pointer p-3 rounded-md font-bold text-white m-1"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center mt-4">
              <div>
                <label htmlFor="productsPerPage" className="mr-2">
                  Products per page:
                </label>
                <select
                  id="productsPerPage"
                  value={productsPerPage}
                  onChange={handleProductsPerPageChange}
                  className="p-2 border rounded"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-gray-300 rounded disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>

            {selectedProduct && !showUpdate && (
              <Modal closeModal={() => setSelectedProduct(null)} product={selectedProduct} />
            )}
            {showAdd && (
              <Add closeModal={() => setShowAddModal(false)} addProduct={addProduct} lastProductId={lastProductId} />
            )}
            {showDelete && (
              <Delete closeModal={() => setShowDeleteModal(false)} productId={productToDelete} deleteProduct={deleteProduct} />
            )}
            {showUpdate && (
              <Update
                closeModal={() => setShowUpdateModal(false)}
                product={productToUpdate}
                updateProduct={updateProduct}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default ProductTable;
