import { Checkbox } from '@mui/material';

import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';
import useToggle from '../hooks/useToggle';

function PersistLoginCheckbox() {
    const [persist, togglePersist] = useToggle('persist', false);

    return (
        <FormGroup>
            <FormControlLabel
                control={
                    <Checkbox
                        name="persistLogin"
                        id="persistLogin"
                        onChange={togglePersist}
                        checked={persist}
                        size="small"
                    />
                }
                label={<span>Remember Me?</span>}
            />
        </FormGroup>
    );
}

export default PersistLoginCheckbox;
