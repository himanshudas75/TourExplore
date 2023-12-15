import { useFormikContext } from 'formik';
import { MuiFileInput } from 'mui-file-input';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';

const FileInput = ({
    field = 'file',
    value = null,
    placeholder = 'Add file',
    multiple = 'false',
    size = 'normal',
    fullWidth = false,
    helperText = '',
    error = false,
}) => {
    const { setFieldValue } = useFormikContext();

    // console.log(err, helperText);

    const handleFileChange = (files) => {
        // console.log('Value change');
        // console.log(files);
        // console.log(err, helperText);
        setFieldValue(field, files);
    };

    return (
        <MuiFileInput
            placeholder={placeholder}
            clearIconButtonProps={{
                children: <CloseIcon fontSize="small" />,
            }}
            InputProps={{
                startAdornment: <AttachFileIcon />,
            }}
            variant="outlined"
            value={value}
            multiple={multiple}
            fullWidth={fullWidth}
            size={size}
            onChange={handleFileChange}
            helperText={helperText}
            error={error}
        />
    );
};

export default FileInput;
