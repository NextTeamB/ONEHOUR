'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import styles from './Navigator.module.scss';
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
	var displaynone: number = 990;
	var tablet: number = 1200;
	var notebook: number = 1440;
	interface menuProvider {
		name: string;
		path: string;
		icon: any;
	}
	interface iconSizeProvider {
		menuIconSize: number;
		profileIconSize: number;
		challengeIconSize: number;
	}
	const [iconSize, setIconSize] = useState<iconSizeProvider>({
		menuIconSize: 30,
		profileIconSize: 25,
		challengeIconSize: 26,
	});
	const menuData: menuProvider[] = [
		{ name: '홈화면', path: '/home', icon: Icon1 },
		{ name: '원아워 레코즈', path: '/records', icon: Icon2 },
		{ name: '마이페이지', path: '/mypage', icon: Icon3 },
		{ name: '챌린저스', path: '/challengers', icon: Icon4 },
		{ name: '설정', path: '/settings', icon: Icon5 },
	];
	const subMenus: string[] = ['개인정보 처리방침', '이용 약관', '로그아웃'];

	useEffect(() => { //window 너비 변경을 감지하여 아이콘 사이즈 변경
		const onWindowResize = (e: Event) => {
			var width: number = window.innerWidth;
			var newIconSize = { ...iconSize };
			if (displaynone < width && width <= tablet) {
				newIconSize.menuIconSize = 20;
				newIconSize.profileIconSize = 18;
				newIconSize.challengeIconSize = 18;
			} else if (tablet < width && width <= notebook) {
				newIconSize.menuIconSize = 25;
				newIconSize.profileIconSize = 20;
				newIconSize.challengeIconSize = 22;
			} else {
				newIconSize.menuIconSize = 30;
				newIconSize.profileIconSize = 25;
				newIconSize.challengeIconSize = 26;
			}
			setIconSize(newIconSize);
		};

		window.addEventListener('resize', onWindowResize);

		return () => {
			window.removeEventListener('resize', onWindowResize);
		};
	}, []);
	return (
		<div className={styles.navWrapper}>
			<div className={styles.logoWrapper}>
				<Image src={logo} width={108} alt='logoImage'></Image>
				<span>원아워</span>
			</div>
			<hr className={styles.breakline}></hr>
			<div className={styles.profileWrapper}>
				<Link href='/home'>
					<div className={styles.profile}>
						<Image
							src={profileIcon}
							alt='기본 프로필 이미지'
							width={iconSize.profileIconSize}
						/>
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
				<Image
					src={challengeIcon}
					alt='challengeIcon'
					width={iconSize.challengeIconSize}></Image>
				<div style={{ marginLeft: '10px' }}>CHALLENGE</div>
			</div>
			<div className={styles.menuWrapper}>
				{menuData.map((menu, index) => {
					return (
						<div key={index}>
							<Link href={menu.path} className={styles.menuList}>
								<Image
									src={menu.icon}
									alt='menuIcon'
									width={iconSize.menuIconSize}
								/>
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
