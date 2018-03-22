import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { IntlProvider } from 'react-intl';

import { makeSelectLocale } from './selectors';

interface IProps {
    locale?: string;
    messages?: any;
    children: React.ReactNode;
};

class LanguageProvider extends React.PureComponent<IProps, {}>{
    render() {
        return (
            <IntlProvider locale={this.props.locale} key={this.props.locale} messages={this.props.messages[this.props.locale]}>
                {React.Children.only(this.props.children)}
            </IntlProvider>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    locale: makeSelectLocale()
});

export default connect(mapStateToProps, null)(LanguageProvider);