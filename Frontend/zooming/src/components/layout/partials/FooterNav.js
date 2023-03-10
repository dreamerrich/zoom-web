import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

const FooterNav = ({
  className,
  ...props
}) => {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav
      {...props}
      className={classes}
    >
      <ul className="list-reset">
        <li>
          <Link to="#0">About</Link>
        </li>
        <li>
          <Link to="#0">Download</Link>
        </li>
        <li>
          <Link to="#0">Sales</Link>
        </li>
        <li>
          <Link to="#0">Support</Link>
        </li>
        <li>
          <Link to="#0">FAQ's</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;