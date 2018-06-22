import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Response from './Response';
import './convo_detail.css';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';
import { getConvos } from '../../actions/convoAction';

class ViewConvo extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    this.props.getConvos();
  }

  render() {
    if(this.props.convos.length < 1) return null;
    // const Converter = require('react-showdown').Converter;
    // const converter = new Converter();
    const id = this.props.match.params.id;
    const convo = this.props.convos.convos.find(convo => {
      return convo._id === id;
    });
    return (
      <div className='view-wrapper'>
          {!this.props.loading ? 
          <div className="viewconvo">
            <div className="participants-edit">
              <div className="part-title">Participants</div>
              <div className="part-edit-delete">
                <Link to="/dashboard/edit">
                  <span className="edit-icon"><i className="material-icons">edit</i></span>
                </Link>
                <div className="delete-convo">
                  <span className="delete-icon"><i className="material-icons">delete</i></span>
                </div>
              </div>
            </div>
                <div className="participants">
                  {
                    convo.participants.map(participant => {
                      return (
                        <div className="participant">img</div>
                      )
                    })
                  }
                </div>
                <br/>
                <div className="q-title">Questions</div>
                <div className="question-box">
                  {convo.question}
                </div>
                <br/>
                <div className="schedule-title">Schedule</div>
                <div className="schedule-time">Mon - Fri at 10:00AM Pacific</div>
                <br/>
                <div className="res-title">Responses</div>
                <div className="response-boxes">
                  { convo.responses.length > 0 ? convo.responses.map(response => {
                      return (
                        <Response questions={convo.questions} response={response}/>
                      )
                    }) : 'No responses yet'
                  }
                </div>
              </div>
              :
              <div>
                <Loading />
              </div>}
            <div>
              {this.state.redirect ? <Redirect to='/404' /> : null}
            </div>
            <Card/>
          </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log('CONVO VIEW STATE', state.convos);
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, {getConvos})(ViewConvo);