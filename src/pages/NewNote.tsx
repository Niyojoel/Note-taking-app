import {NoteForm} from "../components"
import {NoteFormProps} from "../types/Types"

const NewNote = ({onSubmit, onAddTag, availableTags}: NoteFormProps) => {
  return (
    <>
        <h1 className="mb-4">
            New Note
        </h1>
        <NoteForm onSubmit={onSubmit} onAddTag={onAddTag} availableTags={availableTags}/>
    </>
  )
}

export default NewNote