import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/dashboard/projects/all/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/projects/all/"!</div>
}
