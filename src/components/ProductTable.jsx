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
            className="w-full p-3 border border-gray-600 rounded-s pr-10"
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
            <div className="overflow-x-auto w-full">
        <table className="table-auto border-collapse w-full">
          <thead className="text-md text-black hidden sm:table-header-group">
            <tr className="bg-gray-200">
              <th className="px-4 py-3 text-sm sm:text-base">Thumbnail</th>
              <th className="px-2 py-1 text-center text-sm sm:text-base">Name</th>
              <th className="px-1 py-1 text-left hidden sm:table-cell">Description</th>
              <th className="px-5 py-4 text-sm sm:text-base">Price</th>
              <th className="text-sm sm:text-base">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr className="px-4 py-2 cursor-pointer odd:bg-gray-50 even:bg-gray-100 hover:bg-gray-200"  key={product.id} >
                <td onClick={() => setSelectedProduct(product)} className='flex items-center justify-center'>
                  <img src={product.images[0]} alt={product.title} className="w-10 sm:w-12 h-10 sm:h-12 object-cover rounded-md" />
                </td>
                <td onClick={() => setSelectedProduct(product)}  className="px-2 sm:px-4 py-2 text-xs sm:text-sm sm:text-top">{product.title}</td>
                <td
                onClick={() => setSelectedProduct(product)}
                className="
                  px-4 py-2 text-xs sm:text-sm 
                  truncate max-w-[250px] 
                  sm:whitespace-normal sm:overflow-visible sm:max-w-none
                "
              >
                {product.description}
              </td>
                <td onClick={() => setSelectedProduct(product)}  className="px-2 sm:px-4 py-2 text-xs sm:text-sm text-center">
                  <div className="flex flex-col items-center">
                    <span className="text-blue-500 font-bold">₱{product.price}</span>
                    <span className="text-white text-xs bg-blue-600 rounded-xl p-1 sm:p-2 mt-1">
                      {Math.ceil(product.discountPercentage)}% Off
                    </span>
                  </div>
                </td>
                <td className="px-2 sm:px-4 py-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => {
                      setProductToDelete(product.id);
                      setShowDeleteModal(true);
                    }}
                    className="bg-red-500 cursor-pointer px-2 sm:px-3 py-1 sm:py-2 rounded-md font-bold text-white text-xs sm:text-sm"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setProductToUpdate(product);
                      setShowUpdateModal(true);
                    }}
                    className="bg-orange-500 cursor-pointer px-2 sm:px-3 py-1 sm:py-2 rounded-md font-bold text-white text-xs sm:text-sm"
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
