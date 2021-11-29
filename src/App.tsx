import React from 'react';
import './App.css';
import Provider from './context/Provider';
import UnionComponent from './components/UnionComponent';

function App() {
    return (
        <Provider>
            <UnionComponent />
        </Provider>
    );
}

export default App;
