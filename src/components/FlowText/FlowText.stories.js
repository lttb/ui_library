import React from 'react';
import { storiesOf } from '@storybook/react';
import FlowText from './index';

const text = `One common flaw we've seen in many frameworks is a lack of support for truly responsive text. While elements on the page resize fluidly, text still resizes on a fixed basis. To ameliorate this problem, for text heavy pages, we've created a class that fluidly scales text size and line-height to optimize readability for the user. Line length stays between 45-80 characters and line height scales to be larger on smaller screens.
To see Flow Text in action, slowly resize your browser and watch the size of this text body change! Use the button above to toggle off/on flow-text to see the difference!`;

storiesOf('FlowText', module).add('Range ', () => <FlowText text={text} />);
