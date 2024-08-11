
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from './imageApi';

export const fetchImages = createAsyncThunk('image/fetchImages', async () => {
  const response = await api.fetchImages();
  return response.data;
});
export const fetchImageDetail = createAsyncThunk('image/fetchImageDetail', async (id) => {
    const response = await api.fetchImageDetail(id);
    return response.data;
  });

export const deleteImage = createAsyncThunk('image/deleteImage', async (id) => {
  await api.deleteImage(id);
  return id;
});

export const createImage = createAsyncThunk('image/createImage', async (imageData) => {
  const response = await api.createImage(imageData);
  return response.data;
});

export const updateImage = createAsyncThunk('image/updateImage', async (imageData) => {
  const response = await api.updateImage(imageData);
  return response.data;
});

const initialState = {
  images: [],
  status: 'idle',
  error: null,
};

const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.images = action.payload;
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteImage.fulfilled, (state, action) => {
        state.images = state.images.filter((image) => image._id !== action.payload);
      })
      .addCase(createImage.fulfilled, (state, action) => {
        state.images.push(action.payload);
      })
      .addCase(updateImage.fulfilled, (state, action) => {
        const index = state.images.findIndex((image) => image._id === action.payload._id);
        if (index !== -1) {
          state.images[index] = action.payload;
        }
      })
      .addCase(fetchImageDetail.pending, (state) => { 
        state.status = 'loading';
      })
      .addCase(fetchImageDetail.fulfilled, (state, action) => { 
        state.status = 'succeeded';
        state.imageDetail = action.payload;
      })
      .addCase(fetchImageDetail.rejected, (state, action) => { 
        state.status = 'failed';
        state.error = action.error.message;
      });
    
  },
});

export default imageSlice.reducer;
