<template>
  <div class="property-panel">
    <node-config-form v-if="store.selectedNode" />
    <div v-else class="empty-tip">
      请选择一个节点进行配置
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRuleStore } from '../stores/rule'
import NodeConfigForm from './NodeConfigForm.vue'

const store = useRuleStore()
</script>

<style scoped>
.property-panel {
  width: 300px;
  border-left: 1px solid #ddd;
  padding: 20px;
  overflow-y: auto;
}

.empty-tip {
  color: #999;
  text-align: center;
  padding: 20px;
}
</style> 