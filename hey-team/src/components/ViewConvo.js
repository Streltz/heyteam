import React from 'react';
// import { connect } from 'react-redux';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
// import moment from 'moment';

import Loading from './Loading';

class ViewConvo extends React.Component {
  state = {
    title: '',
    entry: '',
    id: '',
    dateCreated: '',
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

    return (
      <div className='convo-view'>
        <div className='separator'>
          <div className='button-container'>
            {/* <Link to={`/edit/${this.props.current._id}`} className='edit-button'>edit</Link> */}
            {/* <Link to={`/delete/${this.props.current._id}`} className='delete-button'>delete</Link> */}
          </div>
          {!this.props.loading ? <div>
            <div>{this.props.convo.title}</div>
            <div>{this.props.convo.questions}</div>
            {/* <div className='convo-title'><span>{this.props.current.title}</span><span className='note-timestamp'>{moment(this.props.current.dateCreated).format(' hh:mm:ss A MMM-DD-YYYY')}</span></div> */}
            {/* <div className='convo-entry'>{converter.convert(this.props.current.entry)}</div> */}
          </div>
          :
          <div>
            <Loading />
          </div>}
        </div>
        <div>
          {this.state.redirect ? <Redirect to='/404' /> : null }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current: state.convos.current,
    notes: state.convos.convos,
    loading: state.convos.loading,
  }
}

export default ViewConvo;