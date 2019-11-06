import defaultSettings from '@/settings'

const title = defaultSettings.title || '管理员后台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
