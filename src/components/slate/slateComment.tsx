'use client'

import { EventSchema } from '@/types/zod'
import React, { useCallback, useMemo } from 'react'
import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import {
    Editable,
    Slate,
    useFocused,
    useSelected,
    withReact,
} from 'slate-react'
import { CustomEditor } from './customTypes'

const SlateComment = ({
    editor,
    event,
    onChange,
    children,
    onKeyDown,
}: {
    editor?: CustomEditor
    event?: EventSchema
    onChange?: (value: Descendant[]) => void
    children?: React.ReactNode
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}) => {
    const renderElement = useCallback(
        (props: any) => <Element {...props} />,
        []
    )
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

    return (
        <div className="rounded-lg bg-white p-4 shadow">
            <Slate
                editor={
                    editor ??
                    withMentions(withReact(withHistory(createEditor())))
                }
                initialValue={
                    event?.content ?? [
                        {
                            type: 'paragraph',
                            children: [{ text: '' }],
                        },
                    ]
                }
                onChange={onChange}
            >
                <Editable
                    readOnly={onChange ? false : true}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={onKeyDown}
                    placeholder="Enter some text..."
                />
                {children}
            </Slate>
        </div>
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
        <a
            {...attributes}
            contentEditable={false}
            data-cy={`mention-${element.mention.name.replace(' ', '-')}`}
            style={style}
            href={`/profile/${element.mention.slug}`}
        >
            @{element.mention.name}
            {children}
        </a>
    )
}

export default SlateComment
