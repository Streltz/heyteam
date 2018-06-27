import React, { Component } from "react";
import { connect } from 'react-redux';
import { getConvos } from '../../actions/convoAction';
import ViewConvo from '../ConvoDetail/ViewConvo';
import ConvoHeader from './ConvoHeader';
import Convo from './Convo';
import { Link } from 'react-router-dom';
import './styles.css';
import { Card, CardBody,
  CardTitle, } from 'reactstrap';

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
    console.log("CONVO LIST", this.props.convos);
    return (
      <main id="convo-main">
        <ConvoHeader />
        <div className="grid">
          {
            this.props.convos.convos.map(convo => {
              return (
                <Link key={convo._id} to={`dashboard/${convo._id}`}>
                  <Card className="edge-convo">
                      <div className="title">{convo.title}</div>
                      <div className="convo-content">            
                         {convo.question}
                      </div>
                      <div className="convo-status">
                        <div className="responded">{convo.responses.length > 0 ? <i className="material-icons">message</i> : null}
                        </div>
                        {convo.newMessages > 0 ? <div className="new-messages">{convo.newMessages}</div> : null}
                      </div>
                  </Card>
                </Link>
              )
            })
          }
        </div>
        <Link to="/dashboard/add">
          <div className="fixed-bttm-right-btn circle-btn-blue">
            <i className="fa fa-plus"></i>
          </div>
        </Link>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('STATE CONVO', state.convos);
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, { getConvos })(ConvoGrid);