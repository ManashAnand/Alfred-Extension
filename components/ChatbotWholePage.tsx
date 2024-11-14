import React from 'react'
import Profile from './Profile'
import ChatbotInterface from './Chatbot'

const ChatbotWholePage = ({user,setUser}) => {

    return (
        <>
            <div className="min-w-[20rem]">

                <div className="flex items-center justify-between">
                <span className="text-2xl underline decoration-wavy decoration-orange-600 cursor-pointer ml-2" >Alfred.ai</span>
                        <Profile user={user} setUser={setUser}/>
                </div>
                <ChatbotInterface/>
            </div>
        </>
    )
}

export default ChatbotWholePage
