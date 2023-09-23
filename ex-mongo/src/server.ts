import { App } from '@/app';
import { ValidateEnv } from '@utils/validateEnv';
import { routes } from '@routes/index.route';

ValidateEnv();

const app = new App(routes);

app.listen();
