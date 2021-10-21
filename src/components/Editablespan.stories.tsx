import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {Editablespan} from "./Editablespan";
import {action} from "@storybook/addon-actions";



// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Editablespan',
    component: Editablespan,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
      onChangeNewTitle:action ("Titile was changed")
    }
} as ComponentMeta<typeof Editablespan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Editablespan> = (args) => <Editablespan {...args} />;

export const EditablespanPrime = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditablespanPrime.args = {
    title:"Title will be changed",
};

