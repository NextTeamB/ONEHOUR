import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, // 30일이 지나면 만료됨
	},
	providers: [
		CredentialsProvider({
			// 커스텀 로그인을 위해 필요한 필드 설정
			name: "credentials",
			credentials: {
				email: { label: "email", type: "text" },
				password: { label: "password", type: "password" },
			},

			// 로그인 요청 시 실행될 코드
			// 입력받은 이메일, 비밀번호를 담아 POST 요청 보내서 서버에서 비교하고
			// 동일할 시 return 유저정보, 틀리면 return null 하도록 수정해야 함
			// POST 요청 시 암호화된 정보를 보낼 수 있도록 라이브러리 추가 설치 요망
			async authorize(credentials) {
				const email = credentials.email;
				const password = credentials.password;
				if (email === "admin@admin.com" && password === "password") {
					return credentials;
				}
				throw new Error("아이디 혹은 패스워드가 틀립니다.");
			},
		}),
	],
	pages: {
		// 기존에 NextAuth가 설정해둔 UI들을 커스텀 로그인 화면으로 매핑시켜주는 설정
		signIn: "/login",
	},
	// jwt 만료일 설정
	session: {
		strategy: "jwt",
		maxAge: 30 * 24 * 60 * 60, //30일
	},
	secret: process.env.NEXTAUTH_SECRET,

	callbacks: {
		// jwt 만들 때 실행되는 코드
		//user 변수에는 DB의 유저정보가 담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = {};
				token.user.email = user.email;
			}
			return token;
		},
		//5. 유저 세션이 조회될 때 마다 실행되는 코드
		session: async ({ session, token }) => {
			session.user = token.user;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
