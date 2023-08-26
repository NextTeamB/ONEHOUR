import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface challengeState {
  title: string | null;
  description: string | null;
  difficulty: number | null;
}
// state 초기값 설정
const initialState: challengeState = {
  title: "",
  description: "",
  difficulty: 0,
};

const challengeSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // 챌린지 리듀서 - payload 객체에서 챌린지 제목과 설명, 난이도를 받아 저장
    challenge: (state, action) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
      state.difficulty = action.payload.difficulty;
    },
  },
  // 로그아웃 시 유저정보를 삭제하기 위해 store를 purge하는 작업. 공식문서에 따라 extraReducers를 사용해 적용함
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { challenge } = challengeSlice.actions;
export default challengeSlice.reducer;
