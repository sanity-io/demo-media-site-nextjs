'use strict'
function e(e, t) {
  var n = Object.keys(e)
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e)
    t &&
      (r = r.filter(function (t) {
        return Object.getOwnPropertyDescriptor(e, t).enumerable
      })),
      n.push.apply(n, r)
  }
  return n
}
function t(t) {
  for (var r = 1; r < arguments.length; r++) {
    var o = null != arguments[r] ? arguments[r] : {}
    r % 2
      ? e(Object(o), !0).forEach(function (e) {
          n(t, e, o[e])
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(o))
      : e(Object(o)).forEach(function (e) {
          Object.defineProperty(t, e, Object.getOwnPropertyDescriptor(o, e))
        })
  }
  return t
}
function n(e, t, n) {
  return (
    (t = (function (e) {
      var t = (function (e, t) {
        if ('object' != typeof e || null === e) return e
        var n = e[Symbol.toPrimitive]
        if (void 0 !== n) {
          var r = n.call(e, t || 'default')
          if ('object' != typeof r) return r
          throw new TypeError('@@toPrimitive must return a primitive value.')
        }
        return ('string' === t ? String : Number)(e)
      })(e, 'string')
      return 'symbol' == typeof t ? t : String(t)
    })(t)) in e
      ? Object.defineProperty(e, t, {value: n, enumerable: !0, configurable: !0, writable: !0})
      : (e[t] = n),
    e
  )
}
Object.defineProperty(exports, '__esModule', {value: !0})
var r = require('sanity'),
  o = require('@sanity/icons'),
  i = require('react/jsx-runtime'),
  a = require('react'),
  s = require('@sanity/ui'),
  l = require('sanity-plugin-utils'),
  d = require('react-beautiful-dnd'),
  c = require('sanity/router')
function u(e) {
  return e && 'object' == typeof e && 'default' in e ? e : {default: e}
}
var p = u(a)
function m(e) {
  const {id: t, type: n} = e,
    {navigateIntent: r} = c.useRouter()
  return i.jsx(s.Button, {
    onClick: () => r('edit', {id: t, type: n}),
    mode: 'ghost',
    fontSize: 1,
    padding: 2,
    tabIndex: -1,
    icon: o.EditIcon,
    text: 'Edit',
  })
}
function f(e) {
  const {users: t, max: n = 3} = e,
    o = null == t ? void 0 : t.length,
    a = p.default.useMemo(() => t.slice(0, n), [t])
  return (null == t ? void 0 : t.length)
    ? i.jsxs(s.Flex, {
        align: 'center',
        children: [
          a.map((e) =>
            i.jsx(s.Box, {style: {marginRight: -5}, children: i.jsx(r.UserAvatar, {user: e})}, e.id)
          ),
          o > n &&
            i.jsx(s.Box, {
              paddingLeft: 2,
              children: i.jsxs(s.Text, {size: 1, children: ['+', o - n]}),
            }),
        ],
      })
    : null
}
function h(e) {
  const {assignees: t, userList: n, documentId: a} = e,
    d = r.useClient(),
    c = s.useToast(),
    [u, m] = p.default.useState(''),
    h = p.default.useCallback(
      (e) => {
        if (!e) return c.push({status: 'error', title: 'No user selected'})
        d.patch('workflow-metadata.'.concat(a))
          .setIfMissing({assignees: []})
          .insert('after', 'assignees[-1]', [e])
          .commit()
          .then(() =>
            c.push({title: 'Assigned user to document', description: e, status: 'success'})
          )
          .catch(
            (t) => (
              console.error(t),
              c.push({title: 'Failed to add assignee', description: e, status: 'error'})
            )
          )
      },
      [a, d, c]
    ),
    g = p.default.useCallback(
      (e, t) => {
        d.patch('workflow-metadata.'.concat(e))
          .unset(['assignees[@ == "'.concat(t, '"]')])
          .commit()
          .then((e) => e)
          .catch(
            (t) => (
              console.error(t),
              c.push({title: 'Failed to remove assignee', description: e, status: 'error'})
            )
          )
      },
      [d, c]
    ),
    v = p.default.useCallback(
      (e) => {
        d.patch('workflow-metadata.'.concat(e))
          .unset(['assignees'])
          .commit()
          .then((e) => e)
          .catch(
            (t) => (
              console.error(t),
              c.push({title: 'Failed to clear assignees', description: e, status: 'error'})
            )
          )
      },
      [d, c]
    )
  return i.jsx(s.Popover, {
    content: i.jsx(l.UserSelectMenu, {
      style: {maxHeight: 300},
      value: t || [],
      userList: n,
      onAdd: h,
      onClear: v,
      onRemove: g,
      open: u === a,
    }),
    portal: !0,
    open: u === a,
    children:
      t && 0 !== t.length
        ? i.jsx(s.Button, {
            onClick: () => m(a),
            padding: 0,
            mode: 'bleed',
            style: {width: '100%'},
            children: i.jsx(f, {users: n.filter((e) => t.includes(e.id))}),
          })
        : i.jsx(s.Button, {
            onClick: () => m(a),
            fontSize: 1,
            padding: 2,
            tabIndex: -1,
            icon: o.AddIcon,
            text: 'Assign',
            tone: 'positive',
          }),
  })
}
function g(e) {
  var t
  const {userList: n, isDragging: a, item: l} = e,
    {assignees: d = [], documentId: c} = null != (t = l._metadata) ? t : {},
    u = r.useSchema(),
    p = s.useTheme().sanity.color.dark ? 'transparent' : 'default'
  return i.jsx(s.Box, {
    paddingY: 2,
    paddingX: 3,
    children: i.jsx(s.Card, {
      radius: 2,
      shadow: a ? 3 : 1,
      tone: a ? 'positive' : p,
      children: i.jsxs(s.Stack, {
        children: [
          i.jsx(s.Card, {
            borderBottom: !0,
            radius: 2,
            padding: 3,
            paddingLeft: 2,
            tone: 'inherit',
            style: {pointerEvents: 'none'},
            children: i.jsxs(s.Flex, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                i.jsx(r.Preview, {layout: 'default', value: l, schemaType: u.get(l._type)}),
                i.jsx(o.DragHandleIcon, {style: {flexShrink: 0}}),
              ],
            }),
          }),
          i.jsx(s.Card, {
            padding: 2,
            radius: 2,
            tone: 'inherit',
            children: i.jsxs(s.Flex, {
              align: 'center',
              justify: 'space-between',
              gap: 1,
              children: [
                c && i.jsx(h, {userList: n, assignees: d, documentId: c}),
                i.jsx(m, {id: l._id, type: l._type}),
              ],
            }),
          }),
        ],
      }),
    }),
  })
}
function v(e) {
  const {_id: t, _type: n, documentId: o, state: a, onComplete: l} = e,
    d = r.useDocumentOperation(o, n),
    c = t.startsWith('drafts.'),
    u = s.useToast()
  return (
    c && 'publish' === a.operation
      ? d.publish.disabled ||
        (d.publish.execute(),
        l(t),
        u.push({title: 'Published Document', description: o, status: 'success'}))
      : c || 'unpublish' !== a.operation
      ? l(t)
      : d.unpublish.disabled ||
        (d.unpublish.execute(),
        l(t),
        u.push({title: 'Unpublished Document', description: o, status: 'success'})),
    i.jsxs(s.Card, {
      padding: 3,
      shadow: 2,
      tone: 'primary',
      children: ['Mutating: ', t, ' to ', a.title],
    })
  )
}
const y = '{\n  "documents": '
    .concat('*[_type in $schemaTypes]{ _id, _type, _rev }', ',\n  "metadata": ')
    .concat(
      '*[_type == "workflow.metadata"]{\n  _rev,\n  assignees,\n  documentId,\n  state\n}',
      '\n}'
    ),
  b = {documents: [], metadata: []}
