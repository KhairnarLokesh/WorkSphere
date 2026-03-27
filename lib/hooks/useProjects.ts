import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Project } from '@/lib/models'

export function useProjects(companyId: string | undefined) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!companyId) {
      setLoading(false)
      return
    }

    const fetchProjects = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('projects')
          .select('*')
          .eq('company_id', companyId)
          .order('created_at', { ascending: false })

        if (dbError) throw dbError

        setProjects(
          (data || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            description: p.description,
            companyId: p.company_id,
            status: p.status,
            startDate: p.start_date,
            endDate: p.end_date,
            managerId: p.manager_id,
            teamMemberIds: p.team_member_ids || [],
            budget: p.budget,
            kpiTarget: p.kpi_target,
            riskLevel: p.risk_level,
            createdAt: p.created_at,
            updatedAt: p.updated_at,
          }))
        )
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [companyId])

  return { projects, loading, error }
}
