import dynamic from 'next/dynamic'

// ES2020动态import()
import('react')
  .then((res) => {
    console.log(res)
  })
  .catch((reason) => {
    console.log(reason)
  })

// 动态导入
const DynamicComponent = dynamic(() => import('./image'))
// 使用es2020的动态导入的方式返回
const DynamicComponent2 = dynamic(() => import('./image').then((mod: any) => mod.default), {
  // 组件以在加载动态组件时呈现加载状态
  loading: () => <p>loading</p>,
  // 当模块包含仅在浏览器中工作的库时,可以关闭ssr
  ssr: false,
  // 允许延迟加载组件
  suspense: true,
})

function Home() {
  return (
    <div>
      <DynamicComponent />
      <DynamicComponent2 />
    </div>
  )
}

export default Home
