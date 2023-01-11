import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import SignIn from './SignIn';

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
        var title = "Sign In";

        const signin = this.props.join
        var button = <Button color="light" onClick={this.toggle}>Sign In </Button>;
        if (signin) {
            title = "Sign up";
      
            button = (
              <Button
                color="light"
                className="float-center"
                onClick={this.toggle}
                
                href=""
              >
                Sign In
              </Button>
            );
          }
        return (
            <Fragment> 
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                    <SignIn
                        toggle={this.toggle}
                    />
                    
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

export default SignInModal;