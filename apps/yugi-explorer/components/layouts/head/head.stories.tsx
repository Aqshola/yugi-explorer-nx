import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Head } from './head';

const Story: ComponentMeta<typeof Head> = {
  component: Head,
  title: 'Head',
};
export default Story;

const Template: ComponentStory<typeof Head> = (args) => <Head {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: '',
  description: '',
};
