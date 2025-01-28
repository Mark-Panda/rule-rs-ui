export interface NodeField {
  type: 'input' | 'textarea' | 'select' | 'monaco-editor'
  label: string
  required?: boolean
  placeholder?: string
  language?: string
  options?: string[]
}

export interface NodeConfig {
  name: string
  icon: string
  config: Record<string, NodeField>
}

export interface NodeConfigs {
  [key: string]: NodeConfig
} 