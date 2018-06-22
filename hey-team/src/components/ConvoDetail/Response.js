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
    	</div>
    </div>
  );
}

export default Response;