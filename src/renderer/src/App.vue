<script setup lang="ts">
import { RouterView } from 'vue-router'
import { zhCN, dateZhCN, type GlobalThemeOverrides } from 'naive-ui'
const themeOverrides: GlobalThemeOverrides = {
  common: {
    fontWeightStrong: '600',
  },
}
</script>
<template>
  <div class="w-screen h-screen flex flex-col">
    <NConfigProvider
      :locale="zhCN"
      :date-locale="dateZhCN"
      :theme-overrides="themeOverrides"
      class="flex flex-col h-full"
    >
      <RouterView />
    </NConfigProvider>
  </div>
</template>
