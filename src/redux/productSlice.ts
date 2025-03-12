import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getData } from 'components/ag-grid/data';
import { transformDataForAGGrid } from 'pages/planning/PlanningTable';
import { SALESDATA, SKU, STORES } from 'utils/constants';

export interface StoreInputs {
  id: string;
  seqNo?: number;
  label: string;
  city: string;
  state: string;
}

export interface SKUInterface {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

interface productState {
  stockRowData: StoreInputs[];
  skuRowData: SKUInterface[];
  planningRowData: any;
}

const initialState: productState = {
  stockRowData: getData(),
  skuRowData: SKU,
  planningRowData: transformDataForAGGrid(STORES, SKU, SALESDATA)
};

const productSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addToStore: (state, action: PayloadAction<StoreInputs>) => {
      const newId = state.stockRowData.length > 0 ? (state.stockRowData[state.stockRowData.length - 1].seqNo ?? 0) + 1 : 1;
      state.stockRowData.unshift({ ...action.payload, seqNo: newId });
    },
    deleteFromStore: (state, action: PayloadAction<string>) => {
      state.stockRowData = state.stockRowData.filter((item) => item.id !== action.payload);
    },
    addToSKU: (state, action: PayloadAction<SKUInterface>) => {
      state.skuRowData.unshift({ ...action.payload });
    },
    deleteFromSKU: (state, action: PayloadAction<string>) => {
      state.skuRowData = state.skuRowData.filter((item) => item.id !== action.payload);
    }
  }
});

export const { addToStore, deleteFromStore, addToSKU, deleteFromSKU } = productSlice.actions;

export default productSlice.reducer;
