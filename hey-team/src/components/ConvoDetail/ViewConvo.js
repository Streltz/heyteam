import React from 'react';
import { Redirect } from 'react-router';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../Loading';
import Response from './Response';
import './convo_detail.css';
import { Link } from 'react-router-dom';
import { Card } from 'reactstrap';

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
      <main id="view-main">
        <Card className="edge-card">
          <div className='view-wrapper'>
            <div className='button-container'>
              {/* <Link to={`/edit/${this.props.current._id}`} className='edit-button'>edit</Link> */}
              {/* <Link to={`/delete/${this.props.current._id}`} className='delete-button'>delete</Link> */}
            </div>
            {!this.props.loading ?
              <div className="viewconvo">
                <div className="participants-edit text-right">
                  <div className="part-edit-delete">
                    <Link className="dark-link" to="/dashboard/edit">Edit  </Link>
                    Delete
                  </div>
                </div>

                <div className="content-container text-left">
                  <div className="schedule sub-header">Schedule</div>
                  <div className="schedule-time"> Mon - Fri at 10:00AM Pacific</div>
                  <br />
                  <div className="sub-header">Participants</div>
                  <div className="participants">
                    {
                      convo.participants.map(participant => {
                        /*return (
                          
                        )*/
                      })
                    }
                  </div>
                  <br />

                  <br />
                  <div className="sub-header">Responses</div>
                  <br />
                  <div className="table-responsive table-striped">
                    <table class="table">
                      <thead>
                        <tr>
                          <th> Username </th>
                          <th> DateTime </th>
                          <th> Question </th>
                          <th> Answer </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          convo.responses.map(response => {
                            return (
                              <Response questions={convo.questions} response={response} />
                            )
                          })
                        }
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              :
              <div>
                <Loading />
              </div>}
            <div>
              {this.state.redirect ? <Redirect to='/404' /> : null}
            </div>
          </div>
        </Card>
      </main>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    convos: state.convos
  }
}

export default connect(mapStateToProps, {})(ViewConvo);