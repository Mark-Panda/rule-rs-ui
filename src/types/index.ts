export interface RuleChain {
  id: string
  name: string
  root: boolean
  created_at: number
  updated_at: number
  version: number
}

export interface Node {
  id: string
  type: string
  position: {
    x: number
    y: number
  }
  data: {
    type_name: string
    chain_id: string
    config: Record<string, any>
  }
}

export interface ComponentMeta {
  type_name: string
  name: string
  description: string
  config_schema: any
  icon: string
}

export interface Edge {
  id: string
  source: string
  target: string
  sourceAnchor?: number
  targetAnchor?: number
} 