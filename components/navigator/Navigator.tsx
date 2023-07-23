'use client';

import { useState } from 'react';

import styles from './Navigator.module.css';
import Image from 'next/image';
import logo from '../../public/logo.png';
import Icon1 from '../../public/homeIcon.png';
import Icon2 from '../../public/chartIcon.png';
import Icon3 from '../../public/userIcon_logout.png';
import Icon4 from '../../public/fireIcon_dark.png';
import Icon5 from '../../public/settingIcon.png';
import challengeIcon from '../../public/fireIcon_white.png';
import profileIcon from '../../public/userIcon_login.png';

const Navigator = () => {
	const menus: string[] = [
		'홈화면',
		'원아워 레코즈',
		'마이페이지',
		'챌린저스',
		'설정',
	];
	const images: any[] = [Icon1, Icon2, Icon3, Icon4, Icon5];
	const subMenus: string[] = ['개인정보 처리방침', '이용 약관', '로그아웃'];
	return (
		<div className={styles.navWrapper}>
			<div className={styles.logoWrapper}>
				<Image src={logo} width={108} alt='logoImage'></Image>
				원아워
			</div>
			<hr className={styles.breakline}></hr>
			<div className={styles.profileWrapper}>
				<div className={styles.profile}>
					<Image src={profileIcon} alt='기본 프로필 이미지' width={25} />
				</div>
				<p>
					<span className={styles.bold}>홍당무</span> 님
				</p>
			</div>
			<hr className={styles.breakline}></hr>
			<div
				style={{
					marginTop: '10px',
					height: '90px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontWeight: '800',
				}}>
				<div>착실하게 하루 한 시간! 원아워와 함께 해요</div>
			</div>
			<div className={styles.challengeButton}>
				<Image src={challengeIcon} alt='challengeIcon' width={26}></Image>
				<div style={{ marginLeft: '10px' }}>CHALLENGE</div>
			</div>
			<div className={styles.menuWrapper}>
				{menus.map((menu, index) => (
					<div className={styles.menuList} key={index}>
						<Image src={images[index]} alt='menuIcon' width={30} />
						<div className={styles.menuText}>{menu}</div>
					</div>
				))}
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
