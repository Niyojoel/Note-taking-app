import { FormEvent, useRef, useState } from "react"
import { Button, Col, Form, Row, Stack } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import CreatableReactSelect from "react-select/creatable"
import { NoteFormProps, Tag } from "../types/Types";
import { v4 as uuidv4 } from "uuid";


const NoteForm = ({onSubmit, onAddTag, availableTags, title = "", markdown = "", tags = [], }: NoteFormProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent)=> {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags
    });

    navigate("...") 
  }

  const selectedTagsValues = selectedTags.map(tag=> {
    return {label: tag.label, value: tag.id};
  });

  return (
    <Form onSubmit={handleSubmit}>
      <Stack className="stack vertical" gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} defaultValue={title} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect 
                value = {selectedTagsValues} 
                options = {availableTags.map(tag => {
                  return {label: tag.label, value: tag.id}
                })}
                onChange={tags => {
                  setSelectedTags(tags.map(tag=>{
                    return {label: tag.label, id: tag.value}
                  }))
                }}
                onCreateOption={label => {
                  const newTag = {id: uuidv4(), label};
                  onAddTag(newTag);
                  setSelectedTags(prev => [...prev, newTag]);
                }}
              isMulti />
            </Form.Group>
          </Col>
        </Row>
         <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control 
            ref={markdownRef} 
            defaultValue={markdown} 
            as='textarea' 
            rows={15} 
            required 
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="stack justify-content-end">
          <Button type="submit" variant="success">Save</Button>
          <Link to='...'>
            <Button type="button" variant="outline-secondary">Cancel</Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  )
}

export default NoteForm