import React from 'react'

function PageTitle({title} : {title: string}) {
  return (
    <h1 className="text-xl text-gray-500 font-bold uppercase">
        {title}
    </h1>
  )
}

export default PageTitle