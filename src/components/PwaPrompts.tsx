import { useEffect, useState, useSyncExternalStore, type ReactNode } from 'react'
import { registerSW } from 'virtual:pwa-register'
import {
  dismissInstall,
  getInstallable,
  hasInstalled,
  isIOS,
  isMobileDevice,
  isStandalone,
  promptInstall,
  showInstallBanner,
  subscribeBanner,
  subscribeState,
  wasInstallDismissed,
} from '../utils/pwa'

/** registerSW 返回的更新函数，只在这里保存一份 */
let applyUpdate: ((reloadPage?: boolean) => Promise<void>) | null = null

function useInstallable(): boolean {
  return useSyncExternalStore(subscribeState, getInstallable, () => false)
}

function CloseIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function Sheet({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] flex justify-center px-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
      <div
        role="dialog"
        aria-label={label}
        aria-live="polite"
        className="pointer-events-auto w-full max-w-sm border-t-2 border-ink-900 bg-paper px-4 py-3.5 shadow-[0_-10px_40px_-14px_rgba(12,15,22,0.4)] animate-[slide-up_260ms_cubic-bezier(0.22,1,0.36,1)] dark:border-ink-100 dark:bg-ink-900"
      >
        {children}
      </div>
    </div>
  )
}

export default function PwaPrompts() {
  const installable = useInstallable()
  const [needUpdate, setNeedUpdate] = useState(false)
  const [updateLater, setUpdateLater] = useState(false)
  const [installOpen, setInstallOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  // 注册 Service Worker；页面重新可见时顺带检查新版本
  useEffect(() => {
    applyUpdate = registerSW({
      immediate: true,
      onNeedRefresh() {
        setNeedUpdate(true)
      },
    })

    let lastCheck = 0
    const check = () => {
      if (document.visibilityState !== 'visible') return
      if (Date.now() - lastCheck < 10 * 60 * 1000) return
      lastCheck = Date.now()
      navigator.serviceWorker
        ?.getRegistration()
        .then((reg) => reg?.update())
        .catch(() => {})
    }
    document.addEventListener('visibilitychange', check)
    return () => document.removeEventListener('visibilitychange', check)
  }, [])

  // 手机上首次访问，延迟几秒再问，避免打断阅读
  useEffect(() => {
    if (isStandalone() || hasInstalled() || wasInstallDismissed()) return
    if (!isMobileDevice()) return
    if (!installable && !isIOS()) return

    const timer = window.setTimeout(() => setInstallOpen(true), 4000)
    return () => window.clearTimeout(timer)
  }, [installable])

  // 页脚「安装 App」手动唤起
  useEffect(() => subscribeBanner(() => setInstallOpen(true)), [])

  const closeInstall = () => {
    setInstallOpen(false)
    dismissInstall()
  }

  const handleInstall = async () => {
    if (!installable) return
    setBusy(true)
    const outcome = await promptInstall()
    setBusy(false)
    if (outcome === 'dismissed') dismissInstall()
    if (outcome !== 'unavailable') setInstallOpen(false)
  }

  if (needUpdate && !updateLater) {
    return (
      <Sheet label="有新版本">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="kicker-red">Update</div>
            <h2 className="mt-1 font-heading text-[1.05rem] font-medium text-ink-900 dark:text-ink-100">
              有新版本可以阅读
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              更新后即可看到最新文章，当前阅读进度不受影响。
            </p>
          </div>
          <button
            type="button"
            onClick={() => setUpdateLater(true)}
            aria-label="稍后更新"
            className="-mr-1 -mt-1 p-1 text-ink-400 transition-colors hover:text-ink-900 dark:text-ink-500 dark:hover:text-ink-100"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={() => void applyUpdate?.(true)}
            className="bg-vermilion-500 px-4 py-1.5 text-xs font-medium tracking-wide text-white transition-colors hover:bg-vermilion-600"
          >
            立即更新
          </button>
          <button
            type="button"
            onClick={() => setUpdateLater(true)}
            className="px-3 py-1.5 text-xs text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
          >
            稍后
          </button>
        </div>
      </Sheet>
    )
  }

  if (!installOpen || isStandalone() || hasInstalled()) return null

  const showIOSSteps = !installable && isIOS()

  return (
    <Sheet label="安装 App">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="kicker-red">Install</div>
          <h2 className="mt-1 font-heading text-[1.05rem] font-medium text-ink-900 dark:text-ink-100">
            把博客装到手机桌面
          </h2>
          {showIOSSteps ? (
            <ol className="mt-2 space-y-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              <li>1. 用 Safari 打开本站</li>
              <li>2. 点击底部「分享」按钮</li>
              <li>3. 选择「添加到主屏幕」</li>
            </ol>
          ) : (
            <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
              独立窗口、离线可读，内容与网页自动同步。
            </p>
          )}
        </div>
        <button
          type="button"
          onClick={closeInstall}
          aria-label="关闭"
          className="-mr-1 -mt-1 p-1 text-ink-400 transition-colors hover:text-ink-900 dark:text-ink-500 dark:hover:text-ink-100"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="mt-3 flex items-center gap-2">
        {installable ? (
          <button
            type="button"
            onClick={handleInstall}
            disabled={busy}
            className="bg-vermilion-500 px-4 py-1.5 text-xs font-medium tracking-wide text-white transition-colors hover:bg-vermilion-600 disabled:opacity-60"
          >
            {busy ? '正在安装…' : '立即安装'}
          </button>
        ) : (
          <span className="text-xs text-ink-400 dark:text-ink-500">
            也可在浏览器菜单里选择「安装应用」或「添加到主屏幕」
          </span>
        )}
        <button
          type="button"
          onClick={closeInstall}
          className="ml-auto px-3 py-1.5 text-xs text-ink-500 transition-colors hover:text-ink-900 dark:text-ink-400 dark:hover:text-ink-100"
        >
          以后再说
        </button>
      </div>
    </Sheet>
  )
}

/** 页脚入口：让"安装"随时可找到，而不是只在首次访问弹一次 */
export function PwaInstallLink() {
  const installed = useSyncExternalStore(subscribeState, hasInstalled, () => false)
  if (installed || isStandalone()) return null

  return (
    <button
      type="button"
      onClick={showInstallBanner}
      className="mt-5 inline-flex items-center gap-1.5 border border-ink-300 px-3 py-1.5 text-[0.6875rem] uppercase tracking-[0.18em] text-ink-500 transition-colors hover:border-ink-900 hover:text-ink-900 dark:border-ink-700 dark:text-ink-400 dark:hover:border-ink-100 dark:hover:text-ink-100"
    >
      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" />
      </svg>
      安装 App
    </button>
  )
}
