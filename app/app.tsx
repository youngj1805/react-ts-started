import 'file-loader?name=[name].[ext]!./favicon.ico';
import '!file-loader?name=[name].[ext]!./manifest.json';
import 'file-loader?name=[name].[ext]!./.htaccess';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import * as FontFaceObserver from 'fontfaceobserver';
const openSansObserver = new FontFaceObserver('Open Sans', {});
const styles = require('app/containers/App/styles.module.css');

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
    document.body.classList.add(styles.fontLoaded);
}, () => {
    document.body.classList.remove(styles.fontLoaded);
});

// Import i18n messages
import { translationMessages } from './i18n';

import App from 'app/containers/App';

const render = () => {
    ReactDOM.render(
        <App />,
        document.getElementById('app')
    )
};
// Hot reloadable translation json files
if (module.hot) {
    // modules.hot.accept does not accept dynamic dependencies,
    // have to be constants at compile-time
    module.hot.accept('./i18n', () => {
        render();
    })
}


// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
    (new Promise((resolve) => {
        resolve(System.import('intl'));
    }))
        .then(() => Promise.all([
            System.import('intl/locale-data/jsonp/en.js'),
            System.import('intl/locale-data/jsonp/de.js'),
        ]))
        .then(() => render())
        .catch((err) => {
            throw err;
        });
} else {
    render();
}


// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
        onUpdating: () => {
            console.log('SW Event:', 'onUpdating');
        },
        onUpdateReady: () => {
            console.log('SW Event:', 'onUpdateReady');
            return OfflinePluginRuntime.applyUpdate();
        },
        onUpdated: () => {
            console.log('SW Event:', 'onUpdated');
            window.swUpdate = true;
        },
    });
}
