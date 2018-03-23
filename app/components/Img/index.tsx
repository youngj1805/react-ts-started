import * as React from 'react';
interface IImgProps {
    src: string | any;
    alt: string;
    className?: string;
}

const Img = (props: IImgProps) => (<img {...props} />);

export default Img;