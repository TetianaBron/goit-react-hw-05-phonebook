import './ContactList.scss';
import PropTypes from 'prop-types';


const ContactList = ({ contacts, onRemoveContact }) => (
    <div>
    <ul>
            {contacts.map(({ id, name, number }) => (
            <li
                key={id}
                className="ContactItem">
                   - {name}: {number}
                <button
                    type="button"
                    onClick={() => onRemoveContact(id)}>
                     Delete
                 </button>
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