import React from 'react'
import { mount } from 'enzyme'
import { expect } from 'chai'
import Tooltip from './component'

describe('Tooltip', () => {
  // test for testing tests
  it('renders content', () => {
    const wrapper = mount(
      <Tooltip content={<div className="test" />}>
        <div />
      </Tooltip>
    )

    expect(wrapper.find('.test')).to.have.length(1)
  })
})