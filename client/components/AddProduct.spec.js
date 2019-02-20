/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AddProductForm from './addProductForm'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AddProductForm', () => {
  let addProductForm;

  beforeEach(() => {
    addProductForm = shallow(<AddProductForm />)
  })

  it('renders a form', () => {
    expect(addProductForm.find('form')).to.have.length(1)
  })

  it('has a form with five labels', () => {
    expect(addProductForm.find('label')).to.have.length(5)
  })

  it('has a form with five labels', () => {
    expect(addProductForm.find('label').at(0).text()).to.contain('Product Title')
    // expect(addProductForm.find('form').text()).to.be.equal('Product Title')
  })


})
