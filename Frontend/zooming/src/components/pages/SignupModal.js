import React, { Component, Fragment } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Signup from './Signup';
import { Link } from 'react-router-dom';

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
        var button = <Link color="light" onClick={this.toggle}>Sign Up </Link>;
        if (signin) {
            title = "Sign up";
      
            button = (
                <Link
                color="light"
                className="button button-light button-wide-mobile button-sm"
                onClick={this.toggle}
                
                href=""
              >
                Sign Up
              </Link>
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