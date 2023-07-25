// ** Zustand Imports
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Product } from '@/utils/api/server/zod/products';

export type ProductMap = Record<string, Product>;

export interface ProductStates {
  initialized: Date | null;
  products: ProductMap;
}

export interface ProductActions {
  resetProducts: () => void;
  setProducts: (products: Product[], initialized?: Date) => void;
  addProduct: (product: Product) => void;
  addProducts: (products: Product[]) => void;
  removeProduct: (product: Product) => void;
  removeProducts: (products: Product[]) => void;
  removeProductById: (productId: string) => void;
  removeProductsById: (productIds: string[]) => void;
}

const initialState: ProductStates = {
  initialized: null,
  products: {},
};

const useProductStore = create<ProductStates & ProductActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetProducts: () => {
        set(initialState);
      },
      setProducts: (products, initialized) => {
        const productMap: ProductMap = {};
        products.forEach((p) => {
          productMap[p.id] = p;
        });

        set({
          initialized: initialized === undefined ? new Date() : initialized,
          products: productMap,
        });
      },
      addProduct: (product) => {
        const { products } = get();

        if (product.id in products) {
          // Already exist
          return;
        }

        const newProduct = { ...products };
        newProduct[product.id] = product;

        set({
          products: newProduct,
        });
      },
      addProducts: (newProducts) => {
        const { products } = get();

        const updatedProducts = { ...products };
        newProducts.forEach((p) => {
          updatedProducts[p.id] = p;
        });

        set({
          products: updatedProducts,
        });
      },
      removeProduct: (product) => {
        get().removeProductById(product.id);
      },
      removeProducts: (productsToRemove) => {
        const { products } = get();

        const somethingToRemove = productsToRemove.some((p) => p.id in products);

        if (somethingToRemove) {
          const updatedProducts = { ...products };
          productsToRemove.forEach((p) => {
            if (p.id in updatedProducts) {
              delete updatedProducts[p.id];
            }
          });

          set({
            products: updatedProducts,
          });
        }
      },
      removeProductById: (productId) => {
        const { products } = get();
        if (productId in products) {
          const updatedProducts = { ...products };
          if (productId in updatedProducts) {
            delete updatedProducts[productId];
          }

          set({
            products: updatedProducts,
          });
        }
      },
      removeProductsById: (productIdsToRemove) => {
        const { products } = get();

        const somethingToRemove = productIdsToRemove.some((p) => p in products);

        if (somethingToRemove) {
          const updatedProducts = { ...products };
          productIdsToRemove.forEach((p) => {
            if (p in updatedProducts) {
              delete updatedProducts[p];
            }
          });

          set({
            products: updatedProducts,
          });
        }
      },
    }),
    { name: 'product-store' }
  )
);

export default useProductStore;
