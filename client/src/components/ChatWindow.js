import REact from 'react';
import { Segment, Header, Form, TextArea, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setFlash } from '../actions/flash';
import { addMessage } from '../actions/message';
import ChatMessage from './ChatMessage';

class ChatWindow extends React.Component {
  state = { newMessage: ''}

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(setFlash('Welcome To My Chat App', 'green'))
  }

  displayMessages = () => {
    const { messages } = this.props;

    if (messages.length)
      return messages.map( ( message, i) => {
        return <ChatMessage key={i} message={message} />
      })
    else 
      return (
        <Segment inverted textAlign='center'>
          <Header as='h1'> No messages yet</Header>
        </Segment>
      ) 
  }

  addMessage = (e) => {
    e.preventDefault();
    const { dispatch, user: { email }} = this.props;
    const { newMessage } = this.state;
    const message = { email, body: newMEssage };
    dispatch(addMessage(message));
    this.setState({ newmessage: ''})
  }

  setMessage = (e) => {
    this.setState({ newMessage: e.target.value })
  }

  render() {
    return (
      <Segment basic>
        <Header as='h2' textAlign='center' style={styles.underline} >
          React Chat
        </Header>
        <Segment basic style={styles.mainWindow}>
          <Segment basic>
            { this.displayMessages() }
          </Segment>
        </Segment>
        <Segment style={styles.messageInput}>
          <Form onSubmit={this.addMessage} >
            <TextArea 
              value={this.state.newMessage}
              onChange={this.setMessage}
              placeholder="Write something nice!"
              autoFocus
              required
            >
            </TextArea>
            <Segment>
              <Button primary>Send Message</Button>
            </Segment>
          </Form>
        </Segment>
      </Segment>
    )
  }
}

const styles = {
  underline: { textDecoration: 'underline' },
  mainWindow:{ 
    border: '3px solid black',
    height: '60vh', 
    overflowY: 'scroll',
    backgroundColor: 'lightgrey',
    borderRadius: '10px', 
  },
  messageInput: {
    border :'3px solid black', 
    height : '80%', 
    margin: '0 auto', 
    padding: '10px', 
  },
}

const mapSTateToProps = (state) => {
  return {
    user: state.user, 
    messages: state.messages 
  }
}

export default connect(mapSTateToProps)(ChatWindow);