import React, {useState} from 'react';

function Test(props) {
    //this is stuff with react hooks, so we use this to set/change state on a variable without it being super annoying basically
    //here we set testVar to 'example' as the initial state, we can use setVar to change the state of the variable
    const [testVar, setVar] = useState('example')

    return(
        <h2>Test component :p</h2>
    );
}

export default Test;