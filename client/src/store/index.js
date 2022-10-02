import { configureStore, createSlice } from '@reduxjs/toolkit';

const mainSlice = createSlice({
  name: 'main',
  initialState: {
    isUpdate: false,
    personalInfo: {
      name: '',
      empId: '',
      role: '',
      location: '',
      uniqueId: '',
    },
  },
  reducers: {
    setUpdate(state, action) {
      state.isUpdate = action.payload;
    },
    setPersonalInfo(state, action) {
      state.personalInfo.name = action.payload.name;
      state.personalInfo.empId = action.payload.empId;
      state.personalInfo.role = action.payload.role;
      state.personalInfo.location = action.payload.location;
      state.personalInfo.uniqueId = action.payload.uniqueId;
    },
  },
});

export const { setUpdate, setPersonalInfo } = mainSlice.actions;

const store = configureStore({
  reducer: mainSlice.reducer,
});

export default store;
