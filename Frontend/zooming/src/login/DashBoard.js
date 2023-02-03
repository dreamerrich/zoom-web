import React from 'react';
import classNames from 'classnames';
import { SectionTilesProps } from '../utils/SectionProps';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Avtar from './Avtar';


const propTypes = {
    ...SectionTilesProps.types
  }
  
  const defaultProps = {
    ...SectionTilesProps.defaults
  }
  
  const DashBoard = ({
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

    // const User = localStorage.setItem("username")
    return (
        <section
            {...props}
            className={outerClasses}
        >
            <Header />
            <div className="container">
                <div className={innerClasses}>
                    <div className='profile'>
                        <div>
                            <Avtar />
                        </div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        <div>
                            <h6>UserName</h6>
                            <p>name</p>
                        </div>
                    </div>
                    <div className='personal'>
                        <h6>Personal</h6>
                        <div className='meetingDetail'>
                            <p>phone</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>Language</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>time zone</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>Date format</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>time format</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                    </div>
                    <div className='meeting'>
                        <h6>Meeting</h6>
                        <div className='meetingDetail'>
                            <p>Personal Meeting ID</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>Host Key</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                    </div>
                    <div className='signin'>
                        <h6>Sign In</h6>
                        <div className='meetingDetail'>
                            <p>Mail ID</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                        <div className='meetingDetail'>
                            <p>Password</p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                            <p>Not setted</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
        
};

DashBoard.propTypes = propTypes;
DashBoard.defaultProps = defaultProps;

export default DashBoard;