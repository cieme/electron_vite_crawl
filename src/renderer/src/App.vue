<script setup lang="ts">
import { onMounted, useTemplateRef, ref, toRaw } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN } from 'naive-ui'
const path = require('path')
const url = ref('https://www.bing.com')
// const arr = [
//   'https://item.jd.com/10155301055086.html?extension_id=eyJhZCI6IjI2OCIsImNoIjoiMiIsInNrdSI6IjEwMTU1MzAxMDU1MDg2IiwidHMiOiIxNzY0NTExOTUxIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcImUyZDcxZTM3LTM2YjYtNGFmZS04ODU5LTJjNmYxMGMwYTMyM1wiLFwibWF0ZXJpYWxfaWRcIjpcIjYxNTMzNDE4OTE2XCIsXCJwb3NfaWRcIjpcIjI2OFwiLFwic2lkXCI6XCJmZDhmZjk5Ny0wMTJhLTQyMTAtYThlMi05NGZmZjA1NjdiMmJcIn0ifQ==&jd_pop=e2d71e37-36b6-4afe-8859-2c6f10c0a323&abt=0',
// ]
let webview: Electron.WebviewTag | null = null
onMounted(() => {
  webview = document.getElementById('browser-webview') as Electron.WebviewTag
  console.log(window.api)
})
function toggleWebview() {
  removeEvent()

  webview!.preload = `file://${window.api.preload}}`
  webview!.src = toRaw(url.value)
  addEvent()
}
const themeOverrides = {
  common: {
    fontWeightStrong: '600',
  },
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
  window.api.onWebviewMsg((event) => {
    console.log(event)
  })
}
function removeEvent() {}
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN" :theme-overrides="themeOverrides">
    <div class="flex">
      <RouterView />
      <NInput type="text" v-model:value="url" @keyup.enter="toggleWebview" />
    </div>
  </NConfigProvider>
  <webview
    id="browser-webview"
    src="https://www.bing.com"
    autosize="on"
    nodeintegration
    disablewebsecurity
  ></webview>
</template>
