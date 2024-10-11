import { NextApiRequest, NextApiResponse } from 'next'
import { readNextFileSync } from '@/utils/file'
import { getBrowserDeviceId, initTicketsType, queryTickets, tempRequest } from '@/http/server/script12306/stations'
import { Buffer } from 'buffer'

export default async function getStations(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const file = readNextFileSync('public/12306/stations.txt')
    let stationsList: string[] | object[] = file.split('@')

    stationsList = stationsList.map((item: string) => {
      const temp = item.split('|')
      return {
        key: temp[2],
        name: temp[1],
        pinyin: temp[3],
        id: temp[5],
      }
    })

    readNextFileSync('public/12306/cdn.txt')

    const from1 = '北京'
    const arrive1 = '驻马店'

    let from: any = {}
    const arrive: any = []

    const info = stationsList.filter((item: any) => {
      if (item.name === from1) {
        from = item
      }

      if (item.name === arrive1) {
        arrive.push(item)
      }
    })

    const [err1, deviceId]: any = await getBrowserDeviceId()
    const decode = new Buffer(deviceId, 'base64')
    await tempRequest(decode.toString())
    const [err2, apiType]: any = await initTicketsType()

    const [err3, res2]: any = await queryTickets(apiType, '2020-09-30', from.key, arrive[0].key)
    console.log(res2)

    res.status(200).json({ data: info })
  }
}
