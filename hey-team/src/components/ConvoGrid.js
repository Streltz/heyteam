import React, { Component } from "react";
import { connect } from 'react-redux';
import { getConvos } from '../actions';
import ViewConvo from './ViewConvo';

class ConvoGrid extends React.Component {
    state = {
        title: "",
        content: ""
    };

    viewConvo = (convo) => {
        this.props.viewConvo(convo);
        this.setState({ view: true, id: convo._id});
    }

    componentDidMount() {
        // if (this.props.match.params.id) {
        //     this.setState({ deleting: true });
        // }
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
        return ( <div>{
          this.props.convos.map(convo => {
            return <ViewConvo key={convo.id} convo={convo} />
          })
        }</div> )
    }
}

const mapStateToProps = (state) => {
    return {
      convos: state.convos
    } 
}

export default connect(mapStateToProps, { getConvos })(ConvoGrid);