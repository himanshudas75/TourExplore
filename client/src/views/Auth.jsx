import { Card, CardContent, CardMedia } from '@mui/material';

import { Outlet } from 'react-router-dom';

function Auth() {
    return (
        <div className="container justify-content-center align-items-center mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <Card elevation={10}>
                        <CardMedia
                            image="/login-image.jpg"
                            title="login image"
                            component="img"
                        />
                        <CardContent>
                            <Outlet />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default Auth;
