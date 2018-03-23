import * as Loadable from 'react-loadable';

import LoadingIndicator from 'app/components/LoadingIndicator';

export default Loadable({
    loader: () => import('./index'),
    loading: LoadingIndicator
});