"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const auth_service_1 = require("./auth/service/auth.service");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    const authService = app.get(auth_service_1.AuthService);
    await authService.seedAdminUser();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map