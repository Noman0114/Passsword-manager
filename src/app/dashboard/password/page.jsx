'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Pencil, Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
// import Buttondel from '@/components/Buttondel'

export default function PassInfoPage() {
  const router = useRouter();
  const [passData, setPassData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [editingPass, setEditingPass] = useState(null)

  useEffect(() => {
    fetchPassData()
  }, [])

  const fetchPassData = async () => {
    try {
      const response = await fetch('/api/passdata/getpass')
      if (!response.ok) {
        throw new Error('Failed to fetch password data')
      }
      const data = await response.json()
      setPassData(data)
      setLoading(false)
    } catch (err) {
      setError('Error fetching password data.')
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    console.log(id);
    
    try {
      const response = await fetch(`http://localhost:3000/api/passdata/delete/${id}`, {
        method: 'DELETE',
      });
  router.push('/dashboard');
      if (!response.ok) {
        throw new Error('Failed to delete password data');
      }
  
      // Update the state to remove the deleted password from the list
      setPassData(passData.filter(pass => pass.id !== id));
    } catch (error) {
      setError('Error deleting password data.');
      console.error('Error:', error);
    }
  };

  const handleEdit = (pass) => {
    setEditingPass(pass)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    if (!editingPass) return

    try {
      const response = await fetch(`http://localhost:3000/api/passdata/update/${editingPass.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingPass),
      })
      if (!response.ok) {
        throw new Error('Failed to update password data')
      }
      setPassData(passData.map(pass => pass.id === editingPass.id ? editingPass : pass))
      setEditingPass(null)
    } catch (err) {
      setError('Error updating password data.')
    }
  }
  return (
    <div className="flex flex-col items-center p-6 bg-white min-h-screen">
      <h1 className="text-4xl font-bold text-black mb-4">Saved Password Data</h1>
      {loading ? (
        <p className="text-black text-lg">Loading...</p>
      ) : error ? (
        <p className="text-red-500 text-lg">{error}</p>
      ) : (
        <div className="w-full max-w-md">
          {passData.length > 0 ? (
            passData.map((pass) => (
              <Card key={pass._id} className="mb-4">
                <CardContent className="p-4 flex justify-between items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <p className="text-black font-semibold cursor-pointer">{pass.info}</p>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{pass.info}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="text-right font-semibold">Email:</p>
                          <p className="col-span-3">{pass.email}</p>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <p className="text-right font-semibold">Password:</p>
                          <p className="col-span-3">{pass.password}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <div>
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(pass)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* <Buttondel id={passinfo._id}/> */}
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(pass._id)}>
  <Trash2 className="h-4 w-4" />
</Button>

                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-black text-lg">No passwords saved yet.</p>
          )}
        </div>
      )}
      
      {editingPass && (
        <Dialog open={!!editingPass} onOpenChange={() => setEditingPass(null)}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Password Data</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="info" className="text-right">Info:</label>
                <Input
                  id="info"
                  value={editingPass.info}
                  onChange={(e) => setEditingPass({...editingPass, info: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">Email:</label>
                <Input
                  id="email"
                  value={editingPass.email}
                  onChange={(e) => setEditingPass({...editingPass, email: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="password" className="text-right">Password:</label>
                <Input
                  id="password"
                  value={editingPass.password}
                  onChange={(e) => setEditingPass({...editingPass, password: e.target.value})}
                  className="col-span-3"
                />
              </div>
              <Button type="submit">Update</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}