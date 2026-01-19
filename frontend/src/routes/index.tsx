import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <>
    <div className='bg-slate-800 text-white p-4 rounded-lg text-center'>Hello "/"! i am the home page</div>
  </>
}
