import React, { Component } from 'react';
import Toolbar from '../../components/Toolbar/Toolbar';

import './Layout.css';

class Layout extends Component {

    render () {
        return (
            <React.Fragment>
                <Toolbar />
                <main className="content">
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}



export default Layout;