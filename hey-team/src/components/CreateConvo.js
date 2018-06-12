import React from 'react';
import { connect } from 'react-redux';
import { addConvo } from '../actions/convoAction';

import Loading from './Loading';

class CreateConvo extends React.Component {
    state = {
      title: '',
      entry: '',
      redirect: false,
    }
  
    onChange = (event) => {
      let { name, value } = event.target;
      this.setState({ [name]: value });
    }
  
    onSubmit = (event) => {
      event.preventDefault();
      const { title, entry } = this.state;
      this.props.addConvo({ title, entry }, this.props.history);
    }
  
    render() {
      return (
        <div className='create-convo'>
          <form onSubmit={this.onSubmit}>
            <h2>Create New Conversation:</h2>
            <input onChange={this.onChange} 
            value={this.state.title} 
            name='title' 
            placeholder='Convo Title' 
            required='true' 
            maxLength='300' />

        <div className='area-container'>
            <textarea onChange={this.onChange} 
            value={this.state.entry} 
            name="entry" 
            placeholder='Convo Content' 
            required='true' 
            maxLength='15'>
            </textarea>
        </div>
            { this.props.loading ? <Loading /> : <button type='submit'>Save</button> }
          </form>
        </div>
      );
    }
  }
  
  export default { addConvo, CreateConvo};