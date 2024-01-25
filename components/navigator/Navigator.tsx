"use client";

import Link from "next/link";
import { useEffect, ReactNode, useState } from "react";
import styles from "./Navigator.module.scss";
import Image from "next/image";
import { FaChartLine, FaHome } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import {
  IoIosCheckmarkCircle,
  IoMdTrophy,
  IoIosArrowUp,
  IoIosMenu,
} from "react-icons/io";
import { CgLogOff } from "react-icons/cg";
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
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isMobileNavOpened, setIsMobileNavOpened] = useState(false);
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

  useEffect(() => {
    setIsMobileNavOpened(false);
  }, [pathname]); // 페이지 이동 시 모바일 navbar 접기

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    } else {
      return () =>
        window.removeEventListener("resize", () => {
          return null;
        });
    }
  }, []);

  const highlightMenu = (path: string) => {
    if (path === "/dashboard") {
      if (pathname === path) return true;
    } else if (pathname?.includes(path)) return true;
  };
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
  interface subMenuProvider {
    name: string;
    path: string;
  }
  const subMenus: subMenuProvider[] = [
    { name: "개인정보 처리방침", path: "/privacy-policy" },
    { name: "이용 약관", path: "/terms" },
    { name: "로그아웃", path: "" },
  ];
  if (accessToken) {
    return (
      <>
        {windowWidth > 768 ? (
          <>
            <div className={styles.navUpper}>
              <div className={styles.navWrapper}>
                <div
                  onClick={() => {
                    router.push("/dashboard");
                  }}
                  className={styles.logoWrapper}>
                  <Image
                    className={styles.logoImg}
                    src={logo}
                    alt="logoImage"></Image>
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
                  <p>착실하게 하루 한 시간! 원아워와 함께 해요</p>
                  <button
                    onClick={() => {
                      router.push("/dashboard/challenges");
                    }}
                    className={`${
                      pathname?.includes("ongoing-challenge") &&
                      styles.challengeButtonSelected
                    } ${styles.challengeButton}`}>
                    <p>
                      {pathname?.includes("challenges")
                        ? "LET’S GO !"
                        : "START CHALLENGE"}
                    </p>
                    <IoIosCheckmarkCircle
                      className={styles.challengeIcon}></IoIosCheckmarkCircle>
                  </button>
                </div>
                <hr className={styles.breakline}></hr>
                <div className={styles.menuWrapper}>
                  <div>
                    {menuData.map((menu, index) => {
                      return (
                        <div key={index}>
                          <Link
                            href={menu.path}
                            className={`${styles.menuList} ${
                              highlightMenu(menu.path) && styles.selected
                            }`}>
                            {menu.icon}
                            <div className={styles.menuText}>{menu.name}</div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <hr className={styles.breakline}></hr>
                <div className={styles.subMenuWrapper}>
                  <div className={styles.subMenuBox}>
                    {subMenus.map((menu, index) => (
                      <Link
                        href={menu.path}
                        className={styles.subMenuList}
                        key={index}
                        onClick={() => {
                          if (menu.name === "로그아웃") {
                            onLogout();
                          }
                        }}>
                        <div>{menu.name}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <>{props.children}</>
          </>
        ) : (
          <>
            <div className={styles.navUpper}>
              <div
                className={`${isMobileNavOpened && styles.navExpand} ${
                  styles.navWrapper
                }`}>
                <div className={styles.logoWrapper}>
                  <Image
                    onClick={() => {
                      router.push("/dashboard");
                    }}
                    className={styles.logoImg}
                    src={logo}
                    alt="logoImage"></Image>
                  {isMobileNavOpened ? (
                    <IoIosArrowUp
                      className={styles.mobileMenuIcon}
                      onClick={() => setIsMobileNavOpened(false)}
                    />
                  ) : (
                    <IoIosMenu
                      className={styles.mobileMenuIcon}
                      onClick={() => setIsMobileNavOpened(true)}
                    />
                  )}
                </div>
                {isMobileNavOpened && (
                  <div className={styles.mobileMenuDropdownPosition}>
                    <div className={styles.mobileMenuWrapper}>
                      <div className={styles.mobileProfileWrapper}>
                        <div className={styles.profileWrapper}>
                          <div className={styles.profile}>
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
                        <div className={styles.commentWrapper}>
                          <button
                            onClick={() => {
                              router.push("/dashboard/challenges");
                            }}
                            className={`${
                              pathname?.includes("ongoing-challenge") &&
                              styles.challengeButtonSelected
                            } ${styles.challengeButton}`}>
                            <p>
                              {pathname?.includes("challenges")
                                ? "LET’S GO !"
                                : "START CHALLENGE"}
                            </p>
                            <IoIosCheckmarkCircle
                              className={
                                styles.challengeIcon
                              }></IoIosCheckmarkCircle>
                          </button>
                        </div>
                      </div>
                      <div className={styles.menuWrapper}>
                        {menuData.map((menu, index) => {
                          return (
                            <div key={index}>
                              <hr className={styles.breakline}></hr>
                              <Link
                                href={menu.path}
                                className={`${styles.menuList} ${
                                  highlightMenu(menu.path) && styles.selected
                                }`}>
                                {menu.icon}
                                <div className={styles.menuText}>
                                  {menu.name}
                                </div>
                              </Link>
                            </div>
                          );
                        })}
                        <div>
                          <hr className={styles.breakline}></hr>
                          <Link
                            href=""
                            className={`${styles.menuList}`}
                            onClick={() => onLogout()}>
                            <CgLogOff className={styles.menuIcon} />
                            <div className={styles.menuText}>로그아웃</div>
                          </Link>
                        </div>
                      </div>
                      <div className={styles.subMenuWrapper}>
                        <div className={styles.subMenuBox}>
                          <Link href="/terms" className={styles.subMenuList}>
                            <p>이용 약관&nbsp;&nbsp;&nbsp;</p>
                          </Link>
                          <Link
                            href="/privacy-policy"
                            className={styles.subMenuList}>
                            <p>&nbsp;&nbsp;&nbsp;개인정보 처리방침</p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <>{props.children}</>
          </>
        )}
      </>
    );
  } else {
    return <></>;
  }
};
export { Navigator };
