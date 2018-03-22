import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR } from './constansts';

export const loadRepos = () => ({ type: LOAD_REPOS });
export const reposLoaded = (repos, username) => ({ type: LOAD_REPOS_SUCCESS, repos, username });
export const repoLoadingError = (error) => ({ type: LOAD_REPOS_ERROR, error });
