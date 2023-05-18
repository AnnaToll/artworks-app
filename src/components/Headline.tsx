const Headline = ({ headline }: { headline: string }) => {
  return (
    <div className="headline-container">
      <h1>{ headline }</h1>
      <hr />
    </div>
  )
}

export default Headline
