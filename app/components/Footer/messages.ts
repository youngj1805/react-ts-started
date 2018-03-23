import { defineMessages } from 'react-intl';

const messages = defineMessages({
    licenseMessage: {
        id: 'app.components.Footer.license.message',
        defaultMessage: 'This project is licensed under the MIT license.',
    },
    authorMessage: {
        id: 'app.components.Footer.author.message',
        defaultMessage: `
          Made with love by {author}.
        `,
    },
})

export default messages;