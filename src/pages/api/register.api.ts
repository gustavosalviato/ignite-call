import { prisma } from '../../libs/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'nookies'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const { username, name } = req.body

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (userAlreadyExists) {
    return res.status(400).json({
      message: 'User already exists',
    })
  }

  const user = await prisma.user.create({
    data: {
      username,
      name,
    },
  })

  setCookie({ res }, '@ignitecall:userId', user.id, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    path: '/',
  })

  res.status(200).json(user)
}
