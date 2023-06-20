import React from 'react'
const RiseFallLabel = (props: any) => {
  const { num, after } = props
  if (num >= 0) {
    return (
      <div style={{ color: 'rgb(12, 192, 127)' }}>
        {num}
        {after}
      </div>
    )
  } else {
    return (
      <div style={{ color: 'rgb(255, 77, 79)' }}>
        {num}
        {after}
      </div>
    )
  }

  //   return <>RiseFallLabel</>
}
export default RiseFallLabel
