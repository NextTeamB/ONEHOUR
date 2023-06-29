"use client";

import { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import kakao from "../../public/kakaotalk_logo_icon_147272.png";
import chevron from "../../public/icons8-셰브론-오른쪽-52.png";
import Link from "next/link";

export default function Login(defaultValue: string) {
  const [value, setValue] = useState(defaultValue);

  return (
    <>
      <LoginForm />
    </>
  );
}

function LoginForm() {
  const [email, setEmail] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const isPassedLogin = () => {
    return email.includes("@") && email.length > 5 && email.includes(".")
      ? setIsActive(true)
      : setIsActive(false);
  };

  const handleInput = (event: any) => {
    setEmail(event.target.value);
  };

  return (
    <div className={styles.LoginForm}>
      <div className={styles.LoginBox}>
        <Image
          className={styles.LOGO}
          src={logo}
          width={120}
          alt="logo_login"
        />
        <h4 className={styles.LoginTitle}>
          하나의 계정으로
          <br />
          더욱 편리하게
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
        <button
          type="submit"
          formMethod="post"
          className={
            isActive && email !== "" ? styles.submitBtn : styles.unactiveBtn
          }
          disabled={email === "" ? true : false}
        >
          이메일로 계속하기
        </button>
        <p className={styles.subTitle2}>또는</p>
        <div className={styles.platforms}>
          <button className={styles.kakaoLogin}>
            <Image src={kakao} alt="kakao" width={56} height={56} />
            <p className={styles.kakaotitle}>KaKao</p>
          </button>
        </div>
        <button className={styles.findBtn}>
          <p className={styles.forgotten}>계정을 잊으셨나요?</p>
          <span>
            <Image
              className={styles.chevron}
              src={chevron}
              width={16}
              alt="chevron"
            />
          </span>
        </button>
        <hr className={styles.liner} />
        <div className={styles.partSection}>
          <Link className={styles.terms} href="/Terms">
            이용약관
          </Link>
          <Link className={styles.policy} href="/Policy">
            개인정보처리방침
          </Link>
        </div>
        <p className={styles.footer}>Ⓒ NEXT PROJECT B TEAM</p>
      </div>
    </div>
  );
}
