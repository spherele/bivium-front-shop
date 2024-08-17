import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Filter {
  isApplied: boolean;
}

interface CategoryFilter extends Filter {
  id: number;
  name: string;
}

interface ColorFilter extends Filter {
  id: number;
  code: string;
  hex: string;
}

interface SizeFilter extends Filter {
  id: number;
  name: string;
}

interface Filters {
  categories: CategoryFilter[];
  colors: ColorFilter[];
  sizes: SizeFilter[];
}

const initialState: Filters = {
  categories: [],
  colors: [],
  sizes: []
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    addCategory: (state, action: PayloadAction<Omit<CategoryFilter, 'isApplied'>>) => {
      const categoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
      categoryIndex === -1 && state.categories.push({ ...action.payload, isApplied: false });
    },
    addColor: (state, action: PayloadAction<Omit<ColorFilter, 'isApplied'>>) => {
      const colorIndex = state.colors.findIndex(color => color.id === action.payload.id);
      colorIndex === -1 && state.colors.push({ ...action.payload, isApplied: false });
    },
    addSize: (state, action: PayloadAction<Omit<SizeFilter, 'isApplied'>>) => {
      const sizeIndex = state.sizes.findIndex(size => size.id === action.payload.id);
      sizeIndex === -1 && state.sizes.push({ ...action.payload, isApplied: false });
    },
    applyCategoryFilter: (state, action: PayloadAction<Pick<CategoryFilter, 'id'> & { state: boolean }>) => {
      const categoryIndex = state.categories.findIndex(category => category.id === action.payload.id);
      categoryIndex !== -1 && (state.categories[categoryIndex].isApplied = action.payload.state);
    },
    applyColorFilter: (state, action: PayloadAction<Pick<ColorFilter, 'id'> & { state: boolean }>) => {
      const colorIndex = state.colors.findIndex(color => color.id === action.payload.id);
      colorIndex !== -1 && (state.colors[colorIndex].isApplied = action.payload.state);
    },
    applySizeFilter: (state, action: PayloadAction<Pick<SizeFilter, 'id'> & { state: boolean }>) => {
      const sizeIndex = state.sizes.findIndex(size => size.id === action.payload.id);
      sizeIndex !== -1 && (state.sizes[sizeIndex].isApplied = action.payload.state);
    }
  }
});

export const { addCategory, addColor, addSize, applyCategoryFilter, applyColorFilter, applySizeFilter } =
  filtersSlice.actions;

export default filtersSlice;
