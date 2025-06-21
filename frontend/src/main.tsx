import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux'
import './index.css'
import { store } from './store/index.ts'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import {routeTree} from './routeTree.gen.ts'

const router = createRouter({ routeTree })
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
createRoot(document.getElementById('root')!).render(
  <StrictMode> 
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider> 
  </StrictMode>,
)
