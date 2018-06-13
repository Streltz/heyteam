import React from 'react';

function Response(props) {
  return (
    <div className='response'  style={response}>
    	<div>{props.response.username}</div>
    	<div>{props.response.time}</div>
    	<div>
    		{
    			props.questions.map((question, index) => {
    				return (
    					<div>
    						<div className="question">{question}</div>
    						<div className="answer">{props.response.answers[index]}</div>
    					</div>
    				)
    			})
    		}
    	</div>
    </div>
  );
}
const response = {
  border: '1px solid gray',
  margin: '10px 0px'
};

export default Response;