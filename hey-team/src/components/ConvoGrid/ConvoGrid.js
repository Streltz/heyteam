import React, { Component } from "react";
import { connect } from 'react-redux';
import { getConvos, deleteConvo } from '../../actions/convoAction';
import ViewConvo from '../ConvoDetail/ViewConvo';
import ConvoHeader from './ConvoHeader';
// import Convo from './Convo';
import { Link } from 'react-router-dom';
import './styles.css';
import { Card, CardBody,
  CardTitle, ModalHeader, ModalBody, ModalFooter, Modal, Button } from 'reactstrap';
class ConvoGrid extends React.Component {
  state = {
    title: "",
    content: "",
    modal: false,
    deleteId: ''
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

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  toggle(data) {
    this.setState({
      modal: !this.state.modal
    });
    if(data.action === 'set_id'){
      this.setState({deleteId: data.id});
    }
    if(data.action === 'delete'){
      this.props.deleteConvo(this.state.deleteId, this.props.history);
    }
  }


  render() {
    return (
      <main id="convo-main">
        <ConvoHeader />
        <div className="grid">
          {
            this.props.convos.convos.map(convo => {
              return (
                
                  <Card className="edge-convo" key={convo._id}>
                    
                      <div className="title">{convo.title}</div>
                      <Link to={`dashboard/${convo._id}`}>
                      <div className="convo-content">            
                         {convo.question}
                      </div>
                    </Link>
                    <div className="convo-status">
                      <div className="delete-icon" onClick={()=>{this.toggle({action: 'set_id', id: convo._id})}}><i className="material-icons">delete</i></div>
                      <div className="responded">{convo.responses.length > 0 ? <i className="material-icons">message</i> : null}
                      </div>
                      {convo.newMessages > 0 ? <div className="new-messages">{convo.newMessages}</div> : null}
                    </div>
                  </Card>
                
              )
            })
          }
        </div>
        <Link to="/dashboard/add">
          <div className="fixed-bttm-right-btn circle-btn-blue">
            <i className="fa fa-plus"></i>
          </div>
        </Link>
         <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalBody>
            Delete this conversation?
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={()=>{this.toggle({action: 'delete'})}}>Delete</Button>{' '}
            <Button color="secondary" onClick={()=>{this.toggle({})}}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}
export default connect(mapStateToProps, { getConvos, deleteConvo })(ConvoGrid);