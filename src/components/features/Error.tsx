const Error = ({ error }: { error: string | boolean }) => {
  if (!error) {
    return null
  }
  return (
    <div className="error">{error}</div>
  )
}

export default Error
