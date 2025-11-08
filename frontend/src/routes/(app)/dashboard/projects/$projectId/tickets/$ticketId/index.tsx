import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/(app)/dashboard/projects/$projectId/tickets/$ticketId/',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      Hello "/company/$companyId/projects/$projectId/stories/tickets/ticketId/"!
    </div>
  )
}
