'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { ShieldCheck, Lock, Mail, Info } from 'lucide-react'

export default function AddPassword() {
  const router = useRouter()
  const [passInfo, setPassInfo] = useState({
    email: '',
    password: '',
    info: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const passClick = async () => {
    setErrorMessage('')
    setSuccessMessage('')
    setIsLoading(true)

    if (!passInfo.email || !passInfo.password || !passInfo.info) {
      setErrorMessage('All fields are required.')
      setIsLoading(false)
      return
    }

    try {
      const response = await axios.post('/api/passdata/postPass', passInfo)
      console.log(response.data)
      setSuccessMessage('Password entry added successfully!')
      setTimeout(() => {
        router.push(`/dashboard/password`)
      }, 2000)
    } catch (error) {
      console.log('Error:', error)
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error)
      } else {
        setErrorMessage('An error occurred while saving the password entry.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center h-[90vh] bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center space-x-2">
          <ShieldCheck className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-gray-900">SecurePass</h1>
        </div>
        <h2 className="text-xl font-semibold text-center text-gray-700">Add Password Entry</h2>
        <form onSubmit={(e) => { e.preventDefault(); passClick(); }} className="space-y-4">
          <div>
            <label htmlFor="info" className="sr-only">Password Info</label>
            <div className="relative">
              <Info className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="info"
                type="text"
                placeholder="Enter information about the password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassInfo({ ...passInfo, info: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="email"
                type="text"
                placeholder="Email or Username"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassInfo({ ...passInfo, email: e.target.value })}
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Enter Password"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassInfo({ ...passInfo, password: e.target.value })}
                required
              />
            </div>
          </div>
          {errorMessage && (
            <p className="text-sm text-red-600 text-center">{errorMessage}</p>
          )}
          {successMessage && (
            <p className="text-sm text-green-600 text-center">{successMessage}</p>
          )}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Password"}
          </button>
        </form>
      </div>
    </div>
  )
}