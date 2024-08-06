import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-hidden items-center justify-center">
      {/* <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl">Page Not Found</p> */}
<img src="/images/not.jpg" className="" />
<Link to='/' className="absolute bottom-12 py-3 px-10 text-white font-bold bg-blue-600">
Go to home
</Link>
    </div>
  )
}

export default NotFound