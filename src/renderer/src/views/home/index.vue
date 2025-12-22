<template>
  <Layout
    v-model:url="buttonState.url"
    :can-back="buttonState.back"
    :can-forward="buttonState.forward"
    @on-back="onBack"
    @on-forward="onForward"
    @on-reload="onReload"
    @on-enter="onToggleWebview"
  />
  <div class="flex items-center p-2">
    <NButtonGroup>
      <NButton @click="clickHanderLC">辽采</NButton>
      <NButton @click="submit1">提交1</NButton>
    </NButtonGroup>
  </div>
  <div class="flex-1">
    <webview
      id="browser-webview"
      class="w-full h-full"
      :src="toUrl()"
      :preload="preload"
      autosize="on"
      allowpopups
      allowpresentation
      partition="persist:myapp"
    ></webview>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, toRaw, provide } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { zhCN, dateZhCN, type GlobalThemeOverrides } from 'naive-ui'
import { ENUM_SUBMIT } from '@enum/index'
import Layout from '@renderer/components/layout/index.vue'
const preload = `file://${window.api.preload}`
const router = useRouter()
const defaultSrc = '/welcomeView'
const buttonState = reactive({
  back: true,
  forward: true,
  url: '',
})

let webview: null | Electron.WebviewTag = null
function toUrl() {
  const origin = location.origin
  const href = router.resolve(defaultSrc).href
  return origin + '/' + href
}
onMounted(() => {
  webview = document.querySelector('#browser-webview')
  webview!.addEventListener('dom-ready', () => {
    webview?.openDevTools()
  })
  webview!.addEventListener('did-navigate', (event) => {
    buttonState.url = event.url
  })
})
const onBack = () => {
  window.electron.ipcRenderer.send('onBack')
  webview?.goBack()
}
const onForward = () => {
  window.electron.ipcRenderer.send('onForward')
  webview?.goForward()
}
const onReload = () => {
  window.electron.ipcRenderer.send('onReload')
}
const onToggleWebview = () => {
  window.electron.ipcRenderer.send('toggleWebview', buttonState.url)
  webview?.loadURL(buttonState.url)
}
const clickHanderLC = () => {
  webview?.loadURL(`http://www.ccgp-liaoning.gov.cn/workspace`)
}
const submit1 = () => {
  webview?.send(ENUM_SUBMIT.SUBMIT_1, buttonState.url)
}
</script>

<style lang="scss" scoped></style>
