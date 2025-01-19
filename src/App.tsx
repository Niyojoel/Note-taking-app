import {Container} from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom"
import {useLocalStorage} from "./utils/useLocalStorage"
import { NoteData, RawNote, Tag } from "./types/Types"
import { useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import {EditNote, NewNote, NoteList, NoteLayout, Note} from "./pages";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const noteswithTags = useMemo(()=> {
    return notes.map(note => {
      return {...note, tags:  tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags]);

  function onCreateNote ({tags, ...data}: NoteData){
    setNotes(prevNotes=> {
      return [...prevNotes, {...data, id: uuidv4(), tagIds: tags.map(tag=> tag.id)}]
    })
  }

  function onUpdateNote (id: string, {tags, ...data}: NoteData){
    setNotes(prevNotes=> {
      return prevNotes.map(note => {
        if(note.id === id) {
          return {...note, ...data, tagIds: tags.map(tag=> tag.id)}
        }
        return note;
      })
    })
  }

  function onDeleteNote (id: string){
    setNotes(prevNotes=> {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  function addTag (tag: Tag) {
    setTags(prev=> [...prev, tag]);
  }

  function updateTag (id:string, label:string) {
    setTags(prevTags=> {
      return prevTags.map(tag => {
        if(tag.id === id) {
          return {...tag, label}
        }
        return tag;
      })
    })
  }

  function deleteTag (id: string) {
    setTags(prevTags=> {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <Container className="my-4">
      <Routes>
        <Route path='/' element={
          <NoteList 
            availableTags={tags} 
            notes={noteswithTags}
            onUpdateTag={updateTag}
            onDeleteTag={deleteTag}
          />} 
        />
        <Route path='/new' element={
          <NewNote 
            onSubmit={onCreateNote} 
            onAddTag = {addTag} 
            availableTags={tags}
          />} 
        />
        <Route path='/:id' element={<NoteLayout notes={noteswithTags}/>}>
          <Route index element={<Note onDelete={onDeleteNote}/>} />
          <Route path="edit" element={
            <EditNote 
              onSubmit={onUpdateNote} 
              onAddTag = {addTag} 
              availableTags={tags}
            />} 
          />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Container>
  )
}

export default App
