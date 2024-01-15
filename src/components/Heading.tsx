import { motion } from 'framer-motion'
import React from 'react'

type Props = {
  children: String
}

const Heading = (props: Props) => {
  return (
    <>
      {/* <motion.div
        initial={{
          y: 200,
          opacity: 0,
          scale: 1.2,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        viewport={{ once: true }}
        transition={{
          duration: 0.5,
        }}
      > */}
      <h2 className="text-3xl uppercase text-accent pb-8">{props.children}</h2>
      {/* </motion.div> */}
    </>
  )
}

export default Heading
