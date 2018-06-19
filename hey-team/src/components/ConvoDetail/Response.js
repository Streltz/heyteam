import React from 'react';
import {Card} from 'reactstrap';


function Response(props) {
  return (
    <tr>
    	<td>{props.response.username}</td>
    	<td>{props.response.time}</td>
			<td>{props.questions[0]}</td>
			<td>{props.response.answers[0]}</td>
    </tr>
  );
}

export default Response;