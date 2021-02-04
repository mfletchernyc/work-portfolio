import React from 'react'
import PropTypes from 'prop-types'

import 'tailwindcss/tailwind.css'

function App({ Component, pageProps }) {
  return <Component portfolio={pageProps.portfolio} error={pageProps.error} />
}

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({
    portfolio: PropTypes.shape({
      generalSettings: PropTypes.shape({
        title: PropTypes.string
      }),
      posts: PropTypes.PropTypes.shape({
        nodes: PropTypes.instanceOf(Array)
      })
    }),
    error: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ])
  }).isRequired
}

export default App
