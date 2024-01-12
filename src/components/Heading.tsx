import React from 'react'

type Props = {
  children: String
}

const Heading = (props: Props) => {
  return (
    <h2 className="text-3xl uppercase text-accent pb-8">{props.children}</h2>
  )
}

export default Heading
