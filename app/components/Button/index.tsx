import * as React from 'react';

import A from './A';
import StyledButton from './StyledButton';
import Wrapper from './Wrapper';

interface IButtonProps {
    handleRoute?: (evt) => void;
    href?: string;
    onClick?: (evt) => void;
    children: React.ReactNode;
    noWrapper?: boolean
}

const Button = (props: IButtonProps) => {
    let button = (<A href={props.href} onClick={props.onClick} children={props.children} />)
    if (props.handleRoute) {
        button = <StyledButton onClick={props.handleRoute} children={props.children} />
    }
    return props.noWrapper === true ? button : (<Wrapper>{button}</Wrapper>);
}
export default Button;
