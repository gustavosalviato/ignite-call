import type { NextApiRequest, NextApiResponse } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { buildAuthOptions } from "./auth/[...nextauth]"
import * as z from 'zod'
import { prisma } from "../../libs/prisma"


const timeIntervalsBodyData = z.object({
  intervals: z.array(
    z.object({
      weekDay: z.number(),
      startTimeInMinutes: z.number(),
      endTimeInMinutes: z.number(),
    })
  )
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method !== 'POST') {
    res.status(405).end()
  }

  const session = await unstable_getServerSession(req, res, buildAuthOptions(req, res))

  if (!session) {
    return res.status(401).end()
  }

  const { intervals } = timeIntervalsBodyData.parse(req.body)

  await Promise.all(intervals.map((interval) => {
    return prisma.userTimeIntevals.create({
      data: {
        week_day: interval.weekDay,
        end_time_in_minutes: interval.endTimeInMinutes,
        start_time_in_minutes: interval.startTimeInMinutes,
        user_id: session.user?.id,
      }
    })
  }))

  return res.status(201)
}
