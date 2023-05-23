import Main from '../../containers/MainContainer'
import Headline from '../../Headline'

interface EditWrapperProps {
  title: string
  headline: string
  children: JSX.Element | JSX.Element[]
}

const EditWrapper = ({ title, headline, children }: EditWrapperProps) => {
  return (
    <Main title={title}>
      <section className='edit-container'>
        <Headline headline={headline} />
        { children }
      </section>
    </Main>
  )
}

export default EditWrapper
