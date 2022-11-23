function t(t, e) {
  var n = Object.keys(t)
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t)
    e &&
      (o = o.filter(function (e) {
        return Object.getOwnPropertyDescriptor(t, e).enumerable
      })),
      n.push.apply(n, o)
  }
  return n
}
function e(e) {
  for (var o = 1; o < arguments.length; o++) {
    var i = null != arguments[o] ? arguments[o] : {}
    o % 2
      ? t(Object(i), !0).forEach(function (t) {
          n(e, t, i[t])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(i))
      : t(Object(i)).forEach(function (t) {
          Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(i, t))
        })
  }
  return e
}
function n(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (t[e] = n),
    t
  )
}
import {
  UserAvatar as o,
  useClient as i,
  useSchema as r,
  SanityPreview as a,
  useDocumentOperation as s,
  defineType as d,
  defineField as l,
  definePlugin as c,
} from 'sanity'
import {
  EditIcon as u,
  AddIcon as p,
  DragHandleIcon as m,
  ArrowRightIcon as h,
  ArrowLeftIcon as f,
  SplitVerticalIcon as g,
  CheckmarkIcon as y,
} from '@sanity/icons'
import { jsx as b, jsxs as v, Fragment as w } from 'react/jsx-runtime'
import _ from 'react'
import {
  Button as k,
  Flex as I,
  Box as D,
  Text as C,
  useToast as O,
  Popover as j,
  useTheme as P,
  Card as x,
  Stack as S,
  Container as E,
  Grid as T,
  Label as L,
  Spinner as R,
} from '@sanity/ui'
import {
  UserSelectMenu as M,
  useListeningQuery as W,
  useProjectUsers as A,
  Feedback as F,
} from 'sanity-plugin-utils'
import {
  DragDropContext as H,
  Droppable as q,
  Draggable as z,
} from 'react-beautiful-dnd'
import { useRouter as B } from 'sanity/router'
function N(t) {
  const { id: e, type: n } = t,
    { navigateIntent: o } = B()
  return b(k, {
    onClick: () => o('edit', { id: e, type: n }),
    mode: 'ghost',
    fontSize: 1,
    padding: 2,
    tabIndex: -1,
    icon: u,
    text: 'Edit',
  })
}
function Y(t) {
  const { users: e, max: n = 3 } = t,
    i = null == e ? void 0 : e.length,
    r = _.useMemo(() => e.slice(0, n), [e])
  return (null == e ? void 0 : e.length)
    ? v(I, {
        align: 'center',
        children: [
          r.map((t) =>
            b(
              D,
              { style: { marginRight: -5 }, children: b(o, { user: t }) },
              t.id
            )
          ),
          i > n &&
            b(D, {
              paddingLeft: 2,
              children: v(C, { size: 1, children: ['+', i - n] }),
            }),
        ],
      })
    : null
}
function $(t) {
  const { assignees: e, userList: n, documentId: o } = t,
    r = i(),
    a = O(),
    [s, d] = _.useState(''),
    l = _.useCallback(
      (t) => {
        if (!t) return a.push({ status: 'error', title: 'No user selected' })
        r.patch('workflow-metadata.'.concat(o))
          .setIfMissing({ assignees: [] })
          .insert('after', 'assignees[-1]', [t])
          .commit()
          .then(() =>
            a.push({
              title: 'Assigned user to document',
              description: t,
              status: 'success',
            })
          )
          .catch(
            (e) => (
              console.error(e),
              a.push({
                title: 'Failed to add assignee',
                description: t,
                status: 'error',
              })
            )
          )
      },
      [o, r, a]
    ),
    c = _.useCallback(
      (t, e) => {
        r.patch('workflow-metadata.'.concat(t))
          .unset(['assignees[@ == "'.concat(e, '"]')])
          .commit()
          .then((t) => t)
          .catch(
            (e) => (
              console.error(e),
              a.push({
                title: 'Failed to remove assignee',
                description: t,
                status: 'error',
              })
            )
          )
      },
      [r, a]
    ),
    u = _.useCallback(
      (t) => {
        r.patch('workflow-metadata.'.concat(t))
          .unset(['assignees'])
          .commit()
          .then((t) => t)
          .catch(
            (e) => (
              console.error(e),
              a.push({
                title: 'Failed to clear assignees',
                description: t,
                status: 'error',
              })
            )
          )
      },
      [r, a]
    )
  return b(j, {
    content: b(M, {
      style: { maxHeight: 300 },
      value: e || [],
      userList: n,
      onAdd: l,
      onClear: u,
      onRemove: c,
      open: s === o,
    }),
    portal: !0,
    open: s === o,
    children:
      e && 0 !== e.length
        ? b(k, {
            onClick: () => d(o),
            padding: 0,
            mode: 'bleed',
            style: { width: '100%' },
            children: b(Y, { users: n.filter((t) => e.includes(t.id)) }),
          })
        : b(k, {
            onClick: () => d(o),
            fontSize: 1,
            padding: 2,
            tabIndex: -1,
            icon: p,
            text: 'Assign',
            tone: 'positive',
          }),
  })
}
function U(t) {
  var e
  const { userList: n, isDragging: o, item: i } = t,
    { assignees: s, documentId: d } = null != (e = i._metadata) ? e : {},
    l = r(),
    c = P().sanity.color.dark
  return b(D, {
    paddingY: 2,
    paddingX: 3,
    children: b(x, {
      radius: 2,
      shadow: o ? 3 : 1,
      tone: o ? 'positive' : c ? 'transparent' : 'default',
      children: v(S, {
        children: [
          b(x, {
            borderBottom: !0,
            radius: 2,
            padding: 3,
            paddingLeft: 2,
            tone: 'inherit',
            style: { pointerEvents: 'none' },
            children: v(I, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                b(a, {
                  layout: 'default',
                  value: i,
                  schemaType: l.get(i._type),
                }),
                b(m, { style: { flexShrink: 0 } }),
              ],
            }),
          }),
          b(x, {
            padding: 2,
            radius: 2,
            tone: 'inherit',
            children: v(I, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                b($, { userList: n, assignees: s, documentId: d }),
                b(N, { id: i._id, type: i._type }),
              ],
            }),
          }),
        ],
      }),
    }),
  })
}
function V(t) {
  const { _id: e, _type: n, documentId: o, state: i, onComplete: r } = t,
    a = s(o, n),
    d = e.startsWith('drafts.'),
    l = O()
  return (
    d && 'publish' === i.operation
      ? a.publish.disabled ||
        (a.publish.execute(),
        r(e),
        l.push({
          title: 'Published Document',
          description: o,
          status: 'success',
        }))
      : d || 'unpublish' !== i.operation
      ? r(e)
      : a.unpublish.disabled ||
        (a.unpublish.execute(),
        r(e),
        l.push({
          title: 'Unpublished Document',
          description: o,
          status: 'success',
        })),
    v(x, {
      padding: 3,
      shadow: 2,
      tone: 'primary',
      children: ['Mutating: ', e, ' to ', i.title],
    })
  )
}
const X = '{\n  "documents": '
    .concat('*[_type in $schemaTypes]{ _id, _type, _rev }', ',\n  "metadata": ')
    .concat(
      '*[_type == "workflow.metadata"]{\n  _rev,\n  assignees,\n  documentId,\n  state\n}',
      '\n}'
    ),
  G = { documents: [], metadata: [] }
