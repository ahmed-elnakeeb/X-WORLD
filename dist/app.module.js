"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const category_module_1 = require("./category/category.module");
const color_module_1 = require("./color/color.module");
const setting_module_1 = require("./setting/setting.module");
const user_module_1 = require("./user/user.module");
const tweet_module_1 = require("./tweet/tweet.module");
const set_app_lang_middleware_1 = require("./middleware/set-app-lang.middleware");
const authentication_middleware_1 = require("./middleware/authentication.middleware");
const auth_module_1 = require("./auth/auth.module");
const file_upload_module_1 = require("./file-upload/file-upload.module");
const notification_module_1 = require("./notification/notification.module");
const comment_module_1 = require("./comment/comment.module");
const chat_requests_module_1 = require("./chat-requests/chat-requests.module");
const cron_service_1 = require("./cron/cron.service");
const messaging_module_1 = require("./messaging/messaging.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(set_app_lang_middleware_1.SetAppLang).forRoutes('*');
        consumer.apply(authentication_middleware_1.Authentication).exclude({ path: '/auth/(.*)', method: common_1.RequestMethod.ALL }, { path: '/setting', method: common_1.RequestMethod.GET }, { path: '/category', method: common_1.RequestMethod.GET }).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            category_module_1.CategoryModule,
            color_module_1.ColorModule,
            setting_module_1.SettingModule,
            user_module_1.UserModule,
            tweet_module_1.TweetModule,
            auth_module_1.AuthModule,
            file_upload_module_1.FileUploadModule,
            notification_module_1.NotificationModule,
            comment_module_1.CommentModule,
            chat_requests_module_1.ChatRequestsModule,
            messaging_module_1.MessagingModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, cron_service_1.CronService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map