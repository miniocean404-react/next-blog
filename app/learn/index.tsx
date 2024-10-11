import styles from '@/css/index.module.scss'
import { Prop } from '@/typings/learn/static-generation'
import { Button } from 'antd'
import { NextPage } from 'next'
import Link from 'next/link'

const LearnHome: NextPage<Prop> = ({ className }) => {
  const containerClass = `${styles['learn-home']} ${className || ''}`
  return (
    <div className={containerClass}>
      {/* 路由使用 */}
      <h1>动态路由</h1>
      <Button>
        <Link href="/learn/dynamic-route/static/1">静态生成</Link>
      </Button>
      <Button>
        <Link href="/learn/dynamic-route/nest-router/2/3">嵌套静态生成</Link>
      </Button>
      <Button>
        <Link href="/learn/dynamic-route/server/xbox">服务端渲染</Link>
      </Button>
      <Button>
        <Link href="/learn/dynamic-route/all-router/xbox/1/2">所有参数的路由，参数为[]类型</Link>
      </Button>
      <h1>静态路由</h1>
      <Button>
        <Link href="/learn/static-route/static-generation?a=1">静态生成</Link>
      </Button>
      <Button>
        <Link href="/learn/static-route/server-side-rendering?category=xbox">服务端渲染</Link>
      </Button>
      <h1>API使用</h1>
      <Button>
        <Link href="/learn/api-use/image">图片</Link>
      </Button>
      <Button>
        <Link href="/learn/api-use/router">编程式路由</Link>
      </Button>
    </div>
  )
}

LearnHome.defaultProps = {
  className: '',
}

export default LearnHome
