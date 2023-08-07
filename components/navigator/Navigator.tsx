"use client";

import { useState } from "react";
import Link from "next/link";

import styles from "./Navigator.module.scss";
import Image from "next/image";
import { FaUserNinja, FaHome, FaUser, FaChartLine } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import { ImFire } from "react-icons/im";
import logo from "../../public/logo.png";

const Navigator = () => {
	interface menuProvider {
		name: string;
		path: string;
		icon: any;
	}

	const menuData: menuProvider[] = [
		{
			name: "홈화면",
			path: "/main/home",
			icon: <FaHome className={styles.menuIcon} />,
		},
		{
			name: "원아워 레코즈",
			path: "/main/records",
			icon: <FaChartLine className={styles.menuIcon} />,
		},
		{
			name: "마이페이지",
			path: "/main/mypage",
			icon: <FaUser className={styles.menuIcon} />,
		},
		{
			name: "챌린저스",
			path: "/main/challengers",
			icon: <ImFire className={styles.menuIcon} />,
		},
		{
			name: "설정",
			path: "/main/settings",
			icon: <FaGear className={styles.menuIcon} />,
		},
	];
	const subMenus: string[] = ["개인정보 처리방침", "이용 약관", "로그아웃"];

	return (
		<div className={styles.navWrapper}>
			<div className={styles.logoWrapper}>
				<Image src={logo} width={108} alt="logoImage"></Image>
				<span>원아워</span>
			</div>
			<hr className={styles.breakline}></hr>
			<div className={styles.profileWrapper}>
				<Link href="/home">
					<div className={styles.profile}>
						<FaUserNinja className={styles.profileIcon} />
					</div>
					<p>
						<span>홍당무</span> 님
					</p>
				</Link>
			</div>
			<hr className={styles.breakline}></hr>
			<div className={styles.commentWrapper}>
				<div>착실하게 하루 한 시간! 원아워와 함께 해요</div>
			</div>
			<div className={styles.challengeButton}>
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
				{subMenus.map((menu, index) => (
					<div className={styles.subMenuList} key={index}>
						<div>{menu}</div>
					</div>
				))}
			</div>
		</div>
	);
};
export { Navigator };
