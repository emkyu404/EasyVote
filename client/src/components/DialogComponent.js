import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogComponent = ({ dialogText, dialogTitle, openOnRender, handleClickBehavior, yesNo }) => {
    /* utile */
    const [open, setOpen] = React.useState(openOnRender);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        handleClickBehavior()
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {dialogText}
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                {yesNo ? <div><Button onClick={handleClose} color="primary">Oui</Button><Button onClick={handleClose} color="primary">Non</Button></div> : <Button onClick={handleClose} color="primary">Ok</Button>}
                
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogComponent
