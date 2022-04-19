// https://www.notion.so/miniocean404/husky-lint-staged-b83f599a66964a83a41ba516528e7912#f4d4cfbe330b4b84b3e4163ea138e220
// npx commitizen init cz-conventional-changelog --save-dev --save-exact 安装自带的commit脚手架
// npx commitizen init cz-customizable --save-dev --save-exact --force 安装自定义提交规范

module.exports = {
	types: [
		{ value: '✨新增feat', name: '✨新增feat:  新的内容' },
		{ value: '🐛修复fix', name: '🐛修复fix:  修复一个Bug' },
		{ value: '📝文档docs', name: '📝文档docs:  变更的只有文档' },
		{ value: '💄格式style', name: '💄格式style:  空格, 分号等格式修复' },
		{ value: '♻️重构refactor', name: '♻️重构refactor:  代码重构，注意和特性、修复区分开' },
		{ value: '⚡️性能perf', name: '⚡️性能perf:  提升性能' },
		{ value: '✅测试test', name: '✅测试test:  添加一个测试' },
		{
			value: '🔧其他chore',
			name: '🔧其他chore:    比如改变构建流程、或者增加依赖库、工具等',
		},
		{ value: '⏪回滚revert', name: '⏪回滚revert:    代码回退回滚到上一个版本' },
	],
	scopes: [
		['components', '组件相关'],
		['hooks', 'hook 相关'],
		['utils', 'utils 相关'],
		['element-ui', '对 element-ui 的调整'],
		['styles', '样式相关'],
		['deps', '项目依赖'],
		['auth', '对 auth 修改'],
		['other', '其他修改'],
		// 如果选择 custom，后面会让你再输入一个自定义的 scope。也可以不设置此项，把后面的 allowCustomScopes 设置为 true
		['custom', '以上都不是？我要自定义'],
	].map(([value, description]) => ({
		value,
		name: `${value.padEnd(30)} (${description})`,
	})),

	// 是否允许自定义填写 scope，在 scope 选择的时候，会有 empty 和 custom 可以选择。
	allowCustomScopes: true,
	// allowTicketNumber: false,
	// isTicketNumberRequired: false,
	// ticketNumberPrefix: 'TICKET-',
	// ticketNumberRegExp: '\\d{1,5}',

	// 针对每一个 type 去定义对应的 scopes，例如 fix
	/*  scopeOverrides: {
      fix: [
        {name: 'merge'},
        {name: 'style'},
        {name: 'e2eTest'},
        {name: 'unitTest'}
      ]
    },
  */

	// 交互提示信息
	messages: {
		type: '选择一种你的提交类型:',
		scope: '\n选择一个scope(可选):',
		// 选择 scope: custom 时会出下面的提示
		customScope: '请输入自定义的 scope:',
		subject: '填写简短精炼的变更描述:\n',
		body: '填写更加详细的变更描述(可选)。使用 "|" 换行:\n',
		breaking: '列举非兼容性重大的变更（可选）:\n',
		footer: '列举出所有变更的关闭issues ISSUES CLOSED(可选)。 例如: #31, #34:\n ',
		confirmCommit: '确定提交说明?(yes/no)',
	},

	// 设置只有 type 选择了 feat 或 fix，才询问 breaking message
	allowBreakingChanges: ['✨新增feat', '🐛修复fix'],
	// 跳过询问 body 和 footer
	skipQuestions: ['body', 'footer'],
	// subject 限制长度
	subjectLimit: 100,

	// 换行符
	breaklineChar: '|', // 支持 body 和 footer
	// footerPrefix : 'ISSUES CLOSED:'
	// askForBreakingChangeFirst : true,
}
