import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import path from 'path'

// Custom APIs for renderer
const api = {
  preload: path.join(__dirname, './preload.js'),
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
/**
 * 根据上下文隔离是否启用，选择不同的暴露方式：
 * 启用时：使用 contextBridge 安全地暴露 API
 * 未启用时：直接挂载到 window 对象
 * */
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
