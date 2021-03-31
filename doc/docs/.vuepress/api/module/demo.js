const base = ''
const apiList = [
  {
    name: 'index',
    url: "/demo",
    method: 'get',
    desc: '样例'
  },
  {
    name: 'getDemo2',
    url: "/demo2",
    method: 'get',
    desc: '样例2'
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