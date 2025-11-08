import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/dashboard/$companyId/projects/$projectId/stories/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/company/$companyId/projects/stories/"!</div>
}
