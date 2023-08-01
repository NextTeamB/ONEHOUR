import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/getAllUsers",
  async (thunkApi) => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/todos/6"
    );
    const data = await response.json();
    return data;
  }
);

const initialState = {
  entities: [],
  value: 10,
} as any;

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    increment: (state) => {
      state.value++;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.entities.push(action.payload);
    });
  },
});

export const { increment } = userSlice.actions;
export default userSlice.reducer;
