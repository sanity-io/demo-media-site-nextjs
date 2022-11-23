import React from 'react'
type State = {
  id: string
  title: string
  operation?: 'publish' | 'unpublish'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  icon?: React.ReactNode | React.ComponentType
}
type WorkflowConfig = {
  schemaTypes: string[]
  states?: State[]
}
export const workflow: import('sanity').Plugin<WorkflowConfig>

//# sourceMappingURL=index.d.ts.map
