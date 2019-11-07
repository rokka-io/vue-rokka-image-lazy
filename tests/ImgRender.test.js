import { mount } from '@vue/test-utils'
import Img from './ImgRender.vue'

let wrapper = mount(Img)

describe('RokkaImg rendering', () => {
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
