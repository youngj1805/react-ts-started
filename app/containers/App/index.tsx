import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import Wrapper from './Wrapper'
import messages from './messages';

class App extends React.Component<{}, {}>{
    render() {
        return (
            <Wrapper>
                <h1>
                    <FormattedMessage {...messages.helloMessage} />
                </h1>
            </Wrapper>
        )
    }
}

export default App;