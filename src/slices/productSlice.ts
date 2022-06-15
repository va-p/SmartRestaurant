import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface ProductState {
  productId: string | null;
  productName: string | null;
  productDescription: string | null;
  productCategory: string | null;
  productImage: string | null;
  productTenantId: string | null;
};

// Define the initial state using that type
const initialState: ProductState = {
  productId: null,
  productName: null,
  productDescription: null,
  productCategory: null,
  productImage: null,
  productTenantId: null
};

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setProductId: (state, action: PayloadAction<ProductState['productId']>) => {
      state.productId = action.payload;
    },
    setProductName: (state, action: PayloadAction<ProductState['productName']>) => {
      state.productName = action.payload;
    },
    setProductDescription: (state, action: PayloadAction<ProductState['productDescription']>) => {
      state.productDescription = action.payload;
    },
    setProductCateogy: (state, action: PayloadAction<ProductState['productCategory']>) => {
      state.productCategory = action.payload;
    },
    setProductImage: (state, action: PayloadAction<ProductState['productImage']>) => {
      state.productImage = action.payload;
    },
    setProductTenantId: (state, action: PayloadAction<ProductState['productTenantId']>) => {
      state.productTenantId = action.payload;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  setProductId,
  setProductName,
  setProductDescription,
  setProductCateogy,
  setProductImage,
  setProductTenantId
} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProductId = (state: RootState) => state.product.productId;
export const selectProductName = (state: RootState) => state.product.productName;
export const selectProductDescription = (state: RootState) => state.product.productDescription;
export const selectProductCategory = (state: RootState) => state.product.productCategory;
export const selectProductImage = (state: RootState) => state.product.productImage;
export const selectProductTenantId = (state: RootState) => state.product.productTenantId;

export default productSlice.reducer;