import React from 'react'
import Message from './Message'
import useGetMessages from '../../hooks/useGetMessages'
import MessageSkeleton from "../skeletons/MessageSkeleton";
import { useRef } from 'react';
import { useEffect } from 'react';
import useListenMessages from '../../hooks/useListenMessages';

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef(); //We use this useRef as we want that automatiocally scrolls when messages exceed the boundary

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 10);
  },[messages]); //When messages changes then this will work

  return (
    <div className='px-4 flex-1 overflow-auto'>

      {!loading && messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMessageRef}>
          <Message  message={message} />
        </div>
      ))}

      {loading && [...Array(3)].map((_,idx) => <MessageSkeleton key={idx} />)} 
      { /* if the loading is true then show the message skeleton 3 times */ }

      {!loading && messages.length === 0 && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
      {/* If the loading is false and the messages length is zero then show this line */}

    </div>
  )
}

export default Messages;