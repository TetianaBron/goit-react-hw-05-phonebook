import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Components/ContactForm/ContactForm';
import Layout from './Components/Layout/Layout';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';
import { CSSTransition } from 'react-transition-group';
import Notification from './Components/Notification/Notification';
import Logo from './Components/Logo/Logo';


export default class App extends Component {
    state = {
        contacts: [],
        filter: '',
        message: null
    };

    setMassge = (note) => {
      this.setState({ message:  note});
      setTimeout(() => {
      this.setState({ message: null });
      }, 2500);
    }

    addContact = (name, number) => {
       const contact = {
       id: uuidv4(),
       name,
       number
       };

        if (name === '') {
            this.setMassge('Enter concact name, please!');
            return;
        }
        if (number === '') {
            this.setMassge('Enter concact phone, please!');
            return;
        }
        if (this.state.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
            this.setMassge('Contact already exists!');
            return;
        } 
        this.setState(prevState => {
        return {contacts: [...prevState.contacts, contact],};
        });
    };
    
    removeContact = contactId => {
        this.setState(prevState => {
            return {
                contacts: prevState.contacts.filter(({ id }) => id !== contactId),
            };
        });
    };

    changeFilter = filter => {
        this.setState({ filter });
    };

    getVisibleContacts = () => {
        const { contacts, filter } = this.state;
        return contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase()),
        );
    };
  
    componentDidMount() {
        const contacts = localStorage.getItem('contacts');
        const parselContacts = JSON.parse(contacts);

        if (parselContacts) {
            this.setState({ contacts: parselContacts })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {

            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        }
    }

    render() {
        const { contacts, filter, message } = this.state;
        const visibleContacts = this.getVisibleContacts();
        return ( 
            <Layout>

              <Logo />  
                
                <Notification
                    message={message} />

                <ContactForm
                    onAddContact={this.addContact} /> 
                    
                <Filter
                    value={filter}
                    onChangeFilter={this.changeFilter}
                    contacts={contacts}/>

                <CSSTransition
                    in={contacts.length > 0}
                    timeout={0}
                    ommountOnExit>     
                <ContactList
                    contacts={visibleContacts}
                    onRemoveContact={this.removeContact} /> 
                </CSSTransition>
            </Layout>
        );
    }
}