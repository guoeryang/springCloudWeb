const users = {
  'admin': {
    username: 'admin',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    email: 'admin@eladmin.net',
    phone: '18888888888',
    dept: '研发部',
    job: '全栈开发',
    enabled: true,
    createTime: 1534986716000,
    roles: ['dept:edit', 'user:list']
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

export default [
  // user login
  {
    url: '/user/login',
    type: 'post',
    response: config => {
      return {
        token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTU3MzAwODc2NywiaWF0IjoxNTczMDA1MTY3fQ.UZPlfkXbLKZ_wGr6je7WjhyRaMIg3gv--y83xuYJkeabmtJh2KwQxG90dC6HcG_ySj1aAuSQh7-Q6r4cqy24GA',
        user: {
          username: 'admin',
          avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
          email: 'admin@eladmin.net',
          phone: '18888888888',
          dept: '研发部',
          job: '全栈开发',
          enabled: true,
          createTime: 1534986716000,
          roles: ['dept:edit', 'user:list']
        }
      }
    }
  },
  // 验证码
  {
    url: '/auth/code',
    type: 'get',
    response: config => {
      return {
        img: 'data:image/png;base64,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',
        uuid: 'code-key3d96875c50e44c8aae7700f73e2ab224'
      }
    }
  },
  // get user info
  {
    url: '/user/info',
    type: 'get',
    response: config => {
      const info = users['admin']
      return info
    }
  },

  // user logout
  {
    url: '/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
