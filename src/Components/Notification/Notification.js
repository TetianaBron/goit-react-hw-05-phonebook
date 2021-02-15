import React from 'react';
import PropTypes from 'prop-types';
import './Notification.scss';

const Notification = ({message}) => {
    return (
        <div className="Overlay">
        <p className="Notification">
            {message}
        </p>
        </div>
    );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired
};

export default Notification;