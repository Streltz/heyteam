import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Loading from '../Loading';
import Response from '../Response';

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
    // const Converter = require('react-showdown').Converter;
    // const converter = new Converter();
    const id = this.props.match.params.id;
    const convo = this.props.convos.find(convo => {
      return convo.id === id;
    });

    return (
      <div className='convo-view' style={convoView}>
          <div className='button-container'>
            {/* <Link to={`/edit/${this.props.current._id}`} className='edit-button'>edit</Link> */}
            {/* <Link to={`/delete/${this.props.current._id}`} className='delete-button'>delete</Link> */}
          </div>
          {!this.props.loading ? <div className="viewconvo">
            <div>Participants</div>
            <div>
              {
                convo.participants.map(participant => {
                  return (
                    <div>{participant}</div>
                  )
                })
              }
            </div>
            <div>questions</div>
            <div style={questionBox}>
              {
                convo.questions.map(question => {
                  return (
                    <div>{question}s</div>
                  )
                })
              }
            </div>
            <div className="schedule">Schedule</div>
            <div className="schedule-time">Mon - Fri at 10:00AM Pacific</div>
            <div className="responses">Responses</div>
            <div>
              {
                convo.responses.map(response => {
                  return (
                    <div><Response questions={convo.questions} response={response}/></div>
                  )
                })
              }
            </div>
            {/* <div className='convo-title'><span>{this.props.current.title}</span><span className='note-timestamp'>{moment(this.props.current.dateCreated).format(' hh:mm:ss A MMM-DD-YYYY')}</span></div> */}
            {/* <div className='convo-entry'>{converter.convert(this.props.current.entry)}</div> */}
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

const convoView = {
  textAlign: 'left',
};
const questionBox = {
  border: '1px solid gray',
};


const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, { })(ViewConvo);