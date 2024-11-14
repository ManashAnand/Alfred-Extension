

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { getChatbotResponseFromCloudflare } from '~helper/chatHelper'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatbotInterface({user}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello Sir! How can I assist you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    try {
     const response = await getChatbotResponseFromCloudflare(user.id,input)
     console.log("from here")
     console.log(response)
    //  const { data } =
      setMessages(prev => [...prev, {  id: prev.length + 1, text: response, sender: 'bot' }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, {  id: prev.length + 1, text: "Maybe your cloudflare credentials are not correct or our server is busy or might be you ask too much question too soon, Would you like to buy a Premium model ?", sender: 'bot' }]);
    }
  }

  return (
    <div className="flex flex-col h-[500px] max-w-md mx-auto border border-gray-300 rounded-lg overflow-hidden">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={handleSubmit} className="border-t border-gray-300 p-4">
        <div className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  )
}