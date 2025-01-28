<template>
  <div class="rule-editor">
    <div class="editor-header">
      <h2>{{ currentChain?.name || '新建规则链' }}</h2>
      <div class="actions">
        <el-button @click="handleSave">保存</el-button>
        <el-button @click="handleBack">返回</el-button>
      </div>
    </div>

    <div class="editor-content">
      <component-panel />
      <rule-canvas />
      <property-panel />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useRuleStore } from '../stores/rule'
import ComponentPanel from '../components/ComponentPanel.vue'
import RuleCanvas from '../components/RuleCanvas.vue'
import PropertyPanel from '../components/PropertyPanel.vue'
import type { RuleChain } from '../types'

const router = useRouter()
const route = useRoute()
const store = useRuleStore()
const currentChain = ref<RuleChain | null>(null)

onMounted(async () => {
  const id = route.params.id as string
  if (id !== 'new') {
    currentChain.value = await store.loadChain(id)
  }
})

const handleSave = async () => {
  if (!currentChain.value) return
  await store.saveChain()
  router.push('/')
}

const handleBack = () => {
  router.push('/')
}
</script>

<style scoped>
.rule-editor {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.editor-header {
  padding: 10px 20px;
  border-bottom: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editor-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}
</style> 