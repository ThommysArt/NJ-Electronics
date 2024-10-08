"use client"
import { useRouter } from 'next/navigation'
import React from 'react'

const AdminPage = () => {
  const router = useRouter()

  React.useEffect(()=>{
    router.push("/admin/dashboard")
  },[])
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <h1 className="font-bold text-2xl md:text-3xl">
        Welcome to the Admin Dashboard
      </h1>
    </div>
  )
}

export default AdminPage