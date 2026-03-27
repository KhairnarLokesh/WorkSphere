# Enterprise Performance Management Platform

A comprehensive Next.js and Supabase-powered platform for managing industry performance, team collaboration, and organizational resources with role-based access control. The app uses Zustand stores for state management and custom React hooks for data fetching. Supabase queries are executed automatically when components mount.

## Features

### Core Features
- **Role-Based Access Control**: SUPERADMIN, MANAGER, and EMPLOYEE roles with different dashboard layouts
- **Project Management**: Create, track, and manage projects with team assignments
- **Task Management**: Assign tasks, track progress, and manage dependencies
- **Gantt Charts**: Visualize project timelines and schedules
- **Asset Management**: Track company assets and their allocation
- **Analytics & KPIs**: Monitor team performance and project metrics
- **Real-Time Chat**: Communicate with team members within projects
- **Risk Assessment**: Identify and manage project risks

### Admin Features
- **User Management**: Create, edit, and manage users with role assignment at profile creation
- **Bulk User Import**: Import users via CSV for faster onboarding
- **Department Management**: Organize users into departments
- **Role Management**: Configure permissions for each role
- **Audit Logging**: Track system activities and changes
- **System Settings**: Configure platform-wide settings

### Dashboard Variants
- **SUPERADMIN Dashboard**: Full system overview, user management, analytics
- **MANAGER Dashboard**: Team oversight, project management, performance metrics
- **EMPLOYEE Dashboard**: Personal task tracking, project participation, performance

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **State Management**: Zustand
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase project (create one at [supabase.com](https://supabase.com))
- pnpm package manager

### Installation

1. **Clone and install dependencies**
```bash
pnpm install
```

2. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

3. **Run development server**
```bash
pnpm dev
```

4. **Set up Supabase database**
See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for detailed database schema and setup instructions.

## Project Structure

```
src/
├── app/
│   ├── dashboard/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── gantt/
│   │   ├── assets/
│   │   ├── analytics/
│   │   ├── chat/
│   │   ├── users/
│   │   └── settings/
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── role-guard.tsx
│   ├── dashboard/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   ├── admin-dashboard.tsx
│   │   ├── manager-dashboard.tsx
│   │   └── employee-dashboard.tsx
│   ├── features/
│   │   ├── projects/
│   │   ├── tasks/
│   │   ├── assets/
│   │   ├── chat/
│   │   ├── users/
│   │   └── admin/
│   └── ui/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── admin.ts
│   ├── store.ts
│   ├── rbac.ts
│   ├── models.ts
│   ├── services/
│   │   ├── kpi.ts
│   │   ├── mail.ts
│   │   └── notifications.ts
│   ├── hooks/
│   │   ├── useProjects.ts
│   │   ├── useTasks.ts
│   │   └── useAssets.ts
│   ├── utils/
│   │   ├── analytics.ts
│   │   ├── csv.ts
│   │   ├── validation.ts
│   │   ├── dates.ts
│   │   ├── export.ts
│   ├── middleware/
│   │   └── authMiddleware.ts
│   └── rbac.ts
└── globals.css
```

## Role-Based Features

### SUPERADMIN
- Access to all features
- User management (create, edit, delete)
- Role and permission management
- System settings and configuration
- Audit logging
- Company settings
- Department management
- Budget and KPI oversight

### MANAGER
- Project management and team oversight
- Task delegation and tracking
- Team member management
- Analytics and performance metrics
- Risk assessment
- Gantt chart access
- Chat and collaboration
- Asset management

### EMPLOYEE
- Personal task management
- Project participation
- Performance analytics (personal)
- Chat and team communication
- Asset allocation tracking

## Key Utilities

### Analytics (`lib/utils/analytics.ts`)
- Task analytics calculation
- Project analytics
- KPI calculation
- Risk scoring

### CSV Import (`lib/utils/csv.ts`)
- Parse user CSV files
- Validate user data
- Download CSV templates

### Validation (`lib/utils/validation.ts`)
- Email validation
- Password validation
- Date validation
- Phone number validation
- Generic form validation

### Date Utilities (`lib/utils/dates.ts`)
- Format relative dates
- Parse date strings
- Check if dates are overdue/upcoming
- Calculate date ranges

### Export Utilities (`lib/utils/export.ts`)
- Export data to CSV/JSON
- Download files
- Export table data

## API Reference

### Supabase Data Layer

#### User Operations
```typescript
getUser(userId: string): Promise<UserProfile | null>
createUser(userId: string, userData: Partial<UserProfile>): Promise<void>
updateUser(userId: string, updates: Partial<UserProfile>): Promise<void>
getUsersByRole(companyId: string, role: string): Promise<UserProfile[]>
```

#### Project Operations
```typescript
getProject(projectId: string): Promise<Project | null>
getProjectsByCompany(companyId: string): Promise<Project[]>
createProject(projectData: Partial<Project>): Promise<string>
updateProject(projectId: string, updates: Partial<Project>): Promise<void>
```

#### Task Operations
```typescript
getTask(taskId: string): Promise<Task | null>
getTasksByProject(projectId: string): Promise<Task[]>
getTasksByAssignee(userId: string): Promise<Task[]>
createTask(taskData: Partial<Task>): Promise<string>
updateTask(taskId: string, updates: Partial<Task>): Promise<void>
```

See [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) for complete API documentation.

## State Management

### useAppStore
Manages global application state including current user and loading states.

```typescript
import { useAppStore } from '@/lib/store'

const { currentUser, isLoading, setCurrentUser, setIsLoading } = useAppStore()
```

### useUIStore
Manages UI state like sidebar visibility and navigation items.

```typescript
import { useUIStore } from '@/lib/store'

const { sidebarOpen, navigationItems, setSidebarOpen } = useUIStore()
```

## Custom Hooks

### useProjects
```typescript
const { projects, loading, error } = useProjects(companyId)
```

### useTasks
```typescript
const { tasks, loading, error } = useTasksByProject(projectId)
const { tasks, loading, error } = useTasksByAssignee(userId)
```

### useAssets
```typescript
const { assets, loading, error } = useAssets(companyId)
```

All hooks use the Supabase client internally to query the PostgreSQL database and return typed data.

## Role Access Control

Use the `RoleGuard` component to protect features:

```typescript
<RoleGuard requiredFeature="user_management">
  <AdminPanel />
</RoleGuard>
```

Or check access programmatically:

```typescript
import { canAccess } from '@/lib/rbac'

if (canAccess(userRole, 'projects')) {
  // Show projects feature
}
```

## Development

### Running Tests
```bash
pnpm test
```

### Building for Production
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## Deployment

Deploy to Vercel:

1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

## Documentation

- [Supabase Setup Guide](./SUPABASE_SETUP.md) - Database schema and RLS policies
- [Component Documentation](./COMPONENT_DOCS.md) - UI component usage
- [API Reference](./API_REFERENCE.md) - Detailed API documentation

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## Support

For issues, questions, or feature requests, please open an issue on the repository.

## License

MIT License - see LICENSE file for details
