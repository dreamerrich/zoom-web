import React, { useEffect, useState } from "react";
import { Form, FormGroup, Input, Label } from "reactstrap";
import classNames from "classnames";
import { SectionTilesProps } from "../../utils/SectionProps";
import Button from "../elements/Button";
import Header from "../layout/Header";
import Footer from "../layout/Footer";
import zones from "../../data/timezones";
// import moment from 'moment';
// import AuthContext from "../../login/AuthContext";

const propTypes = {
  ...SectionTilesProps.types,
};

const defaultProps = {
  ...SectionTilesProps.defaults,
};

const Updatemeeting = ({
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
    "testimonial section",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "testimonial-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
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

  const token = localStorage.getItem("authTokens");
  const accessToken = JSON.parse(token);
  const id = localStorage.getItem("data")

  const fetchData = () => {
    fetch('http://127.0.0.1:8000/createmeet/'+id,
    { 
        method: "PATCH",  
        headers: new Headers({
        'Authorization': 'Bearer ' + accessToken.access, 
        'Content-Type': 'application/x-www-form-urlencoded'
        }),
    }

    )
    .then(Response => {
        console.log(">>>>>>>",Response)
        return Response.json()
    })
    .then(data => {
            setData(data)
            console.log("<<<<<<<<<<<<<<<<<",data)
            setData(false)
        })
    }

  useEffect(() => {
    fetchData()
  }, [])
  
  // const date = meetingdata.start_time
  // console.log("🚀 ~ file: UpdateMeeting.js:87 ~ date", date)
  // const dateformate = moment(date).format('yyyy-MM-DDThh:mm:ss');
  
  const handleSubmit = async e => {
    console.log("??????????/",e.target.value);
    e.preventDefault();
    setData({...data, [e.target.topic]: e.target.value});
  };


  return (
    <section {...props} className={outerClasses}>
      <div>
        <Header />
        <div className="container">
          <div className={innerClasses}>
            <div>
              <h3>Update Meetings</h3>
            </div>
            {token ? (
              <div className="meetingForm">
                <Form style={{ textAlign: "left" }} onSubmit={handleSubmit}>
                  <FormGroup>
                    <div className="topic">
                      <Label>Topic</Label> &nbsp; &nbsp; &nbsp;
                      <Input
                        type="text"
                        name="topic"
                        id="topic"
                        value={data.topic}
                        placeholder="topic"
                        onChange={changeHandler}
                        required
                      >
                      </Input>
                      &nbsp;
                    </div>
                    <br />
                    <div className="when">
                      <Label>When</Label> &nbsp; &nbsp; &nbsp;
                      <Input
                        type="datetime-local"
                        name="start_time"
                        id="start_time"
                        // value={dateformate}
                        value={data.start_time}
                        placeholder="date"
                        onChange={changeHandler}
                        required
                      >
                      </Input>
                      &nbsp;
                      <select>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    <br />
                    &nbsp; &nbsp;
                    <div className="duration">
                      <Label>Duration</Label> &nbsp; &nbsp; &nbsp;
                      <Input
                        type="number"
                        name="time"
                        id="time"
                        value={data.duration}
                        placeholder="duration"
                        onChange={changeHandler}
                        required
                      >
                      
                        &nbsp; &nbsp;
                      </Input>
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </div>
                    <br />
                    <div className="timezone">
                      <Label>TimeZone</Label>&nbsp; &nbsp; &nbsp;
                      <select
                        className="select"
                        type="text"
                        name="timezone"
                        id="timezone"
                        value={data.timezone}
                        placeholder="timezone"
                        onChange={changeHandler}
                        required
                      >
                        &nbsp; &nbsp;
                        {zones.map((timezone) => (
                          <option value={timezone}>{timezone}</option>
                        ))}
                      </select>
                    </div>
                    <br />
                    <Button type="submit">Save</Button>&nbsp;&nbsp;&nbsp;
                    <Button type="submit">Cancel</Button>
                  </FormGroup>
                </Form>
              </div>
            ) : (
              <div>
                <div>
                  <h4>Please Login first</h4>
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </section>
  );
};

Updatemeeting.propTypes = propTypes;
Updatemeeting.defaultProps = defaultProps;

export default Updatemeeting;
