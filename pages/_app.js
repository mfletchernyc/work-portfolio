import React from 'react'
import PropTypes from 'prop-types'

import 'tailwindcss/tailwind.css'

function App({ Component }) {
  return <Component />
}

App.propTypes = {
  Component: PropTypes.func.isRequired
}

export default App
