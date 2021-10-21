import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddItemForm } from './AddItemForm';
import {action} from "@storybook/addon-actions";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'AddItemForm',
    component: AddItemForm,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    addItem: {
      description: "Button"
    }

} as ComponentMeta<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args} />;

export const AddItemFormPrime = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AddItemFormPrime.args = {
    addItem: action ("Add Item"),
};





