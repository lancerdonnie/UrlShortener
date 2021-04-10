import makeApp from './app';
// import repo from './repository';
import { setupDi } from './loaders/awilix';

(async () => {
  const container = setupDi();
  const app = await makeApp({ container });

  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () =>
    console.log(
      '\x1b[36m%s\x1b[0m',
      `Running a GraphQL API server on port ${PORT}`
    )
  );
})();
