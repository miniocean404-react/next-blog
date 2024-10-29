"use client"

import Script from "next/script"

// 错误：(failed)net::ERR_CONNECTION_CLOSED，试试关闭代理
const BaiDuAnalytics = () => {
  return (
    <Script
      id="baidu-tongji"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _hmt = _hmt || [];
          (function() {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?${process.env.NEXT_PUBLIC_BAIDU_TONGJI_ID}";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
          })();
          `,
      }}
    />
  )
}

export default BaiDuAnalytics
