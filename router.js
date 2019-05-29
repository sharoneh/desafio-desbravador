const Router = function(name, routes) {
  return { name, routes }
}

const mainRouter = new Router('mainRouter', [
  {
    name: 'root',
    path: '/'
  },
  {
    name: 'user',
    path: '/user'
  },
  {
    name: 'repo',
    path: '/repo'
  }
])