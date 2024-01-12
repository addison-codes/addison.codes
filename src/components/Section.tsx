import React from 'react'

import Heading from './Heading'

type Props = {
  children: React.ReactNode
  heading: String
}

const Section = (props: Props) => {
  return (
    <section className="container mx-auto mt-24">
      <Heading>{props.heading}</Heading>
      <div className="flex mx-auto gap-8">{props.children}</div>
    </section>
  )
}

export default Section
