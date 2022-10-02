import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Loading } from './loading';

const Story: ComponentMeta<typeof Loading> = {
  component: Loading,
  title: 'Loading',
};
export default Story;

const Template: ComponentStory<typeof Loading> = (args) => (
  <Loading {...args} />
);

export const Primary = Template.bind({});
Primary.args = {};
