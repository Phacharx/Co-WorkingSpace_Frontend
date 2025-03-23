import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import userLogin from "@/libs/userLogIn";

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (!credentials) return null;

                const user = await userLogin(credentials.email, credentials.password);

                if (user) {
                    return user;  // ส่งข้อมูล user กลับ
                } else {
                    return null;  // ถ้าไม่พบ user
                }
            }
        })
    ],
    session: { strategy: 'jwt' },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },
        async session({ session, token }) {
            session.user = token;  // ส่ง token ใน session
            return session;
        }
    }
    // secret: process.env.NEXTAUTH_SECRET, // ใช้ secret ที่ตั้งใน .env.local
};
