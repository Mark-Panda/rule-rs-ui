import { BaseNodeView, BaseNodeModel } from './BaseNode'

class ScriptNodeView extends BaseNodeView {}

class ScriptNodeModel extends BaseNodeModel {
  setAttributes() {
    super.setAttributes()
    this.width = 150
  }

  getNodeStyle() {
    const style = super.getNodeStyle()
    return {
      ...style,
      fill: '#e6f7ff',
      stroke: '#91d5ff'
    }
  }
}

export default {
  type: 'script-node',
  view: ScriptNodeView,
  model: ScriptNodeModel
} 