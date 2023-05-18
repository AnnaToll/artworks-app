import { useEffect } from 'react'
import type { NavObj } from '../../context/Nav.types'

const Main = ({ data, children }: { data: NavObj, children: JSX.Element | JSX.Element[] }) => {
  useEffect(() => { document.title = data.name }, [data])
  return (
    <main>
      {children}
    </main>
  )
}

export default Main
