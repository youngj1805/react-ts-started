import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import H1 from 'app/components/H1';
import messages from './messages';

const NotFoundPage = () => (
    <article>
        <H1>
            <FormattedMessage {...messages.header} />
        </H1>
    </article>
)

export default NotFoundPage;