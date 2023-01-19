import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import Signup from './Signup';

class SignInModal extends Component {
    state = {
        modal: false
      };
    
      toggle = () => {
        this.setState(previous => ({
          modal: !previous.modal
        }));
      };
    render() {
        var title = "Sign Up";

        const signin = this.props.join
        var button = <Button color="light" onClick={this.toggle}>Sign Up </Button>;
        if (signin) {
            title = "Sign Up";
      
            button = (
              <Button
                color="light"
                className="float-center"
                onClick={this.toggle}
              >
                Sign Up
              </Button>
            );
          }
        return (
            <Fragment> 
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                    <Signup
                        toggle={this.toggle}
                    />
                    
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

export default SignInModal;