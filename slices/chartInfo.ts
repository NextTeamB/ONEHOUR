import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

export interface challengeState {
  challengeTimeAvg: number | null;
  difficultAvg: number | null;
  succeedCount: number | null;
}
// state 초기값 설정
const initialState: challengeState = {
  challengeTimeAvg: 0,
  difficultAvg: 0,
  succeedCount: 0,
};

const challengeSlice = createSlice({
  name: "chart",
  initialState,
  reducers: {
    // 평균 시간달성도 리듀서 - payload 객체에서 챌린지 시간의 평균값을 받아 저장
    timeSave: (state, action) => {
      state.challengeTimeAvg = action.payload;
    },
    // 난이도 평균 리듀서 - payload 객체에서 챌린지 난이도의 평균값을 받아 저장
    diffSave: (state, action) => {
      state.difficultAvg = action.payload;
    },
    // 성공횟수 리듀서 - payload 객체에서 성공 횟수의 퍼센테이지(반올림) 값을 받아 저장
    succeedSave: (state, action) => {
      state.succeedCount = action.payload;
    },
    averageSave: (state, action) => {
      state.challengeTimeAvg = action.payload.timeAvrg;
      state.difficultAvg = action.payload.diffAvrg;
      state.succeedCount = action.payload.succeedCount;
    },
  },
  // 로그아웃 시 유저정보를 삭제하기 위해 store를 purge하는 작업. 공식문서에 따라 extraReducers를 사용해 적용함
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  },
});

export const { timeSave, diffSave, succeedSave, averageSave } = challengeSlice.actions;
export default challengeSlice.reducer;
