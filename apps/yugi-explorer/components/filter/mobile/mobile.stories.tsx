import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Mobile } from './mobile';

const Story: ComponentMeta<typeof Mobile> = {
  component: Mobile,
  title: 'Mobile',
};
export default Story;

const Template: ComponentStory<typeof Mobile> = (args) => <Mobile {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  inputValue: '',
};
