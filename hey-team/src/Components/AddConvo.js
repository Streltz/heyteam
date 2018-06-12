import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class AddConvo extends Component {
    state = {
        title: '',
        body: '',
        id: '',
        redirect: false,
    };

    handleInput = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:4444/convos/', this.state).then(() => {
        window.location.href = '/';
        })
        .catch((error) => {
            throw error;
        });
    }
        render() {
            return(
                <div className="form-group">
                    <h3> Add a New Conversation </h3>
                    <form onSubmit={e => e.preventDefault()}>
                        <input 
                            onChange={this.handleInput}
                            className="form-control"
                            name="title"
                            type="text"
                            value={this.state.title}
                            placeholder="Add a Title"
                        />
                        <textarea 
                            type="text"
                            name="body" 
                            value={this.state.body}
                            placeholder="Add Content"
                        />
                        <button
                            onClick={this.handleSubmit}
                            type="button"
                            classname={this.state.disabled? 'btn disabled': 'btn'}>
                            Add Conversation
                        </button>
                        
                        
                    </form>
                    {this.state.redirect && <Redirect to={'/'} />}
                    
                </div>
            );
        };
    };


export default AddConvo;