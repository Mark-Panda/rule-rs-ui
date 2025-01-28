import LogNode from './LogNode'
import ScriptNode from './ScriptNode'
import type { NodeConfigs } from '../../types/node-config'

export const nodeTypes = {
  'log-node': LogNode,
  'script-node': ScriptNode
}

export const nodeConfigs: NodeConfigs = {
  'log-node': {
    name: '日志节点',
    icon: 'Document',
    config: {
      template: {
        type: 'textarea',
        label: '日志模板',
        required: true
      }
    }
  },
  'script-node': {
    name: '脚本节点',
    icon: 'Code',
    config: {
      script: {
        type: 'monaco-editor',
        label: 'JavaScript代码',
        language: 'javascript'
      },
      output: {
        type: 'input',
        label: '输出变量'
      }
    }
  }
} 