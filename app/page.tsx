import Image from "next/image";
import styles from "./page.module.css";
import { LoginButton } from "@/components/loginButton";

interface LayoutProps {
	Component: any;
	pageProps: any;
	store: any;
}

export default function Home({ Component, pageProps, store }: LayoutProps) {
	return (
		<div className={styles.mainSection}>
			<h1>처음 화면</h1>
			<h3>처음 화면의 서브텍스트</h3>
			<LoginButton />
		</div>
	);
}
