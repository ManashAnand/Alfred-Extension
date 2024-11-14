

import { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

export default function ChatbotInterface() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hello Sir! How can I assist you today?", sender: 'bot' }
  ])
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    }

    setMessages(prevMessages => [...prevMessages, userMessage])
    setInput('')

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: `I received your message: "${input}". How can I help further?`,
        sender: 'bot'
      }
      setMessages(prevMessages => [...prevMessages, botMessage])
    }, 1000)
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