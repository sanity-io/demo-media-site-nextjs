'use strict'
function e(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e)
    t &&
      (o = o.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable
      })),
      n.push.apply(n, o)
  }
  return n
}
function t(t) {
  for (var o = 1; o < arguments.length; o++) {
    var i = null != arguments[o] ? arguments[o] : {}
    o % 2
      ? e(Object(i), !0).forEach(function (e) {
          n(t, e, i[e])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(i))
      : e(Object(i)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(i, e))
        })
  }
  return t
}
function n(e, t, n) {
  return (
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  )
}
Object.defineProperty(exports, '__esModule', { value: !0 })
var o = require('sanity'),
  i = require('@sanity/icons'),
  a = require('react/jsx-runtime'),
  r = require('react'),
  s = require('@sanity/ui'),
  d = require('sanity-plugin-utils'),
  l = require('react-beautiful-dnd'),
  c = require('sanity/router')
function u(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var p = u(r)
function m(e) {
  const { id: t, type: n } = e,
    { navigateIntent: o } = c.useRouter()
  return a.jsx(s.Button, {
    onClick: () => o('edit', { id: t, type: n }),
    mode: 'ghost',
    fontSize: 1,
    padding: 2,
    tabIndex: -1,
    icon: i.EditIcon,
    text: 'Edit',
  })
}
function f(e) {
  const { users: t, max: n = 3 } = e,
    i = null == t ? void 0 : t.length,
    r = p.default.useMemo(() => t.slice(0, n), [t])
  return (null == t ? void 0 : t.length)
    ? a.jsxs(s.Flex, {
        align: 'center',
        children: [
          r.map((e) =>
            a.jsx(
              s.Box,
              {
                style: { marginRight: -5 },
                children: a.jsx(o.UserAvatar, { user: e }),
              },
              e.id
            )
          ),
          i > n &&
            a.jsx(s.Box, {
              paddingLeft: 2,
              children: a.jsxs(s.Text, { size: 1, children: ['+', i - n] }),
            }),
        ],
      })
    : null
}
function h(e) {
  const { assignees: t, userList: n, documentId: r } = e,
    l = o.useClient(),
    c = s.useToast(),
    [u, m] = p.default.useState(''),
    h = p.default.useCallback(
      (e) => {
        if (!e) return c.push({ status: 'error', title: 'No user selected' })
        l.patch('workflow-metadata.'.concat(r))
          .setIfMissing({ assignees: [] })
          .insert('after', 'assignees[-1]', [e])
          .commit()
          .then(() =>
            c.push({
              title: 'Assigned user to document',
              description: e,
              status: 'success',
            })
          )
          .catch(
            (t) => (
              console.error(t),
              c.push({
                title: 'Failed to add assignee',
                description: e,
                status: 'error',
              })
            )
          )
      },
      [r, l, c]
    ),
    g = p.default.useCallback(
      (e, t) => {
        l.patch('workflow-metadata.'.concat(e))
          .unset(['assignees[@ == "'.concat(t, '"]')])
          .commit()
          .then((e) => e)
          .catch(
            (t) => (
              console.error(t),
              c.push({
                title: 'Failed to remove assignee',
                description: e,
                status: 'error',
              })
            )
          )
      },
      [l, c]
    ),
    y = p.default.useCallback(
      (e) => {
        l.patch('workflow-metadata.'.concat(e))
          .unset(['assignees'])
          .commit()
          .then((e) => e)
          .catch(
            (t) => (
              console.error(t),
              c.push({
                title: 'Failed to clear assignees',
                description: e,
                status: 'error',
              })
            )
          )
      },
      [l, c]
    )
  return a.jsx(s.Popover, {
    content: a.jsx(d.UserSelectMenu, {
      style: { maxHeight: 300 },
      value: t || [],
      userList: n,
      onAdd: h,
      onClear: y,
      onRemove: g,
      open: u === r,
    }),
    portal: !0,
    open: u === r,
    children:
      t && 0 !== t.length
        ? a.jsx(s.Button, {
            onClick: () => m(r),
            padding: 0,
            mode: 'bleed',
            style: { width: '100%' },
            children: a.jsx(f, { users: n.filter((e) => t.includes(e.id)) }),
          })
        : a.jsx(s.Button, {
            onClick: () => m(r),
            fontSize: 1,
            padding: 2,
            tabIndex: -1,
            icon: i.AddIcon,
            text: 'Assign',
            tone: 'positive',
          }),
  })
}
function g(e) {
  var t
  const { userList: n, isDragging: r, item: d } = e,
    { assignees: l, documentId: c } = null != (t = d._metadata) ? t : {},
    u = o.useSchema(),
    p = s.useTheme().sanity.color.dark ? 'transparent' : 'default'
  return a.jsx(s.Box, {
    paddingY: 2,
    paddingX: 3,
    children: a.jsx(s.Card, {
      radius: 2,
      shadow: r ? 3 : 1,
      tone: r ? 'positive' : p,
      children: a.jsxs(s.Stack, {
        children: [
          a.jsx(s.Card, {
            borderBottom: !0,
            radius: 2,
            padding: 3,
            paddingLeft: 2,
            tone: 'inherit',
            style: { pointerEvents: 'none' },
            children: a.jsxs(s.Flex, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                a.jsx(o.SanityPreview, {
                  layout: 'default',
                  value: d,
                  schemaType: u.get(d._type),
                }),
                a.jsx(i.DragHandleIcon, { style: { flexShrink: 0 } }),
              ],
            }),
          }),
          a.jsx(s.Card, {
            padding: 2,
            radius: 2,
            tone: 'inherit',
            children: a.jsxs(s.Flex, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                a.jsx(h, { userList: n, assignees: l, documentId: c }),
                a.jsx(m, { id: d._id, type: d._type }),
              ],
            }),
          }),
        ],
      }),
    }),
  })
}
function y(e) {
  const { _id: t, _type: n, documentId: i, state: r, onComplete: d } = e,
    l = o.useDocumentOperation(i, n),
    c = t.startsWith('drafts.'),
    u = s.useToast()
  return (
    c && 'publish' === r.operation
      ? l.publish.disabled ||
        (l.publish.execute(),
        d(t),
        u.push({
          title: 'Published Document',
          description: i,
          status: 'success',
        }))
      : c || 'unpublish' !== r.operation
      ? d(t)
      : l.unpublish.disabled ||
        (l.unpublish.execute(),
        d(t),
        u.push({
          title: 'Unpublished Document',
          description: i,
          status: 'success',
        })),
    a.jsxs(s.Card, {
      padding: 3,
      shadow: 2,
      tone: 'primary',
      children: ['Mutating: ', t, ' to ', r.title],
    })
  )
}
const b = '{\n  "documents": '
    .concat('*[_type in $schemaTypes]{ _id, _type, _rev }', ',\n  "metadata": ')
    .concat(
      '*[_type == "workflow.metadata"]{\n  _rev,\n  assignees,\n  documentId,\n  state\n}',
      '\n}'
    ),
  x = { documents: [], metadata: [] }
