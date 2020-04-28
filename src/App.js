import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Layout from './hoc/Layout/Layout';
import Fisherman from './containers/Fisherman/Fisherman';
import Management from './containers/Management/Management';

import {Route, Switch} from 'react-router-dom';

function App() {
  
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route path="/fisherman" exact component={Fisherman} />
          <Route path="/management" exact component={Management} />
          <Route path="/" exact component={Fisherman} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
