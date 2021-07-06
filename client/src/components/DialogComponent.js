import React from 'react'
import { useEffect } from 'react';
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

const DialogComponent = ({ dialogText, dialogTitle, openOnRender, handleClickBehavior, handleClickYes, handleClickNo, yesNo, numberOfCall}) => {
    /* utile */
    const [open, setOpen] = React.useState(openOnRender);

    useEffect(() => {
        if(numberOfCall > 0){
            handleClickOpen()
        }
    }, [numberOfCall])// eslint-disable-line react-hooks/exhaustive-deps

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleYes = () => {
        setOpen(false)
        handleClickYes()
    }

    const handleNo = () => {
        setOpen(false)
        handleClickNo()
    }

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
                {yesNo ? <div><Button onClick={handleYes} color="primary">Oui</Button><Button onClick={handleNo} color="primary">Non</Button></div> : <Button onClick={handleClose} color="primary">Ok</Button>}
                
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default DialogComponent
