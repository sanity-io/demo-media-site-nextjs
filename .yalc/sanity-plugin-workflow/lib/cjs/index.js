var $dyHF6$reactjsxdevruntime = require('react/jsx-dev-runtime')
var $dyHF6$react = require('react')
var $dyHF6$sanity = require('sanity')
var $dyHF6$sanityicons = require('@sanity/icons')
var $dyHF6$sanityui = require('@sanity/ui')
var $dyHF6$sanitypluginutils = require('sanity-plugin-utils')
var $dyHF6$reactbeautifuldnd = require('react-beautiful-dnd')
var $dyHF6$sanity_unstable = require('sanity/_unstable')
var $dyHF6$sanityform = require('sanity/form')

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {
    get: v,
    set: s,
    enumerable: true,
    configurable: true,
  })
}
function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a
}

$parcel$export(
  module.exports,
  'workflow',
  () => $329a1cedcedb1349$export$66caea4fbc555daf,
  (v) => ($329a1cedcedb1349$export$66caea4fbc555daf = v)
)

function $9b2a1e1488934d06$export$2e2bcd8739ae039(props) {
  const { id: id, type: type } = props
  const { navigateIntent: navigateIntent } = (0,
  $dyHF6$sanity_unstable.useRouter)()
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Button),
    {
      // eslint-disable-next-line react/jsx-no-bind
      onClick: () =>
        navigateIntent('edit', {
          id: id,
          type: type,
        }),
      mode: 'ghost',
      fontSize: 1,
      padding: 2,
      tabIndex: -1,
      icon: (0, $dyHF6$sanityicons.EditIcon),
      text: 'Edit',
    },
    void 0,
    false,
    {
      fileName: 'src/components/DocumentCard/EditButton.tsx',
      lineNumber: 16,
      columnNumber: 5,
    },
    this
  )
}

function $a48cfb6131de1b2b$export$2e2bcd8739ae039(props) {
  const { users: users, max: max = 3 } = props
  const len = users?.length
  const visibleUsers = (0, $parcel$interopDefault($dyHF6$react)).useMemo(
    () => users.slice(0, max),
    [users]
  )
  if (!users?.length) return null
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Flex),
    {
      align: 'center',
      children: [
        visibleUsers.map((user) =>
          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
            (0, $dyHF6$sanityui.Box),
            {
              style: {
                marginRight: -5,
              },
              children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                (0, $dyHF6$sanity_unstable.UserAvatar),
                {
                  user: user,
                },
                void 0,
                false,
                {
                  fileName: 'src/components/DocumentCard/AvatarGroup.tsx',
                  lineNumber: 26,
                  columnNumber: 11,
                },
                this
              ),
            },
            user.id,
            false,
            {
              fileName: 'src/components/DocumentCard/AvatarGroup.tsx',
              lineNumber: 25,
              columnNumber: 9,
            },
            this
          )
        ),
        len > max &&
          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
            (0, $dyHF6$sanityui.Box),
            {
              paddingLeft: 2,
              children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                (0, $dyHF6$sanityui.Text),
                {
                  size: 1,
                  children: ['+', len - max],
                },
                void 0,
                true,
                {
                  fileName: 'src/components/DocumentCard/AvatarGroup.tsx',
                  lineNumber: 31,
                  columnNumber: 11,
                },
                this
              ),
            },
            void 0,
            false,
            {
              fileName: 'src/components/DocumentCard/AvatarGroup.tsx',
              lineNumber: 30,
              columnNumber: 9,
            },
            this
          ),
      ],
    },
    void 0,
    true,
    {
      fileName: 'src/components/DocumentCard/AvatarGroup.tsx',
      lineNumber: 23,
      columnNumber: 5,
    },
    this
  )
}

function $5acb438b2707cb7e$export$2e2bcd8739ae039(props) {
  const {
    assignees: assignees,
    userList: userList,
    documentId: documentId,
  } = props
  const client = (0, $dyHF6$sanity.useClient)()
  const toast = (0, $dyHF6$sanityui.useToast)()
  const [openId, setOpenId] = (0,
  $parcel$interopDefault($dyHF6$react)).useState(``)
  const addAssignee = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (id, userId) => {
      client
        .patch(`workflow-metadata.${id}`)
        .setIfMissing({
          assignees: [],
        })
        .insert(`after`, `assignees[-1]`, [userId])
        .commit()
        .then((res) => res)
        .catch((err) => {
          console.error(err)
          return toast.push({
            title: `Failed to add assignee`,
            description: id,
            status: 'error',
          })
        })
    },
    [client, toast]
  )
  const removeAssignee = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (id, userId) => {
      client
        .patch(`workflow-metadata.${id}`)
        .unset([`assignees[@ == "${userId}"]`])
        .commit()
        .then((res) => res)
        .catch((err) => {
          console.error(err)
          return toast.push({
            title: `Failed to remove assignee`,
            description: id,
            status: 'error',
          })
        })
    },
    [client, toast]
  )
  const clearAssignees = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (id) => {
      client
        .patch(`workflow-metadata.${id}`)
        .unset([`assignees`])
        .commit()
        .then((res) => res)
        .catch((err) => {
          console.error(err)
          return toast.push({
            title: `Failed to clear assignees`,
            description: id,
            status: 'error',
          })
        })
    },
    [client, toast]
  )
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Popover),
    {
      // @ts-ignore
      // ref={setPopoverRef}
      // onKeyDown={handleKeyDown}
      content: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
        (0, $dyHF6$sanitypluginutils.UserSelectMenu),
        {
          // open={false}
          style: {
            maxHeight: 300,
          },
          value: assignees || [],
          userList: userList,
          onAdd: addAssignee,
          onClear: clearAssignees,
          onRemove: removeAssignee,
          open: openId === documentId,
        },
        void 0,
        false,
        void 0,
        void 0
      ),
      portal: true,
      open: openId === documentId,
      children:
        !assignees || assignees.length === 0
          ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
              (0, $dyHF6$sanityui.Button),
              {
                onClick: () => setOpenId(documentId),
                fontSize: 1,
                padding: 2,
                tabIndex: -1,
                icon: (0, $dyHF6$sanityicons.AddIcon),
                text: 'Assign',
                tone: 'positive',
              },
              void 0,
              false,
              {
                fileName: 'src/components/UserAssignment.tsx',
                lineNumber: 104,
                columnNumber: 9,
              },
              this
            )
          : /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
              (0, $dyHF6$sanityui.Button),
              {
                onClick: () => setOpenId(documentId),
                padding: 0,
                mode: 'bleed',
                style: {
                  width: `100%`,
                },
                children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                  (0, $a48cfb6131de1b2b$export$2e2bcd8739ae039),
                  {
                    users: userList.filter((u) => assignees.includes(u.id)),
                  },
                  void 0,
                  false,
                  {
                    fileName: 'src/components/UserAssignment.tsx',
                    lineNumber: 120,
                    columnNumber: 11,
                  },
                  this
                ),
              },
              void 0,
              false,
              {
                fileName: 'src/components/UserAssignment.tsx',
                lineNumber: 114,
                columnNumber: 9,
              },
              this
            ),
    },
    void 0,
    false,
    {
      fileName: 'src/components/UserAssignment.tsx',
      lineNumber: 84,
      columnNumber: 5,
    },
    this
  )
}

function $d5ee3dea3f734309$export$6a639350e64e609c(props) {
  const { userList: userList, isDragging: isDragging, item: item } = props
  const { assignees: assignees, documentId: documentId } = item._metadata ?? {}
  const schema = (0, $dyHF6$sanity.useSchema)()
  const isDarkMode = (0, $dyHF6$sanityui.useTheme)().sanity.color.dark
  const defaultCardTone = isDarkMode ? 'transparent' : 'default'
  // Open/close handler
  // const [popoverRef, setPopoverRef] = useState(null)
  // const [openId, setOpenId] = useState<string | undefined>(``)
  // useClickOutside(() => setOpenId(``), [popoverRef])
  // const handleKeyDown = React.useCallback((e) => {
  //   if (e.key === 'Escape') {
  //     setOpenId(``)
  //   }
  // }, [])
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Box),
    {
      paddingY: 2,
      paddingX: 3,
      children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
        (0, $dyHF6$sanityui.Card),
        {
          radius: 2,
          shadow: isDragging ? 3 : 1,
          tone: isDragging ? 'positive' : defaultCardTone,
          children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
            (0, $dyHF6$sanityui.Stack),
            {
              children: [
                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                  (0, $dyHF6$sanityui.Card),
                  {
                    borderBottom: true,
                    radius: 2,
                    padding: 3,
                    paddingLeft: 2,
                    tone: 'inherit',
                    style: {
                      pointerEvents: 'none',
                    },
                    children: /*#__PURE__*/ (0,
                    $dyHF6$reactjsxdevruntime.jsxDEV)(
                      (0, $dyHF6$sanityui.Flex),
                      {
                        align: 'center',
                        justify: 'space-between',
                        gap: 1,
                        children: [
                          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                            (0, $dyHF6$sanity_unstable.SanityPreview),
                            {
                              layout: 'default',
                              value: item,
                              schemaType: schema.get(item._type),
                            },
                            void 0,
                            false,
                            {
                              fileName: 'src/components/DocumentCard/index.tsx',
                              lineNumber: 53,
                              columnNumber: 15,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                            (0, $dyHF6$sanityicons.DragHandleIcon),
                            {
                              style: {
                                flexShrink: 0,
                              },
                            },
                            void 0,
                            false,
                            {
                              fileName: 'src/components/DocumentCard/index.tsx',
                              lineNumber: 58,
                              columnNumber: 15,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: 'src/components/DocumentCard/index.tsx',
                        lineNumber: 52,
                        columnNumber: 13,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: 'src/components/DocumentCard/index.tsx',
                    lineNumber: 44,
                    columnNumber: 11,
                  },
                  this
                ),
                /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                  (0, $dyHF6$sanityui.Card),
                  {
                    padding: 2,
                    radius: 2,
                    tone: 'inherit',
                    children: /*#__PURE__*/ (0,
                    $dyHF6$reactjsxdevruntime.jsxDEV)(
                      (0, $dyHF6$sanityui.Flex),
                      {
                        align: 'center',
                        justify: 'space-between',
                        gap: 1,
                        children: [
                          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                            (0, $5acb438b2707cb7e$export$2e2bcd8739ae039),
                            {
                              userList: userList,
                              assignees: assignees,
                              documentId: documentId,
                            },
                            void 0,
                            false,
                            {
                              fileName: 'src/components/DocumentCard/index.tsx',
                              lineNumber: 64,
                              columnNumber: 15,
                            },
                            this
                          ),
                          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                            (0, $9b2a1e1488934d06$export$2e2bcd8739ae039),
                            {
                              id: item._id,
                              type: item._type,
                            },
                            void 0,
                            false,
                            {
                              fileName: 'src/components/DocumentCard/index.tsx',
                              lineNumber: 66,
                              columnNumber: 15,
                            },
                            this
                          ),
                        ],
                      },
                      void 0,
                      true,
                      {
                        fileName: 'src/components/DocumentCard/index.tsx',
                        lineNumber: 63,
                        columnNumber: 13,
                      },
                      this
                    ),
                  },
                  void 0,
                  false,
                  {
                    fileName: 'src/components/DocumentCard/index.tsx',
                    lineNumber: 62,
                    columnNumber: 11,
                  },
                  this
                ),
              ],
            },
            void 0,
            true,
            {
              fileName: 'src/components/DocumentCard/index.tsx',
              lineNumber: 43,
              columnNumber: 9,
            },
            this
          ),
        },
        void 0,
        false,
        {
          fileName: 'src/components/DocumentCard/index.tsx',
          lineNumber: 42,
          columnNumber: 7,
        },
        this
      ),
    },
    void 0,
    false,
    {
      fileName: 'src/components/DocumentCard/index.tsx',
      lineNumber: 41,
      columnNumber: 5,
    },
    this
  )
}

