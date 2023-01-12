import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import JoinMeetModal from '../pages/JoinMeetModal';
// import Zooming from './Zooming';

class ZoomingModal extends Component {
    state = {
        modal: false
      };
    
      toggle = () => {
        this.setState(zoom => ({
          modal: !zoom.modal
        }));
      };

      
    render() {
        var title = "joining";

        const joining = this.props.join
        var button = <Button onClick={this.toggle} type="submit"  color="primary">Join</Button>;
        if (joining) {
            title = "Joining Meet";
      
            button = (
                <Button onClick={this.toogle} type="submit"  color="primary">Join</Button>
            );
          }
        return (
            <Fragment> 
                {button}
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                    <ModalBody>
                    <JoinMeetModal
                        toggle={this.toggle}
                    />
                    
                    </ModalBody>

                </Modal>
            </Fragment>
        )
    }
}

export default ZoomingModal;