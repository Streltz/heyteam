import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Response from './Response';
import './convo_detail.css';
import { Link } from 'react-router-dom';

class ViewConvo extends React.Component {
  state = {
    redirect: false,
  };

  componentDidMount() {
    // if (this.props.match.params.id === undefined) {
    //   this.setState({ redirect: true });
    // }
  }

  render() {
    console.log('CONVOS', this.props.convos);
    // const Converter = require('react-showdown').Converter;
    // const converter = new Converter();
    const id = this.props.match.params.id;
    const convo = this.props.convos.find(convo => {
      return convo.id === id;
    });
    console.log('single convo', convo);
    return (
      <div className='view-wrapper'>
          <div className='button-container'>
            {/* <Link to={`/edit/${this.props.current._id}`} className='edit-button'>edit</Link> */}
            {/* <Link to={`/delete/${this.props.current._id}`} className='delete-button'>delete</Link> */}
          </div>
          {!this.props.loading ? 
            <div className="viewconvo">
            <div className="participants-edit">
              <h4 className="part-title">Participants</h4>
              <div className="part-edit-delete"><Link to="/dashboard/edit">Edit</Link> Delete</div>
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
                <h4>Questions</h4>
                <div className="question-box">
                  {
                    convo.questions.map(question => {
                      return (
                        <div>{question}s</div>
                      )
                    })
                  }
                </div>
                <br/>
                <h4 className="schedule">Schedule</h4>
                <div className="schedule-time">Mon - Fri at 10:00AM Pacific</div>
                <br/>
                <h4>Responses</h4>
                <div className="response-boxes">
                  {
                    convo.responses.map(response => {
                      return (
                        <Response questions={convo.questions} response={response}/>
                      )
                    })
                  }
                </div>
          </div>
          :
          <div>
            <Loading />
          </div>}
        <div>
          {this.state.redirect ? <Redirect to='/404' /> : null }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, { })(ViewConvo);