import React from 'react';
import {Card} from 'reactstrap';


function Response(props) {
  console.log('RESPONSE', props.response);
  const img = props.response.user_image;
  return (
    <div className='response'>
      <div className="res-profile">
        <div className="res-avatar"><img src={`${img}`} /></div>
        <div className="res-info">
      	  <div className="res-username">{props.response.username}</div>
    	  </div>
      </div>
      <div className="res-content">
        <div className="res-time">{props.response.time}</div>
        <div className="res-answer">{props.response.text}</div>
      </div>
      <div className="qs-as">
    	</div>
    </div>
  );
}

export default Response;