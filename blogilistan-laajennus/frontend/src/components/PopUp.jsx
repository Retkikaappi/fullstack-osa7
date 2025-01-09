const PopUp = ({ popMsg, popUpType }) => {
  if (popMsg === null) {
    return null
  }

  return (
    <div className={popUpType}>
      <h3>{popMsg}</h3>
    </div>
  )
}

export default PopUp
