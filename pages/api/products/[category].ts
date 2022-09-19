import data from '@/mock/data.json'
import type { NextApiRequest, NextApiResponse } from 'next'

export function getProductsByCategory(category: string | string[]) {
  return data.filter((product) => product.category === category)
}

// 可以使用http://localhost:3000/forum/api/products/xbox 访问接口
// []中的值文件名为参数
// products/的xbox为值
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} is not allowed` })
  } else {
    console.log(req.query)

    const products = getProductsByCategory(req.query.category || '')
    res.status(200).json(products)
  }
}
