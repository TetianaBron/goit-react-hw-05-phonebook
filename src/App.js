import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import ContactForm from './Components/ContactForm/ContactForm';
import Layout from './Components/Layout/Layout';
import Filter from './Components/Filter/Filter';
import ContactList from './Components/ContactList/ContactList';
import { CSSTransition } from 'react-transition-group';
import Notification from './Components/Notification/Notification';



export default class App extends Component {

    static propTypes = {};

    static defaultProps = {};

    state = {
        contacts: [],
        filter: '',
        noticationContactExist: false,
        noticationEnterData: false
    };

    addContact = (name, number) => {
       const contact = {
       id: uuidv4(),
       name,
       number
       };

        if (name === '' || number === '') {
              this.setState({ noticationEnterData: true });
            setTimeout(() => {
            this.setState({ noticationEnterData: false });
            }, 2500);
         } else if (this.state.contacts.find((item) => item.name.toLowerCase() === name.toLowerCase())) {
            this.setState({ noticationContactExist: true });
            setTimeout(() => {
            this.setState({ noticationContactExist: false });
            }, 2500);
        } else {
            this.setState(prevState => {
                return {
                    contacts: [...prevState.contacts, contact],
                };
            });
        };
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
        const { contacts, filter, noticationContactExist, noticationEnterData } = this.state;
        const visibleContacts = this.getVisibleContacts();
        return ( 
            <Layout>
  
                <CSSTransition
                    in={true}
                    appear={true}
                    timeout={500}
                    classNames="Title-SlideIn"
                    unmountOnExit
                >
                    <h1 className="Title">Phonebook</h1>
                </CSSTransition>
    
                <CSSTransition
                    in={noticationContactExist}
                    timeout={250}
                    classNames="Notification-fade"
                    unmountOnExit>
                       <Notification
                        message={'Contact already exists!'} />
                </CSSTransition>

                 <CSSTransition
                    in={noticationEnterData}
                    timeout={250}
                    classNames="Notification-fade"
                    unmountOnExit>
                       <Notification
                        message={'Enter data, please!'} />
                </CSSTransition>

                <ContactForm onAddContact={this.addContact} /> 
                
                <CSSTransition
                    in={contacts.length > 0}
                    timeout={0}
                    ommountOnExit>
                    <>   
                    <CSSTransition
                        in={contacts.length > 1}
                        timeout={250}
                        classNames="Filter-fade"
                        unmountOnExit>
                       <Filter
                        value={filter}
                        onChangeFilter={this.changeFilter} />
                    </CSSTransition>

                    <ContactList
                        contacts={visibleContacts}
                        onRemoveContact={this.removeContact} />
                    </>
                </CSSTransition>
            </Layout>
        );
    }
}