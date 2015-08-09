export const style = {
  base: {
    border       : '1px solid #ddd',
    width        : '100%',
    display      : 'inline-block',
    verticalAlign: 'top',

    '@media (min-width: 720px)' : {width: '50%'},
    '@media (min-width: 1024px)' : {width: '33.33%'},
  },

  header: {
    base: {
      background: '#eee',
      padding   : '10px 5px'
    },
    text: {
      fontSize  : '2em',
      fontWeight: '300'
    }
  },

  content: {
    base: {
      padding: '10px 10px',
      height : '250px'
    }
  }
};