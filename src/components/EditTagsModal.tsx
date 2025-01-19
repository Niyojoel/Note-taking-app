import { Button, Col, Form, Modal, Row, Stack } from 'react-bootstrap'
import { EditTagsModalProps } from '../types/Types'

const EditTagsModal = ({tags, handleClose, show, onUpdateTag, onDeleteTag}: EditTagsModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}> 
        <Modal.Header closeButton>
            <Modal.Title>Edit Tags</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Stack className='stack vertical' gap={2}>
                    {tags.map(tag => (
                        <Row key={tag.id}>
                            <Col>
                                <Form.Control type='text' value={tag.label} onChange={(e)=> onUpdateTag(tag.id, e.target.value)}>

                                </Form.Control>
                            </Col>
                            <Col xs='auto'>
                                <Button variant='outline-danger' onClick={() => onDeleteTag(tag.id)}>
                                    &times;
                                </Button>
                            </Col>
                        </Row>
                    ))}
                </Stack>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default EditTagsModal