<script setup lang="ts">
import { onMounted, reactive, ref, toRaw, provide } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN, type GlobalThemeOverrides } from 'naive-ui'
import Layout from '@renderer/components/layout/index.vue'

const url = ref(
  'http://www.ccgp-liaoning.gov.cn/login',
  // 'https://item.jd.com/10155301055086.html?extension_id=eyJhZCI6IjI2OCIsImNoIjoiMiIsInNrdSI6IjEwMTU1MzAxMDU1MDg2IiwidHMiOiIxNzY0NTExOTUxIiwidW5pcWlkIjoie1wiY2xpY2tfaWRcIjpcImUyZDcxZTM3LTM2YjYtNGFmZS04ODU5LTJjNmYxMGMwYTMyM1wiLFwibWF0ZXJpYWxfaWRcIjpcIjYxNTMzNDE4OTE2XCIsXCJwb3NfaWRcIjpcIjI2OFwiLFwic2lkXCI6XCJmZDhmZjk5Ny0wMTJhLTQyMTAtYThlMi05NGZmZjA1NjdiMmJcIn0ifQ==&jd_pop=e2d71e37-36b6-4afe-8859-2c6f10c0a323&abt=0',
)
const preload = `file://${window.api.preload}`
const buttonState = reactive({
  back: false,
  forward: false,
})
const state: {
  webview: Electron.WebviewTag | null
} = {
  webview: null,
}
provide('state', () => state)

onMounted(() => {
  state.webview = document.querySelector(
    '#browser-webview',
  ) as Electron.WebviewTag
  addMountedEvent()
  updateButtonState()
})
function toggleWebview() {
  removeEvent()
  // webview!.preload = preload
  state.webview!.src = toRaw(url.value)
  addEvent()
}
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeightStrong: '600',
  },
}
function addMountedEvent() {
  state.webview!.addEventListener('did-navigate', (event) => {
    url.value = event.url
  })
  window.electron.ipcRenderer.on('webview-data', (event, data) => {
    console.log(event, data)
  })
}
function addEvent() {
  state.webview!.addEventListener('dom-ready', () => {
    console.log('dom-ready')
    // webview!.openDevTools()
    state.webview!.executeJavaScript(
      `
    `,
      true,
    )
  })
}
function removeEvent() {}

function onBack() {
  state.webview!.goBack()
  updateButtonState()
}
function onForward() {
  state.webview!.goForward()
  updateButtonState()
}
function onReload() {
  state.webview!.reload()
  updateButtonState()
}
function updateButtonState() {
  if (state.webview) {
    buttonState.back = state.webview!.canGoBack()
    buttonState.forward = state.webview!.canGoForward()
  }
}

function clickLiaoCai() {
  state!.webview!.src = `http://www.ccgp-liaoning.gov.cn/workspace`
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
        :can-back="buttonState.back"
        :can-forward="buttonState.forward"
        @on-back="onBack"
        @on-forward="onForward"
        @on-reload="onReload"
        @on-enter="toggleWebview"
      />
      <div class="flex items-center p-2">
        <NButtonGroup>
          <NButton @click="clickLiaoCai">辽采</NButton>
        </NButtonGroup>
      </div>
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
