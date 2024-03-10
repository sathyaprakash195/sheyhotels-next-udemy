import PageTitle from '@/components/page-title'
import React, { Suspense } from 'react'
import ReportsFilters from './_common/reports-filters'
import ReportsData from './_common/reports-data'
import Spinner from '@/components/spinner'

function ReportsPage({searchParams}: {searchParams: any}) {
  const suspenseKey = JSON.stringify(searchParams)
  return (
    <div>
      <PageTitle title="Reports" />

      <ReportsFilters
        searchParams={searchParams}
       />

       <Suspense
        key={suspenseKey}
        fallback={<Spinner fullHeight/>}
       >
         <ReportsData 
         
            searchParams={searchParams}
         />
       </Suspense>
    </div>
  )
}

export default ReportsPage