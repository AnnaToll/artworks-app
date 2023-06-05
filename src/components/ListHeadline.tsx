
const ListHeadline = ({ headline }: { headline: string }) => {
  return (
    <div className="list-headline-container text-center">
      <h2>{headline}</h2>
      <hr />
    </div>
  )
}

export default ListHeadline
