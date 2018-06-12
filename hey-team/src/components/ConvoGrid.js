import React, { Component } from "react";

class ConvoGrid extends Component {
    state = {
        title: "",
        content: ""
    };

    viewConvo = (convo) => {
        this.props.viewConvo(convo);
        this.setState({ view: true, id: convo._id});
    }

    componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({ deleting: true });
        }
        this.props.getConvos();
    }

    deleteConvo = () => {
        this.props.deleteConvo(this.props.match.params.id);
        this.props.history.push('/');
        this.setState({ deleting: false });
      }
    
    cancelDelete = () => {
        this.props.history.push('/');
        this.setState({ deleting: false });
      }
      
    render() {
        return ( ConvoGrid )
    }
}

export default ConvoGrid;