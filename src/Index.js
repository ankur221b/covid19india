import React, { useEffect } from 'react';
import createDOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import { Helmet } from 'react-helmet';

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

const Index = () => {
	return (
		<>
			<div>
				{/* {
					<div
						dangerouslySetInnerHTML={{
							__html: DOMPurify.sanitize(html),
						}}
					/>
				} */}
				<Helmet>
					<script type="module" src="./src/script.js"></script>
				</Helmet>
				{/* <script src="./script.js"></script> */}
			</div>
		</>
	);
};

export default Index;
