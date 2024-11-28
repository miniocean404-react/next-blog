"use client"

import "@/css/404.css"

// export default function NotFound() {
//   return <Error title="找不到页面啦" statusCode={404} withDarkMode />
// }

// 自定义 404 页面，在 pages 下创建 404.tsx 文件,返回 notFont() 函数
export default function NotFound() {
  return (
    <>
      <div className="rail">
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
        <div className="stamp four">4</div>
        <div className="stamp zero">0</div>
      </div>
      <div className="world">
        <div className="forward">
          <div className="box">
            <div className="wall"></div>
            <div className="wall"></div>
            <div className="wall"></div>
            <div className="wall"></div>
            <div className="wall"></div>
            <div className="wall"></div>
          </div>
        </div>
      </div>
    </>
  )
}
