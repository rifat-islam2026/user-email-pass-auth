import { Outlet } from "react-router-dom"
import Header from "../Header/Header"

function Root() {
  return (
      <div>
          <Header/>
      <Outlet/>
    </div>
  )
}

export default Root
