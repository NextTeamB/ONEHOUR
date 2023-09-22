"use client";

import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { login } from "@/slices/userSlice";
import styles from "./settings.module.scss";
import { useRouter } from "next/navigation";
import chevron from "../../../public/icons8-셰브론-오른쪽-52.png";
import closeicon from "../../../public/closeicon.png";
import Image from "next/image";
import { editPassword } from '@/util/onChangeUserInfo';
import { fetchUserAccount, updateAlias } from '@/util/onSettings';

export interface userAccount {
  email: string;
  nickname: string;
}

export default function Settings() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);
  const router = useRouter();

  const initialEditInfo = {
    nickname: "",
    password: "",
  };
  interface editInfoState {
    nickname: string;
    password: string;
  }

  const [editInfo, setEditInfo] = useState<editInfoState>(initialEditInfo);

  const [modalState, setModalState] = useState([0, 0, 0]);

  useEffect(() => {
    fetchUserAccount(dispatch)
      .catch((err) => {
        console.log(err);
      });
    // axios
    //   .get("/api/users/account")
    //   .then((res) => {
    //     dispatch(login(res.data));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input 필드의 값이 변경되면 실행될 onChange 함수
    const newEditInfo = {
      ...editInfo, // 기존값 복사 (spread operator)
      [e.target.name]: e.target.value, // 값 덮어쓰기
    };
    setEditInfo(newEditInfo);
  };

  const editAlias = () => {
    if (editInfo.nickname === "") {
      alert("변경할 닉네임을 입력해주세요.");
      return;
    }
    if (editInfo.nickname.length < 2 || editInfo.nickname.length > 8) {
      alert("닉네임은 2글자 이상 8글자 이하로 입력해주세요.");
      return;
    }
    updateAlias(editInfo, dispatch, setModalState, setEditInfo, initialEditInfo);
    // axios
    //   .patch("/api/users/edit-alias", editInfo)
    //   .then((res) => {
    //     axios
    //       .get("/api/users/account")
    //       .then((res) => {
    //         alert("닉네임 변경이 완료되었습니다");
    //         dispatch(login(res.data));
    //         setModalState([0, 0, 0]);
    //         // 닉네임 변경 후 모달창 조회 시 변경된 닉네임이 유지되는 것 방지
    //         setEditInfo(initialEditInfo);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };


  const withdrawal = () => {
    axios.delete("/api/users/withdrawal").then((res) => {
      alert("회원 탈퇴가 완료되었습니다");
      router.push("/");
    });
  };

  return (
    <div className={styles.settingsForm}>
      <p className={styles.title}>설정</p>
      <p className={styles.subtitle}>
        서비스에서 사용하는 내 계정 정보를 관리할 수 있습니다
      </p>
      <div className={styles.settingsBox}>
        <div className={styles.email}>
          <h3>이메일</h3>
          <p>{userInfo.email}</p>
        </div>
        <div className={styles.nickname}>
          <h3>이름</h3>
          <p>{userInfo.name}</p>
        </div>
        <div className={styles.nickname}>
          <h3>닉네임</h3>
          <p>{userInfo.nickname}</p>
          <button
            className={styles.chevrons}
            onClick={() => {
              modalState[0]
                ? setModalState([0, 0, 0])
                : setModalState([1, 0, 0]);
            }}
          >
            <Image
              className={styles.chevron}
              src={chevron}
              width={30}
              alt="chevron"
            />
          </button>
        </div>
        <div className={styles.password}>
          <h3>비밀번호 변경</h3>
          <button
            className={styles.chevrons}
            onClick={() => {
              modalState[1]
                ? setModalState([0, 0, 0])
                : setModalState([0, 1, 0]);
            }}
          >
            <Image
              className={styles.chevron}
              src={chevron}
              width={30}
              alt="chevron"
            />
          </button>
        </div>
      </div>
      <div className={styles.settingsBox2}>
        <div className={styles.writedrawal}>
          <h3>회원 탈퇴</h3>
          <button
            className={styles.chevrons}
            onClick={() => {
              modalState[2]
                ? setModalState([0, 0, 0])
                : setModalState([0, 0, 1]);
            }}
          >
            <Image
              className={styles.chevron}
              src={chevron}
              width={30}
              alt="chevron"
            />
          </button>
        </div>
      </div>
      <div className={styles[`editAlias${modalState[0]}`]}>
        <p>닉네임을 변경합니다</p>
        <input
          onChange={onChange}
          name="nickname"
          type="text"
          placeholder="변경할 닉네임을 입력해주세요"
        ></input>
        <button
          className={styles.editBtn}
          onClick={() => {
            editAlias();
          }}
        >
          닉네임 변경하기
        </button>
        <button
          className={styles.closeModal}
          onClick={() => {
            setModalState([0, 0, 0]);
          }}
        >
          <Image
            className={styles.closeicon}
            src={closeicon}
            width={20}
            alt="chevron"
          />
        </button>
      </div>
      <div className={styles[`modalBG${modalState[0]}`]}></div>
      <div className={styles[`editPassword${modalState[1]}`]}>
        <p>비밀번호를 변경합니다</p>
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="변경할 비밀번호를 입력해주세요"
        ></input>
        <button
          className={styles.editBtn}
          onClick={() => {
            editPassword(editInfo, setModalState, setEditInfo);
          }}
        >
          비밀번호 변경하기
        </button>
        <button
          className={styles.closeModal}
          onClick={() => {
            setModalState([0, 0, 0]);
          }}
        >
          <Image
            className={styles.closeicon}
            src={closeicon}
            width={20}
            alt="chevron"
          />
        </button>
      </div>
      <div className={styles[`modalBG${modalState[1]}`]}></div>
      <div className={styles[`withdrawal${modalState[2]}`]}>
        <p>정말 탈퇴하시겠습니까?</p>
        <button
          className={styles.editBtn2}
          onClick={() => {
            withdrawal();
          }}
        >
          회원탈퇴
        </button>
        <button
          className={styles.closeModal}
          onClick={() => {
            setModalState([0, 0, 0]);
          }}
        >
          <Image
            className={styles.closeicon}
            src={closeicon}
            width={20}
            alt="chevron"
          />
        </button>
      </div>
      <div className={styles[`modalBG${modalState[2]}`]}></div>
    </div>
  );
}
