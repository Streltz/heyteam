import React from 'react';

const ViewConversation = (props) => {
    return (
        <div className="container">
            <div className="Title">{props.convoTitle}</div>
            <div className="Content">{props.convoContent}</div>
        </div>
    );
};