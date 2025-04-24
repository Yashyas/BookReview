import React from 'react'
import { useParams } from "react-router-dom";

function BookDetails() {
    const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#B2E0D6] text-[#36454F] p-6">
    <h1 className="text-3xl font-bold">Book Details: {id}</h1>
    <p className="mt-2">Reviews, ratings and more will go here.</p>
  </div>
  )
}

export default BookDetails
