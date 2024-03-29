import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert';
import {makeStyles, Theme} from '@material-ui/core/styles';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// const useStyles = makeStyles((theme: Theme) => ({
//     root: {
//         width: '100%',
//         '& > * + *': {
//             marginTop: theme.spacing(2),
//         },
//     },
// }));

export function snackBarSuccess() {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={1000}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "top",
                horizontal: "right"
            }}
        >
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    );
}

export function snackBarWarning() {
    const [open, setOpen] = React.useState(true);

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                This is a success message!
            </Alert>
        </Snackbar>
    );
}