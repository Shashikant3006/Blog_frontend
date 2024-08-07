import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from "./Actions";
import moment from "moment";
import { AuthContext } from '../App';

export default function PostCard(props) {
  const { user, _id, title, content, image, createdOn } = props.post;
  const { auth } = React.useContext(AuthContext);

  return (
    <Card sx={{ width: "100%", borderRadius: "10px" }} id={_id} elevation={15}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.name.slice(0, 1)}
          </Avatar>
        }
        action={
          auth._id === user._id && <Actions id={_id} />
        }
        title={
          <Typography variant="h6" color="text.primary">
            {user.name}
          </Typography>
        }
        subheader={
          <div>
            <Typography variant="body1" color="text.primary">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {moment(createdOn).fromNow()}
            </Typography>
          </div>
        }
      />
      <CardMedia
        component="img"
        height="100%"
        image={image}
        alt={user.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
    </Card>
  );
}

