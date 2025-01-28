<template>
  <div class="rule-list">
    <div class="header">
      <h2>规则链列表</h2>
      <el-button type="primary" @click="createChain">新建规则链</el-button>
    </div>

    <el-table :data="chains" style="width: 100%">
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="version" label="版本" width="100" />
      <el-table-column prop="created_at" label="创建时间" width="180">
        <template #default="{ row }">
          {{ new Date(row.created_at).toLocaleString() }}
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="250">
        <template #default="{ row }">
          <el-button @click="editChain(row)">编辑</el-button>
          <el-button @click="cloneChain(row)">克隆</el-button>
          <el-button 
            type="danger" 
            @click="deleteChain(row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ruleApi } from '../api'
import type { RuleChain } from '../types'

const router = useRouter()
const chains = ref<RuleChain[]>([])

onMounted(async () => {
  chains.value = await ruleApi.getChains()
})

const createChain = () => {
  router.push('/editor/new')
}

const editChain = (chain: RuleChain) => {
  router.push(`/editor/${chain.id}`)
}

const cloneChain = async (chain: RuleChain) => {
  const cloned = await ruleApi.saveChain({
    ...chain,
    id: '',
    name: `${chain.name} (复制)`,
    version: 1
  })
  chains.value.push(cloned)
}

const deleteChain = async (chain: RuleChain) => {
  await ruleApi.deleteChain(chain.id)
  const index = chains.value.findIndex(c => c.id === chain.id)
  chains.value.splice(index, 1)
}
</script>

<style scoped>
.rule-list {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style> 