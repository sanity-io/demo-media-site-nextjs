import { Plugin as Plugin_2 } from 'sanity'
import { default as React_2 } from 'react'

declare type State = {
  id: string
  title: string
  operation?: 'publish' | 'unpublish'
  color?: 'primary' | 'success' | 'warning' | 'danger'
  icon?: React_2.ReactNode | React_2.ComponentType
}

export declare const workflow: Plugin_2<WorkflowConfig>

declare type WorkflowConfig = {
  schemaTypes: string[]
  states?: State[]
}

export {}
