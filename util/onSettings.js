import axios from 'axios';
import { login } from "@/slices/userSlice";

// 계정 정보 가져오기
export const fetchUserAccount = async (dispatch) => {
  try {
    const response = await axios.get("/api/users/account");
    dispatch(login(response.data));
  } catch (error) {
    console.error(error);
  }
};

// 닉네임 변경하기
export const updateAlias = async (editInfo, dispatch, setModalState, setEditInfo, initialEditInfo) => {
  try {
    const response = await axios.patch("/api/users/edit-alias", editInfo);
    await fetchUserAccount(dispatch); // 변경된 닉네임을 가져오기 위해 다시 계정 정보를 가져옵니다.
    // alert("닉네임 변경이 완료되었습니다");
    setModalState([0, 0, 0]);
    // 닉네임 변경 후 모달창 조회 시 변경된 닉네임이 유지되는 것 방지
    setEditInfo(initialEditInfo);
  } catch (error) {
    console.error(error);
  }
};