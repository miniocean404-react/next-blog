// Invoked on the commit-msg git hook by yorkie.

const chalk = require('chalk')
// Yorkie的gitHooks使用process.env.GIT_PARAMS
const msgPath = process.argv[2]
const msg = require('fs').readFileSync(msgPath, 'utf-8').trim()

const commitRE =
	/^(revert: )?(dev|feat|fix|docs|dx|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?(.{1,10})?: .{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/

if (!commitRE.test(msg)) {
	if (!mergeRe.test(msg)) {
		console.log(msg)
		console.error(
			`  ${chalk.bgRed.white(' 错误 ')} ${chalk.red(`错误的消息格式`)}\n\n` +
				chalk.red(`  自动化校验-提交模板样例:\n\n`) +
				`    ${chalk.green(`feat(compiler): add 'comments' option（冒号后有空格）`)}\n` +
				`    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}\n\n` +
				chalk.red(
					`  查看文档详情：https://github.com/vuejs/vue-next/blob/master/.github/commit-convention.md for more details.\n`
				)
		)
		process.exit(1)
	}
}
