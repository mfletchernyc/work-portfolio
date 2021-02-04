const query = `
  query {
    generalSettings {
      title
    }
    posts {
      nodes {
        title
        content
      }
    }
  }
`

const options = {
  url: 'https://fletcher.nyc/work/graphql',
  method: 'post',
  headers: { 'Content-Type': 'application/json' },
  data: { query }
}

export default options
