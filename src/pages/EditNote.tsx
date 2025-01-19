import {NoteForm} from "../components"
import {EditNoteProps} from "../types/Types"
import { useNote } from "./NoteLayout";

const EditNote = ({onSubmit, onAddTag, availableTags}: EditNoteProps) => {
  const note = useNote();
  return (
    <>
        <h1 className="mb-4">
            Edit Note
        </h1>
        <NoteForm 
          title={note.title}
          markdown={note.markdown}
          tags = {note.tags}
          onSubmit={data => onSubmit(note.id, data)} 
          onAddTag={onAddTag} 
          availableTags={availableTags}
        />
    </>
  )
}

export default EditNote