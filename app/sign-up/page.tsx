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

export default function SignUp() {
  const router = useRouter();
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>('');
  const [passwordConfirm, setPasswordConfirm] = useState<string>('');

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState<string>('');
  const [nameMessage, setNameMessage] = useState<string>('');
  const [nickMessage, setNickMessage] = useState<string>('');
  const [passwordMessage, setPasswordMessage] = useState<string>('');
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState<string>('');

  // 유효성 검사
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean>(false);
  const [isNick, setIsNick] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const signUp = (userInfo: any) => {
    axios
      .post("/api/users/sign-up", userInfo)
      .then((res) => {
        console.log(res);
        router.push('/login')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  // 이메일
  const onChangeEmail = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage('올바른 이메일을 입력해주세요')
      setIsEmail(false)
    } else {
      setEmailMessage('')
      setIsEmail(true)
    }
  }, [])

  // 이름
  const onChangeName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage('2글자 이상 5글자 이하로 입력해주세요.')
      setIsName(false)
    } else {
      setNameMessage('')
      setIsName(true)
    }
  }, [])

  // 닉네임
  const onChangeNick = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value)
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNickMessage('2글자 이상 8글자 이하로 입력해주세요.')
      setIsNick(false)
    } else {
      setNickMessage('')
      setIsNick(true)
    }
  }, [])

  // 비밀번호
  const onChangePassword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,25}$/
    const passwordCurrent = e.target.value
    setPassword(passwordCurrent)

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage('숫자+영문자 조합으로 8자리 이상 입력해주세요!')
      setIsPassword(false)
    } else {
      setPasswordMessage('')
      setIsPassword(true)
    }
  }, [])

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const passwordConfirmCurrent = e.target.value
      setPasswordConfirm(passwordConfirmCurrent)

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage('')
        setIsPasswordConfirm(true)
      } else {
        setPasswordConfirmMessage('비밀번호가 일치하지 않습니다.')
        setIsPasswordConfirm(false)
      }
    },
    [password]
  )

  // 체크박스 설정
  const [allCheck, setAllCheck] = useState<boolean>(false);
  const [checkState1, setCheckState1] = useState<boolean>(false);
  const [checkState2, setCheckState2] = useState<boolean>(false);
  const [checkState3, setCheckState3] = useState<boolean>(false);
  const [checkState4, setCheckState4] = useState<boolean>(false);

  const allBtnEvent =()=>{
    if(allCheck === false) {
      setAllCheck(true);
      setCheckState1(true);
      setCheckState2(true);
      setCheckState3(true);
      setCheckState4(true);
    }else {
      setAllCheck(false);
      setCheckState1(false);
      setCheckState2(false);
      setCheckState3(false);
      setCheckState4(false);
    } 
  };

  const CheckBtnEvent1 =()=>{
    if(checkState1 === false) {
      setCheckState1(true)
    }else {
      setCheckState1(false)
    }
  };

  const CheckBtnEvent2 =()=>{
    if(checkState2 === false) {
      setCheckState2(true)
    }else {
      setCheckState2(false)
    }
  };

  const CheckBtnEvent3 =()=>{
    if(checkState3 === false) {
      setCheckState3(true)
    }else {
      setCheckState3(false)
    }
  };


  const CheckBtnEvent4 =()=>{
    if(checkState4 === false) {
      setCheckState4(true)
    }else {
      setCheckState4(false)
    }
  };

  useEffect(()=>{
    if(checkState1===true && checkState2===true && checkState3===true && checkState4===true){
      setAllCheck(true)
    } else {
      setAllCheck(false)
    }
  }, [checkState1, checkState2, checkState3, checkState4])


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
            onChange={onChangeEmail}
            type="email"
            className={styles.emailInputBox}
            placeholder="이메일을 입력해주세요"
          ></input>
          <button 
            className={styles.emailCheck} 
            onClick={()=>{
              axios
              .post('api/users/idcheck', {email:email})
              .then(()=>{alert("사용할 수 있는 이메일입니다.")})
              .catch(
                ()=>{alert("사용할 수 없는 이메일입니다.");
                setEmail("");
              })
            }}>중복확인</button>
          {email.length > 0 && <span className={`message ${isEmail ? 'success' : 'error'}`}>{emailMessage}</span>}
        </span>
        <h5>이름</h5>
        <input
          name="name"
          onChange={onChangeName}
          type="text"
          className={styles.nameInputBox}
          placeholder="이름을 입력해주세요"
        ></input>
        {name.length > 0 && <span className={`message ${isName ? 'success' : 'error'}`}>{nameMessage}</span>}
        <h5>닉네임</h5>
        <input
          className={
            isNick || nickname === ""
              ? styles.nicknameInputBox
              : styles.nicknameInputBox1
          }
          onChange={onChangeNick}
          name="nickname"
          placeholder="닉네임을 입력해주세요"
        ></input>
        {nickname.length > 0 && <span className={`message ${isNick ? 'success' : 'error'}`}>{nickMessage}</span>}
        <h5>비밀번호</h5>
        <input
          name="password"
          onChange={onChangePassword}
          type="password"
          className={styles.passwordInputBox1}
          placeholder="비밀번호를 입력해주세요"
        ></input>
        {password.length > 0 && (
          <span className={`message ${isPassword ? 'success' : 'error'}`}>{passwordMessage}</span>
        )}
        <input
          name="passwordConfirm"
          onChange={onChangePasswordConfirm}
          type="password"
          className={styles.passwordInputBox2}
          placeholder="비밀번호를 다시 한번 입력해주세요"
        ></input>
        {passwordConfirm.length > 0 && (
          <span className={`message ${isPasswordConfirm ? 'success' : 'error'}`}>{passwordConfirmMessage}</span>
        )}

        <div className={styles.agreeForm1}>
          <input
            type="checkbox"
            id="all-check"
            checked={allCheck}
            onChange={allBtnEvent}
          ></input>
          <h5>전체 동의</h5>
          <hr />
        </div>

        <div className={styles.agreeForm2}>
          <input
            type="checkbox"
            id="check1"
            checked={checkState1}
            onChange={CheckBtnEvent1}
          ></input>
          <h5>만 14세 이상입니다 (필수)</h5>
        </div>
        <div className={styles.agreeForm3}>
          <input
            type="checkbox"
            id="check2"
            checked={checkState2}
            onChange={CheckBtnEvent2}
          ></input>
          <h5>원아워 이용약관에 동의합니다 (필수)</h5>
        </div>
        <div className={styles.agreeForm4}>
          <input
            type="checkbox"
            id="check3"
            checked={checkState3}
            onChange={CheckBtnEvent3}
          ></input>
          <h5>원아워 개인정보 수집 및 이용에 동의합니다 (필수)</h5>
        </div>
        <div className={styles.agreeForm5}>
          <input
            type="checkbox"
            id="check4"
            checked={checkState4}
            onChange={CheckBtnEvent4}
          ></input>
          <h5>광고성 SNS, 이메일 뉴스레터 수신에 동의합니다 (선택)</h5>
        </div>
        <button
          type="submit"
          onClick={() => {
            onSignUp({
                email: email,
                nickname: nickname,
                password: passwordConfirm,
                name: name,
              },
              router);
          }}
          className={
            isName &&
            isEmail &&
            isPassword &&
            isPasswordConfirm &&
            checkState1 &&
            checkState2 &&
            checkState3
              ? styles.signUpBtn1
              : styles.signUpBtn0
          }
          disabled={
            !(
              isName &&
              isEmail &&
              isPassword &&
              isPasswordConfirm &&
              checkState1 &&
              checkState2 &&
              checkState3
            ) || checkState4
          }
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
