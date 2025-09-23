import React, { useEffect, useState } from 'react'
import { marked } from 'marked'
import { getAllNotes, saveNote, deleteNote } from './idb'

function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 9)
}

export default function App() {
  const [notes, setNotes] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    load()
  }, [])

  async function load() {
    const all = await getAllNotes()
    setNotes(all.sort((a,b)=>b.updated - a.updated))
    if (all.length) {
      setActiveId(all[0].id)
      setTitle(all[0].title)
      setContent(all[0].content)
    }
  }

  async function create() {
    const n = { id: uid(), title: 'Ghi chú mới', content: '', created: Date.now(), updated: Date.now() }
    await saveNote(n)
    await load()
    setActiveId(n.id)
    setTitle(n.title)
    setContent(n.content)
  }

  async function save() {
    if (!activeId) return
    const n = { id: activeId, title: title || 'Untitled', content, updated: Date.now() }
    await saveNote(n)
    await load()
  }

  async function del(id) {
    if (!confirm('Xác nhận xóa note?')) return
    await deleteNote(id)
    if (id === activeId) {
      setActiveId(null)
      setTitle('')
      setContent('')
    }
    await load()
  }

  function openNote(n) {
    setActiveId(n.id)
    setTitle(n.title)
    setContent(n.content)
  }

  return (
    <div className="app">
      <header>
        <h1>Notes App</h1>
        <div className="actions">
          <button onClick={create}>+ New</button>
          <button onClick={save} disabled={!activeId}>Save</button>
        </div>
      </header>
      <div className="container">
        <aside className="sidebar">
          {notes.map(n => (
            <div key={n.id} className={`note-item ${n.id===activeId? 'active':''}`} onClick={()=>openNote(n)}>
              <div className="note-title">{n.title || 'Untitled'}</div>
              <div className="note-time">{new Date(n.updated).toLocaleString()}</div>
              <button className="del" onClick={(e)=>{e.stopPropagation(); del(n.id)}}>x</button>
            </div>
          ))}
        </aside>

        <main className="editor">
          {activeId ? (
            <>
              <input className="title-input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Tiêu đề" />
              <div className="split">
                <textarea className="md-input" value={content} onChange={e=>setContent(e.target.value)} placeholder="Viết Markdown..." />
                <div className="preview" dangerouslySetInnerHTML={{__html: marked.parse(content || '')}} />
              </div>
            </>
          ) : (
            <div className="empty">Chọn hoặc tạo note mới</div>
          )}
        </main>
      </div>

      <footer>Offline-ready • Lưu bằng IndexedDB • Markdown basic</footer>
    </div>
  )
}