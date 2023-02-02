import React, { useContext,useState} from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import AuthContext from '../../login/AuthContext';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
// import TimezoneSelect, { allTimezones } from 'react-timezone-select';
// import spacetime from "spacetime";

const propTypes = {
    ...SectionTilesProps.types
  }
  
  const defaultProps = {
    ...SectionTilesProps.defaults
  }
  
  const CreateMeeting = ({
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
  
    // const [selectedTimezone, setSelectedTimezone] = useState({})
    const [topic, setTopic] = useState("");
   
    const [start_time, setDate] = useState("");
   
    const [duration, setDuration] = useState("");
    
    const { CreateMeeting } = useContext(AuthContext);
    const token = localStorage.getItem("authTokens");

    const handleSubmit = async e => {
      e.preventDefault();
      CreateMeeting( topic, start_time, duration );
    };

    // const [tz, setTz] = useState(
    //     Intl.DateTimeFormat().resolvedOptions().timeZone
    // );
    // const [datetime, setDatetime] = useState(spacetime.now());

    // useMemo(() => {
    //     const tzValue = tz.value ?? tz;
    //     setDatetime(datetime.goto(tzValue));
    //     }, [tz]);
    return (
        <section
            {...props}
            className={outerClasses}
        >
        <Header />
        <div className="container">
        <div className={innerClasses}>
        <div>
        <h3>Schedule Meetings</h3>
        { token ?
        <div className='meetingForm'>
        <Form style={{textAlign:"left"}} onSubmit={handleSubmit}>
            <FormGroup>
                <div>
                <Label>Topic</Label>
                <Input
                    type="text"
                    name="topic"
                    id="topic"
                    placeholder='topic'
                    onChange={e => setTopic(e.target.value)}
                    required
                />&nbsp;
                </div>
                <div>
                <Label>When</Label>
                
                <Input
                    type="date"
                    name="start_time"
                    id="start_time"
                    placeholder='date'
                    onChange={e => setDate(e.target.value)}
                    required
                />&nbsp;
                <Input
                    type="time"
                    name="start_time"
                    id="start_time"
                    placeholder='date'
                    onChange={e => setDate(e.target.value)}
                    required
                />&nbsp; &nbsp;<br />
                    <select>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                &nbsp;
                <Label>Duration</Label>
                <Input
                        type="minutes"
                        name="time"
                        id="time"
                        placeholder='duration'
                        onChange={e => setDuration(e.target.value)}
                        required
                />&nbsp;  
                <Label>TimeZone</Label>
                
                <br />
                <Button type='submit'>Save</Button>&nbsp;&nbsp;&nbsp;
                <Button type='submit'>Cancel</Button>
            </FormGroup>
        </Form>
        </div>
        :
            <h4>Please Login</h4>
    }
      </div> 
      </div>
      </div> 
    <Footer/>
    </section>
    )
    
}
CreateMeeting.propTypes = propTypes;
CreateMeeting.defaultProps = defaultProps;

export default CreateMeeting;