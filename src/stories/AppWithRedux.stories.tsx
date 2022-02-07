import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./ decorators/ReduxStoreProviderDecorator";
import {Provider} from "react-redux";
import {store} from "../state/store";
import StoryRouter from 'storybook-react-router';


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'AppWithRedux',
    component: AppWithRedux,
    decorators:[ReduxStoreProviderDecorator,StoryRouter()]
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) => <Provider store={store}><AppWithRedux/></Provider>;

export const AppWithReduxPrime = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
AppWithReduxPrime.args = {};
