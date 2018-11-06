/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {gotAllProducts} from './product'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {product: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('gotAllProducts', () => {
    it('eventually dispatches the GET_PRODUCT action', async () => {
      const fakeProduct = {
          id: 3,
          title: "Rain",
          description: "Rainy",
          price: 5, //might have to change this?
          inventory: 10,
          imageUrl: 'img.png',
          createdAt: '2018-11-05 17:56:45.672-05',
          updatedAt: '2018-11-05 17:56:45.672-05'
        }
      mockAxios.onGet('/api/products').replyOnce(200, fakeProduct)
      await store.dispatch(gotAllProducts())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_PRODUCT')
      expect(actions[0].product).to.be.deep.equal(fakeProduct)
    })
  })
})
