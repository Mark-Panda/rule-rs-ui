import { BaseNodeView, BaseNodeModel } from './BaseNode'

class LogNodeView extends BaseNodeView {}

class LogNodeModel extends BaseNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle()
    return {
      ...style,
      fill: '#f5f5f5',
      stroke: '#d9d9d9'
    }
  }
}

export default {
  type: 'log-node',
  view: LogNodeView,
  model: LogNodeModel
} 