function J(t) {
  var n, o
  const { schemaTypes: r = [], states: a = [] } =
      null !=
      (o = null == (n = null == t ? void 0 : t.tool) ? void 0 : n.options)
        ? o
        : {},
    [s, d] = _.useState([]),
    l = _.useCallback((t) => {
      d((e) => e.filter((e) => e._id !== t))
    }, []),
    c = i(),
    u = O(),
    p = P().sanity.color.dark ? 'default' : 'transparent',
    m = A() || [],
    { workflowData: h, operations: f } = (function (t) {
      const n = O(),
        o = i(),
        [r, a] = _.useState([]),
        {
          data: s,
          loading: d,
          error: l,
        } = W(X, { params: { schemaTypes: t }, initialValue: G })
      _.useEffect(() => {
        if (s) {
          const t = s.documents.reduce((t, n) => {
            const o = s.metadata.find(
              (t) => t.documentId === n._id.replace('drafts.', '')
            )
            if (!o) return [...t, e({ _metadata: null }, n)]
            const i = e({ _metadata: o }, n)
            return n._id.startsWith('drafts.')
              ? [...t, i]
              : Boolean(
                  s.documents.find((t) => t._id === 'drafts.'.concat(n._id))
                )
              ? t
              : [...t, i]
          }, [])
          a(t)
        }
      }, [s])
      const c = _.useCallback(
        (t, i, s) => {
          const d = r,
            l = r.map((n) =>
              n._metadata.documentId === t
                ? e(
                    e({}, n),
                    {},
                    {
                      _metadata: e(
                        e({}, n._metadata),
                        {},
                        { state: i.droppableId }
                      ),
                    }
                  )
                : n
            )
          a(l)
          const c = i.droppableId,
            u = s.find((t) => t.id === c),
            p = r.find((e) => e._metadata.documentId === t)
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
          const { _id: m, _type: h } = p,
            { _rev: f, documentId: g } = p._metadata
          return (
            o
              .patch('workflow-metadata.'.concat(g))
              .ifRevisionId(f)
              .set({ state: c })
              .commit()
              .then(() => {
                var t
                return n.push({
                  title: 'Moved to "'.concat(
                    null != (t = null == u ? void 0 : u.title) ? t : c,
                    '"'
                  ),
                  description: g,
                  status: 'success',
                })
              })
              .catch(() => {
                var t
                return (
                  a(d),
                  n.push({
                    title: 'Failed to move to "'.concat(
                      null != (t = null == u ? void 0 : u.title) ? t : c,
                      '"'
                    ),
                    description: g,
                    status: 'error',
                  })
                )
              }),
            { _id: m, _type: h, documentId: g, state: u }
          )
        },
        [o, n, r]
      )
      return {
        workflowData: { data: r, loading: d, error: l },
        operations: { move: c },
      }
    })(r),
    { data: g, loading: y, error: C } = h,
    { move: j } = f,
    S = g.filter((t) => !t._metadata).map((t) => t._id.replace('drafts.', '')),
    M = _.useCallback(async (t) => {
      u.push({ title: 'Importing documents', status: 'info' })
      const e = t.reduce(
        (t, e) =>
          t.createOrReplace({
            _id: 'workflow-metadata.'.concat(e),
            _type: 'workflow.metadata',
            state: a[0].id,
            documentId: e,
          }),
        c.transaction()
      )
      await e.commit(),
        u.push({ title: 'Imported documents', status: 'success' })
    }, []),
    B = _.useCallback(
      (t) => {
        const { draggableId: e, source: n, destination: o } = t
        if (
          (console.log(
            'sending '
              .concat(e, ' from ')
              .concat(n.droppableId, ' to ')
              .concat(null == o ? void 0 : o.droppableId)
          ),
          !o || o.droppableId === n.droppableId)
        )
          return
        const i = j(e, o, a)
        i && d((t) => [...t, i])
      },
      [j, a]
    )
  return (null == a ? void 0 : a.length)
    ? C
      ? b(E, {
          width: 1,
          padding: 5,
          children: b(F, { tone: 'critical', title: 'Error with query' }),
        })
      : v(w, {
          children: [
            s.length
              ? b('div', {
                  style: { position: 'absolute', bottom: 0, background: 'red' },
                  children: s.map((t) =>
                    b(V, e(e({}, t), {}, { onComplete: l }), t._id)
                  ),
                })
              : null,
            S.length > 0 &&
              b(D, {
                padding: 5,
                children: b(x, {
                  border: !0,
                  padding: 3,
                  tone: 'caution',
                  children: b(I, {
                    align: 'center',
                    justify: 'center',
                    children: v(k, {
                      onClick: () => M(S),
                      children: [
                        'Import ',
                        S.length,
                        ' Missing',
                        ' ',
                        1 === S.length ? 'Document' : 'Documents',
                        ' into Workflow',
                      ],
                    }),
                  }),
                }),
              }),
            b(H, {
              onDragEnd: B,
              children: b(T, {
                columns: a.length,
                height: 'fill',
                children: a.map((t, n) =>
                  v(
                    x,
                    {
                      borderLeft: n > 0,
                      children: [
                        b(x, {
                          paddingY: 4,
                          padding: 3,
                          style: { pointerEvents: 'none' },
                          children: b(L, { children: t.title }),
                        }),
                        b(q, {
                          droppableId: t.id,
                          children: (n, o) => {
                            return v(x, {
                              ref: n.innerRef,
                              tone: o.isDraggingOver ? 'primary' : p,
                              height: 'fill',
                              children: [
                                y
                                  ? b(I, {
                                      padding: 5,
                                      align: 'center',
                                      justify: 'center',
                                      children: b(R, { muted: !0 }),
                                    })
                                  : null,
                                g.length > 0 &&
                                  ((i = g),
                                  (r = t.id),
                                  i.filter((t) => {
                                    var e
                                    return (
                                      (null ==
                                      (e = null == t ? void 0 : t._metadata)
                                        ? void 0
                                        : e.state) === r
                                    )
                                  })).map((t, n) =>
                                    b(
                                      z,
                                      {
                                        draggableId: t._metadata.documentId,
                                        index: n,
                                        children: (n, o) =>
                                          b(
                                            'div',
                                            e(
                                              e(
                                                e(
                                                  { ref: n.innerRef },
                                                  n.draggableProps
                                                ),
                                                n.dragHandleProps
                                              ),
                                              {},
                                              {
                                                children: b(U, {
                                                  isDragging: o.isDragging,
                                                  item: t,
                                                  userList: m,
                                                }),
                                              }
                                            )
                                          ),
                                      },
                                      t._metadata.documentId
                                    )
                                  ),
                              ],
                            })
                            var i, r
                          },
                        }),
                      ],
                    },
                    t.id
                  )
                ),
              }),
            }),
          ],
        })
    : b(E, {
        width: 1,
        padding: 5,
        children: b(F, {
          tone: 'caution',
          title: 'Plugin options error',
          description: 'No States defined in plugin config',
        }),
      })
}
var K = (t) =>
  d({
    type: 'document',
    name: 'workflow.metadata',
    title: 'Workflow metadata',
    liveEdit: !0,
    fields: [
      l({
        name: 'state',
        type: 'string',
        options: { list: t.map((t) => ({ value: t.id, title: t.title })) },
      }),
      l({
        name: 'documentId',
        title: 'Document ID',
        type: 'string',
        readOnly: !0,
      }),
      l({
        type: 'array',
        name: 'assignees',
        description:
          'The people who are assigned to move this further in the workflow.',
        of: [{ type: 'string' }],
      }),
    ],
  })
