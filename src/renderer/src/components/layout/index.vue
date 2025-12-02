<template>
  <div class="flex py-2 pr-2">
    <section class="flex justify-center items-center gap-4 py-2 px-4">
      <NIcon
        :size="size"
        class="cursor-pointer hover:text-gray-500"
        @click="emit('onBack', $event)"
      >
        <ArrowLeftOutlined />
      </NIcon>
      <NIcon
        :size="size"
        class="cursor-pointer hover:text-gray-500"
        @click="emit('onForward', $event)"
      >
        <ArrowRightOutlined />
      </NIcon>
      <NIcon
        :size="size"
        class="cursor-pointer hover:text-gray-500"
        @click="emit('onReload', $event)"
      >
        <ReloadOutlined />
      </NIcon>
    </section>
    <NInput
      v-model:value="url"
      placeholder="输入网址"
      @keyup.enter="toggleWebview"
    />
  </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@vicons/antd'

const size = ref(18)
const emit = defineEmits<{
  onEnter: [KeyboardEvent]
  onBack: [KeyboardEvent]
  onForward: [KeyboardEvent]
  onReload: [KeyboardEvent]
}>()
const url = defineModel('url', {
  default: ref(''),
  type: String,
})
const toggleWebview = (e: KeyboardEvent) => {
  emit('onEnter', e)
}
</script>
<style lang="scss" scoped></style>
