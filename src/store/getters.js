const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  loadMenus: state => state.user.loadMenus,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routers: state => state.permission.routers,
  baseApi: state => state.api.baseApi,
  user: state => state.user.user
}
export default getters
