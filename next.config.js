const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')
const path = require('path')

/** @type {import('next').NextConfig} */
module.exports = (phase, { defaultConfig }) => {
	if (phase === PHASE_DEVELOPMENT_SERVER) {
		return {
			/* development only config options here */
		}
	}

	return {
		reactStrictMode: true,
		basePath: '/forum', // 路由前缀
		env: {
			customKey: 'value',
		},
		compress: true, // Next.js 提供gzip压缩来压缩渲染的内容和静态文件

		sassOptions: {
			includePaths: [path.join(__dirname, 'styles')],
		},
	}
}
