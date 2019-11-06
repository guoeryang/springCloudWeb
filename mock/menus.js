const menuss = [{
  name: '系统管理',
  path: '/system',
  hidden: false,
  redirect: 'noredirect',
  component: 'Layout',
  alwaysShow: true,
  meta: {
    title: '系统管理',
    icon: 'system',
    noCache: true
  },
  children: [{
    name: 'User',
    path: 'user',
    hidden: false,
    component: 'system/user/index',
    meta: {
      title: '用户管理',
      icon: 'peoples',
      noCache: true
    }
  }, {
    name: 'Role',
    path: 'role',
    hidden: false,
    component: 'system/role/index',
    meta: {
      title: '角色管理',
      icon: 'role',
      noCache: true
    }
  }, {
    name: 'Menu',
    path: 'menu',
    hidden: false,
    component: 'system/menu/index',
    meta: {
      title: '菜单管理',
      icon: 'menu',
      noCache: true
    }
  }, {
    name: 'Dept',
    path: 'dept',
    hidden: false,
    component: 'system/dept/index',
    meta: {
      title: '部门管理',
      icon: 'dept',
      noCache: true
    }
  }, {
    name: 'Job',
    path: 'job',
    hidden: false,
    component: 'system/job/index',
    meta: {
      title: '岗位管理',
      icon: 'Steve-Jobs',
      noCache: true
    }
  }, {
    name: 'Dict',
    path: 'dict',
    hidden: false,
    component: 'system/dict/index',
    meta: {
      title: '字典管理',
      icon: 'dictionary',
      noCache: true
    }
  }]
}, {
  name: '系统监控',
  path: '/monitor',
  hidden: false,
  redirect: 'noredirect',
  component: 'Layout',
  alwaysShow: true,
  meta: {
    title: '系统监控',
    icon: 'monitor',
    noCache: true
  },
  children: [{
    name: 'OnlineUser',
    path: 'online',
    hidden: false,
    component: 'monitor/online/index',
    meta: {
      title: '在线用户',
      icon: 'Steve-Jobs',
      noCache: true
    }
  }, {
    name: 'Log',
    path: 'logs',
    hidden: false,
    component: 'monitor/log/index',
    meta: {
      title: '操作日志',
      icon: 'log',
      noCache: true
    }
  }, {
    name: 'ErrorLog',
    path: 'errorLog',
    hidden: false,
    component: 'monitor/log/errorLog',
    meta: {
      title: '异常日志',
      icon: 'error',
      noCache: true
    }
  }, {
    name: 'Redis',
    path: 'redis',
    hidden: false,
    component: 'monitor/redis/index',
    meta: {
      title: '系统缓存',
      icon: 'redis',
      noCache: true
    }
  }, {
    name: 'Sql',
    path: 'druid',
    hidden: false,
    component: 'monitor/sql/index',
    meta: {
      title: 'SQL监控',
      icon: 'sqlMonitor',
      noCache: true
    }
  }]
}, {
  name: '系统工具',
  path: '/sys-tools',
  hidden: false,
  redirect: 'noredirect',
  component: 'Layout',
  alwaysShow: true,
  meta: {
    title: '系统工具',
    icon: 'sys-tools',
    noCache: true
  },
  children: [{
    name: 'Timing',
    path: 'timing',
    hidden: false,
    component: 'system/timing/index',
    meta: {
      title: '定时任务',
      icon: 'timing',
      noCache: true
    }
  }, {
    name: 'GeneratorIndex',
    path: 'generator',
    hidden: false,
    component: 'generator/index',
    meta: {
      title: '代码生成',
      icon: 'dev',
      noCache: true
    }
  }, {
    name: 'Storage',
    path: 'storage',
    hidden: false,
    component: 'tools/storage/index',
    meta: {
      title: '存储管理',
      icon: 'qiniu',
      noCache: true
    }
  }, {
    name: 'Email',
    path: 'email',
    hidden: false,
    component: 'tools/email/index',
    meta: {
      title: '邮件工具',
      icon: 'email',
      noCache: true
    }
  }, {
    name: 'Pictures',
    path: 'pictures',
    hidden: false,
    component: 'tools/picture/index',
    meta: {
      title: '图床管理',
      icon: 'image',
      noCache: true
    }
  }, {
    name: 'Swagger',
    path: 'swagger2',
    hidden: false,
    component: 'tools/swagger/index',
    meta: {
      title: '接口文档',
      icon: 'swagger',
      noCache: true
    }
  }, {
    name: 'AliPay',
    path: 'aliPay',
    hidden: false,
    component: 'tools/aliPay/index',
    meta: {
      title: '支付宝工具',
      icon: 'alipay',
      noCache: true
    }
  }]
}, {
  name: '组件管理',
  path: '/components',
  hidden: false,
  redirect: 'noredirect',
  component: 'Layout',
  alwaysShow: true,
  meta: {
    title: '组件管理',
    icon: 'zujian',
    noCache: true
  },
  children: [{
    name: 'Icons',
    path: 'icon',
    hidden: false,
    component: 'components/IconSelect',
    meta: {
      title: '图标库',
      icon: 'icon',
      noCache: true
    }
  }, {
    name: 'Editor',
    path: 'tinymce',
    hidden: false,
    component: 'components/Editor',
    meta: {
      title: '富文本',
      icon: 'fwb',
      noCache: true
    }
  }, {
    name: 'Markdown',
    path: 'markdown',
    hidden: false,
    component: 'components/MarkDown',
    meta: {
      title: 'Markdown',
      icon: 'markdown',
      noCache: true
    }
  }, {
    name: 'YamlEdit',
    path: 'yaml',
    hidden: false,
    component: 'components/YamlEdit',
    meta: {
      title: 'Yaml编辑器',
      icon: 'dev',
      noCache: true
    }
  }]
}, {
  name: '多级菜单',
  path: '/nested',
  hidden: true,
  redirect: 'noredirect',
  component: 'Layout',
  alwaysShow: true,
  meta: {
    title: '多级菜单',
    icon: 'menu',
    noCache: true
  },
  children: [{
    name: '二级菜单1',
    path: 'menu1',
    hidden: false,
    redirect: 'noredirect',
    component: 'nested/menu1/index',
    alwaysShow: true,
    meta: {
      title: '二级菜单1',
      icon: 'menu',
      noCache: true
    },
    children: [{
      name: '三级菜单1',
      path: 'menu1-1',
      hidden: false,
      component: 'nested/menu1/menu1-1',
      meta: {
        title: '三级菜单1',
        icon: 'menu',
        noCache: true
      }
    }, {
      name: '三级菜单2',
      path: 'menu1-2',
      hidden: false,
      component: 'nested/menu1/menu1-2',
      meta: {
        title: '三级菜单2',
        icon: 'menu',
        noCache: true
      }
    }]
  }, {
    name: '二级菜单2',
    path: 'menu2',
    hidden: false,
    component: 'nested/menu2/index',
    meta: {
      title: '二级菜单2',
      icon: 'menu',
      noCache: true
    }
  }]
}]

export default [
  // menus/build
  {
    url: '/menus/build',
    type: 'get',
    response: config => {
      return menuss
    }
  }
]
