import * as React from 'react';
import { Helmet } from 'react-helmet';
import H1 from 'app/components/H1';

class HomePage extends React.PureComponent<{}, {}>{
    render() {
        return (
            <article >
                <Helmet>
                    <title>Home Page</title>
                    <meta name='description' content='A React.ts started from Boilerplate application HomePage' />
                </Helmet>
                <H1 >Home Page!</H1>
            </article>
        )
    }
}

export default HomePage;