import { prisma } from '../../libs/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.status(405).end()
    }

    const { username, name } = req.body

    const user = await prisma.user.create({
        data: {
            username,
            name,
        }
    })

    res.status(200).json(user)
}
