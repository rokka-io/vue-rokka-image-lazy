import { mount } from '@vue/test-utils'
import Picture from './PictureRender.vue'

let wrapper = mount(Picture)

describe('RokkaPicture rendering', () => {
  test('renders correctly', () => {
    expect(wrapper.element).toMatchSnapshot()
  })
})
