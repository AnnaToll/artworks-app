import ListHeadline from '../ListHeadline'

interface ListContainerProps {
  children: JSX.Element[] | JSX.Element
  headline: string
}

const ListContainer = ({ children, headline }: ListContainerProps) => {
  return (
    <section className='artworks-container'>
      <ListHeadline headline={headline} />
      { children }
    </section>
  )
}

export default ListContainer
