import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
class Convo extends React.Component {
    state = {
    }
  
    
  render() {
    return (
      <div class="convo" style={{display: 'inline-block'}}>

        <div className="edit-delete">
          <div className="edit">edit</div>
          <div className="delete">delete</div>
        </div>
        <div className="convo-content">
          <div class="title">{this.props.convo.title}</div>
          <div class="questions">
            {
              this.props.convo.questions.map(question => {
                return <div>{question}</div>
              })
            }
          </div>
        </div>  
      </div>
    )
  }
}
  
const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps, {  })(Convo);