function $8f72b9366267ef2f$export$2e2bcd8739ae039(props) {
  const {
    _id: _id,
    _type: _type,
    documentId: documentId,
    state: state,
    onComplete: onComplete,
  } = props
  const ops = (0, $dyHF6$sanity.useDocumentOperation)(documentId, _type)
  const isDraft = _id.startsWith('drafts.')
  const toast = (0, $dyHF6$sanityui.useToast)()
  if (isDraft && state.operation === 'publish') {
    if (!ops.publish.disabled) {
      ops.publish.execute()
      onComplete(_id)
      toast.push({
        title: 'Published Document',
        description: documentId,
        status: 'success',
      })
    }
  } else if (!isDraft && state.operation === 'unpublish') {
    if (!ops.unpublish.disabled) {
      ops.unpublish.execute()
      onComplete(_id)
      toast.push({
        title: 'Unpublished Document',
        description: documentId,
        status: 'success',
      })
    }
  } // Clean up if it's not going to un/publish
  else onComplete(_id)
  // return null
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Card),
    {
      padding: 3,
      shadow: 2,
      tone: 'primary',
      children: ['Mutating: ', _id, ' to ', state.title],
    },
    void 0,
    true,
    {
      fileName: 'src/components/Mutate.tsx',
      lineNumber: 50,
      columnNumber: 5,
    },
    this
  )
}

