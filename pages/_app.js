import React from 'react'
import PropTypes from 'prop-types'

import 'tailwindcss/tailwind.css'

function Portfolio({ Component, pageProps }) {
  return <Component {...pageProps} />
}

Portfolio.propTypes = {
  Component: PropTypes.func.isRequired
}

export default Portfolio
