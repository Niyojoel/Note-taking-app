import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note, NoteLayoutProps } from "../types/Types"

const NoteLayout = ({notes}: NoteLayoutProps) => {

  const {id} = useParams()
  const note = notes.find(note => note.id === id)

  if (note == null) return <Navigate to='/' replace/>
  return (
    <Outlet context={note}/>
  )
}

export function useNote() {
  return useOutletContext<Note>();
}
export default NoteLayout