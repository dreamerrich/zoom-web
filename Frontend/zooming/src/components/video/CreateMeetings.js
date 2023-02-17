import React, { useContext,useState, useEffect } from 'react';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import AuthContext from '../../login/AuthContext';
import classNames from 'classnames';
import { SectionTilesProps } from '../../utils/SectionProps';
import Button from '../elements/Button';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import zones from '../../data/timezones';

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
    
    const [data, setData] = useState({
      id: '',
      topic: '',
      start_time:'',
      time:'',
      timezone:''
    })

    const changeHandler = e => {
      setData({...data, [e.target.name]: e.target.value})
    } 

    const { CreateMeeting } = useContext(AuthContext);
    
    const token = localStorage.getItem("authTokens");
    const id = localStorage.getItem("data")
    const accessToken = JSON.parse(token);
    const auth = accessToken.access
    // console.log(">>>>>>>>>>>>>",auth);

    // var dateobj = new Date(data.start_time)
    // var date = dateobj.toISOString();
    // console.log("?????????",date)

    const Create = async e => {
        e.preventDefault();
        console.log("in create")
        CreateMeeting( data.topic, data.start_time, data.time, data.timezone);
    }

    const [ meetingdata, setMeetingData ] = useState([])

    const get_meeting = async  => {
      console.log("get meeting");
      fetch('http://127.0.0.1:8000/createmeet/'+id,{ 
        headers: {
          'Authorization': 'Bearer ' + auth,
          "Content-Type": "application/json"
        }})
        .then(Response => {
            return Response.json()
        })
        .then(data => {
                setMeetingData(data)
                console.log(data)
            })
    }

  useEffect(() => {
      get_meeting()
  }, [])

    const defaultIfEmpty = value => {
      return value === "" ? "" : value;
    };

    const handleSubmit = (e) => {
      console.log("id is in update",id);
      e.preventDefault();
      if(!id){
        Create()
      } else {
        const update_meeting = async => {
          fetch('http://127.0.0.1:8000/createmeet/'+id, meetingdata, { 
            method: 'PATCH',
            headers: {
              'Authorization': 'Bearer ' + auth,
              "Content-Type": "application/json"
            }}) 
        .then(Response => {
            return Response.json()
        })
        .then(
                setMeetingData()
            )
        }
        update_meeting()
        localStorage.removeItem('data')
      }
    }

    return (
      <section
      {...props}
      className={outerClasses}
      >
      <div>
      <Header />
        <div className="container">
        <div className={innerClasses}>
          <div>
            <h3>Schedule Meetings</h3>
          </div>
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
                          value={defaultIfEmpty(meetingdata.topic)}
                          onChange={changeHandler}
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
                          dateformat={"yyyy/mm/ddThh:mm:ssz"}
                          value={defaultIfEmpty(meetingdata.start_time)}
                          onChange={changeHandler}
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
                        <Input
                                type="number"
                                name="time"
                                id="time"
                                placeholder='duration'
                                value={defaultIfEmpty(meetingdata.duration)}
                                onChange={changeHandler}
                                required
                        >&nbsp; &nbsp;
                        </Input> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br />

                    <div className='timezone'> 
                        <Label>TimeZone</Label>&nbsp; &nbsp; &nbsp;
                        <select
                        className='select'
                          type='text'
                          name='timezone'
                          id='timezone'
                          placeholder='timezone'
                          value={defaultIfEmpty(meetingdata.timezone)}
                          onChange={changeHandler}  
                          required
                        >&nbsp; &nbsp;
                        {zones.map((timezone) => (
                          <option value={timezone}>{timezone}</option>
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
            <div>
              <div>
                <h4>Please Login first</h4>
              </div>
            </div>
          }
        </div> 
        </div>
      <Footer/>
      </div>
    </section>
  )

}
    
CreateMeeting.propTypes = propTypes;
CreateMeeting.defaultProps = defaultProps;

export default CreateMeeting;