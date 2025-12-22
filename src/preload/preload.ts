import { ipcRenderer } from 'electron'
import { ENUM_SUBMIT } from '../enum'
window.addEventListener('DOMContentLoaded', () => {
  autoLoginForm()
})
/**
 * 自动填充登录表单
 */
function autoLoginForm() {
  if (window.location.href === 'http://www.ccgp-liaoning.gov.cn/login') {
    setTimeout(() => {
      const form_item_account: HTMLInputElement | undefined =
        document.querySelector('#form_item_account') as HTMLInputElement
      const form_item_password: HTMLInputElement | undefined =
        document.querySelector('#form_item_password') as HTMLInputElement
      console.log(form_item_account)
      if (form_item_account) {
        form_item_account.value = 'Zhengcai'
        form_item_account.dispatchEvent(new Event('input', { bubbles: true }))
      }
      if (form_item_password) {
        form_item_password.value = 'Zhengcai@159'
        form_item_password.dispatchEvent(new Event('input', { bubbles: true }))
      }
    }, 500)
  }
}

function isLogin() {}

ipcRenderer.removeAllListeners(ENUM_SUBMIT.SUBMIT_1)
ipcRenderer.on(ENUM_SUBMIT.SUBMIT_1, (e, data: string) => {
  console.log(data)
})
