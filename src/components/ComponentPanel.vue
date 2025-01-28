<template>
  <div class="component-panel">
    <el-input
      v-model="searchText"
      placeholder="搜索组件"
      prefix-icon="Search"
    />
    
    <el-collapse v-model="activeNames">
      <el-collapse-item title="基础组件" name="basic">
        <div 
          v-for="comp in filteredComponents" 
          :key="comp.type_name"
          class="component-item"
          draggable="true"
          @dragstart="handleDragStart($event, comp)"
        >
          <el-icon><component :is="comp.icon" /></el-icon>
          <span>{{ comp.name }}</span>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ComponentMeta } from '../types'

const searchText = ref('')
const activeNames = ref(['basic'])

const components: ComponentMeta[] = [
  {
    type_name: 'log',
    name: '日志节点',
    description: '输出日志信息',
    icon: 'Document',
    config_schema: {}
  },
  {
    type_name: 'script',
    name: '脚本节点',
    description: '执行JavaScript代码',
    icon: 'Code',
    config_schema: {}
  }
]

const filteredComponents = computed(() => {
  return components.filter(comp => 
    comp.name.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

const handleDragStart = (event: DragEvent, comp: ComponentMeta) => {
  if (event.dataTransfer) {
    event.dataTransfer.setData('component', JSON.stringify(comp))
  }
}
</script>

<style scoped>
.component-panel {
  width: 250px;
  border-right: 1px solid #ddd;
  padding: 10px;
}

.component-item {
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: move;
  border: 1px solid #eee;
  margin: 4px 0;
}

.component-item:hover {
  background: #f5f5f5;
}

.el-icon {
  margin-right: 8px;
  font-size: 16px;
}
</style> 