// 导入 Electron 模块和工具
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

// 创建浏览器窗口函数
function createWindow(): void {
  // 创建浏览器窗口
  const mainWindow = new BrowserWindow({
    width: 900, // 窗口宽度
    height: 670, // 窗口高度
    show: false, // 初始不显示
    autoHideMenuBar: false, // 自动隐藏菜单栏
    titleBarStyle: 'hidden',
    frame: false,
    ...(process.platform === 'linux' ? { icon } : {}), // Linux 系统设置图标
    webPreferences: {
      // 网页功能设置
      preload: join(__dirname, '../preload/index.js'), // 预加载脚本
      sandbox: false // 关闭沙盒模式
    }
  })

  // 窗口准备就绪时显示
  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // 处理新窗口打开请求
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url) // 在默认浏览器中打开外部链接
    return { action: 'deny' } // 阻止在应用中打开新窗口
  })

  // 基于 electron-vite 的热重载
  // 开发环境加载远程 URL，生产环境加载本地 HTML 文件
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// 当 Electron 完成初始化并准备创建浏览器窗口时调用此方法
// 有些 API 只能在此事件发生后使用
app.whenReady().then(() => {
  // 为 Windows 设置应用用户模型 ID
  electronApp.setAppUserModelId('com.electron')

  // 开发环境下默认按 F12 打开/关闭开发者工具
  // 生产环境下忽略 CommandOrControl + R 刷新
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC 通信测试
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function () {
    // 在 macOS 上，当点击 dock 图标且没有其他窗口打开时，
    // 通常会在应用中重新创建一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 当所有窗口都关闭时退出应用，除了 macOS
// 在 macOS 上，应用及其菜单栏通常保持活动状态，
// 直到用户使用 Cmd + Q 显式退出
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// 在此文件中，您可以包含应用程序主进程的其余特定代码
// 您也可以将它们放在单独的文件中并在此处引入
