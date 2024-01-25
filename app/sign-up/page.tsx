"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import styles from "./signUp.module.scss";
import Image from "next/image";
import closeicon from "@/public/closeicon.png";
import { useRouter } from "next/navigation";
import { onSignUp } from "@/util/onSignUp";

// export interface checkItems {
//   checked: any;
//   id: number;
// }

type items = { id: number; checked: boolean };

interface FormData {
  email: string;
  name: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

interface ErrorMessages {
  email: string;
  name: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

interface IsValid {
  email: boolean;
  name: boolean;
  nickname: boolean;
  password: boolean;
  passwordConfirm: boolean;
}

interface CheckStates {
  [key: string]: boolean;
}

export default function SignUp() {
  const [modalState, setModalState] = useState(0); // 이메일 중복확인 모달 상태
  const [signupModalState, setSignupModalState] = useState(0); // 회원가입 완료 여부 추가
  const router = useRouter();

  const initialState: FormData = {
    email: "",
    name: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  };

  // 가입 작성 폼 초기화
  const [formData, setFormData] = useState<FormData>(initialState);

  // 에러 메시지 통합
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: "",
    name: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  // 유효성 검사 통합
  const [isValid, setIsValid] = useState<IsValid>({
    email: false,
    name: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });

  const [allCheck, setAllCheck] = useState<boolean>(false);

  // 체크박스 로직 통합
  const [checkStates, setCheckStates] = useState<CheckStates>({
    checkState1: false,
    checkState2: false,
    checkState3: false,
    checkState4: false,
  });

  const checkDescriptions: { [key: string]: string } = {
    checkState1: "만 14세 이상입니다 (필수)",
    checkState2: "원아워 이용약관에 동의합니다 (필수)",
    checkState3: "원아워 개인정보 수집 및 이용에 동의합니다 (필수)",
    checkState4: "광고성 SNS, 이메일 뉴스레터 수신에 동의합니다 (선택)",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  // 각각의 유효성 검사를 하나의 함수로 묶음
  const validateInput = (name: string, value: string) => {
    switch (name) {
      case "email":
        const emailRegex =
          /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const isEmailValid = emailRegex.test(value) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          email: isEmailValid ? "" : "올바른 이메일을 입력해주세요",
        });
        setIsValid({ ...isValid, email: isEmailValid });
        break;
      case "name":
        const isNameValid =
          (value.length >= 2 && value.length <= 5) || value.length == 0
            ? true
            : false;
        setIsValid({ ...isValid, name: isNameValid });
        setErrorMessages({
          ...errorMessages,
          name: isNameValid ? "" : "2글자 이상 5글자 이하로 입력해주세요",
        });
        break;
      case "nickname":
        const isNicknameValid =
          (value.length >= 2 && value.length <= 16) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          nickname: isNicknameValid
            ? ""
            : "2글자 이상 16글자 이하로 입력해주세요",
        });
        setIsValid({ ...isValid, nickname: isNicknameValid });
        break;
      case "password":
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
        const isPasswordValid = passwordRegex.test(value) || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          password: isPasswordValid
            ? ""
            : "숫자+영문자 조합으로 8자리 이상 입력해주세요!",
        });
        setIsValid({ ...isValid, password: isPasswordValid });
        break;
      case "passwordConfirm":
        const isPasswordConfirmValid =
          value === formData.password || value.length == 0;
        setErrorMessages({
          ...errorMessages,
          passwordConfirm: isPasswordConfirmValid
            ? ""
            : "비밀번호가 일치하지 않습니다.",
        });
        setIsValid({ ...isValid, passwordConfirm: isPasswordConfirmValid });
        break;
      default:
        break;
    }
  };

  // 체크박스 로직 중 전체선택
  const toggleAllCheck = () => {
    const newAllCheck = !allCheck;
    setAllCheck(newAllCheck);
    setCheckStates({
      checkState1: newAllCheck,
      checkState2: newAllCheck,
      checkState3: newAllCheck,
      checkState4: newAllCheck,
    });
  };

  // 개별 체크박스 선택
  const toggleCheck = (name: string) => {
    const newCheckStates = {
      ...checkStates,
      [name]: !checkStates[name],
    };
    setCheckStates(newCheckStates);

    // 전체 동의 체크 여부 확인
    const allChecked = Object.values(newCheckStates).every((state) => state);
    setAllCheck(allChecked);
  };

  // 회원가입 버튼 비활성화 조건
  const isSubmitDisabled = !(
    isValid.email &&
    isValid.name &&
    isValid.nickname &&
    isValid.password &&
    isValid.passwordConfirm &&
    checkStates.checkState1 &&
    checkStates.checkState2 &&
    checkStates.checkState3
  );

  return (
    <div className={styles.Upper}>
      <div className={styles.signUpBox}>
        <div className={styles.signUpInputWrap}>
          <Link href="/login">
            <button className={styles.closeBtn}>뒤로가기</button>
          </Link>
          <h4 className={styles.signUpTitle}>회원가입</h4>
          <h5>이메일</h5>
          <div className={styles.emailDiv}>
            <input
              name="email"
              onChange={handleChange}
              type="email"
              className={styles.emailInputBox}
              placeholder="이메일을 입력해주세요"></input>
            <button
              className={styles.emailCheck}
              onClick={() => {
                axios
                  .post("api/users/idcheck", { email: formData.email })
                  .then(() => {
                    setModalState(1); // 이메일 사용 가능한 경우 모달 열기
                  })
                  .catch(() => {
                    setModalState(2); // 이메일 사용 불가능한 경우 모달 열기
                    setFormData({ ...formData, email: "" });
                  });
              }}>
              중복확인
            </button>
          </div>
          {errorMessages.email && (
            <span className={`message error`}>{errorMessages.email}</span>
          )}
          <h5>이름</h5>
          <input
            name="name"
            onChange={handleChange}
            type="text"
            className={`${styles.nameInputBox} ${
              isValid.name || formData.name === ""
                ? ""
                : styles.nicknameInputBox1
            }`}
            placeholder="이름을 입력해주세요"></input>
          {errorMessages.name && (
            <span className={`message error`}>{errorMessages.name}</span>
          )}
          <h5>닉네임</h5>
          <input
            className={`${styles.nicknameInputBox} ${
              isValid.nickname || formData.nickname === ""
                ? ""
                : styles.nicknameInputBox1
            }`}
            onChange={handleChange}
            name="nickname"
            placeholder="닉네임을 입력해주세요"></input>
          {errorMessages.nickname && (
            <span className={`message error`}>{errorMessages.nickname}</span>
          )}
          <h5>비밀번호</h5>
          <input
            name="password"
            onChange={handleChange}
            type="password"
            className={`${styles.nicknameInputBox} ${
              isValid.password || formData.password === ""
                ? ""
                : styles.passwordInputBox1
            }`}
            placeholder="비밀번호를 입력해주세요"></input>
          {errorMessages.password && (
            <span className={`message error`}>{errorMessages.password}</span>
          )}
          <input
            name="passwordConfirm"
            onChange={handleChange}
            type="password"
            className={`${styles.nicknameInputBox} ${
              isValid.passwordConfirm || formData.passwordConfirm === ""
                ? ""
                : styles.nicknameInputBox1
            }`}
            placeholder="비밀번호를 다시 한번 입력해주세요"></input>
          {errorMessages.passwordConfirm && (
            <span className={`message error`}>
              {errorMessages.passwordConfirm}
            </span>
          )}

          <div className={styles.agreeForm1}>
            <input
              type="checkbox"
              id="all-check"
              checked={allCheck}
              onChange={toggleAllCheck}></input>
            <h5>전체 동의</h5>
            <hr />
          </div>

          {/* 체크박스 로직 map함수로 뿌려줌 */}
          {Object.keys(checkStates).map((checkStateName) => (
            <div className={styles.agreeForm2} key={checkStateName}>
              <input
                type="checkbox"
                id={checkStateName}
                checked={checkStates[checkStateName]}
                onChange={() => toggleCheck(checkStateName)}></input>
              <h5>{checkDescriptions[checkStateName]}</h5>
            </div>
          ))}

          <button
            type="submit"
            onClick={() => {
              setSignupModalState(1); // 회원가입 완료 시 상태 변경
            }}
            className={`${styles.signUpBtn0} ${
              isSubmitDisabled ? "" : styles.signUpBtn1
            }`}
            disabled={isSubmitDisabled}>
            가입하기
          </button>
        </div>
      </div>

      {/* 이메일 중복 확인 모달 창 렌더링 */}
      <div className={styles[`modal${modalState}`]}>
        <p>
          {modalState === 1
            ? "사용할 수 있는 이메일입니다."
            : "사용할 수 없는 이메일입니다."}
        </p>
        <button className={styles.closeModal} onClick={() => setModalState(0)}>
          확인
        </button>
      </div>
      <div className={styles[`modalBG${modalState}`]}></div>
      {/* 회원가입 완료 모달 */}
      {signupModalState === 1 && (
        <div className={styles.modal1}>
          <p>회원가입이 완료되었습니다.</p>
          <button
            className={styles.closeModal}
            onClick={() => {
              onSignUp(formData, router); // 확인 버튼 회원가입
            }}>
            확인
          </button>
        </div>
      )}
      <div className={styles[`modalBG${signupModalState}`]}></div>
    </div>
  );
}
