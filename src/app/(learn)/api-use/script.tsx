import styles from '@/css/index.module.scss'
import type { NextPage } from 'next'
import Head from 'next/head'
import Script from 'next/script'

// 可以设置Script的加载优先级
// beforeInteractive：在页面交互之前加载
// afterInteractive: (默认) 页面变为交互式后立即加载
// lazyOnload: 在空闲时间加载
// worker: (实验性) 加载一个 web worker
const ScriptUse: NextPage = () => (
  <div className={styles.container}>
    <Head>
      <title>图片使用</title>
      <meta name="description" content="描述" />
    </Head>
    {/* 基本使用 */}
    <Script src="https://www.google-analytics.com/analytics.js" strategy="lazyOnload" />

    {/* 内联脚本 在标签内或者dangerouslySetInnerHTML中 */}
    <Script src="https://www.google-analytics.com/analytics.js" strategy="lazyOnload">
      {`document.getElementById('banner').classList.remove('hidden')`}
    </Script>
    <Script
      src="https://www.google-analytics.com/analytics.js"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `document.getElementById('banner').classList.remove('hidden')`,
      }}
    />

    {/* 脚本执行完后的代码onLoad onError可以处理错误 */}
    <Script
      src="https://www.google-analytics.com/analytics.js"
      strategy="lazyOnload"
      onLoad={() => {}}
      onError={(e) => {
        console.error('Script failed to load', e)
      }}
    />

    {/* 自定义属性 */}
    <Script src="https://www.google-analytics.com/analytics.js" nonce="XUENAJFW" data-test="analytics" />
  </div>
)

export default ScriptUse
