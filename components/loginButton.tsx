"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export const LoginButton = () => {
	return <button onClick={() => signIn()}>로그인</button>;
};
