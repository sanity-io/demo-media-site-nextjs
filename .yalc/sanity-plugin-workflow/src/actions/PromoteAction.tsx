import { ArrowRightIcon } from '@sanity/icons'
import { useToast } from '@sanity/ui'
import { DocumentActionProps, useClient } from 'sanity'
import { useWorkflowMetadata } from '../hooks/useWorkflowMetadata'

import { State } from '../types'

export function PromoteAction(props: DocumentActionProps, states: State[]) {
  const { id } = props
  const { data, loading, error } = useWorkflowMetadata(id, states)
  const { state } = data
  const client = useClient()
  const toast = useToast()

  if (loading || error) {
    if (error) {
      console.error(error)
    }

    return null
  }

  if (!state) {
    return null
  }

  const onHandle = (documentId: string, newState: State) => {
    client
      .patch(`workflow-metadata.${documentId}`)
      .set({ state: newState.id })
      .commit()
      .then(() => {
        props.onComplete()
        toast.push({
          status: 'success',
          title: `Document promoted to ${newState.title}`,
        })
      })
      .catch((err) => {
        props.onComplete()
        console.error(err)
        toast.push({
          status: 'error',
          title: `Document promotion failed`,
        })
      })
  }

  const currentStateIndex = states.findIndex((s) => s.id === state.id)
  const nextState = states[currentStateIndex + 1]

  if (!nextState) {
    return null
  }

  return {
    icon: ArrowRightIcon,
    label: `Promote`,
    title: `Promote State to "${nextState.title}"`,
    onHandle: () => onHandle(id, nextState),
  }
}
