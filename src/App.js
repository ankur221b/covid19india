import React from 'react';
import Index from './Index';
import State from './State';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
const App = () => {
	return (
        <Router>
            <main>
                <Routes>
                 <Route exact path='/' element={<Index/>}></Route>
                 <Route exact path='/:state' element={<State/>}></Route>
                </Routes>
            </main>
        </Router>
	);
};

export default App;