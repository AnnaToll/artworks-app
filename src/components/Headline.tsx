const Headline = ({ headline, isCentered = false }: { headline: string, isCentered?: boolean }) => {
  return (
    <div className={`headline-container ${isCentered ? 'text-center' : ''}`}>
      <h1>{ headline }</h1>
      <hr />
    </div>
  )
}

export default Headline
