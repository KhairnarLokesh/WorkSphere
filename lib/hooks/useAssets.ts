import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Asset } from '@/lib/models'

export function useAssets(companyId: string | undefined) {
  const [assets, setAssets] = useState<Asset[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setLoading(false)
      return
    }

    const fetchAssets = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('assets')
          .select('*')
          .eq('company_id', companyId)
          .order('created_at', { ascending: false })

        if (dbError) throw dbError

        setAssets(
          (data || []).map((a: any) => ({
            id: a.id,
            name: a.name,
            description: a.description,
            type: a.type,
            companyId: a.company_id,
            status: a.status,
            currentUser: a.current_user_id,
            location: a.location,
            value: a.value,
            purchaseDate: a.purchase_date,
            expiryDate: a.expiry_date,
            serialNumber: a.serial_number,
            createdAt: a.created_at,
            updatedAt: a.updated_at,
          }))
        )
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch assets')
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [companyId])

  return { assets, loading, error }
}
