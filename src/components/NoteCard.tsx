import { Badge, Card, Stack } from "react-bootstrap"
import { NoteCardProps } from "../types/Types"
import { Link } from "react-router-dom"
import styles from '../styles/card.module.css'

const NoteCard = ({id, title, tags}: NoteCardProps) => {
  return (
    <Card 
    as={Link} 
    to={`/${id}`}
    className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
    <Card.Body>
        <Stack className="stack vertical align-items-center justify-content-center" gap={2}>
            <span className="fs-5">{title}</span>
            {tags.length > 0 && (
                <Stack direction='horizontal' gap={1} className="stack justify-content-center flex-wrap">
                    {tags.map(tag=> (
                    <Badge className="text-truncate" bg='success' key={tag.id}> {tag.label} </Badge>
                    ))}
                </Stack>
            )}
        </Stack>
    </Card.Body>
    </Card>
  )
}

export default NoteCard