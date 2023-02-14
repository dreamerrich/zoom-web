import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Button, Table } from 'reactstrap';
import { useHistory } from "react-router-dom";


const propTypes = {
    navPosition: PropTypes.string,
    bottomOuterDivider: PropTypes.bool,
    bottomDivider: PropTypes.bool
  }
  
  const defaultProps = {
    navPosition: '',
    bottomOuterDivider: false,
    bottomDivider: false
  }
  
  const ListMeeting = ({
    className,
    navPosition,
    topOuterDivider,
    bottomOuterDivider,
    topDivider,
    bottomDivider,
    hasBgColor,
    invertColor,
    pushLeft,
    ...props
  }) => {
  
    const history = useHistory()
    const outerClasses = classNames(
      'testimonial section',
      topOuterDivider && 'has-top-divider',
      bottomOuterDivider && 'has-bottom-divider',
      hasBgColor && 'has-bg-color',
      invertColor && 'invert-color',
      className
    );
    
    const [isActive, setIsactive] = useState(false);
    const nav = useRef(null);
    
    useEffect(() => {
        isActive && openMenu();
        document.addEventListener('keydown', keyPress);
        document.addEventListener('click', clickOutside);
        return () => {
          document.removeEventListener('keydown', keyPress);
          document.removeEventListener('click', clickOutside);
          closeMenu();
        };
      });  
      
    const openMenu = () => {
        document.body.classList.add('off-nav-is-active');
        nav.current.style.maxHeight = nav.current.scrollHeight + 'px';
        setIsactive(true);
    }
      
    const closeMenu = () => {
        document.body.classList.remove('off-nav-is-active');
        nav.current && (nav.current.style.maxHeight = null);
        setIsactive(false);
    }
      
    const keyPress = (e) => {
        isActive && e.keyCode === 27 && closeMenu();
    }
      
    const clickOutside = (e) => {
        if (!nav.current) return
        closeMenu();
    }

    const innerClasses = classNames(
      'testimonial-inner section-inner',
      topDivider && 'has-top-divider',
      bottomDivider && 'has-bottom-divider'
    );

    const [meeting, setMeeting] = useState([])
    const token = localStorage.getItem("authTokens");
    const Token = JSON.parse(token);
    
    const fetchData = () => {
        fetch('http://127.0.0.1:8000/meeting',{ 
            headers: new Headers({
            'Authorization': 'Bearer ' + Token.access, 
            'Content-Type': 'application/x-www-form-urlencoded'
        })},)
        .then(Response => {
            return Response.json()
        })
        .then(data => {
                setMeeting(data)
                console.log(data)
            })
        }

    useEffect(() => {
        fetchData()
    }, [])

    let data =("")
    const dataid = (e) => {
        data = localStorage.setItem("data", JSON.stringify(e))
        console.log('e----------------',e);
        history.push(`/CreateMeeting/${e}`)
    }
   
    return (
        <section
            {...props}
            className={outerClasses}
        >
            <Header />
                <div className="container">
                    <div className={innerClasses}>
                        <div>
                            <h3>Meetings</h3>
                        </div>
                            <hr />
                           
                            {Token ?
                            <Table>
                                <thead>
                                    <tr>
                                        <th><h4>Start time</h4></th>
                                        <th><h4>Topic</h4></th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                {meeting.map((i)=> {return (
                                    <tr>
                                        <td><h6>{i.start_time}</h6></td>
                                        <td><h6>{i.topic}</h6><br/>{i.meeting_id}</td>
                                        <td><Button onClick={()=>dataid(i.id)}>Edit</Button></td>
                                    </tr>
                                    )})}
                                    <tr>
                                    </tr>
                                </tbody>
                            </Table> :
                            <div>
                            <h6>Please Login to view Your past meeting.</h6>
                        </div>
                    }
                    <div></div>
                    <div></div>
                    </div>
                </div> 
            <Footer/>
        </section>
    )
    
}
ListMeeting.propTypes = propTypes;
ListMeeting.defaultProps = defaultProps;

export default ListMeeting;