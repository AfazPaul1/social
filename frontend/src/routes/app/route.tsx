import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'

export const Route = createFileRoute('/app')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>
    <h1>Hello "/app"!</h1>
    <Link to="/app/dashboard">Dashboard</Link>
    <Link to="/app/settings">Settings</Link>
    <Outlet />
    </div>
}
