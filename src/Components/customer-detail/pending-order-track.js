import React,{ useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Pending from './images/pending.svg';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 600,
    backgroundColor: theme.palette.background.paper,
    padding: "54px 84px 70px",
    borderRadius:30,
    left: "50%",
    top: "50%",
     transform: "translate(-50%,-50%)",
     textAlign:"center",
  },
  [theme.breakpoints.down('sm')]: {
    paper: {
    width:320,
    padding:"35px 20px 50px",
    
    }
  },

}));

export default function TransitionsModal() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

  const body = (
    <section className="pending-order">
        <div  className={classes.paper}>
            <div id="simple-modal-title">
                <div className="container">
                    <label className="pending-order-num">Your Order ID: 28109</label>
                </div>
            </div>
            <div className="pending-track-body" id="simple-modal-description">
                <h4>Pending...</h4>
               <img src={Pending} alt="Pending-track-image" className="pending-img"/> 
                <p>Your order has been placed. we will contact you soon for confirmation.</p>
                    
                </div>
                <a href="#" className="track-btn"> Track your Appointment</a>
            
            
        </div>
    </section>
  );

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Pending track
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
