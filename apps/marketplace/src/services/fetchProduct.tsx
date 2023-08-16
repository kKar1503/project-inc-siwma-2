import apiClient from '@/utils/api/client/apiClient';
import products from '@/utils/api/client/zod/products';

const fetchProduct = async (productID: string) => {
  const response = await apiClient.get(`/v1/products/${productID}`);

  // parse data through zod to ensure that data is correct
  const productData = products.getById.parse(response.data.data[0]);

  return productData;
};

export default fetchProduct;