function x(e) {
  var n, o
  const {schemaTypes: a = [], states: c = []} =
      null != (o = null == (n = null == e ? void 0 : e.tool) ? void 0 : n.options) ? o : {},
    [u, m] = p.default.useState([]),
    f = p.default.useCallback((e) => {
      m((t) => t.filter((t) => t._id !== e))
    }, []),
    h = r.useClient(),
    x = s.useToast(),
    j = s.useTheme().sanity.color.dark ? 'default' : 'transparent',
    w = l.useProjectUsers() || [],
    {workflowData: I, operations: k} = (function (e) {
      const n = s.useToast(),
        o = r.useClient(),
        [i, a] = p.default.useState([]),
        {
          data: d,
          loading: c,
          error: u,
        } = l.useListeningQuery(y, {params: {schemaTypes: e}, initialValue: b})
      p.default.useEffect(() => {
        if (d) {
          const e = d.documents.reduce((e, n) => {
            const r = d.metadata.find((e) => e.documentId === n._id.replace('drafts.', ''))
            if (!r) return [...e, t({_metadata: null}, n)]
            const o = t({_metadata: r}, n)
            return n._id.startsWith('drafts.')
              ? [...e, o]
              : Boolean(d.documents.find((e) => e._id === 'drafts.'.concat(n._id)))
              ? e
              : [...e, o]
          }, [])
          a(e)
        }
      }, [d])
      const m = p.default.useCallback(
        (e, r, s) => {
          const l = i,
            d = i.map((n) => {
              var o
              return (null == (o = null == n ? void 0 : n._metadata) ? void 0 : o.documentId) === e
                ? t(t({}, n), {}, {_metadata: t(t({}, n._metadata), {}, {state: r.droppableId})})
                : n
            })
          a(d)
          const c = r.droppableId,
            u = s.find((e) => e.id === c),
            p = i.find((t) => {
              var n
              return (null == (n = null == t ? void 0 : t._metadata) ? void 0 : n.documentId) === e
            })
          if (!(null == u ? void 0 : u.id))
            return n.push({title: 'Could not find target state '.concat(c), status: 'error'}), null
          if (!p)
            return n.push({title: 'Could not find dragged document in data', status: 'error'}), null
          const {_id: m, _type: f} = p,
            {_rev: h, documentId: g} = p._metadata || {}
          return (
            o
              .patch('workflow-metadata.'.concat(g))
              .ifRevisionId(h)
              .set({state: c})
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
                  a(l),
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
            {_id: m, _type: f, documentId: g, state: u}
          )
        },
        [o, n, i]
      )
      return {workflowData: {data: i, loading: c, error: u}, operations: {move: m}}
    })(a),
    {data: _, loading: C, error: D} = I,
    {move: O} = k,
    P = _.filter((e) => !e._metadata).map((e) => e._id.replace('drafts.', '')),
    T = p.default.useCallback(async (e) => {
      x.push({title: 'Importing documents', status: 'info'})
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
      await t.commit(), x.push({title: 'Imported documents', status: 'success'})
    }, []),
    S = p.default.useCallback(
      (e) => {
        const {draggableId: t, source: n, destination: r} = e
        if (
          (console.log(
            'sending '
              .concat(t, ' from ')
              .concat(n.droppableId, ' to ')
              .concat(null == r ? void 0 : r.droppableId)
          ),
          !r || r.droppableId === n.droppableId)
        )
          return
        const o = O(t, r, c)
        o && m((e) => [...e, o])
      },
      [O, c]
    )
  return (null == c ? void 0 : c.length)
    ? D
      ? i.jsx(s.Container, {
          width: 1,
          padding: 5,
          children: i.jsx(l.Feedback, {tone: 'critical', title: 'Error with query'}),
        })
      : i.jsxs(i.Fragment, {
          children: [
            u.length
              ? i.jsx('div', {
                  style: {position: 'absolute', bottom: 0, background: 'red'},
                  children: u.map((e) => i.jsx(v, t(t({}, e), {}, {onComplete: f}), e._id)),
                })
              : null,
            P.length > 0 &&
              i.jsx(s.Box, {
                padding: 5,
                children: i.jsx(s.Card, {
                  border: !0,
                  padding: 3,
                  tone: 'caution',
                  children: i.jsx(s.Flex, {
                    align: 'center',
                    justify: 'center',
                    children: i.jsxs(s.Button, {
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
            i.jsx(d.DragDropContext, {
              onDragEnd: S,
              children: i.jsx(s.Grid, {
                columns: c.length,
                height: 'fill',
                children: c.map((e, n) =>
                  i.jsxs(
                    s.Card,
                    {
                      borderLeft: n > 0,
                      children: [
                        i.jsx(s.Card, {
                          paddingY: 4,
                          padding: 3,
                          style: {pointerEvents: 'none'},
                          children: i.jsx(s.Label, {children: e.title}),
                        }),
                        i.jsx(d.Droppable, {
                          droppableId: e.id,
                          children: (n, r) => {
                            return i.jsxs(s.Card, {
                              ref: n.innerRef,
                              tone: r.isDraggingOver ? 'primary' : j,
                              height: 'fill',
                              children: [
                                C
                                  ? i.jsx(s.Flex, {
                                      padding: 5,
                                      align: 'center',
                                      justify: 'center',
                                      children: i.jsx(s.Spinner, {muted: !0}),
                                    })
                                  : null,
                                _.length > 0 &&
                                  ((o = _),
                                  (a = e.id),
                                  o.filter((e) => {
                                    var t
                                    return (
                                      (null == (t = null == e ? void 0 : e._metadata)
                                        ? void 0
                                        : t.state) === a
                                    )
                                  })).map((e, n) => {
                                    var r, o
                                    return i.jsx(
                                      d.Draggable,
                                      {
                                        draggableId:
                                          null == (o = null == e ? void 0 : e._metadata)
                                            ? void 0
                                            : o.documentId,
                                        index: n,
                                        children: (n, r) =>
                                          i.jsx(
                                            'div',
                                            t(
                                              t(
                                                t({ref: n.innerRef}, n.draggableProps),
                                                n.dragHandleProps
                                              ),
                                              {},
                                              {
                                                children: i.jsx(g, {
                                                  isDragging: r.isDragging,
                                                  item: e,
                                                  userList: w,
                                                }),
                                              }
                                            )
                                          ),
                                      },
                                      null == (r = null == e ? void 0 : e._metadata)
                                        ? void 0
                                        : r.documentId
                                    )
                                  }),
                              ],
                            })
                            var o, a
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
    : i.jsx(s.Container, {
        width: 1,
        padding: 5,
        children: i.jsx(l.Feedback, {
          tone: 'caution',
          title: 'Plugin options error',
          description: 'No States defined in plugin config',
        }),
      })
}
var j = (e) =>
  r.defineType({
    type: 'document',
    name: 'workflow.metadata',
    title: 'Workflow metadata',
    liveEdit: !0,
    fields: [
      r.defineField({
        name: 'state',
        type: 'string',
        options: {list: e.map((e) => ({value: e.id, title: e.title}))},
      }),
      r.defineField({name: 'documentId', title: 'Document ID', type: 'string', readOnly: !0}),
      r.defineField({
        type: 'array',
        name: 'assignees',
        description: 'The people who are assigned to move this further in the workflow.',
        of: [{type: 'string'}],
      }),
    ],
  })
function w(e, t) {
  const {
    data: n,
    loading: r,
    error: o,
  } = l.useListeningQuery('*[_type == "workflow.metadata" && documentId == $id][0]', {
    params: {id: e},
  })
  return (null == n ? void 0 : n.state)
    ? {data: {metadata: n, state: t.find((e) => e.id === n.state)}, loading: r, error: o}
    : {data: {}, loading: r, error: o}
}
function I(e, t) {
  const {id: n} = e,
    {data: r, loading: o, error: i} = w(n, t),
    {state: a} = r
  return o || i
    ? (i && console.error(i), null)
    : a
    ? {label: a.title, title: a.title, color: null == a ? void 0 : a.color}
    : null
}
function k(e, t) {
  const {id: n} = e,
    {data: i, loading: a, error: l} = w(n, t),
    {state: d} = i,
    c = r.useClient(),
    u = s.useToast()
  if (a || l) return l && console.error(l), null
  if (!d) return null
  const p = t.findIndex((e) => e.id === d.id),
    m = t[p + 1]
  return m
    ? {
        icon: o.ArrowRightIcon,
        label: 'Promote',
        title: 'Promote State to "'.concat(m.title, '"'),
        onHandle: () => {
          return (
            (t = n),
            (r = m),
            void c
              .patch('workflow-metadata.'.concat(t))
              .set({state: r.id})
              .commit()
              .then(() => {
                e.onComplete(),
                  u.push({status: 'success', title: 'Document promoted to '.concat(r.title)})
              })
              .catch((t) => {
                e.onComplete(),
                  console.error(t),
                  u.push({status: 'error', title: 'Document promotion failed'})
              })
          )
          var t, r
        },
      }
    : null
}
function _(e, t) {
  const {id: n} = e,
    {data: i, loading: a, error: l} = w(n, t),
    {state: d} = i,
    c = r.useClient(),
    u = s.useToast()
  if (a || l) return l && console.error(l), null
  if (!d) return null
  const p = t.findIndex((e) => e.id === d.id),
    m = t[p - 1]
  return m
    ? {
        icon: o.ArrowLeftIcon,
        label: 'Demote',
        title: 'Demote State to "'.concat(m.title, '"'),
        onHandle: () => {
          return (
            (t = n),
            (r = m),
            void c
              .patch('workflow-metadata.'.concat(t))
              .set({state: r.id})
              .commit()
              .then(() => {
                e.onComplete(),
                  u.push({status: 'success', title: 'Document demoted to '.concat(r.title)})
              })
              .catch((t) => {
                e.onComplete(),
                  console.error(t),
                  u.push({status: 'error', title: 'Document demotion failed'})
              })
          )
          var t, r
        },
      }
    : null
}
const C = {
    schemaTypes: [],
    states: [
      {id: 'draft', title: 'Draft', operation: 'unpublish'},
      {id: 'inReview', title: 'In review', operation: null, color: 'primary'},
      {id: 'approved', title: 'Approved', operation: null, color: 'success', icon: o.CheckmarkIcon},
      {id: 'changesRequested', title: 'Changes requested', operation: null, color: 'warning'},
      {id: 'published', title: 'Published', operation: 'publish', color: 'success'},
    ],
  },
  D = r.definePlugin(function () {
    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : C
    const {schemaTypes: n, states: r} = t(t({}, C), e)
    if (!(null == r ? void 0 : r.length)) throw new Error('Workflow: Missing states in config')
    return {
      name: 'sanity-plugin-workflow',
      schema: {types: [j(r)]},
      document: {
        actions: (e, t) => (n.includes(t.schemaType) ? [(e) => k(e, r), (e) => _(e, r), ...e] : e),
        badges: (e, t) => (n.includes(t.schemaType) ? [(e) => I(e, r), ...e] : e),
      },
      tools: [
        {
          name: 'workflow',
          title: 'Workflow',
          component: x,
          icon: o.SplitVerticalIcon,
          options: {schemaTypes: n, states: r},
        },
      ],
    }
  })
exports.workflow = D
//# sourceMappingURL=index.js.map
