const base = '/user'
const apiList = [
  {
    name: 'deleteUser',
    url: "/delete/:username",
    method: 'delete',
    desc: '删除用户'
  },
  {
    name: 'getInfo0',
    url: "/info",
    method: 'get',
    desc: '获取用户信息'
  },
  {
    name: 'getInfo1',
    url: "/info",
    method: 'get',
    desc: '获取用户信息',
    allRes: true
  },
  {
    name: 'getInfo2',
    url: "/info",
    method: 'get',
    desc: '获取用户信息',
    allRes: 'all'
  },
  {
    name: 'getInfo0',
    url: "/info",
    method: 'get',
    desc: '获取用户信息'
  },
  {
    name: 'getInfoByHeaders',
    url: "/info",
    method: 'get',
    desc: '获取用户信息',
    config: {
      headers: {
        token: 'abcdefg'
      }
    }
  },
  {
    name: 'getInfoByStatus',
    url: "/getInfoByStatus",
    method: 'get',
    desc: '根据code返回不同结果'
  },
  {
    name: 'getInfoByCache',
    url: "/info",
    method: 'get',
    desc: '获取用户信息',
    config: {
      cacheTime: 3 * 60 * 1000
    }
  }
]
export default apiList.map(item => {
  if (item.url) {
    item.url = base + item.url;
    return item;
  } else {
    throw new Error(item.desc + '的url不能为空');
  }
});