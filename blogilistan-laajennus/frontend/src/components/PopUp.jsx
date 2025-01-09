import { useSelector } from 'react-redux'

const PopUp = () => {
  const { message, type } = useSelector((state) => state.popup)

  if (message === null) {
    return null
  }

  return (
    <div className={type}>
      <h3>{message}</h3>
    </div>
  )
}

export default PopUp
