export type UserRole = 'SUPERADMIN' | 'MANAGER' | 'EMPLOYEE'
export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'IN_REVIEW' | 'COMPLETED'
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED'
export type AssetStatus = 'AVAILABLE' | 'IN_USE' | 'MAINTENANCE' | 'RETIRED'
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'

export interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  avatar?: string
  companyId: string
  departmentId?: string
  phone?: string
  status: 'active' | 'inactive' | 'pending'
  createdAt: string
  updatedAt: string
  createdBy: string // User ID of creator
  skills?: string[]
  baseCapacityHours?: number
}

export interface Company {
  id: string
  name: string
  industry?: string
  website?: string
  logo?: string
  address?: string
  country?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Department {
  id: string
  name: string
  companyId: string
  managerId?: string
  description?: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface Project {
  id: string
  name: string
  description?: string
  companyId: string
  status: ProjectStatus
  startDate: string
  endDate: string
  managerId: string
  teamMemberIds: string[]
  budget?: number
  kpiTarget?: number
  riskLevel: RiskLevel
  createdAt: string
  updatedAt: string
}

export interface Task {
  id: string
  projectId: string
  title: string
  description?: string
  assignedTo: string // User ID
  status: TaskStatus
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  dueDate: string
  completedDate?: string
  estimatedHours?: number
  requiredSkills?: string[]
  actualHours?: number
  dependencies: string[] // Task IDs
  attachments: string[] // File paths
  createdAt: string
  updatedAt: string
  createdBy: string
}

export interface Asset {
  id: string
  name: string
  description?: string
  type: string
  companyId: string
  status: AssetStatus
  currentUser?: string // User ID if in use
  location?: string
  value?: number
  purchaseDate?: string
  expiryDate?: string
  serialNumber?: string
  createdAt: string
  updatedAt: string
}

export interface ChatMessage {
  id: string
  projectId?: string
  senderId: string
  senderName: string
  message: string
  attachments?: string[]
  createdAt: string
  updatedAt: string
}

export interface KPIMetric {
  id: string
  projectId: string
  metricName: string
  targetValue: number
  currentValue: number
  unit: string
  lastUpdated: string
  createdAt: string
}

export interface RiskAssessment {
  id: string
  projectId: string
  riskName: string
  description?: string
  likelihood: number // 1-5
  impact: number // 1-5
  mitigation?: string
  owner: string // User ID
  status: 'OPEN' | 'MITIGATED' | 'CLOSED'
  createdAt: string
  updatedAt: string
}
