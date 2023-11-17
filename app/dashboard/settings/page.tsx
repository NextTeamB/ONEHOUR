"use client";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
// import { login } from "@/slices/userSlice";
import styles from "./settings.module.scss";
import { useRouter } from "next/navigation";
import chevron from "../../../public/icons8-셰브론-오른쪽-52.png";
import closeicon from "../../../public/closeicon.png";
import Image from "next/image";
import { editPassword } from "@/util/onChangeUserInfo";
import { fetchUserAccount, updateAlias } from "@/util/onSettings";
import imageUpload from "../../../public/imageUpload.png";
import { onImageUpload } from "@/util/onImageUpload";

export interface userAccount {
  email: string;
  nickname: string;
}

export default function Settings() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.user);
  const router = useRouter();
  const profileImgInputRef = useRef<HTMLInputElement | null>(null);
  const [trimedFileName, setTrimedFileName] = useState("");
  const [profileImg, setProfileImgUrl] = useState("");
  const onUploadImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }
    let file = e.target.files[0];
    if (e.target.name == "profileImgInput") {
      onImageUpload(file, "profile", setProfileImgUrl);
    }
  };

  useEffect(() => {
    console.log({ profileImg });
    let trimFilename = profileImg.split("/");
    setTrimedFileName(trimFilename[trimFilename.length - 1]);
    console.log(trimedFileName);
  }, [profileImg]);

  const initialEditInfo = {
    nickname: "",
    password: "",
    passwordCheck: "",
  };
  interface editInfoState {
    nickname: string;
    password: string;
    passwordCheck: string;
  }

  // USER INPUT STATE (OBJECT)
  const [editInfo, setEditInfo] = useState<editInfoState>(initialEditInfo);
  // MODAL STATE MANAGE
  const [modalState, setModalState] = useState([0, 0, 0, 0]);

  useEffect(() => {
    fetchUserAccount(dispatch).catch((err) => {
      console.log(err);
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Input 필드의 값이 변경되면 실행될 onChange 함수
    const newEditInfo = {
      ...editInfo, // 기존값 복사 (spread operator)
      [e.target.name]: e.target.value, // 값 덮어쓰기
    };
    setEditInfo(newEditInfo);
  };

  // 닉네임 변경 호출 API
  const editAlias = () => {
    if (editInfo.nickname === "") {
      alert("변경할 닉네임을 입력해주세요.");
      return;
    }
    if (editInfo.nickname.length < 2 || editInfo.nickname.length > 8) {
      //alert("닉네임은 2글자 이상 8글자 이하로 입력해주세요.");
      return;
    }
    updateAlias(
      editInfo,
      dispatch,
      setModalState,
      setEditInfo,
      initialEditInfo
    );
  };

  // 회원 탈퇴 API 호출
  const withdrawal = () => {
    axios.delete("/api/users/withdrawal").then((res) => {
      alert("회원 탈퇴가 완료되었습니다");
      router.push("/");
    });
  };

  const onUploadImgButtonClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (!ref.current) {
      return;
    }
    ref.current.click();
  };

  return (
    <div className={styles.settingsForm}>
      <input
        type="file"
        name="profileImgInput"
        accept="image/*"
        ref={profileImgInputRef} // inputRef로 접근할 수 있도록 ref 지정
        onChange={onUploadImg}
        style={{ display: "none" }} // input 요소는 원하는대로 스타일링을 하는 것이 제한적이므로 이를 숨기고 따로 생성한 이미지 업로드 버튼 클릭 이벤트를 통해 이미지 업로드 구현
      />
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
          <h3>닉네임</h3>
          <p>{userInfo.nickname}</p>
          <button
            className={styles.chevrons}
            onClick={() => {
              modalState[0]
                ? setModalState([0, 0, 0, 0])
                : setModalState([1, 0, 0, 0]);
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
        <div className={styles.nickname}>
          <h3>프로필 이미지 변경</h3>
          <p></p>
          <button
            className={styles.chevrons}
            onClick={() => {
              modalState[1]
                ? setModalState([0, 0, 0, 0])
                : setModalState([0, 1, 0, 0]);
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
              modalState[2]
                ? setModalState([0, 0, 0, 0])
                : setModalState([0, 0, 1, 0]);
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
              modalState[3]
                ? setModalState([0, 0, 0, 0])
                : setModalState([0, 0, 0, 1]);
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

      {/* 닉네임 변경 컴포넌트 */}
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
            setModalState([0, 0, 0, 0]);
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

      {/* 프로필 이미지 변경 모달 컴포넌트 */}
      <div className={styles[`editProfile${modalState[1]}`]}>
        <h3>프로필 이미지를 변경합니다</h3>
        <p>
          이미지를 선택하여 업로드해주세요
          <br />
          커뮤니티 수칙을 위반하는 이미지 업로드 시 계정 이용에 불이익이 있을 수
          있습니다
        </p>
        <div className={styles.imageUpload}>
          <button
            onClick={() => {
              onUploadImgButtonClick(profileImgInputRef);
            }}
          >
            <Image
              className={styles.imgUpload}
              src={imageUpload}
              alt="imageUpload"
            ></Image>
          </button>
          <p>{trimedFileName ? trimedFileName : "파일이름입니다"}</p>
        </div>
        <div className={styles.alignProfileBtn}>
          <button
            className={styles.editProfileBtn2}
            onClick={() => {
              axios
                .delete("/api/users/image")
                .then(() => {
                  // 모달처리해라
                  router.push("/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            기본 이미지 설정
          </button>
          <button
            className={styles.editProfileBtn}
            onClick={() => {
              axios
                .patch("/api/users/image")
                .then(() => {
                  // 모달처리해라
                  router.push("/dashboard");
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            프로필 이미지 업로드
          </button>
        </div>
        <button
          className={styles.closeModal}
          onClick={() => {
            setModalState([0, 0, 0, 0]);
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
      <div className={styles[`editPassword${modalState[2]}`]}>
        <p>비밀번호를 변경합니다</p>
        <input
          onChange={onChange}
          name="password"
          type="password"
          placeholder="변경할 비밀번호를 입력해주세요"
        ></input>
        <input
          onChange={onChange}
          name="passwordCheck"
          type="password"
          placeholder="비밀번호를 다시 한번 입력해주세요"
        ></input>
        <button
          className={styles.editBtn}
          onClick={() => {
            if (editInfo.password === editInfo.passwordCheck) {
              editPassword(editInfo, setModalState, setEditInfo);
            } else {
              alert("비밀번호 다르잖슴!");
            }
          }}
        >
          비밀번호 변경하기
        </button>
        <button
          className={styles.closeModal}
          onClick={() => {
            setModalState([0, 0, 0, 0]);
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
      <div className={styles[`withdrawal${modalState[3]}`]}>
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
            setModalState([0, 0, 0, 0]);
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
      <div className={styles[`modalBG${modalState[3]}`]}></div>
    </div>
  );
}
