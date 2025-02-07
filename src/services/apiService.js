import axios from './baseURL';

export const getProduct = async () => {
    try {
        const response = await axios.get(`products/category/smartphones`);
        console.log('List of Products:', response.data);
          return response.data;
      } catch (error) {
          console.error('Error fetching product list:', error);
      }
};

export const deleteProductById = async (id) => {
    try {
      const response = await axios.delete(`products/${id}`);
      console.log(`Product with ID ${id} deleted successfully`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
    }
  };

  export const updateProductById = async (id, updatedProduct) => {
    try {
      const response = await axios.put(`products/${id}`, updatedProduct);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update product');
    }
  };