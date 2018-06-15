import React, { Component } from 'react';
import axios from 'axios';
import './EditConvo.css';

class EditConvo extends Component {
  state = {
      Title: '',
      Content: '',
  };

  processUpdate(event) {
      // event.preventDefault();
      // axios
      // .put(`http://localhost:4444/convos/$(this.props.match.params.id`, this.state)
      // .then(() => {
      //     window.location.href = '/';
      // })
      // .catch((error) => {
      //     alert('Server error: try again');
      // });
  }

  componentDidMount() {
      // axios
      // .get( `http://localhost:4444/convos/`)
      // .then((response) => {
      //     // this.setState(() => convo.id === Number(this.props.match.params.id));
      // })
      // .catch((error) => {
      //     alert('Server error');
      //     window.location.href = '/';
      // });
  }

  render() {
    return (
      <div>
        {/* <LeftColumnPanel /> */}
        <div className="edit">
          <div className="edit_heading">Edit Convo</div>
          <form className="edit-convo" 
          onChange={this.processChange} 
          onSubmit={this.processUpdate}>
            <input type="text" 
              className="edit-convo_title" id="Title" 
              placeholder="Conversation Title"
              value={this.state.Title} />
            <textarea className="edit-convo_content" 
              id="Content"
              placeholder="Conversation Content"
              value={this.state.Content} />
            <input type="submit" className="edit-convo_update-button" content="Update" />
          </form>
        </div>
      </div>
    );
  }
}

export default EditConvo; 
