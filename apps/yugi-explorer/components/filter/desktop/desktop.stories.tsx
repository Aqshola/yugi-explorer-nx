import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Desktop } from './desktop';

const Story: ComponentMeta<typeof Desktop> = {
  component: Desktop,
  title: 'Desktop',
};
export default Story;

const Template: ComponentStory<typeof Desktop> = (args) => (
  <Desktop {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  inputValue: '',
};
