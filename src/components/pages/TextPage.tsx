import Headline from '../Headline'
import type { NavObj } from '../../context/Nav.types'
import Banner from '../Banner'
import Main from '../containers/MainContainer'

const TextPage = ({ data }: { data: NavObj }) => {
  return (
    <>
      <Banner data={data} />
      <Main data={data}>
        <section className='text-page-container'>
          { data.page_img && (
            <div className='text-page-image-container'><img className="text-page-image" src={data.page_img} alt={`${data.name}-image`}/></div>
          )}
          <div className='text-page-content-container'>
            <Headline headline={data.name} />
            <div dangerouslySetInnerHTML={{ __html: data.text }} className='text-page-text' />
          </div>
        </section>
      </Main>
    </>
  )
}

export default TextPage
