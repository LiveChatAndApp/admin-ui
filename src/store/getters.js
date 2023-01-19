const getters = {
  user: state => state.user.user,
  bulletin: state => state.bulletin.list,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permissionRouters: state => state.permission.routers,
  errorLogs: state => state.errorLog.logs,
  addRouters: state => state.permission.addRouters
}
export default getters
