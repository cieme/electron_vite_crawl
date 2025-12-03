<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'
import Layout from '@renderer/components/layout/index.vue'

const url = ref(
  'http://www.ccgp-liaoning.gov.cn/login',
  // 'https://item.jd.com/10155301055086.html?extension_id=eyJhZCI6IjI2OCIsImNoIjoiMiIsInNrdSI6IjEwMTU1MzAxMDU1MDg2IiwidHMiOiIxNzY0NTExOTUxIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcImUyZDcxZTM3LTM2YjYtNGFmZS04ODU5LTJjNmYxMGMwYTMyM1wiLFwibWF0ZXJpYWxfaWRcIjpcIjYxNTMzNDE4OTE2XCIsXCJwb3NfaWRcIjpcIjI2OFwiLFwic2lkXCI6XCJmZDhmZjk5Ny0wMTJhLTQyMTAtYThlMi05NGZmZjA1NjdiMmJcIn0ifQ==&jd_pop=e2d71e37-36b6-4afe-8859-2c6f10c0a323&abt=0',
)
const preload = `file://${window.api.preload}`

// const arr = [
//   'https://item.jd.com/10155301055086.html?extension_id=eyJhZCI6IjI2OCIsImNoIjoiMiIsInNrdSI6IjEwMTU1MzAxMDU1MDg2IiwidHMiOiIxNzY0NTExOTUxIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcImUyZDcxZTM3LTM2YjYtNGFmZS04ODU5LTJjNmYxMGMwYTMyM1wiLFwibWF0ZXJpYWxfaWRcIjpcIjYxNTMzNDE4OTE2XCIsXCJwb3NfaWRcIjpcIjI2OFwiLFwic2lkXCI6XCJmZDhmZjk5Ny0wMTJhLTQyMTAtYThlMi05NGZmZjA1NjdiMmJcIn0ifQ==&jd_pop=e2d71e37-36b6-4afe-8859-2c6f10c0a323&abt=0',
// ]
let webview: Electron.WebviewTag | null = null
onMounted(() => {
  webview = document.querySelector('#browser-webview') as Electron.WebviewTag
  addMountedEvent()
  window.electron.ipcRenderer.on('webview-data', (event, data) => {
    console.log(event, data)
  })
})
function toggleWebview() {
  removeEvent()
  // webview!.preload = preload
  webview!.src = toRaw(url.value)
  addEvent()
}
const themeOverrides = {
  common: {
    fontWeightStrong: '600',
  },
}
function addMountedEvent() {
  webview!.addEventListener('did-frame-navigate', (event) => {
    console.log(event)
    url.value = event.url
  })
}
function addEvent() {
  webview!.addEventListener('dom-ready', () => {
    console.log('dom-ready')
    webview!.openDevTools()
    webview!.executeJavaScript(
      `
    `,
      true,
    )
  })
}
function removeEvent() {}

function onBack() {
  webview!.goBack()
}
function onForward() {
  webview!.goForward()
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <NConfigProvider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
    >
      <Layout
        v-model:url="url"
        :webview="webview"
        @on-back="onBack"
        @on-forward="onForward"
        @on-enter="toggleWebview"
      />
      <RouterView />
    </NConfigProvider>
    <webview
      class="flex-1"
      id="browser-webview"
      src="https://www.bing.com"
      :preload="preload"
      autosize="on"
      allowpopups
      allowpresentation
      allow="autoplay; camera; microphone; display-capture; fullscreen"
    ></webview>
  </div>
</template>
