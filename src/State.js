import React from 'react';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const State = () => {
	return (
		<>
			<div></div>
		</>
	);
};

export default State;
