import { defineStore } from 'pinia'
import { ruleApi } from '../api'
import type { RuleChain, Node, Edge } from '../types'

export const useRuleStore = defineStore('rule', {
  state: () => ({
    currentChain: null as RuleChain | null,
    nodes: [] as Node[],
    edges: [] as Edge[],
    selectedNodeId: null as string | null
  }),

  getters: {
    selectedNode: (state) => {
      if (!state.selectedNodeId) return null
      return state.nodes.find(n => n.id === state.selectedNodeId)
    }
  },

  actions: {
    async loadChain(id: string) {
      const chain = await ruleApi.getChainById(id)
      this.currentChain = chain
      this.nodes = chain.nodes || []
      this.edges = chain.edges || []
      return chain
    },
    
    async saveChain() {
      if (!this.currentChain) return
      await ruleApi.saveChain({
        ...this.currentChain,
        nodes: this.nodes,
        edges: this.edges
      })
    },
    
    addNode(node: Node) {
      this.nodes.push(node)
    },

    removeNode(id: string) {
      const index = this.nodes.findIndex(n => n.id === id)
      if (index > -1) {
        this.nodes.splice(index, 1)
        // 删除相关的边
        this.edges = this.edges.filter(e => 
          e.source !== id && e.target !== id
        )
      }
    },
    
    updateNode(id: string, data: Partial<Node>) {
      const index = this.nodes.findIndex(n => n.id === id)
      if (index > -1) {
        this.nodes[index] = { ...this.nodes[index], ...data }
      }
    },

    addEdge(edge: Edge) {
      this.edges.push(edge)
    },

    removeEdge(id: string) {
      const index = this.edges.findIndex(e => e.id === id)
      if (index > -1) {
        this.edges.splice(index, 1)
      }
    },

    selectNode(id: string | null) {
      this.selectedNodeId = id
    }
  }
}) 