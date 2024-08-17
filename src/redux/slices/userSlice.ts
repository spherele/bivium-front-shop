import { IUser } from '@/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IUser = {
  name: null,
  surname: null,
  patronymic: null,
  gender: null,
  phonenumber: null,
  email: '',
  birthday: '',
  token: '',
  isAuthorized: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    set: (state, action: PayloadAction<IUser>) => {
      localStorage.setItem('token', action.payload.token);
      return { ...state, ...action.payload };
    },
    logout: () => {
      localStorage.removeItem('token');
      return initialState;
    }
  }
});

export const { set: setUser, logout: logoutUser } = userSlice.actions;
export default userSlice;
