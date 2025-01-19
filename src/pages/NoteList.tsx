import { useMemo, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link } from "react-router-dom";
import ReactSelect from "react-select"
import { NoteListProps, Tag } from "../types/Types";
import {EditTagsModal, NoteCard} from "../components";


const NoteList = ({availableTags, notes, onUpdateTag, onDeleteTag}: NoteListProps) => {
    const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState("");
    const [tagsModalOpen, setTagsModalOpen] = useState(false);

    const filteredNotes = useMemo(()=> {
        return notes.filter(note => {
            return (
                (title === '' || 
                    note.title.toLowerCase().includes(title.toLowerCase())) &&
                (selectedTags.length === 0 || 
                    selectedTags.every(tag => 
                        note.tags.some(noteTag => noteTag.id === tag.id)
                    ))
            )
        })
    },[title, selectedTags, notes])

    const selectedTagsValues = selectedTags.map(tag=> {
        return {label: tag.label, value: tag.id};
    });

    return (
    <>
      <Row className = "align-items-center mb-4">
        <Col><h1>Notes</h1></Col>
        <Col xs='auto'>
            <Stack direction='horizontal' className="stack" gap={2}>
                <Link to='/new'>
                    <Button variant="success">Create</Button>
                </Link>
                <Button variant="outline-secondary" onClick={() => setTagsModalOpen(true)}>Edit Tags</Button>
            </Stack>
        </Col>
      </Row>
      <Form>
        <Row className="mb-4">
            <Col>
                <Form.Group controlId="title">
                    <Form.Label> Search By Title </Form.Label>
                    <Form.Control 
                        type="text" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="tags">
                    <Form.Label>Filter By Tags</Form.Label>
                        <ReactSelect 
                            value = {selectedTagsValues} 
                            options = {availableTags.map(tag => {
                            return {label: tag.label, value: tag.id}
                            })}
                            onChange={tags => {
                            setSelectedTags(tags.map(tag=>{
                                return {label: tag.label, id: tag.value}
                            }))
                            }}
                        isMulti />
                </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3"> 
        {filteredNotes.map(note => (
            <Col key={note.id}>
                <NoteCard id={note.id} title={note.title} tags={note.tags}/>
            </Col>
        ))}
      </Row>
      <EditTagsModal tags={availableTags} handleClose={()=> {
        setTagsModalOpen(false)}} show={tagsModalOpen} onUpdateTag={onUpdateTag} onDeleteTag={onDeleteTag}/>
    </>
  )
}

export default NoteList