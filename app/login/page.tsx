"use client";

import { useState } from "react";
import styles from "./login.module.scss";
import Image from "next/image";
import logo from "../../public/logo-blue.png";
// import kakao from "../../public/kakaotalk_logo_icon_147272.png";
import chevron from "../../public/icons8-셰브론-오른쪽-52.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { onLogin } from "../../util/onLogin";
import { useDispatch } from "react-redux";

export default function Login() {
  return (
    <>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isActivePw, setIsActivePw] = useState<boolean>(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    errorData: null,
  }); // 로그인 에러 모달 상태
  const router = useRouter();
  const dispatch = useDispatch();

  const isPassedLogin = () => {
    return email.includes("@") && email.length > 5 && email.includes(".")
      ? setIsActive(true)
      : setIsActive(false);
  };
  const isCorrectPassword = () => {
    return password.length > 7 && isActive
      ? setIsActivePw(true)
      : setIsActivePw(false);
  };

  const handleInput = (event: any) => {
    setEmail(event.target.value);
  };

  const handleInputPw = (event: any) => {
    setPassword(event.target.value);
  };

  const login = async (e: any) => {
    e.preventDefault();
    const requestBody = {
      email: email,
      password: password,
    };

    // 에러 콜백 함수 정의
    const onError = (errorData: any) => {
      setModalState({ isOpen: true, errorData }); // modalState 업데이트
    };

    onLogin(requestBody, dispatch, router, onError);
  };

  const closeModal = () => {
    setModalState({ isOpen: false, errorData: null }); // 모달 닫기
  };

  return (
    <div className={styles.LoginForm}>
      <div className={styles.LoginBox}>
        <div className={styles.LoginInputWrap}>
          <Image
            className={styles.LOGO}
            src={logo}
            width={160}
            alt="logo_login"
          />
          <h4 className={styles.LoginTitle}>
            원아워 서비스 이용을 위해 로그인해주세요
          </h4>
          <div>
            <p className={styles.formTitle}>이메일</p>
            <input
              className={`${styles.emailInputBox} ${
                isActive || email === "" ? "" : styles.emailInputBox1
              }`}
              onChange={handleInput}
              onKeyUp={isPassedLogin}
              type="email"
              required
              placeholder="이메일을 입력해주세요"></input>
          </div>
          <div>
            <p
              className={
                isActive || email === "" ? styles.nowarning : styles.warning
              }>
              올바른 이메일을 입력해주세요
            </p>
            <p className={styles.formTitle}>비밀번호</p>
            <input
              className={`${styles.emailInputBox} ${
                isActivePw || password === "" ? "" : styles.emailInputBox1
              }`}
              onChange={handleInputPw}
              onKeyUp={isCorrectPassword}
              type="password"
              required
              placeholder="비밀번호를 입력해주세요"></input>
          </div>
          <p
            className={
              isActivePw || password === "" ? styles.nowarning : styles.warning
            }>
            올바른 비밀번호를 입력해주세요
          </p>
          <button
            // type="submit"
            // formMethod="post"
            className={
              isActive && email !== "" && isActivePw && password !== ""
                ? styles.submitBtn
                : styles.unactiveBtn
            }
            disabled={email === "" && password === "" ? true : false}
            onClick={(e) => login(e)}>
            이메일로 계속하기
          </button>
          <Link className={styles.findBtnBox} href="/sign-up">
            <button className={styles.findBtn}>
              <p className={styles.forgotten}>회원이 아니시라면</p>
              <span>
                <Image
                  className={styles.chevron}
                  src={chevron}
                  width={16}
                  alt="chevron"
                />
              </span>
            </button>
          </Link>
          <hr className={styles.liner} />
          <div className={styles.partSection}>
            <Link className={styles.terms} href="/terms">
              이용약관
            </Link>
            <Link className={styles.policy} href="/privacy-policy">
              개인정보처리방침
            </Link>
          </div>
          <p className={styles.footer}>Ⓒ NEXT PROJECT B TEAM</p>
        </div>
      </div>
      {/* 로그인 에러 모달 */}
      {modalState.isOpen && (
        <div className={styles.modal1}>
          <p>{modalState.errorData}</p>
          <button className={styles.closeModal} onClick={closeModal}>
            확인
          </button>
        </div>
      )}
      {modalState.isOpen && (
        <div className={styles.modalBG1} onClick={closeModal}></div>
      )}
    </div>
  );
}
