"use client";

import Link from "next/link";
import { useEffect, ReactNode, useState } from "react";
import styles from "./Navigator.module.scss";
import Image from "next/image";
import { FaUserNinja, FaChartLine, FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import { IoIosCheckmarkCircle, IoMdTrophy } from "react-icons/io";
import logo from "../../public/logo.png";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import { reissueToken } from "@/util/onLogin";
import { onLogout } from "@/util/onLogout";

const Navigator = (props: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  // const userProfileImgUrl = useSelector(
  //   (state: RootState) => state.user?.profileImgUrl
  // );
  const userNickname = useSelector((state: RootState) => state.user?.nickname);
  const userProfileImg = useSelector(
    (state: RootState) => state.user?.profileImgUrl
  );
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  axios.defaults.headers.common["authorization"] = accessToken;

  if (!accessToken) {
    axios
      .delete("api/auth/logout")
      .then(() => {
        router.push("/login");
      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    reissueToken(accessToken); // 내비게이터에서 토큰 재발급 실행
  }, []);

  interface menuProvider {
    name: string;
    path: string;
    icon: any;
  }
  const menuData: menuProvider[] = [
    {
      name: "홈",
      path: "/dashboard",
      icon: <FaHome className={styles.menuIcon} />,
    },
    {
      name: "원아워 레코즈",
      path: "/dashboard/records",
      icon: <FaChartLine className={styles.menuIcon} />,
    },
    {
      name: "타임 랭킹",
      path: "/dashboard/time-ranking",
      icon: <IoMdTrophy className={styles.menuIcon} />,
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
    <>
      {accessToken && (
        <>
          <div className={styles.navWrapper}>
            <div
              onClick={() => {
                router.push("/dashboard");
              }}
              className={styles.logoWrapper}
            >
              <Image src={logo} height={35} alt="logoImage"></Image>
            </div>
            <hr className={styles.breakline}></hr>
            <div className={styles.profileWrapper}>
              <div className={styles.profile}>
                {/* <FaUserNinja className={styles.profileIcon} /> */}
                <img
                  src={userProfileImg}
                  className={styles.profileIcon}
                  alt="user profile image"
                />
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
              className={`${
                pathname?.includes("challenges") &&
                styles.challengeButtonSelected
              } ${styles.challengeButton}`}
            >
              <p>
                {pathname?.includes("challenges")
                  ? "LET’S GO !"
                  : "START CHALLENGE"}
              </p>
              <IoIosCheckmarkCircle
                className={styles.challengeIcon}
              ></IoIosCheckmarkCircle>
            </div>
            <hr className={styles.breakline}></hr>
            <div className={styles.menuWrapper}>
              {menuData.map((menu, index) => {
                return (
                  <div key={index}>
                    <Link
                      href={menu.path}
                      className={`${styles.menuList} ${
                        menu.path === pathname && styles.selected
                      }`}
                    >
                      {menu.icon}
                      <div className={styles.menuText}>{menu.name}</div>
                    </Link>
                  </div>
                );
              })}
            </div>
            <hr className={styles.breakline}></hr>
            <div className={styles.subMenuWrapper}>
              {subMenus.map((menu, index) => (
                <div
                  className={styles.subMenuList}
                  key={index}
                  onClick={() => {
                    if (menu === "로그아웃") {
                      onLogout();
                    }
                  }}
                >
                  <div>{menu}</div>
                </div>
              ))}
            </div>
          </div>
          <>{props.children}</>
        </>
      )}
    </>
  );
};
export { Navigator };
