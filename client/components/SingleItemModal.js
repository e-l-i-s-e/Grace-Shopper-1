import React from 'react';
import Button from '@material-ui/core/Button';

import Buttons from './buttons'
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SingleProduct from './singleProduct';
import SelectedProduct from './selectedProduct'

export default class SingleItemModal extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    console.log('props', this.props)

    return (
      <div>
        <Button id="quickView" onClick={this.handleClickOpen}

        >
          View
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          {/* <DialogTitle id="form-dialog-title">{`Scent: ${this.props.orderProduct.title}`}</DialogTitle> */}
          <DialogContent >
            {/* <DialogContentText>
              is under construction!
            </DialogContentText> */}
            <SelectedProduct productId={this.props.orderProduct.id} />
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            /> */}
          </DialogContent>
          <DialogActions style={{justifyContent: 'center'}}>
            <div className='productbtn'>
              <Buttons
                product={this.props.product}
                orderProduct={this.props.orderProduct}
                handleChange={this.props.handleChange}
              />
              &nbsp;
            <Button bsStyle="default"
                type='submit' name={
                  this.props.orderProduct &&
                  this.props.orderProduct.id} onClick=
                  {

                    this.props.handleSubmit}>
                Add To Cart</Button>
            </div>
            {/* <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button> */}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

