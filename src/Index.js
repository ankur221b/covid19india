import React, { useEffect } from 'react';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Helmet } from 'react-helmet';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Index = () => {
	return (
		<>
			<div></div>
		</>
	);
};

export default Index;
