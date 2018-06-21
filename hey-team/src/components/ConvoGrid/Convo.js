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
    console.log('CONVO prpos', this.props.convo);
    return (
      <Card className="edge-convo">
        <CardBody>
          <CardTitle><div className="title">{this.props.convo.title}</div></CardTitle>
          <div className="convo-content">            
            <div className="question">
             {this.props.convo.question}
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