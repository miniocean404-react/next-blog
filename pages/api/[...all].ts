import { createProxyMiddleware } from 'http-proxy-middleware';
import type { NextApiRequest, NextApiResponse, PageConfig } from "next";

const proxyMiddleware = createProxyMiddleware<NextApiRequest, NextApiResponse>({
  pathFilter:["/api"],
  target: 'http://www.baidu.com',
  pathRewrite: {
      '^/api': '/',
  },
  changeOrigin: true,
  logger: console,
});


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return proxyMiddleware(req, res, (result: unknown) => {
    if (result instanceof Error) {
      throw result;
    }
  });
}

export const config: PageConfig = {
  api: {
    externalResolver: true,
    // Uncomment to fix stalled POST requests
    // https://github.com/chimurai/http-proxy-middleware/issues/795#issuecomment-1314464432
    // bodyParser: false,
  },
};
