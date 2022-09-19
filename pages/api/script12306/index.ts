import { NextApiRequest, NextApiResponse } from 'next'
import { readNextFileSync } from '@/utils/file'

export default function getStations(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    const file = readNextFileSync('public/12306/stations.txt')

    let stationsList: string[] | object[] = file.split('@')
    readNextFileSync('public/12306/cdn.txt')

    stationsList = stationsList.map((item: string) => {
      const temp = item.split('|')
      return {
        key: temp[2],
        name: temp[1],
        pinyin: temp[3],
        id: temp[5],
      }
    })

    res.status(200).json({ data: stationsList })
  }
}
