import * as Dialog from '@radix-ui/react-dialog'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'
import { useState } from 'react'

interface NoteCardProps {
  note: {
      id: string
      date: Date
      content: string
  }
  onNoteDeleted: (id: string) => void
  onNoteUpdated: (id: string, updatedContent: string) => void
}

export function NoteCard({ note, onNoteDeleted, onNoteUpdated }: NoteCardProps) {
    const [isEditing, setIsEditing] = useState(false)
    const [editedContent, setEditedContent] = useState(note.content)

    function handleSaveEdit() {
        if (editedContent.trim() === '') return
        onNoteUpdated(note.id, editedContent)
        setIsEditing(false)
    }

    return (
        <Dialog.Root>
            <Dialog.DialogTrigger className="rounded-md text-left flex flex-col bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 outline-none">
                <span className="text-sm font-medium text-slate-200">
                    {formatDistanceToNow(new Date(note.date), { locale: ptBR, addSuffix: true })}
                </span>
                <p className="text-sm leading-6 text-slate-400 whitespace-pre-line">{note.content}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none" />
            </Dialog.DialogTrigger>

            <Dialog.Portal>
                <Dialog.Overlay className="inset-0 fixed bg-black/50" />
                <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
                    <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
                        <X className="size-5" />
                    </Dialog.Close>
                    <div className="flex flex-1 flex-col gap-3 p-5">
                        <span className="text-sm font-medium text-slate-300">
                            {formatDistanceToNow(new Date(note.date), { locale: ptBR, addSuffix: true })}
                        </span>

                        {isEditing ? (
                            <textarea
                                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                                value={editedContent}
                                onChange={(e) => setEditedContent(e.target.value)}
                            />
                        ) : (
                            <p className="text-sm leading-6 text-slate-400 whitespace-pre-line">
                                {note.content}
                            </p>
                        )}
                    </div>

                    {isEditing ? (
                        <button
                            type="button"
                            className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
                            onClick={handleSaveEdit}
                        >
                            Salvar alterações
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
                            onClick={() => setIsEditing(true)}
                        >
                            Deseja <span className="text-blue-400 group-hover:underline">editar essa nota</span>?
                        </button>
                    )}

                    <button
                        type="button"
                        className="w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none font-medium group"
                        onClick={() => onNoteDeleted(note.id)}
                    >
                        Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
                    </button>
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    )
}
