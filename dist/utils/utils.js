"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapCategories = exports.isMultipleOfTen = exports.joiErrorsIntoArray = exports.generateResponseBody = void 0;
const config_service_1 = require("../config/config.service");
function generateResponseBody(status = 200, data = [], msg = '') {
    return ({
        status,
        data,
        msg: msg.replaceAll(`\"`, "")
    });
}
exports.generateResponseBody = generateResponseBody;
function joiErrorsIntoArray(error) {
    return error.replaceAll("\"", "'");
}
exports.joiErrorsIntoArray = joiErrorsIntoArray;
function isMultipleOfTen(number) {
    return number % 10 === 0;
}
exports.isMultipleOfTen = isMultipleOfTen;
function mapCategories(categories) {
    const currentLang = config_service_1.ConfigService.get('lang');
    let customisedCategories = [];
    categories.forEach((category) => {
        const customisedCategory = {
            id: category.id,
            title: ''
        };
        customisedCategory.title = (currentLang == 'ar') ? category.title_ar : category.title_en;
        customisedCategories.push(customisedCategory);
    });
    return customisedCategories;
}
exports.mapCategories = mapCategories;
//# sourceMappingURL=utils.js.map