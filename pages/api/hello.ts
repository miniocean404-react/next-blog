// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// 注意：不能在 getStaticProps 和 getStaticPaths 里添加 fetch 数据，
// 因为他们只在 server side 运行，不会在 client side 运行，应该使用 helper function 来获取数据。
// API 代码将不会在 client side 的 bundle 里。

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
	name: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({ name: 'John Doe' })
}
