import axios from 'axios'
import type { RuleChain, Node, ComponentMeta } from '../types'

const api = axios.create({
  baseURL: '/api'
})

export const ruleApi = {
  // 规则链相关
  getChains(): Promise<RuleChain[]> {
    return api.get('/chains').then(res => res.data)
  },

  getChainById(id: string): Promise<RuleChain> {
    return api.get(`/chains/${id}`).then(res => res.data)
  },

  saveChain(chain: RuleChain): Promise<RuleChain> {
    return api.post('/chains', chain).then(res => res.data)
  },

  deleteChain(id: string): Promise<void> {
    return api.delete(`/chains/${id}`)
  },

  // 组件相关
  getComponents(): Promise<ComponentMeta[]> {
    return api.get('/components').then(res => res.data)
  },

  getComponentSchema(type: string): Promise<any> {
    return api.get(`/components/${type}/schema`).then(res => res.data)
  }
} 