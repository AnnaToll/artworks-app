const Error = ({ error }: { error: string }) => {
  console.log(error)
  // if (!error) {
  //   return null
  // }
  return (
    <div className="error">{error}</div>
  )
}

export default Error
