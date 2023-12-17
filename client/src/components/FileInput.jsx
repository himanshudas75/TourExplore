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
    disabled = false,
}) => {
    const { setFieldValue } = useFormikContext();

    const handleFileChange = (files) => {
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
            disabled={disabled}
        />
    );
};

export default FileInput;
