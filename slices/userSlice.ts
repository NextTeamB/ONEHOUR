import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface userState {
  nickname: string | null;
  email: string | null;
  name: string | null;
  accessToken: string | null;
}
// state 초기값 설정
const initialState: userState = {
  nickname: "",
  email: "",
  name: "",
  accessToken: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 로그인 리듀서 - payload 객체에서 이메일과 이름, 닉네임을 받아 저장
    login: (state, action) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
    },
    // 토큰 리듀서 - payload로 액세스 토큰을 넘겨받아 저장. silentRefresh를 위해 토큰 리듀서를 분리함
    getToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
  // 로그아웃 시 유저정보를 삭제하기 위해 store를 purge하는 작업. 공식문서에 따라 extraReducers를 사용해 적용함
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { login, getToken } = userSlice.actions;
export default userSlice.reducer;
