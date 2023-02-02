import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';

const propTypes = {
    ...SectionTilesProps.types
  }
  
  const defaultProps = {
    ...SectionTilesProps.defaults
  }
  
  const MeetingDetail = ({
    className,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
  }) => {
  
    const outerClasses = classNames(
      'testimonial section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );
  
    const innerClasses = classNames(
      'testimonial-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    return (
        <section
            {...props}
            className={outerClasses}
        >
            <Header />
            <div className="container">
                <div className={innerClasses}>
                    <div>
                        <h3>Details</h3>
                        <div className='meetingDetail'>
                            <div className='row-head'>
                                <h6>Topic</h6>
                                <h6>Time</h6>
                                <h6>Meeting ID</h6>
                                <h6>Security</h6>
                                <h6>Invite Link</h6>
                            </div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <div className='row-data'>
                                <h6>metting topic</h6> 
                                <h6>meeting time</h6>
                                <h6>meeting id</h6>
                                <h6>passcode</h6>
                                <h6>link</h6> 
                            </div>  
                        </div>
                        <div>
                            <Button type="submit">Start</Button> &nbsp;&nbsp;&nbsp;
                            <Button>Copy Invite</Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
        
};

MeetingDetail.propTypes = propTypes;
MeetingDetail.defaultProps = defaultProps;
export default MeetingDetail;