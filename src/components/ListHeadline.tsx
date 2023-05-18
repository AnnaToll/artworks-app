
const ListHeadline = ({ headline }: { headline: string }) => {
  return (
    <div className="list-headline-container">
      <h2>{headline}</h2>
      <hr />
    </div>
  )
}

export default ListHeadline
