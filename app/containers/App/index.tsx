import * as React from 'react';
import { Helmet } from 'react-helmet'
import { FormattedMessage } from 'react-intl';
import { Switch, Route } from 'react-router-dom';

import Button from 'app/components/Button';
import Header from 'app/components/Header';
import Footer from 'app/components/Footer';

import HomePage from 'app/containers/HomePage';
import FeaturesPage from 'app/containers/FeaturesPage';

import AppWrapper from './AppWrapper'
import messages from './messages';

class App extends React.Component<{}, {}>{

    render() {
        return (
            <AppWrapper>
                <Helmet
                    titleTemplate='%s - React typescript started'
                    defaultTitle='React typescript started'>
                    <meta name="description" content="A React.ts started from Boilerplate application" />
                </Helmet>
                <Header />
                <Switch>
                    <Route exact path='/' component={HomePage} />
                    <Route path='/features' component={FeaturesPage} />
                </Switch>
                <Footer />
            </AppWrapper>
        )
    }
}

export default App;