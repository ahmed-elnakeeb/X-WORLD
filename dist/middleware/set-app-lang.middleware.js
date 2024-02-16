"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetAppLang = void 0;
const common_1 = require("@nestjs/common");
const en_responses_1 = require("../responses/en.responses");
const ar_responses_1 = require("../responses/ar.responses");
const config_service_1 = require("../config/config.service");
let SetAppLang = class SetAppLang {
    use(req, res, next) {
        const lang = req.headers['lang'] || 'en';
        config_service_1.ConfigService.set('lang', lang);
        if (lang == 'en') {
            config_service_1.ConfigService.set('responses', en_responses_1.responses);
        }
        else {
            config_service_1.ConfigService.set('responses', ar_responses_1.responses);
        }
        next();
    }
};
exports.SetAppLang = SetAppLang;
exports.SetAppLang = SetAppLang = __decorate([
    (0, common_1.Injectable)()
], SetAppLang);
//# sourceMappingURL=set-app-lang.middleware.js.map