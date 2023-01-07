import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from "next-auth/react";

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
                }
            }
        }),

    ],

    callbacks: {
        async signIn({ account }) {
            if (
                !account?.scope?.includes('https://www.googleapis.com/auth/calendar')
            ) {
                return '/register/connect-calendar/?error=permission'
            }

            return true
        }
    }
}

export default NextAuth(authOptions)