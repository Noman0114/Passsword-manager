'use client'
import React from 'react'
import passData from '@/models/passModel'

const Buttondel = () => {
      const deletehan = async (id=passData._id) => {
 let data = await fetch (`http://localhost:3000/api/passdata/delete/${id}`,{
method: 'DELETE'
 });
 data = await data.json();
if (data.success) {
  alert('Password entry deleted successfully!')
  }}
  return (
    <div>
<button onClick={deletehan}>Delete</button>

    </div>
  )
}

export default Buttondel