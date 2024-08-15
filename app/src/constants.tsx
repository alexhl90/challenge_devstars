import { from } from 'env-var';

const env = from({
  REACT_APP_GRAPHQL: import.meta.env.VITE_REACT_APP_GRAPHQL,
});

export const GRAPHQL_ENDPOINT = env.get('REACT_APP_GRAPHQL').required().asString();
