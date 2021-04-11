import makeApp from './app';
import { setupDi } from './loaders/di';
import { GRAPHQL_PATH } from './Constants';

const container = setupDi();
const app = makeApp({ container });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(
    '\x1b[36m%s\x1b[0m',
    `Running a GraphQL API server on port ${PORT} \nVisit http://localhost:${PORT}${GRAPHQL_PATH} to view playground`
  )
);
