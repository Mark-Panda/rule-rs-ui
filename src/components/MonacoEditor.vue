<template>
  <div ref="editorContainer" class="monaco-editor-container"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'
import type { editor } from 'monaco-editor'

interface Props {
  modelValue: string
  language?: string
  height?: number
}

const props = withDefaults(defineProps<Props>(), {
  language: 'javascript',
  height: 200
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorContainer = ref<HTMLElement>()
let editor: editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  if (!editorContainer.value) return

  editor = monaco.editor.create(editorContainer.value, {
    value: props.modelValue,
    language: props.language,
    theme: 'vs',
    automaticLayout: true,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    lineNumbers: 'on',
    wordWrap: 'on',
    height: props.height
  })

  editor.onDidChangeModelContent(() => {
    const value = editor?.getValue() || ''
    emit('update:modelValue', value)
  })
})

watch(() => props.modelValue, (newValue: string) => {
  if (editor && newValue !== editor.getValue()) {
    editor.setValue(newValue)
  }
})

onBeforeUnmount(() => {
  if (editor) {
    editor.dispose()
  }
})
</script>

<style scoped>
.monaco-editor-container {
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style> 