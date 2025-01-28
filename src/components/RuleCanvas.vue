<template>
  <div class="rule-canvas" ref="container">
    <div ref="lf" class="flow-canvas"></div>
    <div class="toolbar">
      <el-button-group>
        <el-button @click="handleZoomIn">
          <el-icon><ZoomIn /></el-icon>
        </el-button>
        <el-button @click="handleZoomOut">
          <el-icon><ZoomOut /></el-icon>
        </el-button>
        <el-button @click="handleFitView">
          <el-icon><FullScreen /></el-icon>
        </el-button>
      </el-button-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import LogicFlow from '@logicflow/core'
import { DndPanel, SelectionSelect, MiniMap } from '@logicflow/extension'
import { ZoomIn, ZoomOut, FullScreen } from '@element-plus/icons-vue'
import { useRuleStore } from '../stores/rule'
import { nodeTypes } from './nodes'
import type { Node, Edge } from '../types'

const container = ref<HTMLElement>()
const lf = ref<LogicFlow>()
const store = useRuleStore()

onMounted(() => {
  if (!container.value) return
  
  lf.value = new LogicFlow({
    container: container.value,
    grid: true,
    plugins: [DndPanel, SelectionSelect, MiniMap],
    nodeTextDraggable: true,
    edgeTextDraggable: true,
    nodeTextEdit: true,
    edgeTextEdit: true
  })

  // 注册所有节点类型
  Object.entries(nodeTypes).forEach(([type, node]) => {
    lf.value?.register(node)
  })

  lf.value.render()
  
  // 监听节点变化
  lf.value.on('node:add', (data) => {
    store.addNode({
      id: data.data.id,
      type: data.data.type,
      position: data.data.position,
      data: {
        type_name: data.data.properties?.type_name || '',
        chain_id: store.currentChain?.id || '',
        config: {}
      }
    })
  })

  lf.value.on('node:delete', (data) => {
    store.removeNode(data.data.id)
  })

  lf.value.on('edge:add', (data) => {
    store.addEdge({
      id: data.data.id,
      source: data.data.sourceNodeId,
      target: data.data.targetNodeId
    })
  })

  lf.value.on('edge:delete', (data) => {
    store.removeEdge(data.data.id)
  })

  lf.value.on('node:click', (data) => {
    store.selectNode(data.data.id)
  })
})

// 监听数据变化更新画布
watch(() => store.nodes, (nodes) => {
  if (!lf.value) return
  lf.value.clearData()
  lf.value.render({
    nodes,
    edges: store.edges
  })
}, { deep: true })

const handleZoomIn = () => {
  lf.value?.zoom(true)
}

const handleZoomOut = () => {
  lf.value?.zoom(false)
}

const handleFitView = () => {
  lf.value?.fitView()
}
</script>

<style scoped>
.rule-canvas {
  flex: 1;
  height: 100%;
  position: relative;
}

.flow-canvas {
  width: 100%;
  height: 100%;
}

.toolbar {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 1;
}
</style> 