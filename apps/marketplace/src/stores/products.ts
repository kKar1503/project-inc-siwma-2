import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ListingItem } from '@inc/db';

export interface ProductStates {
  initialized: Date | null;
  productIds: number[];
  products: ListingItem[];
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
  products: [],
};

const useProductStore = create<ProductStates & ProductActions>()(
  devtools(
    (set, get) => ({
      ...initialState,
      resetProducts: () => set(initialState),
      setProducts: (products, initialized, isSorted = false) => {
        const sortedProducts = isSorted ? products : products.sort((a, b) => a.id - b.id);
        set({
          initialized: initialized === undefined ? new Date() : initialized,
          productIds: sortedProducts.map((p) => p.id),
          products: sortedProducts,
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
        const newProducts = new Array<ListingItem>(newArrLength);

        let inserted = false;
        for (let i = 0; i < newArrLength; i++) {
          if (inserted) {
            newProductIds[i] = productIds[i - 1];
            newProducts[i] = products[i - 1];
          }

          if (i === productIds.length || productIds[i] > product.id) {
            newProductIds[i] = product.id;
            newProducts[i] = { ...product };
            inserted = true;
          } else {
            newProductIds[i] = productIds[i];
            newProducts[i] = products[i];
          }
        }

        set({
          productIds: newProductIds,
          products: newProducts,
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
        const updatedProducts = new Array<ListingItem>(newArrLength);

        let j = 0; // original
        let k = 0; // new
        for (let i = 0; i < newArrLength; i++) {
          const productId = productIds[j];
          const newProductId = sortedNewProductIds[k];

          if (j === productIds.length) {
            // Handles when productIds are all filled into the arr
            updatedProductIds[i] = newProductId;
            updatedProducts[i] = sortedNewProducts[k];
            k++;
          } else if (k === sortedNewProductIds.length) {
            // Handles when sortedNewProductIds are all filled into the arr
            updatedProductIds[i] = productId;
            updatedProducts[i] = products[j];
            j++;
          } else if (productId === newProductId) {
            // We prioritizes the sortedNewProductIds and sortedNewProducts
            // as they are likely to be the "newer" version
            updatedProductIds[i] = newProductId;
            updatedProducts[i] = sortedNewProducts[k];
            j++;
            k++;
          } else if (productId > newProductId) {
            updatedProductIds[i] = newProductId;
            updatedProducts[i] = sortedNewProducts[k];
            k++;
          } else {
            updatedProductIds[i] = productId;
            updatedProducts[i] = products[j];
            j++;
          }
        }

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
        const updatedProducts: ListingItem[] = [];

        // Since both arrays are sorted, and we will need to create a new array.
        // We can do a O(m+n) double pointer traversal to remove items in the second array.
        let i = 0;
        let j = 0;
        let finished = false;
        let somethingRemoved = false;
        while (!finished) {
          console.log(JSON.stringify({ i, j, updatedProductIds }));
          if (j === sortedRemoveProducts.length) {
            // Out of index range, already finished going through the j value
            if (i < productIds.length) {
              updatedProducts.push(products[i]);
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              finished = true;
            }
          } else {
            const productId = productIds[i];
            const removeProductId = sortedRemoveProducts[j].id;

            if (productId === removeProductId) {
              console.log('a');
              // Id is the same, will means the product gets removed, and thus not pushed to the new array.
              j++;
              i++;
              somethingRemoved = true;
            } else if (productId < removeProductId) {
              console.log('b');
              // productId is less meaning that this shouldn't be removed
              // since we haven't reach the next one to remove
              updatedProductIds.push(productIds[i]);
              updatedProducts.push(products[i]);
              i++;
            } else {
              console.log('c');
              // productId is more, this shouldn't happen, but since it does,
              // it's likely the remove array was not deduped.
              // We will skip
              j++;
            }
          }
        }

        if (somethingRemoved)
          set({
            productIds: updatedProductIds,
            products: updatedProducts,
          });
      },
      removeProductById: (productId) => {
        const idx = get().productIds.indexOf(productId);
        if (idx !== -1) {
          set((state) => ({
            productIds: state.productIds.filter((p) => p !== productId),
            products: state.products.filter((p) => p.id !== productId),
          }));
        }
      },
      removeProductsById: (productIdsToRemove, isSorted = false) => {
        const { productIds, products } = get();
        const sortedRemoveProductIds = isSorted ? productIdsToRemove : productIdsToRemove.sort();
        const updatedProductIds: number[] = [];
        const updatedProducts: ListingItem[] = [];

        // Since both arrays are sorted, and we will need to create a new array.
        // We can do a O(m+n) double pointer traversal to remove items in the second array.
        let i = 0;
        let j = 0;
        let finished = false;
        let somethingRemoved = false;
        while (!finished) {
          console.log(JSON.stringify({ i, j, updatedProductIds }));
          if (j === sortedRemoveProductIds.length) {
            // Out of index range, already finished going through the j value
            if (i < productIds.length) {
              updatedProducts.push(products[i]);
              updatedProductIds.push(productIds[i]);
              i++;
            } else {
              finished = true;
            }
          } else {
            const productId = productIds[i];
            const removeProductId = sortedRemoveProductIds[j];

            if (productId === removeProductId) {
              console.log('a');
              // Id is the same, will means the product gets removed, and thus not pushed to the new array.
              j++;
              i++;
              somethingRemoved = true;
            } else if (productId < removeProductId) {
              console.log('b');
              // productId is less meaning that this shouldn't be removed
              // since we haven't reach the next one to remove
              updatedProductIds.push(productIds[i]);
              updatedProducts.push(products[i]);
              i++;
            } else {
              console.log('c');
              // productId is more, this shouldn't happen, but since it does,
              // it's likely the remove array was not deduped.
              // We will skip
              j++;
            }
          }
        }

        if (somethingRemoved)
          set({
            productIds: updatedProductIds,
            products: updatedProducts,
          });
      },
    }),
    { name: 'product-store' }
  )
);

export default useProductStore;
