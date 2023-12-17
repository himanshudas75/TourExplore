import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import useData from '../hooks/useData.js';

function TourspotCardHorizontal({ tourspot }) {
    const { nav } = useData();
    const navigate = useNavigate();

    return (
        <Card elevation={3} className="mb-3">
            <div className="row">
                <div className="col-md-4">
                    <CardMedia
                        image={
                            tourspot.images.length !== 0
                                ? tourspot.images[0].url
                                : '/src/assets/no-image.png'
                        }
                        title="Tourspot Image"
                        component="img"
                        className="img-fluid"
                    />
                </div>
                <div className="col-md-8">
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {tourspot.title}
                        </Typography>
                        <Typography component="p" className="mb-1">
                            {tourspot.description}
                        </Typography>
                        <Typography variant="body2" className="mb-3">
                            By <strong>{tourspot.author.username}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {tourspot.location}
                        </Typography>
                    </CardContent>
                    <CardActions className="ms-1">
                        <Button
                            variant="text"
                            size="small"
                            onClick={() =>
                                navigate(`${nav.index}/${tourspot._id}`)
                            }
                        >
                            View Tourist Spot
                        </Button>
                    </CardActions>
                </div>
            </div>
        </Card>
    );
}

export default TourspotCardHorizontal;
