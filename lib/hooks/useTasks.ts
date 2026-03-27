import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Task } from '@/lib/models'

export function useTasksByProject(projectId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!projectId) {
      setLoading(false)
      return
    }

    const fetchTasks = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('tasks')
          .select('*')
          .eq('project_id', projectId)
          .order('created_at', { ascending: false })

        if (dbError) throw dbError

        setTasks(
          (data || []).map((t: any) => ({
            id: t.id,
            projectId: t.project_id,
            title: t.title,
            description: t.description,
            assignedTo: t.assigned_to,
            status: t.status,
            priority: t.priority,
            dueDate: t.due_date,
            completedDate: t.completed_date,
            estimatedHours: t.estimated_hours,
            requiredSkills: t.required_skills,
            actualHours: t.actual_hours,
            dependencies: t.dependencies || [],
            attachments: t.attachments || [],
            createdAt: t.created_at,
            updatedAt: t.updated_at,
            createdBy: t.created_by,
          }))
        )
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [projectId])

  return { tasks, loading, error }
}

export function useTasksByAssignee(userId: string | undefined) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!userId) {
      setLoading(false)
      return
    }

    const fetchTasks = async () => {
      try {
        setLoading(true)
        const supabase = createClient()
        const { data, error: dbError } = await supabase
          .from('tasks')
          .select('*')
          .eq('assigned_to', userId)
          .order('created_at', { ascending: false })

        if (dbError) throw dbError

        setTasks(
          (data || []).map((t: any) => ({
            id: t.id,
            projectId: t.project_id,
            title: t.title,
            description: t.description,
            assignedTo: t.assigned_to,
            status: t.status,
            priority: t.priority,
            dueDate: t.due_date,
            completedDate: t.completed_date,
            estimatedHours: t.estimated_hours,
            requiredSkills: t.required_skills,
            actualHours: t.actual_hours,
            dependencies: t.dependencies || [],
            attachments: t.attachments || [],
            createdAt: t.created_at,
            updatedAt: t.updated_at,
            createdBy: t.created_by,
          }))
        )
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tasks')
      } finally {
        setLoading(false)
      }
    }

    fetchTasks()
  }, [userId])

  return { tasks, loading, error }
}