const $74991263f42a6df6$var$DOCUMENT_LIST_QUERY = `*[_type in $schemaTypes]{ _id, _type, _rev }`
const $74991263f42a6df6$var$METADATA_LIST_QUERY = `*[_type == "workflow.metadata"]{
  _rev,
  assignees,
  documentId,
  state
}`
const $74991263f42a6df6$var$COMBINED_QUERY = `{
  "documents": ${$74991263f42a6df6$var$DOCUMENT_LIST_QUERY},
  "metadata": ${$74991263f42a6df6$var$METADATA_LIST_QUERY}
}`
const $74991263f42a6df6$var$INITIAL_DATA = {
  documents: [],
  metadata: [],
}
function $74991263f42a6df6$export$407e3aaec0ba74ab(schemaTypes) {
  const toast = (0, $dyHF6$sanityui.useToast)()
  const client = (0, $dyHF6$sanity.useClient)()
  const [localDocuments, setLocalDocuments] = (0,
  $parcel$interopDefault($dyHF6$react)).useState([])
  // Get and listen to changes on documents + workflow metadata documents
  const {
    data: data,
    loading: loading,
    error: error,
  } = (0, $dyHF6$sanitypluginutils.useListeningQuery)(
    $74991263f42a6df6$var$COMBINED_QUERY,
    {
      params: {
        schemaTypes: schemaTypes,
      },
      initialValue: $74991263f42a6df6$var$INITIAL_DATA,
    }
  )
  // Store local state for optimistic updates
  ;(0, $parcel$interopDefault($dyHF6$react)).useEffect(() => {
    if (data) {
      // Combine metadata data into document
      const documentsWithMetadata = data.documents.reduce((acc, cur) => {
        // Filter out documents without metadata
        const curMeta = data.metadata.find(
          (d) => d.documentId === cur._id.replace(`drafts.`, ``)
        )
        if (!curMeta) return acc
        const curWithMetadata = {
          _metadata: curMeta,
          ...cur,
        }
        // Remove `published` from array if `draft` exists
        if (!cur._id.startsWith(`drafts.`)) {
          // eslint-disable-next-line max-nested-callbacks
          const alsoHasDraft = Boolean(
            data.documents.find((doc) => doc._id === `drafts.${cur._id}`)
          )
          return alsoHasDraft ? acc : [...acc, curWithMetadata]
        }
        return [...acc, curWithMetadata]
      }, [])
      setLocalDocuments(documentsWithMetadata)
    }
  }, [data])
  const move = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (draggedId, destination, states) => {
      // Optimistic update
      const currentLocalData = localDocuments
      const newLocalDocuments = localDocuments.map((item) => {
        if (item._metadata.documentId === draggedId)
          return {
            ...item,
            _metadata: {
              ...item._metadata,
              state: destination.droppableId,
            },
          }
        return item
      })
      setLocalDocuments(newLocalDocuments)
      // Now client-side update
      const newStateId = destination.droppableId
      const newState = states.find((s) => s.id === newStateId)
      const document = localDocuments.find(
        (d) => d._metadata.documentId === draggedId
      )
      if (!newState?.id) {
        toast.push({
          title: `Could not find target state ${newStateId}`,
          status: 'error',
        })
        return null
      }
      if (!document) {
        toast.push({
          title: `Could not find dragged document in data`,
          status: 'error',
        })
        return null
      }
      // We need to know if it's a draft or not
      const { _id: _id, _type: _type } = document
      // Metadata + useDocumentOperation always uses Published id
      const { _rev: _rev, documentId: documentId } = document._metadata
      client
        .patch(`workflow-metadata.${documentId}`)
        .ifRevisionId(_rev)
        .set({
          state: newStateId,
        })
        .commit()
        .then(() => {
          return toast.push({
            title: `Moved to "${newState?.title ?? newStateId}"`,
            description: documentId,
            status: 'success',
          })
        })
        .catch(() => {
          // Revert optimistic update
          setLocalDocuments(currentLocalData)
          return toast.push({
            title: `Failed to move to "${newState?.title ?? newStateId}"`,
            description: documentId,
            status: 'error',
          })
        })
      // Send back to the workflow board so a document update can happen
      return {
        _id: _id,
        _type: _type,
        documentId: documentId,
        state: newState,
      }
    },
    [client, toast, localDocuments]
  )
  return {
    workflowData: {
      data: localDocuments,
      loading: loading,
      error: error,
    },
    operations: {
      move: move,
    },
  }
}

