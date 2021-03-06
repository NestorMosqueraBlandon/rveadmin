import React from 'react'
import {ChatEngine} from 'react-chat-engine'
import { useSelector } from 'react-redux'
import ChatFeed from '../../components/ChatFeed'

export default function ChatScreen() {

    const projectID = '4bf64b7f-7c57-4af0-9000-c5afaf059e1f'

    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;

    
    return (
        <div className="overflow">

        <ChatEngine heigth="100vh" projectID={projectID} 
        userName={userInfo.username} userSecret={userInfo.password} 
        renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />} 
        onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}/>
        </div>
    )
}
