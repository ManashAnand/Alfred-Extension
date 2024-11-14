import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { ChevronDown, LogOut, User, Settings, HelpCircle } from 'lucide-react'
import { supabase } from "~core/supabase"


const Profile = ({user,setUser}) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const toggleDropdown = () => setIsOpen(!isOpen)
  
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
          setIsOpen(false)
        }
      }
  
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [])
  return (
    <>
     <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center p-2 space-x-2 rounded-full bg-white  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            {user.email[0].toUpperCase()}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <button
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <User className="mr-3 h-5 w-5 text-gray-400" />
              Profile
            </button>
            <button
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <Settings className="mr-3 h-5 w-5 text-gray-400" />
              Settings
            </button>
            <a
              href='https://alfred-tau.vercel.app/'
              target='_blank'
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <HelpCircle className="mr-3 h-5 w-5 text-gray-400" />
              Website
            </a>
            <button
              onClick={() => {
                supabase.auth.signOut()
                setUser(null)
                console.log('Logging out...')
              }}
              className="flex w-full items-center px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
            >
              <LogOut className="mr-3 h-5 w-5 text-gray-400" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
    </>
  )
}

export default Profile