function $441aa5f1a1aa7376$var$filterItemsByState(items, stateId) {
  return items.filter((item) => item?._metadata?.state === stateId)
}
function $441aa5f1a1aa7376$export$2e2bcd8739ae039(props) {
  const { schemaTypes: schemaTypes = [], states: states = [] } =
    props?.tool?.options ?? {}
  const [mutatingDocs, setMutatingDocs] = (0,
  $parcel$interopDefault($dyHF6$react)).useState([])
  const mutationFinished = (0,
  $parcel$interopDefault($dyHF6$react)).useCallback((documentId) => {
    setMutatingDocs((docs) => docs.filter((doc) => doc._id !== documentId))
  }, [])
  const client = (0, $dyHF6$sanity.useClient)()
  const toast = (0, $dyHF6$sanityui.useToast)()
  const isDarkMode = (0, $dyHF6$sanityui.useTheme)().sanity.color.dark
  const defaultCardTone = isDarkMode ? 'default' : 'transparent'
  const userList = (0, $dyHF6$sanitypluginutils.useProjectUsers)() || []
  const { workflowData: workflowData, operations: operations } = (0,
  $74991263f42a6df6$export$407e3aaec0ba74ab)(schemaTypes)
  // Data to display in cards
  const { data: data, loading: loading, error: error } = workflowData
  // Operations to perform on cards
  const { move: move } = operations
  const documentIdsWithoutMetadata = data
    .filter((doc) => !doc._metadata)
    .map((d) => d._id.replace(`drafts.`, ``))
  const handleDragEnd = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (result) => {
      const {
        draggableId: draggableId,
        source: source,
        destination: destination,
      } = result
      console.log(
        `sending ${draggableId} from ${source.droppableId} to ${destination?.droppableId}`
      )
      if (!destination || destination.droppableId === source.droppableId) return
      // The list of mutating docs is how we un/publish documents
      const mutatingDoc = move(draggableId, destination, states)
      if (mutatingDoc) setMutatingDocs((current) => [...current, mutatingDoc])
    },
    [move, states]
  )
  if (!states?.length)
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
      (0, $dyHF6$sanityui.Container),
      {
        width: 1,
        padding: 5,
        children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
          (0, $dyHF6$sanitypluginutils.Feedback),
          {
            tone: 'caution',
            title: 'Plugin options error',
            description: 'No States defined in plugin config',
          },
          void 0,
          false,
          {
            fileName: 'src/components/WorkflowTool.tsx',
            lineNumber: 94,
            columnNumber: 9,
          },
          this
        ),
      },
      void 0,
      false,
      {
        fileName: 'src/components/WorkflowTool.tsx',
        lineNumber: 93,
        columnNumber: 7,
      },
      this
    )
  if (error)
    return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
      (0, $dyHF6$sanityui.Container),
      {
        width: 1,
        padding: 5,
        children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
          (0, $dyHF6$sanitypluginutils.Feedback),
          {
            tone: 'critical',
            title: 'Error with query',
          },
          void 0,
          false,
          {
            fileName: 'src/components/WorkflowTool.tsx',
            lineNumber: 106,
            columnNumber: 9,
          },
          this
        ),
      },
      void 0,
      false,
      {
        fileName: 'src/components/WorkflowTool.tsx',
        lineNumber: 105,
        columnNumber: 7,
      },
      this
    )
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$reactjsxdevruntime.Fragment),
    {
      children: [
        mutatingDocs.length
          ? /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
              'div',
              {
                style: {
                  position: `absolute`,
                  bottom: 0,
                  background: 'red',
                },
                children: mutatingDocs.map((mutate) =>
                  /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                    (0, $8f72b9366267ef2f$export$2e2bcd8739ae039),
                    {
                      ...mutate,
                      onComplete: mutationFinished,
                    },
                    mutate._id,
                    false,
                    {
                      fileName: 'src/components/WorkflowTool.tsx',
                      lineNumber: 116,
                      columnNumber: 13,
                    },
                    this
                  )
                ),
              },
              void 0,
              false,
              {
                fileName: 'src/components/WorkflowTool.tsx',
                lineNumber: 114,
                columnNumber: 9,
              },
              this
            )
          : null,
        documentIdsWithoutMetadata.length > 0 &&
          /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
            (0, $dyHF6$sanityui.Box),
            {
              paddingY: 5,
              paddingX: 3,
              children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                (0, $dyHF6$sanityui.Card),
                {
                  shadow: 1,
                  padding: 4,
                  style: {
                    textAlign: 'center',
                  },
                  children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                    (0, $dyHF6$sanityui.Button),
                    {
                      tone: 'primary',
                      children: [
                        'Import ',
                        documentIdsWithoutMetadata.length,
                        ' ',
                        documentIdsWithoutMetadata.length === 1
                          ? `Document`
                          : `Documents`,
                      ],
                    },
                    void 0,
                    true,
                    {
                      fileName: 'src/components/WorkflowTool.tsx',
                      lineNumber: 123,
                      columnNumber: 13,
                    },
                    this
                  ),
                },
                void 0,
                false,
                {
                  fileName: 'src/components/WorkflowTool.tsx',
                  lineNumber: 122,
                  columnNumber: 11,
                },
                this
              ),
            },
            void 0,
            false,
            {
              fileName: 'src/components/WorkflowTool.tsx',
              lineNumber: 121,
              columnNumber: 9,
            },
            this
          ),
        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
          (0, $dyHF6$reactbeautifuldnd.DragDropContext),
          {
            onDragEnd: handleDragEnd,
            children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
              (0, $dyHF6$sanityui.Grid),
              {
                columns: states.length,
                height: 'fill',
                children: states.map((state, stateIndex) =>
                  /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                    (0, $dyHF6$sanityui.Card),
                    {
                      borderLeft: stateIndex > 0,
                      children: [
                        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                          (0, $dyHF6$sanityui.Card),
                          {
                            paddingY: 4,
                            padding: 3,
                            style: {
                              pointerEvents: `none`,
                            },
                            children: /*#__PURE__*/ (0,
                            $dyHF6$reactjsxdevruntime.jsxDEV)(
                              (0, $dyHF6$sanityui.Label),
                              {
                                children: state.title,
                              },
                              void 0,
                              false,
                              {
                                fileName: 'src/components/WorkflowTool.tsx',
                                lineNumber: 138,
                                columnNumber: 17,
                              },
                              this
                            ),
                          },
                          void 0,
                          false,
                          {
                            fileName: 'src/components/WorkflowTool.tsx',
                            lineNumber: 137,
                            columnNumber: 15,
                          },
                          this
                        ),
                        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                          (0, $dyHF6$reactbeautifuldnd.Droppable),
                          {
                            droppableId: state.id,
                            children: (provided, snapshot) =>
                              /*#__PURE__*/ (0,
                              $dyHF6$reactjsxdevruntime.jsxDEV)(
                                (0, $dyHF6$sanityui.Card),
                                {
                                  ref: provided.innerRef,
                                  tone: snapshot.isDraggingOver
                                    ? `primary`
                                    : defaultCardTone,
                                  height: 'fill',
                                  children: [
                                    loading
                                      ? /*#__PURE__*/ (0,
                                        $dyHF6$reactjsxdevruntime.jsxDEV)(
                                          (0, $dyHF6$sanityui.Flex),
                                          {
                                            padding: 5,
                                            align: 'center',
                                            justify: 'center',
                                            children: /*#__PURE__*/ (0,
                                            $dyHF6$reactjsxdevruntime.jsxDEV)(
                                              (0, $dyHF6$sanityui.Spinner),
                                              {
                                                muted: true,
                                              },
                                              void 0,
                                              false,
                                              {
                                                fileName:
                                                  'src/components/WorkflowTool.tsx',
                                                lineNumber: 149,
                                                columnNumber: 25,
                                              },
                                              this
                                            ),
                                          },
                                          void 0,
                                          false,
                                          {
                                            fileName:
                                              'src/components/WorkflowTool.tsx',
                                            lineNumber: 148,
                                            columnNumber: 23,
                                          },
                                          this
                                        )
                                      : null,
                                    data.length > 0 &&
                                      $441aa5f1a1aa7376$var$filterItemsByState(
                                        data,
                                        state.id
                                      ).map(
                                        (
                                          item,
                                          itemIndex // The metadata's documentId is always the published one
                                        ) =>
                                          /*#__PURE__*/ (0,
                                          $dyHF6$reactjsxdevruntime.jsxDEV)(
                                            (0,
                                            $dyHF6$reactbeautifuldnd.Draggable),
                                            {
                                              draggableId:
                                                item._metadata.documentId,
                                              index: itemIndex,
                                              children: (
                                                draggableProvided,
                                                draggableSnapshot
                                              ) =>
                                                /*#__PURE__*/ (0,
                                                $dyHF6$reactjsxdevruntime.jsxDEV)(
                                                  'div',
                                                  {
                                                    ref: draggableProvided.innerRef,
                                                    ...draggableProvided.draggableProps,
                                                    ...draggableProvided.dragHandleProps,
                                                    children: /*#__PURE__*/ (0,
                                                    $dyHF6$reactjsxdevruntime.jsxDEV)(
                                                      (0,
                                                      $d5ee3dea3f734309$export$6a639350e64e609c),
                                                      {
                                                        isDragging:
                                                          draggableSnapshot.isDragging,
                                                        item: item,
                                                        userList: userList,
                                                      },
                                                      void 0,
                                                      false,
                                                      {
                                                        fileName:
                                                          'src/components/WorkflowTool.tsx',
                                                        lineNumber: 167,
                                                        columnNumber: 31,
                                                      },
                                                      this
                                                    ),
                                                  },
                                                  void 0,
                                                  false,
                                                  {
                                                    fileName:
                                                      'src/components/WorkflowTool.tsx',
                                                    lineNumber: 162,
                                                    columnNumber: 29,
                                                  },
                                                  this
                                                ),
                                            },
                                            item._metadata.documentId,
                                            false,
                                            {
                                              fileName:
                                                'src/components/WorkflowTool.tsx',
                                              lineNumber: 156,
                                              columnNumber: 25,
                                            },
                                            this
                                          )
                                      ),
                                  ],
                                },
                                void 0,
                                true,
                                {
                                  fileName: 'src/components/WorkflowTool.tsx',
                                  lineNumber: 142,
                                  columnNumber: 19,
                                },
                                this
                              ),
                          },
                          void 0,
                          false,
                          {
                            fileName: 'src/components/WorkflowTool.tsx',
                            lineNumber: 140,
                            columnNumber: 15,
                          },
                          this
                        ),
                      ],
                    },
                    state.id,
                    true,
                    {
                      fileName: 'src/components/WorkflowTool.tsx',
                      lineNumber: 136,
                      columnNumber: 13,
                    },
                    this
                  )
                ),
              },
              void 0,
              false,
              {
                fileName: 'src/components/WorkflowTool.tsx',
                lineNumber: 134,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: 'src/components/WorkflowTool.tsx',
            lineNumber: 133,
            columnNumber: 7,
          },
          this
        ),
      ],
    },
    void 0,
    true
  )
}

