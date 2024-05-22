'use client'

import { AuthorizedUserSchema } from '@/types/zod'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Editor } from 'slate'
import { Descendant, Range, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import {
    Editable,
    ReactEditor,
    Slate,
    useFocused,
    useSelected,
    withReact,
} from 'slate-react'
import { Portal } from './customComps'
import { MentionElement } from './customTypes'

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

export const CommentInput = ({ users }: { users: AuthorizedUserSchema[] }) => {
    const ref = useRef<HTMLDivElement | null>()
    const [target, setTarget] = useState<Range | undefined>()
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const renderElement = useCallback(
        (props: any) => <Element {...props} />,
        []
    )
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )

    const filterdUsers = users
        .filter((u) => u.name.toLowerCase().startsWith(search.toLowerCase()))
        .slice(0, 10)

    const onKeyDown = useCallback(
        (event: any) => {
            if (target && filterdUsers.length > 0) {
                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex =
                            index >= filterdUsers.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex =
                            index <= 0 ? filterdUsers.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, target)
                        insertMention(editor, filterdUsers[index].name)
                        setTarget(null)
                        break
                    case 'Escape':
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            }
        },
        [filterdUsers, editor, index, target]
    )

    useEffect(() => {
        if (target && filterdUsers.length > 0) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            el.style.top = `${rect.top + window.pageYOffset + 24}px`
            el.style.left = `${rect.left + window.pageXOffset}px`
        }
    }, [filterdUsers.length, editor, index, search, target])

    useEffect(() => {
        console.log(editor)
    }, [editor])

    return (
        <form
            action={() => {
                console.log('subited')
            }}
            onSubmit={() => {
                console.log('subited')
            }}
        >
            <Slate
                editor={editor}
                initialValue={initialValue}
                onChange={() => {
                    const { selection } = editor

                    if (selection && Range.isCollapsed(selection)) {
                        const [start] = Range.edges(selection)
                        const wordBefore = Editor.before(editor, start, {
                            unit: 'word',
                        })
                        const before =
                            wordBefore && Editor.before(editor, wordBefore)
                        const beforeRange =
                            before && Editor.range(editor, before, start)
                        const beforeText =
                            beforeRange && Editor.string(editor, beforeRange)
                        const beforeMatch =
                            beforeText && beforeText.match(/^@(\w+)$/)
                        const after = Editor.after(editor, start)
                        const afterRange = Editor.range(editor, start, after)
                        const afterText = Editor.string(editor, afterRange)
                        const afterMatch = afterText.match(/^(\s|$)/)

                        if (beforeMatch && afterMatch) {
                            setTarget(beforeRange)
                            setSearch(beforeMatch[1])
                            setIndex(0)
                            return
                        }
                    }

                    setTarget(null)
                }}
            >
                <Editable
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    placeholder="Enter some text..."
                />
                {target && filterdUsers.length > 0 && (
                    <Portal>
                        <div
                            ref={ref}
                            style={{
                                top: '-9999px',
                                left: '-9999px',
                                position: 'absolute',
                                zIndex: 1,
                                padding: '3px',
                                background: 'white',
                                borderRadius: '4px',
                                boxShadow: '0 1px 5px rgba(0,0,0,.2)',
                            }}
                            data-cy="mentions-portal"
                        >
                            {filterdUsers.map((user, i) => (
                                <div
                                    key={user.name + user.id}
                                    onClick={() => {
                                        Transforms.select(editor, target)
                                        insertMention(editor, user.name)
                                        setTarget(null)
                                    }}
                                    style={{
                                        padding: '1px 3px',
                                        borderRadius: '3px',
                                        background:
                                            i === index
                                                ? '#B4D5FF'
                                                : 'transparent',
                                    }}
                                >
                                    {user.name}
                                </div>
                            ))}
                        </div>
                    </Portal>
                )}
            </Slate>
        </form>
    )
}

const withMentions = (editor: any) => {
    const { isInline, isVoid, markableVoid } = editor

    editor.isInline = (element: any) => {
        return element.type === 'mention' ? true : isInline(element)
    }

    editor.isVoid = (element: any) => {
        return element.type === 'mention' ? true : isVoid(element)
    }

    editor.markableVoid = (element: any) => {
        return element.type === 'mention' || markableVoid(element)
    }

    return editor
}

const insertMention = (editor: any, user: any) => {
    const mention: MentionElement = {
        type: 'mention',
        username: user,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mention)
    Transforms.move(editor)
}

// Borrow Leaf renderer from the Rich Text example.
// In a real project you would get this via `withRichText(editor)` or similar.
const Leaf = ({
    attributes,
    children,
    leaf,
}: {
    attributes: any
    children: any
    leaf: any
}) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

const Element = (props: any) => {
    const { attributes, children, element } = props
    switch (element.type) {
        case 'mention':
            console.log('element', props)
            return <Mention {...props} />
        default:
            return <p {...attributes}>{children}</p>
    }
}

const Mention = ({
    attributes,
    children,
    element,
}: {
    attributes: any
    children: any
    element: any
}) => {
    const selected = useSelected()
    const focused = useFocused()
    const style: React.CSSProperties = {
        padding: '3px 3px 2px',
        margin: '0 1px',
        verticalAlign: 'baseline',
        display: 'inline-block',
        borderRadius: '4px',
        backgroundColor: '#eee',
        fontSize: '0.9em',
        boxShadow: selected && focused ? '0 0 0 2px #B4D5FF' : 'none',
    }
    // See if our empty text child has any styling marks applied and apply those
    if (element.children[0].bold) {
        style.fontWeight = 'bold'
    }
    if (element.children[0].italic) {
        style.fontStyle = 'italic'
    }
    return (
        <span
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.username.replace(' ', '-')}`}
            style={style}
        >
            @{element.username}
            {children}
        </span>
    )
}
