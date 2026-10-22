/**
 * PWA 安装状态管理
 *
 * beforeinstallprompt 只会在页面加载早期触发一次，且事件对象必须保存下来
 * 才能在用户点击时调用 prompt()。所以这里放到模块作用域，用一个极简的
 * 订阅模型和 React 的 useSyncExternalStore 对接。
 */

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>
}

const DISMISS_KEY = 'pwa:install-dismissed-at'
const INSTALLED_KEY = 'pwa:installed'
const DISMISS_DAYS = 30

let deferredPrompt: BeforeInstallPromptEvent | null = null
let installed = false

const stateListeners = new Set<() => void>()
const bannerListeners = new Set<() => void>()

function emitState() {
  stateListeners.forEach((fn) => fn())
}

function emitBanner() {
  bannerListeners.forEach((fn) => fn())
}

export function subscribeState(fn: () => void): () => void {
  stateListeners.add(fn)
  return () => {
    stateListeners.delete(fn)
  }
}

/** 浏览器是否已经准备好弹出安装提示（Chromium 系） */
export function getInstallable(): boolean {
  return deferredPrompt !== null
}

export function subscribeBanner(fn: () => void): () => void {
  bannerListeners.add(fn)
  return () => {
    bannerListeners.delete(fn)
  }
}

/** 手动唤起安装说明（页脚「安装 App」按钮用） */
export function showInstallBanner() {
  emitBanner()
}

export function isStandalone(): boolean {
  if (typeof window === 'undefined') return false
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.matchMedia('(display-mode: window-controls-overlay)').matches ||
    (window.navigator as Navigator & { standalone?: boolean }).standalone === true
  )
}

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  return (
    /iPad|iPhone|iPod/.test(ua) ||
    // iPadOS 13+ 的 UA 与 macOS 相同，用触摸点数区分
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)
  )
}

export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 768
}

export function hasInstalled(): boolean {
  if (installed) return true
  try {
    return localStorage.getItem(INSTALLED_KEY) === '1'
  } catch {
    return false
  }
}

export function wasInstallDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY))
    return Number.isFinite(at) && at > 0 && Date.now() - at < DISMISS_DAYS * 86_400_000
  } catch {
    return false
  }
}

export function dismissInstall() {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()))
  } catch {
    // 隐私模式下 localStorage 不可写，忽略即可
  }
  emitState()
}

export async function promptInstall(): Promise<'accepted' | 'dismissed' | 'unavailable'> {
  if (!deferredPrompt) return 'unavailable'
  const event = deferredPrompt
  // 事件对象只能用一次
  deferredPrompt = null
  emitState()
  await event.prompt()
  const choice = await event.userChoice
  return choice.outcome
}

if (typeof window !== 'undefined') {
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault()
    deferredPrompt = event as BeforeInstallPromptEvent
    emitState()
  })

  window.addEventListener('appinstalled', () => {
    deferredPrompt = null
    installed = true
    try {
      localStorage.setItem(INSTALLED_KEY, '1')
    } catch {
      // 同上
    }
    emitState()
  })
}