function $303e87997ba337ee$export$2e2bcd8739ae039(props) {
  const { value: value = [], onChange: onChange } = props
  const userList = (0, $dyHF6$sanitypluginutils.useProjectUsers)()
  const onAssigneeAdd = (0, $dyHF6$react.useCallback)(
    (userId) => {
      onChange([
        (0, $dyHF6$sanityform.setIfMissing)([]),
        (0, $dyHF6$sanityform.insert)([userId], `after`, [-1]),
      ])
    },
    [onChange]
  )
  const onAssigneeRemove = (0, $dyHF6$react.useCallback)(
    (userId) => {
      const userIdIndex = value.findIndex((v) => v === userId)
      onChange((0, $dyHF6$sanityform.unset)([userIdIndex]))
    },
    [onChange, value]
  )
  const onAssigneesClear = (0, $dyHF6$react.useCallback)(() => {
    onChange((0, $dyHF6$sanityform.unset)())
  }, [onChange])
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Card),
    {
      border: true,
      radius: 3,
      padding: 1,
      children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
        (0, $dyHF6$sanitypluginutils.UserSelectMenu),
        {
          open: true,
          value: value,
          userList: userList,
          onAdd: onAssigneeAdd,
          onClear: onAssigneesClear,
          onRemove: onAssigneeRemove,
        },
        void 0,
        false,
        {
          fileName: 'src/components/UserSelectInput.tsx',
          lineNumber: 33,
          columnNumber: 7,
        },
        this
      ),
    },
    void 0,
    false,
    {
      fileName: 'src/components/UserSelectInput.tsx',
      lineNumber: 32,
      columnNumber: 5,
    },
    this
  )
}

var $98532ccbbae033ad$export$2e2bcd8739ae039 = (states) =>
  (0, $dyHF6$sanity.defineType)({
    type: 'document',
    name: 'workflow.metadata',
    title: 'Workflow metadata',
    liveEdit: true,
    fields: [
      (0, $dyHF6$sanity.defineField)({
        name: 'state',
        type: 'string',
        options: {
          list: states.map((state) => ({
            value: state.id,
            title: state.title,
          })),
        },
      }),
      (0, $dyHF6$sanity.defineField)({
        name: 'documentId',
        title: 'Document ID',
        type: 'string',
        readOnly: true,
      }),
      (0, $dyHF6$sanity.defineField)({
        type: 'array',
        name: 'assignees',
        description:
          'The people who are assigned to move this further in the workflow.',
        of: [
          {
            type: 'string',
          },
        ],
        components: {
          input: (0, $303e87997ba337ee$export$2e2bcd8739ae039),
        },
      }),
    ],
  })

