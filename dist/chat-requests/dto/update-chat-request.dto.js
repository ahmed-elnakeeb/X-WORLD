"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateChatRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_chat_request_dto_1 = require("./create-chat-request.dto");
class UpdateChatRequestDto extends (0, mapped_types_1.PartialType)(create_chat_request_dto_1.CreateChatRequestDto) {
}
exports.UpdateChatRequestDto = UpdateChatRequestDto;
//# sourceMappingURL=update-chat-request.dto.js.map