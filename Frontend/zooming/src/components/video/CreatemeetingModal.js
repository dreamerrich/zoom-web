import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import CreateMeeting from './CreateMeetings';
import { AuthProvider } from '../../login/AuthContext';

class CreateMeetingModal extends Component {
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

        const signup = this.props.join
        var button = <Link onClick={this.toggle}>CreateMeeting </Link>;
        if (signup) {
            title = "Create Meeting";
      
            button = (
              <Link
                className="float-center"
                onClick={this.toggle}
              >
                Create Meeting
              </Link>
            );
          }
        return (
            <Fragment> 
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                    <AuthProvider>
                    <CreateMeeting
                        toggle={this.toggle}
                    />
                    </AuthProvider>
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

export default CreateMeetingModal;