function $426e7d8683c78bcf$export$2fd86b6a55ec93e(id, states) {
  const {
    data: metadata,
    loading: loading,
    error: error,
  } = (0, $dyHF6$sanitypluginutils.useListeningQuery)(
    `*[_type == "workflow.metadata" && documentId == $id][0]`,
    {
      params: {
        id: id,
      },
    }
  )
  if (metadata?.state)
    return {
      data: {
        metadata: metadata,
        state: states.find((s) => s.id === metadata.state),
      },
      loading: loading,
      error: error,
    }
  return {
    data: {},
    loading: loading,
    error: error,
  }
}

function $43ea10120cc4b152$export$df3dc3c012683b4b(props, states) {
  const { id: id } = props
  const {
    data: data,
    loading: loading,
    error: error,
  } = (0, $426e7d8683c78bcf$export$2fd86b6a55ec93e)(id, states)
  const { state: state } = data
  if (loading || error) {
    if (error) console.error(error)
    return null
  }
  if (!state) return null
  return {
    label: state.title,
    title: state.title,
    color: state?.color,
  }
}

function $727ba349109eb250$export$b562ebadfc48095b(props, states) {
  const { id: id } = props
  const {
    data: data,
    loading: loading,
    error: error,
  } = (0, $426e7d8683c78bcf$export$2fd86b6a55ec93e)(id, states)
  const { state: state } = data
  const client = (0, $dyHF6$sanity.useClient)()
  const toast = (0, $dyHF6$sanityui.useToast)()
  if (loading || error) {
    if (error) console.error(error)
    return null
  }
  if (!state) return null
  const onHandle = (documentId, newState) => {
    client
      .patch(`workflow-metadata.${documentId}`)
      .set({
        state: newState.id,
      })
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
  if (!nextState) return null
  return {
    icon: (0, $dyHF6$sanityicons.ArrowRightIcon),
    label: `Promote`,
    title: `Promote State to "${nextState.title}"`,
    onHandle: () => onHandle(id, nextState),
  }
}

function $b0a39fd621aa5e8a$export$3671238969cffbcf(props, states) {
  const { id: id } = props
  const {
    data: data,
    loading: loading,
    error: error,
  } = (0, $426e7d8683c78bcf$export$2fd86b6a55ec93e)(id, states)
  const { state: state } = data
  const client = (0, $dyHF6$sanity.useClient)()
  const toast = (0, $dyHF6$sanityui.useToast)()
  if (loading || error) {
    if (error) console.error(error)
    return null
  }
  if (!state) return null
  const onHandle = (documentId, newState) => {
    client
      .patch(`workflow-metadata.${documentId}`)
      .set({
        state: newState.id,
      })
      .commit()
      .then(() => {
        props.onComplete()
        toast.push({
          status: 'success',
          title: `Document demoted to ${newState.title}`,
        })
      })
      .catch((err) => {
        props.onComplete()
        console.error(err)
        toast.push({
          status: 'error',
          title: `Document demotion failed`,
        })
      })
  }
  const currentStateIndex = states.findIndex((s) => s.id === state.id)
  const prevState = states[currentStateIndex - 1]
  if (!prevState) return null
  return {
    icon: (0, $dyHF6$sanityicons.ArrowLeftIcon),
    label: `Demote`,
    title: `Demote State to "${prevState.title}"`,
    onHandle: () => onHandle(id, prevState),
  }
}

function $41b48e41337caf0b$export$2e2bcd8739ae039(props) {
  const { value: value, states: states, children: children } = props
  // check if value is an object
  const valueIsObject =
    typeof value === 'object' && value !== null && !Array.isArray(value)
  const documentId = valueIsObject ? String(value._id) : ``
  const {
    data: data,
    loading: loading,
    error: error,
  } = (0, $426e7d8683c78bcf$export$2fd86b6a55ec93e)(documentId, states)
  const { state: state } = data
  const [mutatingToState, setMutatingToState] = (0,
  $parcel$interopDefault($dyHF6$react)).useState(null)
  const client = (0, $dyHF6$sanity.useClient)()
  const toast = (0, $dyHF6$sanityui.useToast)()
  // Just because the document is patched ...
  // doesn't mean the latest data has been returned from the listener
  ;(0, $dyHF6$react.useEffect)(() => {
    if (data) setMutatingToState(null)
  }, [data])
  const changeState = (0, $parcel$interopDefault($dyHF6$react)).useCallback(
    (publishedId, newState) => {
      setMutatingToState(newState.id)
      client
        .patch(`workflow-metadata.${publishedId}`)
        .set({
          state: newState.id,
        })
        .commit()
        .then(() => {
          toast.push({
            status: 'success',
            title: `Document moved to ${newState.title}`,
          })
        })
        .catch((err) => {
          console.error(err)
          toast.push({
            status: 'error',
            title: `Document moved failed`,
          })
        })
    },
    [client, toast]
  )
  return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
    (0, $dyHF6$sanityui.Stack),
    {
      space: 3,
      children: [
        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
          (0, $dyHF6$sanityui.Text),
          {
            weight: 'medium',
            size: 1,
            children: 'Workflow State',
          },
          void 0,
          false,
          {
            fileName: 'src/components/StateTimeline.tsx',
            lineNumber: 62,
            columnNumber: 7,
          },
          this
        ),
        /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
          (0, $dyHF6$sanityui.Card),
          {
            padding: 1,
            radius: 3,
            border: true,
            tone: 'primary',
            children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
              (0, $dyHF6$sanityui.Inline),
              {
                space: 1,
                children: states.map((s) =>
                  /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                    (0, $dyHF6$sanityui.Button),
                    {
                      disabled: loading || error || Boolean(mutatingToState),
                      fontSize: 1,
                      tone: 'primary',
                      mode:
                        (!mutatingToState && s.id === state?.id) ||
                        s.id === mutatingToState
                          ? `default`
                          : `ghost`,
                      text: s.title,
                      radius: 2,
                      onClick: () => changeState(documentId, s),
                    },
                    s.id,
                    false,
                    {
                      fileName: 'src/components/StateTimeline.tsx',
                      lineNumber: 68,
                      columnNumber: 13,
                    },
                    this
                  )
                ),
              },
              void 0,
              false,
              {
                fileName: 'src/components/StateTimeline.tsx',
                lineNumber: 66,
                columnNumber: 9,
              },
              this
            ),
          },
          void 0,
          false,
          {
            fileName: 'src/components/StateTimeline.tsx',
            lineNumber: 65,
            columnNumber: 7,
          },
          this
        ),
        children,
      ],
    },
    void 0,
    true,
    {
      fileName: 'src/components/StateTimeline.tsx',
      lineNumber: 61,
      columnNumber: 5,
    },
    this
  )
}

