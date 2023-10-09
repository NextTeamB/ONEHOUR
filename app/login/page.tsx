"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import logo from "../../public/logo.png";
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
    onLogin(requestBody, dispatch);

    router.push("/dashboard");
  };

  return (
    <div className={styles.LoginForm}>
      <div className={styles.LoginBox}>
        <Image
          className={styles.LOGO}
          src={logo}
          width={160}
          alt="logo_login"
        />
        <h4 className={styles.LoginTitle}>
          원아워서비스 이용을 위해 로그인해주세요
        </h4>
        <p className={styles.subtitle}>
          원아워가 제공하는 서비스를
          <br />
          하나의 계정으로 모두 이용할 수 있습니다
        </p>
        <p className={styles.formTitle}>이메일</p>
        <input
          className={
            isActive || email === ""
              ? styles.emailInputBox
              : styles.emailInputBox1
          }
          onChange={handleInput}
          onKeyUp={isPassedLogin}
          type="email"
          required
          placeholder="이메일을 입력해주세요"
        ></input>
        <p
          className={
            isActive || email === "" ? styles.nowarning : styles.warning
          }
        >
          올바른 이메일을 입력해주세요
        </p>
        <p className={styles.formTitle}>비밀번호</p>
        <input
          className={
            isActivePw || password === ""
              ? styles.emailInputBox
              : styles.emailInputBox1
          }
          onChange={handleInputPw}
          onKeyUp={isCorrectPassword}
          type="password"
          required
          placeholder="비밀번호를 입력해주세요"
        ></input>
        <p
          className={
            isActivePw || password === "" ? styles.nowarning : styles.warning
          }
        >
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
          onClick={(e) => login(e)}
        >
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
          <Link className={styles.terms} href="/term">
            이용약관
          </Link>
          <Link className={styles.policy} href="/privacy-policy">
            개인정보처리방침
          </Link>
        </div>
        <p className={styles.footer}>Ⓒ NEXT PROJECT B TEAM</p>
      </div>
    </div>
  );
}
