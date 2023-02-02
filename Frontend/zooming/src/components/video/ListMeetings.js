import React, { useState, useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import { Link } from 'react-router-dom';

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
      
    // const classes = classNames(
    //     'site-header',
    //     bottomOuterDivider && 'has-bottom-divider',
    //     className
    // );

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
                            <h3>Meetings</h3>
                        </div>
                        <div className='nav'>
                                <div className={
                                    classNames(
                                    'site-header-inner',
                                    bottomDivider && 'has-bottom-divider'
                                )}>
                                    <nav
                                        ref={nav}
                                        className={
                                        classNames(
                                        'header-nav',
                                        isActive && 'is-active'
                                    )}>
                                        <div className="header-nav-inner">
                                            <ul className={
                                                classNames(
                                                'list-reset text-xs',
                                                navPosition && `header-nav-${navPosition}`
                                            )}>
                                                <li>
                                                    <Link to="/Product" onClick={openMenu}>Upcoming</Link>
                                                </li>
                                                <li>
                                                    <Link to="#solutions" onClick={closeMenu}>Previous</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </nav> 
                                </div>
                            </div>
                            <hr />
                        <div className='row-filter'>
                            <h3>filter</h3>
                            <div className='meeting-list'>
                                <div className='meeting-detail'>
                                    <div className='time'>
                                        <p>Time</p>
                                    </div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div className='topic-id'>
                                        <p>topic</p>
                                        <p>id</p>
                                    </div>
                                </div>
                                <div className='meeting-detail'>
                                    <div className='time'>
                                        <p>Time</p>
                                    </div> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                                    <div className='topic-id'>
                                        <p>topic</p>
                                        <p>id</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            <Footer/>
        </section>
    )
    
}
ListMeeting.propTypes = propTypes;
ListMeeting.defaultProps = defaultProps;

export default ListMeeting;