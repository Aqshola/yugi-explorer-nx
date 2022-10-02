import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Deck } from './deck';

const Story: ComponentMeta<typeof Deck> = {
  component: Deck,
  title: 'Deck',
  argTypes: {
    callbackDeck: { action: 'callbackDeck executed!' },
  },
};
export default Story;

const Template: ComponentStory<typeof Deck> = (args) => <Deck {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  imageSrc: '',
  id: '',
};
