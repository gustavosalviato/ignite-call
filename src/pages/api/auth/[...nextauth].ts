import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '../../../libs/prisma'

export const authOptions: NextAuthOptions = {
    // adapter: PrismaAdapter(prisma),
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