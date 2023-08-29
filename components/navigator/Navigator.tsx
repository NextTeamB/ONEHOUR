"use client";

import Link from "next/link";

import styles from "./Navigator.module.scss";
import Image from "next/image";
import { FaUserNinja, FaHome, FaUser, FaChartLine } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter } from "next/navigation";
import { reissueToken } from "@/util/onLogin";
import { useEffect } from "react";

const Navigator = () => {
  const userNickname = useSelector((state: RootState) => state.user.nickname);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  axios.defaults.headers.common["authorization"] = accessToken;
  useEffect(() => {
    reissueToken(accessToken); // 내비게이터에서 토큰 재발급 실행
  }, []);
  const router = useRouter();
  interface menuProvider {
    name: string;
    path: string;
    icon: any;
  }

  const logOut = () => {
    axios
      .delete("/api/auth/logout")
      .then((res) => {
        alert("로그아웃 되었습니다");
      })
      .catch((err) => {
        alert("연결이 원활하지 않습니다");
      });
  };
  const menuData: menuProvider[] = [
    {
      name: "홈화면",
      path: "/dashboard/home",
      icon: <FaHome className={styles.menuIcon} />,
    },
    {
      name: "원아워 레코즈",
      path: "/dashboard/records",
      icon: <FaChartLine className={styles.menuIcon} />,
    },
    {
      name: "마이페이지",
      path: "/dashboard/mypage",
      icon: <FaUser className={styles.menuIcon} />,
    },
    {
      name: "챌린저스",
      path: "/dashboard/challengers",
      icon: <ImFire className={styles.menuIcon} />,
    },
    {
      name: "설정",
      path: "/dashboard/settings",
      icon: <FaGear className={styles.menuIcon} />,
    },
  ];
  const subMenus: string[] = ["개인정보 처리방침", "이용 약관", "로그아웃"];

  return (
    <div className={styles.navWrapper}>
      <div
        onClick={() => {
          router.push("/dashboard");
        }}
        className={styles.logoWrapper}
      >
        <Image src={logo} width={108} alt="logoImage"></Image>
        <span>원아워</span>
      </div>
      <hr className={styles.breakline}></hr>
      <div className={styles.profileWrapper}>
        <div className={styles.profile}>
          <FaUserNinja className={styles.profileIcon} />
        </div>
        <p>
          <span>{userNickname}</span> 님
        </p>
      </div>
      <hr className={styles.breakline}></hr>
      <div className={styles.commentWrapper}>
        <div>착실하게 하루 한 시간! 원아워와 함께 해요</div>
      </div>
      <div
        onClick={() => {
          router.push("/dashboard/challenges");
        }}
        className={styles.challengeButton}
      >
        <ImFire className={styles.challengeIcon}></ImFire>
        <div style={{ marginLeft: "10px" }}>CHALLENGE</div>
      </div>
      <div className={styles.menuWrapper}>
        {menuData.map((menu, index) => {
          return (
            <div key={index}>
              <Link href={menu.path} className={styles.menuList}>
                {menu.icon}
                <div className={styles.menuText}>{menu.name}</div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className={styles.subMenuWrapper}>
        <div className={styles.subMenuList}>
          <div>개인정보 처리방침</div>
        </div>
        <div className={styles.subMenuList}>
          <div>이용약관</div>
        </div>
        <div className={styles.subMenuList}>
          <div
            onClick={() => {
              logOut();
            }}
          >
            로그아웃
          </div>
        </div>
      </div>
    </div>
  );
};
export { Navigator };
