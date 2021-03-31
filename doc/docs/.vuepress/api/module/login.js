const base = '/auth'
const apiList = [
  {
    name: 'postLogin',
    url: "/login",
    method: 'post',
    desc: '用户登录'
  },
  {
    name: 'getLogin',
    url: "/checkLogin",
    method: 'get',
    desc: '获取用户登录状态'
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