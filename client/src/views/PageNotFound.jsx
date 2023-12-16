import React from 'react';
import { Typography, Button } from '@mui/material';
import useData from '../hooks/useData';
import { useNavigate } from 'react-router-dom';

function NotFoundImage() {
    const { nav } = useData();
    const navigate = useNavigate();

    return (
        <div
            className="container-flex d-flex align-items-center justify-content-center"
            style={{
                height: '100%',
                overflow: 'hidden',
                position: 'absolute',
            }}
        >
            <div className="row">
                <div className="col-xs-12 col-sm-5 col-md-5 offset-md-1 d-flex flex-column justify-content-center align-items-center">
                    <embed
                        className="desktop-404"
                        src="/src/assets/notfound.svg"
                        alt="Image"
                        style={{ width: '70%' }}
                    ></embed>
                </div>
                <div className="col-xs-12 col-sm-5 col-md-5 d-flex flex-column justify-content-center">
                    <div className="row">
                        <Typography
                            variant="h3"
                            className="title-404 fw-bold mb-3"
                        >
                            Something is not right...
                        </Typography>
                    </div>
                    <div className="row">
                        <Typography
                            variant="h6"
                            className="text-404 mb-4"
                            color="rgb(85, 85, 85)"
                        >
                            Page you are trying to open does not exist. You may
                            have mistyped the address, or you may not have the
                            required permissions to access this page.
                        </Typography>
                    </div>
                    <div className="row align-self-start">
                        <Button
                            variant="outlined"
                            size="large"
                            className="control-404 ms-2"
                            onClick={() => navigate(nav.home)}
                        >
                            Get back to home page
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotFoundImage;
