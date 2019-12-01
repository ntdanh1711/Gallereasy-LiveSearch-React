import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './scenes/home';


const App = () => {
  return (
    <Router>
		<Switch>
			<Route exact path='/' component={Home} />
			{/* <Route exact path='/:id' component={CharacterContainer} /> */}
		</Switch>
	</Router>
  );
}

export default App;
