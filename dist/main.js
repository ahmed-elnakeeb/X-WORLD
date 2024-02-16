"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const config_service_1 = require("./config/config.service");
const en_responses_1 = require("./responses/en.responses");
const app_module_1 = require("./app.module");
config_service_1.ConfigService.set('responses', en_responses_1.responses);
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = process.env.PORT || 3000;
    app.setGlobalPrefix('api/v1');
    await app.listen(port);
    console.log(`app use port ${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map