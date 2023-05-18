import Headline from '../Headline'
import type { NavObj } from '../../context/Nav.types'
import Banner from '../Banner'
import Main from '../containers/MainContainer'

const TextPage = ({ data }: { data: NavObj }) => {
  const text = data.text.split('%%').map((p, index) => (
    <p key={index}>{p}</p>
  ))
  return (
    <>
      <Banner data={data} />
      <Main data={data}>
        <section className='text-page-container'>
          { data.page_img && (
            <img className="text-page-image" src={data.page_img} alt={`${data.name}-image`}/>
          )}
          <div>
            <Headline headline={data.name} />
            <p>{text}</p>
          </div>
        </section>
      </Main>
    </>
  )
}

export default TextPage
