import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/dashboard/company/$companyId/projects/all/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$companyId/projects/"!</div>
}
