import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "./Task";
import {TaskPriority, TaskStatus} from "../api/tasks-api";
import {v1} from "uuid";

let todolistID1 = v1()


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
    title: 'Task',
    component: Task,
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
   args: {
       changeChecked:action ("Changed checked"),
       removetask:action ("Task was removed"),
       onChangeNewTitle:action ("Changed task Title"),
   }

} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskPrimeIsDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskPrimeIsDone.args = {
    task:{id:"1", title: "Hello", status: TaskStatus.Completed,todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
    todolistID:"todolistId1",
};

export const TaskPrimeIsNotDone = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskPrimeIsNotDone.args = {
    task:{id:"1", title: "Hello", status: TaskStatus.New,todoListId:todolistID1,startDate:"",deadline:"",priority: TaskPriority.Middle,addedDate:"", order: 0,description:""},
    todolistID:"todolistId1",
};