function Q(t, e) {
  const {
    data: n,
    loading: o,
    error: i,
  } = W('*[_type == "workflow.metadata" && documentId == $id][0]', {
    params: { id: t },
  })
  return (null == n ? void 0 : n.state)
    ? {
        data: { metadata: n, state: e.find((t) => t.id === n.state) },
        loading: o,
        error: i,
      }
    : { data: {}, loading: o, error: i }
}
function Z(t, e) {
  const { id: n } = t,
    { data: o, loading: i, error: r } = Q(n, e),
    { state: a } = o
  return i || r
    ? (r && console.error(r), null)
    : a
    ? { label: a.title, title: a.title, color: null == a ? void 0 : a.color }
    : null
}
function tt(t, e) {
  const { id: n } = t,
    { data: o, loading: r, error: a } = Q(n, e),
    { state: s } = o,
    d = i(),
    l = O()
  if (r || a) return a && console.error(a), null
  if (!s) return null
  const c = e.findIndex((t) => t.id === s.id),
    u = e[c + 1]
  return u
    ? {
        icon: h,
        label: 'Promote',
        title: 'Promote State to "'.concat(u.title, '"'),
        onHandle: () => {
          return (
            (e = n),
            (o = u),
            void d
              .patch('workflow-metadata.'.concat(e))
              .set({ state: o.id })
              .commit()
              .then(() => {
                t.onComplete(),
                  l.push({
                    status: 'success',
                    title: 'Document promoted to '.concat(o.title),
                  })
              })
              .catch((e) => {
                t.onComplete(),
                  console.error(e),
                  l.push({
                    status: 'error',
                    title: 'Document promotion failed',
                  })
              })
          )
          var e, o
        },
      }
    : null
}
function et(t, e) {
  const { id: n } = t,
    { data: o, loading: r, error: a } = Q(n, e),
    { state: s } = o,
    d = i(),
    l = O()
  if (r || a) return a && console.error(a), null
  if (!s) return null
  const c = e.findIndex((t) => t.id === s.id),
    u = e[c - 1]
  return u
    ? {
        icon: f,
        label: 'Demote',
        title: 'Demote State to "'.concat(u.title, '"'),
        onHandle: () => {
          return (
            (e = n),
            (o = u),
            void d
              .patch('workflow-metadata.'.concat(e))
              .set({ state: o.id })
              .commit()
              .then(() => {
                t.onComplete(),
                  l.push({
                    status: 'success',
                    title: 'Document demoted to '.concat(o.title),
                  })
              })
              .catch((e) => {
                t.onComplete(),
                  console.error(e),
                  l.push({ status: 'error', title: 'Document demotion failed' })
              })
          )
          var e, o
        },
      }
    : null
}
const nt = {
    schemaTypes: [],
    states: [
      { id: 'draft', title: 'Draft', operation: 'unpublish' },
      { id: 'inReview', title: 'In review', operation: null, color: 'primary' },
      {
        id: 'approved',
        title: 'Approved',
        operation: null,
        color: 'success',
        icon: y,
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
  ot = c(function () {
    let t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : nt
    const { schemaTypes: n, states: o } = e(e({}, nt), t)
    if (!(null == o ? void 0 : o.length))
      throw new Error('Workflow: Missing states in config')
    return {
      name: 'sanity-plugin-workflow',
      schema: { types: [K(o)] },
      document: {
        actions: (t, e) =>
          n.includes(e.schemaType)
            ? [(t) => tt(t, o), (t) => et(t, o), ...t]
            : t,
        badges: (t, e) =>
          n.includes(e.schemaType) ? [(t) => Z(t, o), ...t] : t,
      },
      tools: [
        {
          name: 'workflow',
          title: 'Workflow',
          component: J,
          icon: g,
          options: { schemaTypes: n, states: o },
        },
      ],
    }
  })
export { ot as workflow }
//# sourceMappingURL=index.esm.js.map
