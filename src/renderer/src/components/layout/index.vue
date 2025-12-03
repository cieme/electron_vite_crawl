<template>
  <div class="flex py-2 pr-2">
    <section class="flex justify-center items-center gap-3 px-4">
      <NButton
        strong
        quaternary
        circle
        size="medium"
        :disabled="!canBack"
        class="cursor-pointer! hover:text-gray-500 hover:bg-gray-200!"
        @click="emit('onBack', $event)"
      >
        <template #icon>
          <NIcon :size="size">
            <ArrowLeftOutlined />
          </NIcon>
        </template>
      </NButton>
      <NButton
        strong
        quaternary
        circle
        size="medium"
        :disabled="!canForward"
        class="cursor-pointer! hover:text-gray-500 hover:bg-gray-200!"
        @click="emit('onForward', $event)"
      >
        <template #icon>
          <NIcon :size="size"> <ArrowRightOutlined /> </NIcon
        ></template>
      </NButton>
      <NButton
        strong
        quaternary
        circle
        size="medium"
        class="cursor-pointer! hover:text-gray-500 hover:bg-gray-200!"
        @click="emit('onReload', $event)"
      >
        <template #icon>
          <NIcon :size="size">
            <ReloadOutlined />
          </NIcon>
        </template>
      </NButton>
    </section>
    <NInput
      v-model:value="url"
      placeholder="输入网址"
      @keyup.enter="toggleWebview"
    />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ReloadOutlined,
} from '@vicons/antd'
import { NButton } from 'naive-ui'

const size = ref(18)
const props = withDefaults(
  defineProps<{
    canBack: boolean
    canForward: boolean
  }>(),
  {
    canBack: false,
    canForward: false,
  },
)
const emit = defineEmits<{
  onEnter: [KeyboardEvent]
  onBack: [MouseEvent]
  onForward: [MouseEvent]
  onReload: [MouseEvent]
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
