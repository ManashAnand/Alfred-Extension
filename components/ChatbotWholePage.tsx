import React from 'react'
import Profile from './Profile'

const ChatbotWholePage = ({user,setUser}) => {

    return (
        <>
            <div className="min-w-[20rem]">

                <div className="flex items-center justify-between">
                <span className="text-2xl underline decoration-wavy decoration-orange-600 cursor-pointer" >Alfred.ai</span>
                        <Profile user={user} setUser={setUser}/>
                </div>

            </div>
        </>
    )
}

export default ChatbotWholePage
