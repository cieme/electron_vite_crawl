<script setup lang="ts">
import Versions from '@renderer/components/Versions.vue'

const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')
</script>

<template>
  <div class="action">
    <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
  </div>
  <Versions />
</template>
