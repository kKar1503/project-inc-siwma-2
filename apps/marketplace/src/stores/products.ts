import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ListingItem } from '@inc/db';

export type ProductMap = Record<number, ListingItem>;

export interface ProductStates {
  initialized: Date | null;
  productIds: number[];
  products: ProductMap;
}

export interface ProductActions {
  resetProducts: () => void;
  setProducts: (products: ListingItem[], initialized?: Date, isSorted?: boolean) => void;
  addProduct: (product: ListingItem) => void;
  addProducts: (products: ListingItem[], isSorted?: boolean) => void;
  removeProduct: (product: ListingItem) => void;
  removeProducts: (products: ListingItem[], isSorted?: boolean) => void;
  removeProductById: (productId: number) => void;
  removeProductsById: (productIds: number[], isSorted?: boolean) => void;
}

const initialState: ProductStates = {
  initialized: null,
  productIds: [],
  products: {},
};

const useProductStore = create<ProductStates & ProductActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetProducts: () => {
        set(initialState);
      },
      setProducts: (products, initialized, isSorted = false) => {
        const sortedProducts = isSorted ? products : products.sort((a, b) => a.id - b.id);
        const productMap: ProductMap = {};
        sortedProducts.forEach((p) => {
          productMap[p.id] = p;
        });
        set({
          initialized: initialized === undefined ? new Date() : initialized,
          productIds: sortedProducts.map((p) => p.id),
          products: productMap,
        });
      },
      addProduct: (product) => {
        const { productIds, products } = get();

        if (productIds.indexOf(product.id) !== -1) {
          // Already exist
          return;
        }

        const newArrLength = productIds.length + 1;

        const newProductIds = new Array<number>(newArrLength);

        let inserted = false;
        for (let i = 0; i < newArrLength; i++) {
          if (inserted) {
            newProductIds[i] = productIds[i - 1];
          }

          if (i === productIds.length || productIds[i] > product.id) {
            newProductIds[i] = product.id;
            inserted = true;
          } else {
            newProductIds[i] = productIds[i];
          }
        }

        const newProduct = { ...products };
        newProduct[product.id] = product;

        set({
          productIds: newProductIds,
          products: newProduct,
        });
      },
      addProducts: (newProducts, isSorted = false) => {
        const { productIds, products } = get();

        const sortedNewProducts = isSorted ? newProducts : newProducts.sort((a, b) => a.id - b.id);
        const sortedNewProductIds = sortedNewProducts.map((p) => p.id);

        const combinedProductIdsSet = new Set([...sortedNewProductIds, ...productIds]);

        if (combinedProductIdsSet.size === productIds.length) {
          // Since the set has no change in length meaning that there's no new
          // unique IDs from the original list
          return;
        }

        const newArrLength = combinedProductIdsSet.size;

        const updatedProductIds = new Array<number>(newArrLength);

        let j = 0; // original
        let k = 0; // new
        for (let i = 0; i < newArrLength; i++) {
          const productId = productIds[j];
          const newProductId = sortedNewProductIds[k];

          if (j === productIds.length) {
            // Handles when productIds are all filled into the arr
            updatedProductIds[i] = newProductId;
            k++;
          } else if (k === sortedNewProductIds.length) {
            // Handles when sortedNewProductIds are all filled into the arr
            updatedProductIds[i] = productId;
            j++;
          } else if (productId === newProductId) {
            // We prioritizes the sortedNewProductIds and sortedNewProducts
            // as they are likely to be the "newer" version
            updatedProductIds[i] = newProductId;
            j++;
            k++;
          } else if (productId > newProductId) {
            updatedProductIds[i] = newProductId;
            k++;
          } else {
            updatedProductIds[i] = productId;
            j++;
          }
        }

        const updatedProducts = { ...products };
        newProducts.forEach((p) => {
          updatedProducts[p.id] = p;
        });

        set({
          productIds: updatedProductIds,
          products: updatedProducts,
        });
      },
      removeProduct: (product) => {
        get().removeProductById(product.id);
      },
      removeProducts: (productsToRemove, isSorted = false) => {
        const { productIds, products } = get();
        const sortedRemoveProducts = isSorted ? productsToRemove : productsToRemove.sort();
        const updatedProductIds: number[] = [];

        // Since both arrays are sorted, and we will need to create a new array.
        // We can do a O(m+n) double pointer traversal to remove items in the second array.
        let i = 0;
        let j = 0;
        let finished = false;
        let somethingRemoved = false;
        while (!finished) {
          if (j === sortedRemoveProducts.length) {
            // Out of index range, already finished going through the j value
            if (i < productIds.length) {
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              finished = true;
            }
          } else {
            const productId = productIds[i];
            const removeProductId = sortedRemoveProducts[j].id;

            if (productId === removeProductId) {
              // Id is the same, will means the product gets removed, and thus not pushed to the new array.
              j++;
              i++;
              somethingRemoved = true;
            } else if (productId < removeProductId) {
              // productId is less meaning that this shouldn't be removed
              // since we haven't reach the next one to remove
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              // productId is more, this shouldn't happen, but since it does,
              // it's likely the remove array was not deduped.
              // We will skip
              j++;
            }
          }
        }

        if (somethingRemoved) {
          const updatedProducts = { ...products };
          productsToRemove.forEach((p) => {
            if (p.id in updatedProducts) {
              delete updatedProducts[p.id];
            }
          });

          set({
            productIds: updatedProductIds,
            products: updatedProducts,
          });
        }
      },
      removeProductById: (productId) => {
        const idx = get().productIds.indexOf(productId);
        if (idx !== -1) {
          const updatedProducts = { ...get().products };
          if (productId in updatedProducts) {
            delete updatedProducts[productId];
          }

          set({
            productIds: get().productIds.filter((p) => p !== productId),
            products: updatedProducts,
          });
        }
      },
      removeProductsById: (productIdsToRemove, isSorted = false) => {
        const { productIds, products } = get();
        const sortedRemoveProductIds = isSorted ? productIdsToRemove : productIdsToRemove.sort();
        const updatedProductIds: number[] = [];

        // Since both arrays are sorted, and we will need to create a new array.
        // We can do a O(m+n) double pointer traversal to remove items in the second array.
        let i = 0;
        let j = 0;
        let finished = false;
        let somethingRemoved = false;
        while (!finished) {
          if (j === sortedRemoveProductIds.length) {
            // Out of index range, already finished going through the j value
            if (i < productIds.length) {
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              finished = true;
            }
          } else {
            const productId = productIds[i];
            const removeProductId = sortedRemoveProductIds[j];

            if (productId === removeProductId) {
              // Id is the same, will means the product gets removed, and thus not pushed to the new array.
              j++;
              i++;
              somethingRemoved = true;
            } else if (productId < removeProductId) {
              // productId is less meaning that this shouldn't be removed
              // since we haven't reach the next one to remove
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              // productId is more, this shouldn't happen, but since it does,
              // it's likely the remove array was not deduped.
              // We will skip
              j++;
            }
          }
        }

        if (somethingRemoved) {
          const updatedProducts = { ...products };
          productIdsToRemove.forEach((p) => {
            if (p in updatedProducts) {
              delete updatedProducts[p];
            }
          });

          set({
            productIds: updatedProductIds,
            products: updatedProducts,
          });
        }
      },
    }),
    { name: 'product-store' }
  )
);

export default useProductStore;
