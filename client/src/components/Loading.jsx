import ClipLoader from 'react-spinners/ClipLoader';

function Loading({ loading = true }) {
    return (
        <div
            className="container-flex d-flex justify-content-center align-items-center"
            style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
            }}
        >
            <ClipLoader color="rgb(43, 48, 53)" loading={loading} />
        </div>
    );
}

export default Loading;
