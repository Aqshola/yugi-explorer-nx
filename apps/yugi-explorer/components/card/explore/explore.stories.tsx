import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Explore } from './explore';

const Story: ComponentMeta<typeof Explore> = {
  component: Explore,
  title: 'Explore',
  argTypes: {
    callbackDeck: { action: 'callbackDeck executed!' },
  },
};
export default Story;

const Template: ComponentStory<typeof Explore> = (args) => (
  <Explore {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imageSrc: '',
  id: '',
};
