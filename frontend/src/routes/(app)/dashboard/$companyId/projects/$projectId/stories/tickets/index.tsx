import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(app)/dashboard/$companyId/projects/$projectId/stories/tickets/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>Hello "/company/$companyId/projects/$projectId/stories/tickets/"!</div>
  )
}
