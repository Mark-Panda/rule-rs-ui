declare module '@logicflow/core' {
  export class LogicFlow {
    constructor(options: any)
    render(data?: any): void
    on(event: string, callback: (data: any) => void): void
    register(node: any): void
    clearData(): void
  }

  export class RectNode {
    props: any
    getShape(): any
  }

  export class RectNodeModel {
    width: number
    height: number
    initNodeData(data: any): void
    getNodeStyle(): Record<string, any>
  }
}

declare module '@logicflow/extension' {
  export const DndPanel: any
  export const SelectionSelect: any
  export const MiniMap: any
} 