import React, { useContext,useState} from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import AuthContext from '../../login/AuthContext';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import timezones from '../../data/timezones.json'


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

    const [timezone, setTimeZone] = useState("");
   
    const [duration, setDuration] = useState("");
    
    const { CreateMeeting } = useContext(AuthContext);
    const token = localStorage.getItem("authTokens");

    const handleSubmit = async e => {
      e.preventDefault();
      CreateMeeting( topic, start_time, duration, timezone );
    };

    
    
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

                <div className='topic'>
                  <Label>Topic</Label> &nbsp; &nbsp; &nbsp;
                  <Input
                      type="text"
                      name="topic"
                      id="topic"
                      placeholder='topic'
                      onChange={e => setTopic(e.target.value)}
                      required
                  />&nbsp;
                </div><br />

                <div className='when'>
                  <Label>When</Label> &nbsp; &nbsp; &nbsp;
                  <Input
                      type="datetime-local"
                      name="start_time"
                      id="start_time"
                      placeholder='date'
                      onChange={e => setDate(e.target.value)}
                      required
                  />&nbsp;
                      <select>
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                      </select>
                </div> <br />
                &nbsp; &nbsp;

                <div className='duration'>
                    <Label>Duration</Label> &nbsp; &nbsp; &nbsp;
                    <select
                            type="hour"
                            name="time"
                            id="time"
                            placeholder='duration'
                            onChange={e => setDuration(e.target.value)}
                            required
                    >&nbsp; &nbsp;
                    <option value='1'>1 hr</option>
                    <option value='2'>2 hr</option> 
                    </select> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <select
                            type="min"
                            name="time"
                            id="time"
                            placeholder='duration'
                            onChange={e => setDuration(e.target.value)}
                            required
                    >&nbsp; &nbsp;
                    <option value='20'>20 min</option>
                    <option value='30'>30 min</option>
                    <option value='60'>60 min</option>
                    </select> &nbsp; &nbsp;
                </div>
                <br />

                <div className='timezone'> 
                    <Label>TimeZone</Label>&nbsp; &nbsp; &nbsp;
                    <select
                    className='select'
                      type='timezone'
                      name='timezone'
                      id='timezone'
                      placeholder='timezone'
                      onChange={e => setTimeZone(e.target.value)}
                      required
                    >&nbsp; &nbsp;
                    {timezones.map((timezone) => (
                      <option value={timezone.text}>{timezone.text}</option>
                    ))
                    }
                    </select>
                </div>
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