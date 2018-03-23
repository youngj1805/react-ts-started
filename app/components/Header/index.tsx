import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import A from './A';
import Img from './Img';
import Navbar from './Navbar';
import HeaderLink from './HeaderLink';
import messages from './messages';
const Banner = require('./banner.jpg');

const Header = () => (
    <div>
        <A href='https://twitter.com/mxstbr'>
            <Img src={Banner} alt='react typescript started' />
        </A>
        <Navbar>
            <HeaderLink to='/'>
                <FormattedMessage {...messages.home} />
            </HeaderLink>
            <HeaderLink to='/features'>
                <FormattedMessage {...messages.features} />
            </HeaderLink>
            <HeaderLink to='/notfound'>
                another route
            </HeaderLink>
        </Navbar>
    </div>
)

export default Header;