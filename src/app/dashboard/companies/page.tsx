'use client'
import React, { useCallback, useMemo } from 'react'
import { DataTable } from './data-table'
import { columns } from './columns'
import { Companies } from '@/interfaces/company'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCompany } from './_Actions/deleteCompany'




export default function Page() {
  const queryClient = useQueryClient()
const fetchCompanies = useCallback(async () => {
  const res = await fetch('/api/dashboard/companies')
  if (!res.ok) throw new Error('FETCH_FAILED')
  return res.json()
}, [])
  const { data, isLoading } = useQuery<Companies>({
    queryKey: ['companies'],
    queryFn: fetchCompanies,
    staleTime: 60_000,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const deleteMutation = useMutation({
  mutationFn: deleteCompany,
  onSuccess: (_, variables) => {
    queryClient.setQueryData<Companies>(['companies'], oldData => ({
      ...oldData!,
      data: oldData!.data.filter(c => c.id !== variables.id),
    }))
  },
})

 const memoColumns = useMemo(
  () => columns(deleteMutation.mutate),
  [deleteMutation.mutate]
)

  return (
    <div className="min-h-screen">
      <div className="w-[90%] mx-auto py-10">
        {isLoading ? (
          <div className="min-h-screen -mt-4 flex justify-center items-center">
            <span className="loader"></span>
          </div>
        ) : (
          <DataTable columns={memoColumns} data={data!.data} />
        )}
      </div>
    </div>
  )
}
