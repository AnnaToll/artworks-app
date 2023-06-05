import Artworks from '../art/Artworks'
import Headline from '../Headline'
import type { NavObj } from '../../context/Nav.types'
import Main from '../containers/MainContainer'

const CategoryPage = ({ data }: { data: NavObj }) => {
  console.log(data.name, data.id)
  return (
    <Main data={data}>
      <Headline headline={data.name} isCentered={true} />
      <div dangerouslySetInnerHTML={{ __html: data.text }} className='text-page-text mb-4 text-center' />
      <Artworks id={data.id} />
    </Main>
  )
}

export default CategoryPage
