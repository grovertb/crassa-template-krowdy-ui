import base from 'reducers/base'

import { getProducts, watchProductsServer } from './sagas'

export default base({
  initialState: {
    items: []
  },
  namespace: 'crassa',
  store    : 'products'
}).extend({
  creators: ({ types }) => ({
    getProducts: () => ({ type: types.FETCH })
  }),
  sagas: duck => ({
    getProducts: getProducts(duck)
  }),
  selectors: ({ store }) => ({
    getProducts: state => state[store].items,
    getStatus  : state => state[store].status
  }),
  takes: (duck) => ([
    watchProductsServer(duck)
  ])
})
