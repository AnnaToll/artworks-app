const Error = ({ error }: { error: string }) => {
  if (!error) {
    return null
  }
  return (
    <div className="error">{error}</div>
  )
}

export default Error
