/**
 * @module providers/feishu
 */
export default function FeishuProvider(config: any): any {
  // 获取用户信息
  const apiUserURL = "https://open.feishu.cn/open-apis/authen/v1/user_info"
  // 获取授权码
  const apiAuthURL = "https://open.feishu.cn/open-apis/authen/v1/authorize"

  // 开发环境
  const devBaseUrl = "http://localhost:3000"
  // 生产环境
  const prodBaseUrl = ""

  const baseUrl = process.env.NODE_ENV === "development" ? devBaseUrl : prodBaseUrl

  return {
    id: "feishu",
    name: "feishu",
    type: "oauth",
    // 1. 获取 assets_token, 需自定义接口 ,因飞书 oauth 多一个步骤
    token: {
      url: `${baseUrl}/api/feishu/token`,
    },
    // 2. 获取授权码
    authorization: {
      url: apiAuthURL,
      params: {
        scope: "",
        app_id: config.clientId,
        redirect_uri: encodeURI(`${baseUrl}/api/auth/callback/feishu`),
        state: "RANDOMSTATE",
      },
    },
    // 3. 获取用户信息
    userinfo: {
      url: apiUserURL,
      async request({ tokens, provider }: any) {
        // 拿到上一步获取到的token，调用飞书获取用户信息的接口，获取用户信息
        const profile = await fetch(provider.userinfo?.url as URL, {
          headers: {
            Authorization: `Bearer ${tokens.access_token}`,
            "User-Agent": "authjs",
          },
        }).then(async (res) => await res.json())

        return profile.data
      },
    },
    // 4. 生成 session 会话信息
    profile(profile: any) {
      // 选择想要的参数设置的 session 里
      return {
        id: profile.open_id.toString(),
        name: profile.name ?? profile.login,
        image: profile.avatar_thumb,
      }
    },
    options: config,
  }
}
