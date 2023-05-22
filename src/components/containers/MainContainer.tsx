import { useEffect } from 'react'
import type { NavObj } from '../../context/Nav.types'

interface MainProps {
  data?: NavObj
  title?: string
  children: JSX.Element | JSX.Element[]
}

const Main = ({ data, title = 'Måleri', children }: MainProps) => {
  useEffect(() => { document.title = data?.name || title }, [data])
  return (
    <main>
      {children}
    </main>
  )
}

export default Main
