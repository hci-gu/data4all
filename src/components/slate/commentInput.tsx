'use client'

import { AuthorizedUserSchema, MentionSchema, roleSchema } from '@/types/zod'
import {
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { Editor } from 'slate'
import { Range, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import { ReactEditor, withReact } from 'slate-react'
import { Portal } from './customComps'
import { MentionElement } from './customTypes'
import { createEvent } from '@/adapters/api'
import { authContext } from '@/lib/context/authContext'
import SlateComment from './slateComment'
import { Button } from '../ui/button'
import { EventContext } from '@/lib/context/eventContext'

export const CommentInput = ({
    users,
    roles,
    datasetId,
}: {
    users: AuthorizedUserSchema[]
    roles: roleSchema[]
    datasetId: string
}) => {
    const eventContext = useContext(EventContext)
    const user = useContext(authContext)
    const ref = useRef<HTMLDivElement>()
    const [target, setTarget] = useState<Range | null>(null)
    const [index, setIndex] = useState(0)
    const [search, setSearch] = useState('')
    const editor = useMemo(
        () => withMentions(withReact(withHistory(createEditor()))),
        []
    )
    const [mentions, setMentions] = useState<MentionSchema[]>([])

    const possibleMentions = [
        ...users.map((u) => u.name),
        ...roles.map((r) => r.name),
    ]
        .filter((name) => name.toLowerCase().startsWith(search.toLowerCase()))
        .slice(0, 10)

    const getMentionFromName = (name: string) => {
        const mentionedUser = users.find((u) => u.name === name)
        const mentionedRole = roles.find((r) => r.name === name)
        if (mentionedUser) {
            return {
                name: mentionedUser.name,
                slug: mentionedUser.slug,
                type: 'user',
            }
        } else if (mentionedRole) {
            return {
                name: mentionedRole.name,
                type: 'role',
            }
        }
    }

    const onKeyDown = useCallback(
        (event: any) => {
            // console.log('non slate interaction', event.key)

            if (target && possibleMentions.length > 0) {
                // console.log('slate interaction', event.key)

                switch (event.key) {
                    case 'ArrowDown':
                        event.preventDefault()
                        const prevIndex =
                            index >= possibleMentions.length - 1 ? 0 : index + 1
                        setIndex(prevIndex)
                        break
                    case 'ArrowUp':
                        event.preventDefault()
                        const nextIndex =
                            index <= 0 ? possibleMentions.length - 1 : index - 1
                        setIndex(nextIndex)
                        break
                    case 'Tab':
                    case 'Enter':
                        event.preventDefault()
                        Transforms.select(editor, target)
                        const mention = getMentionFromName(
                            possibleMentions[index]
                        )
                        if (mention) {
                            insertMention(editor, mention)
                            setMentions([...mentions, mention])
                        }
                        setTarget(null)
                        break
                    case 'Escape':
                        event.preventDefault()
                        setTarget(null)
                        break
                }
            } else {
                switch (event.key) {
                    case 'Enter':
                        // console.log('submit on enter')
                        onSubmit()
                        break
                }
            }
        },
        [possibleMentions, editor, index, target]
    )

    useEffect(() => {
        if (target && possibleMentions.length > 0) {
            const el = ref.current
            const domRange = ReactEditor.toDOMRange(editor, target)
            const rect = domRange.getBoundingClientRect()
            if (el) {
                el.style.top = `${rect.top + window.pageYOffset + 24}px`
                el.style.left = `${rect.left + window.pageXOffset}px`
            }
        }
    }, [possibleMentions.length, editor, index, search, target])

    const onSubmit = async () => {
        const userMentions = mentions.filter((m) => m.type === 'user')
        const mentionedUsers = users.filter((u) =>
            userMentions.find((m) => m.slug === u.slug)
        )

        const roleMentions = mentions.filter((m) => m.type === 'role')
        const mentionedRoles = roles.filter((r) =>
            roleMentions.find((m) => m.name === r.name)
        )

        const newEvent = await createEvent(
            {
                content: editor.children,
                mentions,
                user: user.auth.id,
                dataset: datasetId,
                subject: mentionedUsers,
                subjectRole: mentionedRoles,
                types: 'comment',
            },
            user.cookie
        )
        eventContext.setEvents((prev) => [newEvent, ...prev])

        editor.children = [
            {
                type: 'paragraph',
                children: [{ text: '' }],
            },
        ]
    }

    return (
        <div className="w-full">
            <SlateComment
                editor={editor}
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
                onKeyDown={onKeyDown}
            >
                {target && possibleMentions.length > 0 && (
                    <Portal>
                        <div
                            ref={ref as any}
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
                            {possibleMentions.map((name, i) => (
                                <div
                                    key={name}
                                    onClick={() => {
                                        Transforms.select(editor, target)
                                        const mention = getMentionFromName(name)
                                        if (mention) {
                                            insertMention(editor, mention)
                                        }
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
                                    {name}
                                </div>
                            ))}
                        </div>
                    </Portal>
                )}
            </SlateComment>
            <Button
                className="sr-only"
                onClick={() => onSubmit()}
            >
                Submit
            </Button>
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

const insertMention = (editor: any, mention: MentionSchema) => {
    const mentionElement: MentionElement = {
        type: 'mention',
        mention,
        children: [{ text: '' }],
    }
    Transforms.insertNodes(editor, mentionElement)
    Transforms.move(editor)
}