const $329a1cedcedb1349$var$DEFAULT_CONFIG = {
  schemaTypes: [],
  states: [
    {
      id: 'draft',
      title: 'Draft',
      operation: 'unpublish',
    },
    {
      id: 'inReview',
      title: 'In review',
      operation: 'unpublish',
      color: 'primary',
    },
    {
      id: 'approved',
      title: 'Approved',
      operation: 'unpublish',
      color: 'success',
      icon: (0, $dyHF6$sanityicons.CheckmarkIcon),
    },
    {
      id: 'changesRequested',
      title: 'Changes requested',
      operation: 'unpublish',
      color: 'warning',
    },
    {
      id: 'published',
      title: 'Published',
      operation: 'publish',
      color: 'success',
    },
  ],
}
const $329a1cedcedb1349$export$66caea4fbc555daf = (0,
$dyHF6$sanity.createPlugin)((config = $329a1cedcedb1349$var$DEFAULT_CONFIG) => {
  const { schemaTypes: schemaTypes, states: states } = {
    ...$329a1cedcedb1349$var$DEFAULT_CONFIG,
    ...config,
  }
  if (!states?.length) throw new Error(`Workflow: Missing states in config`)
  return {
    name: 'sanity-plugin-workflow',
    schema: {
      schemaTypes: [(0, $98532ccbbae033ad$export$2e2bcd8739ae039)(states)],
    },
    form: {
      renderInput: (inputProps, next) => {
        if (
          inputProps.id === `root` &&
          schemaTypes.includes(inputProps.schemaType.name)
        )
          return /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
            (0, $dyHF6$sanityui.Stack),
            {
              space: 3,
              children: /*#__PURE__*/ (0, $dyHF6$reactjsxdevruntime.jsxDEV)(
                (0, $41b48e41337caf0b$export$2e2bcd8739ae039),
                {
                  ...inputProps,
                  states: states,
                  children: next(inputProps),
                },
                void 0,
                false,
                {
                  fileName: 'src/index.tsx',
                  lineNumber: 53,
                  columnNumber: 15,
                },
                undefined
              ),
            },
            void 0,
            false,
            {
              fileName: 'src/index.tsx',
              lineNumber: 52,
              columnNumber: 13,
            },
            undefined
          )
        return null
      },
    },
    document: {
      actions: (prev, context) => {
        if (!schemaTypes.includes(context.schemaType)) return prev
        return [
          (props) =>
            (0, $727ba349109eb250$export$b562ebadfc48095b)(props, states),
          (props) =>
            (0, $b0a39fd621aa5e8a$export$3671238969cffbcf)(props, states),
          ...prev,
        ]
      },
      badges: (prev, context) => {
        if (!schemaTypes.includes(context.schemaType)) return prev
        return [
          (props) =>
            (0, $43ea10120cc4b152$export$df3dc3c012683b4b)(props, states),
          ...prev,
        ]
      },
    },
    tools: [
      {
        name: 'workflow',
        title: 'Workflow',
        component: (0, $441aa5f1a1aa7376$export$2e2bcd8739ae039),
        icon: (0, $dyHF6$sanityicons.SplitVerticalIcon),
        options: {
          schemaTypes: schemaTypes,
          states: states,
        },
      },
    ],
  }
})

//# sourceMappingURL=index.js.map
