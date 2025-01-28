<template>
  <el-form 
    v-if="currentNode"
    :model="formData" 
    label-width="100px"
    @submit.prevent="handleSubmit"
  >
    <el-form-item label="节点名称">
      <el-input v-model="formData.name" />
    </el-form-item>

    <template v-if="nodeConfig">
      <el-form-item 
        v-for="(field, key) in nodeConfig.config" 
        :key="key"
        :label="field.label"
        :required="field.required"
      >
        <!-- 文本输入 -->
        <el-input 
          v-if="field.type === 'input'"
          v-model="formData.config[key]"
          :placeholder="field.placeholder"
        />

        <!-- 文本域 -->
        <el-input 
          v-else-if="field.type === 'textarea'"
          v-model="formData.config[key]"
          type="textarea"
          :rows="4"
        />

        <!-- 下拉选择 -->
        <el-select
          v-else-if="field.type === 'select'"
          v-model="formData.config[key]"
        >
          <el-option
            v-for="opt in field.options"
            :key="opt"
            :label="opt"
            :value="opt"
          />
        </el-select>

        <!-- Monaco编辑器 -->
        <monaco-editor
          v-else-if="field.type === 'monaco-editor'"
          v-model="formData.config[key]"
          :language="field.language"
          :height="300"
        />
      </el-form-item>
    </template>

    <el-form-item>
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRuleStore } from '../stores/rule'
import { nodeConfigs } from './nodes'
import MonacoEditor from './MonacoEditor.vue'
import type { Node } from '../types'
import type { NodeConfig } from '../types/node-config'

interface FormData {
  name: string
  config: Record<string, any>
}

const store = useRuleStore()

const currentNode = computed(() => store.selectedNode)

const nodeConfig = computed<NodeConfig | null>(() => {
  if (!currentNode.value) return null
  return nodeConfigs[currentNode.value.type]
})

const formData = ref<FormData>({
  name: '',
  config: {}
})

watch(currentNode, (node: Node | null) => {
  if (node) {
    formData.value = {
      name: node.data.name || '',
      config: { ...node.data.config }
    }
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!currentNode.value) return
  
  store.updateNode(currentNode.value.id, {
    data: {
      ...currentNode.value.data,
      name: formData.value.name,
      config: formData.value.config
    }
  })
}
</script> 