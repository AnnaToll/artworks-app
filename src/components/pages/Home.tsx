import Banner from '../Banner'
import Artworks from '../art/Artworks'
import useFetch from '../../hooks/useFetch'
import { useEffect } from 'react'
import ListContainer from '../containers/ListContainer'
import type { NavObj } from '../../context/Nav.types'
import Main from '../containers/MainContainer'

interface Category {
  id: number
  category: string
  priority: number
  text: string
}

const Home = ({ data }: { data: NavObj }) => {
  const { data: categories, error, fetchGet } = useFetch('/home')

  useEffect(() => {
    fetchGet()
  }, [])
  return (
    <>
      <Banner data={data} />
      { error }
      <Main data={data}>
        { categories.map((category: Category) => (
          <>
            {category.priority && <ListContainer key={category.id} headline={category.category}>
              { category.text ? <div dangerouslySetInnerHTML={{ __html: category.text }} className='text-page-text mb-4 text-center' /> : <></> }
              <Artworks id={category.id} />
            </ListContainer>}
          </>
        ))}
      </Main>
    </>
  )
}

export default Home
