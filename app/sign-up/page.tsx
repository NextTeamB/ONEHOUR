"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import styles from "./signUp.module.scss";
import { useRouter } from "next/navigation";
import { onSignUp } from '@/util/onSignUp';

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
  const router = useRouter();
  
  const initialState: FormData = {
    email: '',
    name: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  };

  const [formData, setFormData] = useState<FormData>(initialState);

  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({
    email: '',
    name: '',
    nickname: '',
    password: '',
    passwordConfirm: '',
  });

  const [isValid, setIsValid] = useState<IsValid>({
    email: false,
    name: false,
    nickname: false,
    password: false,
    passwordConfirm: false,
  });

  const [allCheck, setAllCheck] = useState<boolean>(false);

  const [checkStates, setCheckStates] = useState<CheckStates>({
    checkState1: false,
    checkState2: false,
    checkState3: false,
    checkState4: false,
  });

  const checkDescriptions: { [key: string]: string } = {
    checkState1: '만 14세 이상입니다 (필수)',
    checkState2: '원아워 이용약관에 동의합니다 (필수)',
    checkState3: '원아워 개인정보 수집 및 이용에 동의합니다 (필수)',
    checkState4: '광고성 SNS, 이메일 뉴스레터 수신에 동의합니다 (선택)',
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateInput(name, value);
  };

  const validateInput = (name: string, value: string) => {
    switch (name) {
      case 'email':
        const emailRegex = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        const isEmailValid = emailRegex.test(value);
        setErrorMessages({ ...errorMessages, email: isEmailValid ? '' : '올바른 이메일을 입력해주세요' });
        setIsValid({ ...isValid, email: isEmailValid });
        break;
      case 'name':
        const isNameValid = value.length >= 2 && value.length <= 5;
        setErrorMessages({ ...errorMessages, name: isNameValid ? '' : '2글자 이상 5글자 이하로 입력해주세요.' });
        setIsValid({ ...isValid, name: isNameValid });
        break;
      case 'nickname':
        const isNicknameValid = value.length >= 2 && value.length <= 8;
        setErrorMessages({ ...errorMessages, nickname: isNicknameValid ? '' : '2글자 이상 8글자 이하로 입력해주세요.' });
        setIsValid({ ...isValid, nickname: isNicknameValid });
        break;
      case 'password':
        const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/;
        const isPasswordValid = passwordRegex.test(value);
        setErrorMessages({ ...errorMessages, password: isPasswordValid ? '' : '숫자+영문자 조합으로 8자리 이상 입력해주세요!' });
        setIsValid({ ...isValid, password: isPasswordValid });
        break;
      case 'passwordConfirm':
        const isPasswordConfirmValid = value === formData.password;
        setErrorMessages({ ...errorMessages, passwordConfirm: isPasswordConfirmValid ? '' : '비밀번호가 일치하지 않습니다.' });
        setIsValid({ ...isValid, passwordConfirm: isPasswordConfirmValid });
        break;
      default:
        break;
    }
  };

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

  const toggleCheck = (name: string) => {
    setCheckStates({ ...checkStates, [name]: !checkStates[name] });
  };

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
        <span>
          <Link href="/login">
            <button className={styles.closeBtn}>취소</button>
          </Link>
          <h4 className={styles.signUpTitle}>회원가입</h4>
        </span>
        <h5>이메일</h5>
        <span>
          <input
            name="email"
            onChange={handleChange}
            type="email"
            className={styles.emailInputBox}
            placeholder="이메일을 입력해주세요"
          ></input>
          <button 
            className={styles.emailCheck} 
            onClick={()=>{
              axios
              .post('api/users/idcheck', {email: formData.email})
              .then(()=>{
                alert("사용할 수 있는 이메일입니다.")
              })
              .catch(()=>{
                alert("사용할 수 없는 이메일입니다.");
                setFormData({ ...formData, email: '' });
              })
            }}
          >
            중복확인
          </button>
          {errorMessages.email && <span className={`message error`}>{errorMessages.email}</span>}
        </span>
        <h5>이름</h5>
        <input
          name="name"
          onChange={handleChange}
          type="text"
          className={styles.nameInputBox}
          placeholder="이름을 입력해주세요"
        ></input>
        {errorMessages.name && <span className={`message error`}>{errorMessages.name}</span>}
        <h5>닉네임</h5>
        <input
          className={isValid.nickname || formData.nickname === '' ? styles.nicknameInputBox : styles.nicknameInputBox1}
          onChange={handleChange}
          name="nickname"
          placeholder="닉네임을 입력해주세요"
        ></input>
        {errorMessages.nickname && <span className={`message error`}>{errorMessages.nickname}</span>}
        <h5>비밀번호</h5>
        <input
          name="password"
          onChange={handleChange}
          type="password"
          className={styles.passwordInputBox1}
          placeholder="비밀번호를 입력해주세요"
        ></input>
        {errorMessages.password && <span className={`message error`}>{errorMessages.password}</span>}
        <input
          name="passwordConfirm"
          onChange={handleChange}
          type="password"
          className={styles.passwordInputBox2}
          placeholder="비밀번호를 다시 한번 입력해주세요"
        ></input>
        {errorMessages.passwordConfirm && (
          <span className={`message error`}>{errorMessages.passwordConfirm}</span>
        )}

        <div className={styles.agreeForm1}>
          <input
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={toggleAllCheck}
          ></input>
          <h5>전체 동의</h5>
          <hr />
        </div>

        {Object.keys(checkStates).map((checkStateName) => (
          <div className={styles.agreeForm2} key={checkStateName}>
            <input
              type="checkbox"
              id={checkStateName}
              checked={checkStates[checkStateName]}
              onChange={() => toggleCheck(checkStateName)}
            ></input>
            <h5>{checkDescriptions[checkStateName]}</h5>
          </div>
        ))}

        <button
          type="submit"
          onClick={() => {
            onSignUp(formData, router);
          }}
          className={
            isSubmitDisabled
              ? styles.signUpBtn0
              : styles.signUpBtn1
          }
          disabled={isSubmitDisabled}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
