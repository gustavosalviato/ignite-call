import { Adapter } from "next-auth/adapters"
import { NextApiRequest, NextApiResponse, NextPageContext } from "next/types"
import { prisma } from "../../../libs/prisma"
import { parseCookies, destroyCookie } from "nookies"

export function PrismaAdapter(
  req: NextApiRequest | NextPageContext['req'],
  res: NextApiResponse | NextPageContext['res']
): Adapter {
  return {
    async createUser(user) {
      const { "@ignitecall:userId": userIdOnCookies } = parseCookies({ req })
      if (!userIdOnCookies) {
        throw new Error("User ID not found on cookies.")
      }

      const prismaUser = await prisma.user.update({
        where: {
          id: userIdOnCookies,
        },

        data: {
          name: user.name,
          email: user.email,
          avatar_url: user.avatar_url,
        },
      })

      destroyCookie({ res }, "@ignitecall:userId", {
        path: "/",
      })

      return {
        id: prismaUser.id,
        avatar_url: prismaUser.avatar_url!,
        email: prismaUser.email!,
        emailVerified: null,
        name: prismaUser.name,
        username: prismaUser.username,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        avatar_url: user.avatar_url!,
        email: user.email!,
        emailVerified: null,
        name: user.name,
        username: user.username,
      }
    },

    async getUserByEmail(email) {
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        avatar_url: user.avatar_url!,
        email: user.email!,
        emailVerified: null,
        name: user.name,
        username: user.username,
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_accountId: {
            provider,
            provider_accountId: providerAccountId,
          },
        },
        include: {
          user: true,
        },
      })

      if (!account) {
        return null
      }

      const { user } = account
      return {
        id: user.id,
        avatar_url: user.avatar_url!,
        email: user.email!,
        emailVerified: null,
        name: user.name,
        username: user.username,
      }
    },

    async updateUser(user) {
      const prismaUser = await prisma.user.update({
        where: {
          id: user.id,
        },

        data: {
          username: user.username,
          name: user.name,
          avatar_url: user.avatar_url,
        },
      })

      return {
        id: prismaUser.id,
        avatar_url: prismaUser.avatar_url!,
        email: prismaUser.email!,
        emailVerified: null,
        name: prismaUser.name,
        username: prismaUser.username,
      }
    },

    async linkAccount(account) {
      await prisma.account.create({
        data: {
          provider: account.provider,
          provider_accountId: account.providerAccountId,
          type: account.type,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
          user_id: account.userId,
        },
      })
      return
    },
    async createSession({ sessionToken, userId, expires }) {
      await prisma.session.create({
        data: {
          expires,
          user_id: userId,
          session_token: sessionToken,
        },
      })

      return {
        userId,
        expires,
        sessionToken,
      }
    },
    async getSessionAndUser(sessionToken) {
      const prismaSession = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })
      if (!prismaSession) {
        return null
      }

      const { user, ...session } = prismaSession

      return {
        session: {
          userId: session.user_id,
          expires: session.expires,
          sessionToken: session.session_token,
        },
        user: {
          id: user.id,
          avatar_url: user.avatar_url!,
          email: user.email!,
          emailVerified: null,
          name: user.name,
          username: user.username,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },

        data: {
          expires,
          user_id: userId,
        },
      })
      return {
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
        expires: prismaSession.expires,
      }
    },

    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
  }
}
