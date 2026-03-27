import { NextRequest, NextResponse } from 'next/server'
import { getAISuggestions } from '@/lib/utils/resource-optimizer'

export async function POST(request: NextRequest) {
    try {
        const { projectId, companyId, estimatedHours, requiredSkills, taskTitle } = await request.json()

        if (!projectId || !companyId || !taskTitle) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        // TODO: Replace with Supabase queries to fetch real users and tasks
        const suggestions = await getAISuggestions(
            [], // mocked users
            [], // mocked active tasks
            [], // mocked completed tasks
            estimatedHours || 0,
            requiredSkills || [],
            taskTitle
        )

        return NextResponse.json({ suggestions })

    } catch (error: any) {
        console.error('Error suggesting assignees:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
