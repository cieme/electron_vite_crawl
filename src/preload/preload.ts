import { ipcRenderer } from 'electron'
console.log('preload.js')

window.addEventListener('DOMContentLoaded', () => {
  // 滚动到页面最底部
  window.scrollTo(0, document.body.scrollHeight)
  setTimeout(() => {
    // const skuName = (document.querySelector('.sku-title-name')! as HTMLDivElement).innerText
    // console.log(skuName)
    // ipcRenderer.send('webview-data', skuName)
  }, 2e3)
})
