'use client'

import { EventFeedItem, EventSchema } from '@/types/zod'
import React, { useCallback } from 'react'
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
    onKeyUp,
}: {
    editor?: CustomEditor
    event?: EventSchema | EventFeedItem
    onChange?: (value: Descendant[]) => void
    children?: React.ReactNode
    onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void
    onKeyUp?: (event: React.KeyboardEvent<HTMLDivElement>) => void
}) => {
    const renderElement = useCallback(
        (props: any) => <Element {...props} />,
        []
    )
    const renderLeaf = useCallback((props: any) => <Leaf {...props} />, [])

    const inputStyle = {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
        paddingInline: '0.75rem',
        paddingBlock: '0.5rem',
        borderWidth: '1px',
        borderColor: '#e2e8f0',
        borderRadius: '0.25rem',
    }

    const commentStyle = {
        fontSize: '0.75rem',
        lineHeight: '1rem',
    }

    return (
        <div
            className={`${!event ? '' : '[& > *]:w-full w-full rounded-lg rounded-tl-none border border-slate-200 p-2'} `}
        >
            <Slate
                key={`SlateComment_${event?.id}`}
                editor={
                    editor ??
                    withMentions(withReact(withHistory(createEditor())))
                }
                // @ts-ignore
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
                    onKeyUp={onKeyUp}
                    placeholder="Skriv en kommentar"
                    style={event ? commentStyle : inputStyle}
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
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>
        case 'mention':
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
