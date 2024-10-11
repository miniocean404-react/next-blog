// 在开发中获取错误信息(只在开发中生效)，因为404,500页面仅仅针对的是用户

// 重用内置的错误提示页面查阅文档：
// https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
function Error({ statusCode }: any) {
  return (
    <p>
      {statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}
    </p>
  )
}

Error.getInitialProps = ({ res, err }: any) => {
  let statusCode
  if (res) statusCode = res.statusCode
  if (err) statusCode = err.statusCode
  if (!res && !err) statusCode = 404

  return { statusCode }
}

export default Error
