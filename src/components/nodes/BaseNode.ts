import { h } from 'vue'
import { RectNode, RectNodeModel } from '@logicflow/core'

export interface NodeProps {
  model: {
    x: number
    y: number
    width: number
    height: number
    getNodeStyle: () => Record<string, any>
    properties: Record<string, any>
  }
}

export class BaseNodeView extends RectNode {
  // @ts-ignore
  props: NodeProps

  getShape() {
    const { x, y, width, height } = this.props.model
    const style = this.props.model.getNodeStyle()
    return h('rect', {
      ...style,
      x: x - width / 2,
      y: y - height / 2,
      width,
      height,
      rx: 4,
      ry: 4
    })
  }

  getText() {
    const { x, y, properties } = this.props.model
    return h('text', {
      x,
      y,
      textAnchor: 'middle',
      dominantBaseline: 'middle',
      style: {
        fontSize: '12px',
        fill: '#000'
      }
    }, properties.name || '')
  }
}

export class BaseNodeModel extends RectNodeModel {
  setAttributes() {
    this.width = 120
    this.height = 60
  }
} 