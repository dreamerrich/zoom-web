import React, { Component, Fragment } from 'react';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import SignIn from './SignIn';
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
        var title = "Sign In";

        const signin = this.props.join
        var button = <Link className="button button-light button-wide-mobile button-sm" onClick={this.toggle}>Sign In</Link>;
        if (signin) {
            title = "Sign up";
      
            button = (
                <Link className="button button-light button-wide-mobile button-sm" onClick={this.toggle}>Sign In</Link>
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
           