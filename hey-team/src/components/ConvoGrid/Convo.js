import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
import { Link } from 'react-router-dom';

import { Card, CardBody,
  CardTitle, } from 'reactstrap';

class Convo extends React.Component {
  state = {
  }


  render() {
    return (
      <Card className="edge-convo">
        <CardBody>
          <CardTitle><div className="title">{this.props.convo.title}</div></CardTitle>
          <div className="convo-content">            
            <div className="questions">
              {
                this.props.convo.questions.map(question => {
                  return <div className="question">{question}</div>
                })
              }
            </div>
          </div>
        </CardBody>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {})(Convo);