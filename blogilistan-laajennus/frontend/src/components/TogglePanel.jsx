import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'

const TogglePanel = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showOn = { display: visible ? 'none' : '' }
  const showOff = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <>
      <div style={showOn}>
        <button onClick={toggleVisible}>{props.btnLabel}</button>
      </div>
      <div style={showOff}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </>
  )
})

TogglePanel.displayName = 'TogglePanel'

TogglePanel.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

export default TogglePanel
