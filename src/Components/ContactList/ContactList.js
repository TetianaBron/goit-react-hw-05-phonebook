import React from 'react';
import './ContactList.scss';
import PropTypes from 'prop-types';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg';



const ContactList = ({ contacts, onRemoveContact }) => (
    <div>
    <ul>
            {contacts.map(({id, name, number}, i) => (
            <li
                key={id}
                className="ContactItem">
                   {i+1}. {name}: {number}
                    <IconButton onClick={() => onRemoveContact(id)} aria-label="Удалить контакт">
                     <DeleteIcon width="17" height="17" fill="#fff" />
                 </IconButton>
            </li>
        ))}
        </ul>
        
    </div>
);

ContactList.propTypes = {
  onRemoveContact: PropTypes.func,
  contacts: PropTypes.arrayOf(PropTypes.object),
};

export default ContactList;