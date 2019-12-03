import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Main from './component/Main'

const App: React.FC = () => {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={Main}/>
                </Switch>
            </Router>
        </div>
    );
};

export default App;
