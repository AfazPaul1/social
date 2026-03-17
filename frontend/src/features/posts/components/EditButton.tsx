import { useNavigate } from '@tanstack/react-router'
import { Button, CardActions,} from "@mui/material";

export default function EditButton({postId}: {postId:string}) {
  const navigate = useNavigate()
  return <CardActions>
            <Button  onClick={() => navigate({
              to:'/authenticatedRoute/editPost/$postId',
              params: {postId},
              search:{mode:"edit"}
            })}>Edit</Button>
        </CardActions>
}