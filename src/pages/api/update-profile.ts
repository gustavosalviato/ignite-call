import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { buildAuthOptions } from "./auth/[...nextauth]"
import * as z from 'zod'
import { prisma } from "../../libs/prisma"
import { string } from "zod"


const ProfileBioBodyData = z.object({
  bio: string()
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method !== 'PUT') {
    res.status(405).end()
  }

  const session = await unstable_getServerSession(req, res, buildAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { bio } = ProfileBioBodyData.parse(req.body)

  await prisma.user.update({
    where: {
      id: session.user.id
    },
    data: {
      bio,
    }
  })
  return res.status(204).end()
}
