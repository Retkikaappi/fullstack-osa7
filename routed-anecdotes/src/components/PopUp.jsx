import { useEffect } from "react"

const PopUp = ({ notification, setNotification }) => {
  const style = {
    border: 'red 1px solid',
    color: 'green'
  }

  useEffect(() => {
    const notif = setTimeout(() => {
      setNotification('')
    }, 5000)
    return () => clearTimeout(notif)
  },[notification])

  return(
    <p style={style}>{notification}</p>
  )
}
export default PopUp