function j(e) {
  var n, i
  const { schemaTypes: r = [], states: c = [] } =
      null !=
      (i = null == (n = null == e ? void 0 : e.tool) ? void 0 : n.options)
        ? i
        : {},
    [u, m] = p.default.useState([]),
    f = p.default.useCallback((e) => {
      m((t) => t.filter((t) => t._id !== e))
    }, []),
    h = o.useClient(),
    j = s.useToast(),
    v = s.useTheme().sanity.color.dark ? 'default' : 'transparent',
    w = d.useProjectUsers() || [],
    { workflowData: I, operations: k } = (function (e) {
      const n = s.useToast(),
        i = o.useClient(),
        [a, r] = p.default.useState([]),
        {
          data: l,
          loading: c,
          error: u,
        } = d.useListeningQuery(b, {
          params: { schemaTypes: e },
          initialValue: x,
        })
      p.default.useEffect(() => {
        if (l) {
          const e = l.documents.reduce((e, n) => {
            const o = l.metadata.find(
              (e) => e.documentId === n._id.replace('drafts.', '')
            )
            if (!o) return [...e, t({ _metadata: null }, n)]
            const i = t({ _metadata: o }, n)
            return n._id.startsWith('drafts.')
              ? [...e, i]
              : Boolean(
                  l.documents.find((e) => e._id === 'drafts.'.concat(n._id))
                )
              ? e
              : [...e, i]
          }, [])
          r(e)
        }
      }, [l])
      const m = p.default.useCallback(
        (e, o, s) => {
          const d = a,
            l = a.map((n) =>
              n._metadata.documentId === e
                ? t(
                    t({}, n),
                    {},
                    {
                      _metadata: t(
                        t({}, n._metadata),
                        {},
                        { state: o.droppableId }
                      ),
                    }
                  )
                : n
            )
          r(l)
          const c = o.droppableId,
            u = s.find((e) => e.id === c),
            p = a.find((t) => t._metadata.documentId === e)
          if (!(null == u ? void 0 : u.id))
            return (
              n.push({
                title: 'Could not find target state '.concat(c),
                status: 'error',
              }),
              null
            )
          if (!p)
            return (
              n.push({
                title: 'Could not find dragged document in data',
                status: 'error',
              }),
              null
            )
          const { _id: m, _type: f } = p,
            { _rev: h, documentId: g } = p._metadata
          return (
            i
              .patch('workflow-metadata.'.concat(g))
              .ifRevisionId(h)
              .set({ state: c })
              .commit()
              .then(() => {
                var e
                return n.push({
                  title: 'Moved to "'.concat(
                    null != (e = null == u ? void 0 : u.title) ? e : c,
                    '"'
                  ),
                  description: g,
                  status: 'success',
                })
              })
              .catch(() => {
                var e
                return (
                  r(d),
                  n.push({
                    title: 'Failed to move to "'.concat(
                      null != (e = null == u ? void 0 : u.title) ? e : c,
                      '"'
                    ),
                    description: g,
                    status: 'error',
                  })
                )
              }),
            { _id: m, _type: f, documentId: g, state: u }
          )
        },
        [i, n, a]
      )
      return {
        workflowData: { data: a, loading: c, error: u },
        operations: { move: m },
      }
    })(r),
    { data: _, loading: C, error: D } = I,
    { move: O } = k,
    P = _.filter((e) => !e._metadata).map((e) => e._id.replace('drafts.', '')),
    T = p.default.useCallback(async (e) => {
      j.push({ title: 'Importing documents', status: 'info' })
      const t = e.reduce(
        (e, t) =>
          e.createOrReplace({
            _id: 'workflow-metadata.'.concat(t),
            _type: 'workflow.metadata',
            state: c[0].id,
            documentId: t,
          }),
        h.transaction()
      )
      await t.commit(),
        j.push({ title: 'Imported documents', status: 'success' })
    }, []),
    S = p.default.useCallback(
      (e) => {
        const { draggableId: t, source: n, destination: o } = e
        if (
          (console.log(
            'sending '
              .concat(t, ' from ')
              .concat(n.droppableId, ' to ')
              .concat(null == o ? void 0 : o.droppableId)
          ),
          !o || o.droppableId === n.droppableId)
        )
          return
        const i = O(t, o, c)
        i && m((e) => [...e, i])
      },
      [O, c]
    )
  return (null == c ? void 0 : c.length)
    ? D
      ? a.jsx(s.Container, {
          width: 1,
          padding: 5,
          children: a.jsx(d.Feedback, {
            tone: 'critical',
            title: 'Error with query',
          }),
        })
      : a.jsxs(a.Fragment, {
          children: [
            u.length
              ? a.jsx('div', {
                  style: { position: 'absolute', bottom: 0, background: 'red' },
                  children: u.map((e) =>
                    a.jsx(y, t(t({}, e), {}, { onComplete: f }), e._id)
                  ),
                })
              : null,
            P.length > 0 &&
              a.jsx(s.Box, {
                padding: 5,
                children: a.jsx(s.Card, {
                  border: !0,
                  padding: 3,
                  tone: 'caution',
                  children: a.jsx(s.Flex, {
                    align: 'center',
                    justify: 'center',
                    children: a.jsxs(s.Button, {
                      onClick: () => T(P),
                      children: [
                        'Import ',
                        P.length,
                        ' Missing',
                        ' ',
                        1 === P.length ? 'Document' : 'Documents',
                        ' into Workflow',
                      ],
                    }),
                  }),
                }),
              }),
            a.jsx(l.DragDropContext, {
              onDragEnd: S,
              children: a.jsx(s.Grid, {
                columns: c.length,
                height: 'fill',
                children: c.map((e, n) =>
                  a.jsxs(
                    s.Card,
                    {
                      borderLeft: n > 0,
                      children: [
                        a.jsx(s.Card, {
                          paddingY: 4,
                          padding: 3,
                          style: { pointerEvents: 'none' },
                          children: a.jsx(s.Label, { children: e.title }),
                        }),
                        a.jsx(l.Droppable, {
                          droppableId: e.id,
                          children: (n, o) => {
                            return a.jsxs(s.Card, {
                              ref: n.innerRef,
                              tone: o.isDraggingOver ? 'primary' : v,
                              height: 'fill',
                              children: [
                                C
                                  ? a.jsx(s.Flex, {
                                      padding: 5,
                                      align: 'center',
                                      justify: 'center',
                                      children: a.jsx(s.Spinner, { muted: !0 }),
                                    })
                                  : null,
                                _.length > 0 &&
                                  ((i = _),
                                  (r = e.id),
                                  i.filter((e) => {
                                    var t
                                    return (
                                      (null ==
                                      (t = null == e ? void 0 : e._metadata)
                                        ? void 0
                                        : t.state) === r
                                    )
                                  })).map((e, n) =>
                                    a.jsx(
                                      l.Draggable,
                                      {
                                        draggableId: e._metadata.documentId,
                                        index: n,
                                        children: (n, o) =>
                                          a.jsx(
                                            'div',
                                            t(
                                              t(
                                                t(
                                                  { ref: n.innerRef },
                                                  n.draggableProps
                                                ),
                                                n.dragHandleProps
                                              ),
                                              {},
                                              {
                                                children: a.jsx(g, {
                                                  isDragging: o.isDragging,
                                                  item: e,
                                                  userList: w,
                                                }),
                                              }
                                            )
                                          ),
                                      },
                                      e._metadata.documentId
                                    )
                                  ),
                              ],
                            })
                            var i, r
                          },
                        }),
                      ],
                    },
                    e.id
                  )
                ),
              }),
            }),
          ],
        })
    : a.jsx(s.Container, {
        width: 1,
        padding: 5,
        children: a.jsx(d.Feedback, {
          tone: 'caution',
          title: 'Plugin options error',
          description: 'No States defined in plugin config',
        }),
      })
}
var v = (e) =>
  o.defineType({
    type: 'document',
    name: 'workflow.metadata',
    title: 'Workflow metadata',
    liveEdit: !0,
    fields: [
      o.defineField({
        name: 'state',
        type: 'string',
        options: { list: e.map((e) => ({ value: e.id, title: e.title })) },
      }),
      o.defineField({
        name: 'documentId',
        title: 'Document ID',
        type: 'string',
        readOnly: !0,
      }),
      o.defineField({
        type: 'array',
        name: 'assignees',
        description:
          'The people who are assigned to move this further in the workflow.',
        of: [{ type: 'string' }],
      }),
    ],
  })
