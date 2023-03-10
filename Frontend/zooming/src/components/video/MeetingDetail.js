import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Header from '../layout/Header';


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

    const [meetinglink, setMeetingLink] = useState({})
    const token = localStorage.getItem("authTokens");
    const Token = JSON.parse(token);

    const fetchData = () => {
        fetch('http://127.0.0.1:8000/meetlink',{ 
            headers: new Headers({
            'Authorization': 'Bearer ' + Token.access, 
            'Content-Type': 'application/x-www-form-urlencoded'
        })},)
        .then(Response => {
            return Response.json()
        })
        .then(data => {
                setMeetingLink(data)
            })
        }

    useEffect(() => {
        fetchData()
    }, [])

    
    

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
                                <h6>{meetinglink.topic}</h6> 
                                <h6>{meetinglink.start_time}</h6>
                                <h6>{meetinglink.meeting_id}</h6>
                                <h6>{meetinglink.passcode}</h6>
                                <h6>{meetinglink.url}</h6> 
                            </div>  
                           
                        </div>
                        <div>
                            <Button onClick={() => navigator.clipboard.writeText(meetinglink.meeting_id + "\n" + meetinglink.passcode + "\n" + meetinglink.url)}>Copy Invite</Button>
                        </div>
                    </div>
                </div>
            </div>
          
        </section>
    )
        
};

MeetingDetail.propTypes = propTypes;
MeetingDetail.defaultProps = defaultProps;
export default MeetingDetail;