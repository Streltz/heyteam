import React from 'react';
import {Card} from 'reactstrap';


function Response(props) {
  return (
    <div className='response'>
      <div className="res-profile">
        <div className="res-avatar">IMAGE</div>
        <div className="res-info">
      	  <div className="res-username">{props.response.username}</div>
      	  <div className="res-time">{props.response.time}</div>
    	  </div>
      </div>
      <div className="qs-as">
    		{
    			props.questions.map((question, index) => {
    				return (
    					<div className="q-a">
    						<div className="res-question">Q: {question}</div>
    						<div className="res-answer">A: {props.response.answers[index]}</div>
    					</div>
    				)
    			})
    		}
    	</div>
    </div>
  );
}

export default Response;