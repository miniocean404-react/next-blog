// Bing 搜索引擎快速添加索引
import axios from "axios"

const init = async () => {
  const res = await axios.post("https://api.indexnow.org", {
    host: "blog-miniocean404s.vercel.app",
    key: "d262b4e1d63c417b93ce760437dce55c",
    keyLocation: "https://www.example.org/d262b4e1d63c417b93ce760437dce55c.txt",
    urlList: [
      "https://blog-miniocean404s.vercel.app",
      "https://blog-miniocean404s.vercel.app/zh",
      "https://blog-miniocean404s.vercel.app/en",
      "https://blog-miniocean404s.vercel.app/ai",
    ],
  })

  console.log(res.status)
  console.log(res.data)
}

init()
