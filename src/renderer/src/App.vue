<script setup lang="ts">
import { onMounted, reactive, ref, toRaw, provide } from 'vue'
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN, type GlobalThemeOverrides } from 'naive-ui'
import Layout from '@renderer/components/layout/index.vue'

const buttonState = reactive({
  back: true,
  forward: true,
  url: '',
})
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeightStrong: '600',
  },
}
const onBack = () => {
  window.electron.ipcRenderer.send('onBack')
}
const onForward = () => {
  window.electron.ipcRenderer.send('onForward')
}
const onReload = () => {
  window.electron.ipcRenderer.send('onReload')
}
const onToggleWebview = () => {
  window.electron.ipcRenderer.send('toggleWebview', buttonState.url)
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
          <NButton>辽采</NButton>
        </NButtonGroup>
      </div>
      <RouterView />
    </NConfigProvider>
  </div>
</template>
