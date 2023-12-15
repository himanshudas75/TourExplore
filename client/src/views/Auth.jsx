import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import { Outlet } from 'react-router-dom';

function Auth() {
    return (
        <div className="container justify-content-center align-items-center mt-5 mb-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 col-xl-4 offset-xl-4">
                    <Card elevation={10}>
                        <CardMedia
                            image="/src/assets/login-image.jpg"
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
