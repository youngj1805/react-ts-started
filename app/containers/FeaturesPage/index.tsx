import * as React from 'react';
import Helmet from 'react-helmet';
import H1 from 'app/components/H1';


class FeaturesPage extends React.PureComponent<{}, {}>{
    render() {
        return (
            <article >
                <Helmet>
                    <title>FeaturesPage</title>
                    <meta name='description' content='A React.ts started from Boilerplate application FeaturesPage' />
                </Helmet>
                <H1 >Features Page!</H1>
            </article>
        )
    }
}

export default FeaturesPage;