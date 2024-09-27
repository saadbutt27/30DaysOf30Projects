"use client"
import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FilePenIcon, TrashIcon } from "lucide-react"

type Note = {
    id: number,
    title: string,
    content: string,
}

const defaultNotes: Note[] = [
    {
        id: 1,
        title: "Grocery List",
        content: "Milk, Eggs, Bread, Apples",
    },
    {
        id: 2,
        title: "Meeting Notes",
        content: "Discuss new project timeline, assign tasks to team",
    },
    {
        id: 3,
        title: "Idea for App",
        content: "Develop a note-taking app with a clean and minimalist design",
    },
]

function useLocalStorage<T>(key: string, initialValue: T) {
    const [storedValue, setStoredValue] = useState<T>(initialValue)

    useEffect(() => {
        if (typeof window !== "undefined") {
            try {
                const item = window.localStorage.getItem(key)
                if (item) {
                    setStoredValue(JSON.parse(key))
                }
            } catch (error) {
                console.error(error)
            }
        }
    }, [key])

    const setValue = (value: T | ((val: T) => T)) => {
        try {
            const valuetoStore = 
                value instanceof Function ? value(storedValue) :  value

            setStoredValue(valuetoStore)
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valuetoStore))
            }
        } catch (error) {
            console.error(error)
        }
    }

    return [storedValue, setValue] as const
}


export default function Notes() {
    const [notes, setNotes] = useLocalStorage<Note[]>("notes", defaultNotes)
    const [newNote, setNewNote] = useState<{
        title: string,
        content: string,
    }>({
        title: "",
        content: "",
    })
    const [editingNoteId, setEditingNoteId] = useState<number | null>(null)
    const [isMounted, setIsMounted] = useState<boolean>(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const handleAddNote = (): void => {
        if (newNote.title.trim() && newNote.content.trim()) {
            const newNoteWithId = {id: Date.now(), ...newNote}
            setNotes([...notes, newNoteWithId])
            setNewNote({ title: "", content: "" })
        }
    }

    const handleEditNote = (id: number): void => {
        const noteToEdit = notes.find((note) => note.id === id)
        if (noteToEdit) {
            setNewNote({ title: noteToEdit.title, content: noteToEdit.content })
            setEditingNoteId(id)
        }
    }

    const handleUpdateNote = (): void => {
        if (newNote.title.trim() && newNote.content.trim()) {
            setNotes(
                notes.map((note) => 
                    note.id === editingNoteId
                    ?   { id: note.id, title: newNote.title, content: newNote.content }
                    :   note
                )
            )
            setNewNote({ title: "", content: "" })
            setEditingNoteId(null)
        }
    }

    const handleDeleteNote = (id: number): void => {
        setNotes(notes.filter((note) => note.id !== id))
        // window.localStorage.removeItem(id.toString())
    }

    if (!isMounted) {
        return null
    }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
        <header className="bg-muted p-4 shadow">
            <h1 className="text-2xl font-bold">Note Taker</h1>
        </header>
        <main className="flex-1 overflow-auto p-4">
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Title"
                    value={newNote.title || ""}
                    onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                    className="w-full rounded-md border border-input bg-background p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <textarea 
                    placeholder="Content"
                    value={newNote.content || ""}
                    onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                    className="mt-2 w-full rounded-md border border-input bg-background p-2 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    id=""
                />
                {editingNoteId === null ? 
                    <Button onClick={handleAddNote} className="mt-2">
                        Add Note
                    </Button>
                :
                    <Button onClick={handleUpdateNote} className="mt-2">
                        Update Note
                    </Button>
                }
            </div>
            <div className="grid gap-4">
                {notes.map((note) => (
                    <Card key={note.id} className="p-4">
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-medium">{note.title}</h2>
                            <div className="flex gap-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleEditNote(note.id)}
                                >
                                    <FilePenIcon className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteNote(note.id)}
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="mt-2 text-muted-foreground">{note.content}</p>
                    </Card>
                ))}
            </div>
        </main>
    </div>
  )
}
