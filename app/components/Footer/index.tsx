import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import A from 'app/components/A';
import Wrapper from './Wrapper';
import messages from './messages';


const Footer = () => (
    <Wrapper>
        <section>
            <FormattedMessage {...messages.licenseMessage} />
        </section>
        <section>
            <FormattedMessage {...messages.authorMessage} values={{
                author: <A href='https://twitter.com/mxstbr'>Max Stoiber</A>
            }} />
        </section>
    </Wrapper>
)

export default Footer;