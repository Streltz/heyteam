import React from 'react';
import {Card} from 'reactstrap';



function Response(props) {
  const img = props.response.user_image;

  let time = props.response.date_submitted.toString().split('.')[0];
  const newTime = time.replace('T', '   ');
  console.log(newTime);
  return (
    <div className='response'>
      <div className="res-profile">
        <div className="res-avatar"><img src={`${img}`} /></div>
        <div className="res-info">
      	  <div className="res-username">{props.response.username}</div>
    	  </div>
      </div>
      {
        props.response.texts.map(text => {
          return (<div className="res-content">
        <div className="res-time">{text.time}</div>
        <div className="res-answer">{text.text}</div>
      </div>);
        })
      }
      
      <div className="qs-as">
    	</div>
    </div>
  );
}

export default Response;