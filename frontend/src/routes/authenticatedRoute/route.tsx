import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from '../../store'
import { selectAccessToken } from '../../store/slices/authSlice'
export const Route = createFileRoute('/authenticatedRoute')({
    beforeLoad: async({location}) => {
        const accessToken = selectAccessToken(store.getState())
        console.log(accessToken);
        if(!accessToken) {
            throw redirect({
                to: '/login',
                search: {
                    redirect:location.href
                }
            })
        }
    },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Outlet />
  )
}