function w(e, t) {
  const {
    data: n,
    loading: o,
    error: i,
  } = d.useListeningQuery(
    '*[_type == "workflow.metadata" && documentId == $id][0]',
    { params: { id: e } }
  )
  return (null == n ? void 0 : n.state)
    ? {
        data: { metadata: n, state: t.find((e) => e.id === n.state) },
        loading: o,
        error: i,
      }
    : { data: {}, loading: o, error: i }
}
function I(e, t) {
  const { id: n } = e,
    { data: o, loading: i, error: a } = w(n, t),
    { state: r } = o
  return i || a
    ? (a && console.error(a), null)
    : r
    ? { label: r.title, title: r.title, color: null == r ? void 0 : r.color }
    : null
}
function k(e, t) {
  const { id: n } = e,
    { data: a, loading: r, error: d } = w(n, t),
    { state: l } = a,
    c = o.useClient(),
    u = s.useToast()
  if (r || d) return d && console.error(d), null
  if (!l) return null
  const p = t.findIndex((e) => e.id === l.id),
    m = t[p + 1]
  return m
    ? {
        icon: i.ArrowRightIcon,
        label: 'Promote',
        title: 'Promote State to "'.concat(m.title, '"'),
        onHandle: () => {
          return (
            (t = n),
            (o = m),
            void c
              .patch('workflow-metadata.'.concat(t))
              .set({ state: o.id })
              .commit()
              .then(() => {
                e.onComplete(),
                  u.push({
                    status: 'success',
                    title: 'Document promoted to '.concat(o.title),
                  })
              })
              .catch((t) => {
                e.onComplete(),
                  console.error(t),
                  u.push({
                    status: 'error',
                    title: 'Document promotion failed',
                  })
              })
          )
          var t, o
        },
      }
    : null
}
function _(e, t) {
  const { id: n } = e,
    { data: a, loading: r, error: d } = w(n, t),
    { state: l } = a,
    c = o.useClient(),
    u = s.useToast()
  if (r || d) return d && console.error(d), null
  if (!l) return null
  const p = t.findIndex((e) => e.id === l.id),
    m = t[p - 1]
  return m
    ? {
        icon: i.ArrowLeftIcon,
        label: 'Demote',
        title: 'Demote State to "'.concat(m.title, '"'),
        onHandle: () => {
          return (
            (t = n),
            (o = m),
            void c
              .patch('workflow-metadata.'.concat(t))
              .set({ state: o.id })
              .commit()
              .then(() => {
                e.onComplete(),
                  u.push({
                    status: 'success',
                    title: 'Document demoted to '.concat(o.title),
                  })
              })
              .catch((t) => {
                e.onComplete(),
                  console.error(t),
                  u.push({ status: 'error', title: 'Document demotion failed' })
              })
          )
          var t, o
        },
      }
    : null
}
const C = {
    schemaTypes: [],
    states: [
      { id: 'draft', title: 'Draft', operation: 'unpublish' },
      { id: 'inReview', title: 'In review', operation: null, color: 'primary' },
      {
        id: 'approved',
        title: 'Approved',
        operation: null,
        color: 'success',
        icon: i.CheckmarkIcon,
      },
      {
        id: 'changesRequested',
        title: 'Changes requested',
        operation: null,
        color: 'warning',
      },
      {
        id: 'published',
        title: 'Published',
        operation: 'publish',
        color: 'success',
      },
    ],
  },
  D = o.definePlugin(function () {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C
    const { schemaTypes: n, states: o } = t(t({}, C), e)
    if (!(null == o ? void 0 : o.length))
      throw new Error('Workflow: Missing states in config')
    return {
      name: 'sanity-plugin-workflow',
      schema: { types: [v(o)] },
      document: {
        actions: (e, t) =>
          n.includes(t.schemaType) ? [(e) => k(e, o), (e) => _(e, o), ...e] : e,
        badges: (e, t) =>
          n.includes(t.schemaType) ? [(e) => I(e, o), ...e] : e,
      },
      tools: [
        {
          name: 'workflow',
          title: 'Workflow',
          component: j,
          icon: i.SplitVerticalIcon,
          options: { schemaTypes: n, states: o },
        },
      ],
    }
  })
exports.workflow = D
//# sourceMappingURL=index.js.map
