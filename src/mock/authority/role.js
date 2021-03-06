const list = [

  {
    roleId: 1,
    roleName: '系统管理员',
    roleKey: 'admin',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '代码管理'],
      '系统': []
    }
  },
  {
    roleId: 2,
    roleName: '超级管理员',
    roleKey: 'super',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '角色管理', '代码管理'],
      '系统': []
    }
  },
  {
    roleId: 3,
    roleName: '开发',
    roleKey: 'developer',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['代码管理'],
      '系统': []
    }
  },
  {
    roleId: 4,
    roleName: '编辑',
    roleKey: 'editor',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['文章管理'],
      '系统': []
    }
  },
  {
    roleId: 5,
    roleName: '访客',
    roleKey: 'vistor',
    roleStatus: '1',
    canOperatePage: {
      '权限': [],
      '系统': []
    }
  }
]

const tableData = {
  list: list,
  total: list.length
}

export default {
  getRoleList: () => {
    return {
      tableData
    }
  },
  updateRole: () => {
    return {
      message: '更新成功！'
    }
  },
  deleteRole: () => {
    return {
      message: '删除成功！'
    }
  }
}
