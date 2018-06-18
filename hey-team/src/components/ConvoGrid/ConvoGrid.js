import React, { Component } from "react";
import { connect } from 'react-redux';
import { getConvos } from '../../actions/convoAction';
import ViewConvo from '../ConvoDetail/ViewConvo';
import Convo from './Convo';
import { Link } from 'react-router-dom';
import './styles.css';

class ConvoGrid extends React.Component {
  state = {
    title: "",
    content: ""
  };

  viewConvo = (convo) => {
    this.props.viewConvo(convo);
    this.setState({ view: true, id: convo._id });
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
    console.log(this.props.convos);
    
    return (
      <main id="convo-main">
        <div className="grid">
          {
            this.props.convos.map(convo => {
              return (
                <Link key={convo.id} to={`dashboard/${convo.id}`}>
                  <Convo convo={convo} />
                </Link>
              )
            })
          }
        </div>
        <Link to="/dashboard/add">
          <div className="fixed-bttm-right-btn circle-btn-blue">
            <i class="fa fa-plus"></i>
          </div>
        </Link>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, { getConvos })(ConvoGrid);