"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chat_requests_status = exports.Notification_types = exports.BAN_LEVEL_DURATIONS = exports.BAN_LEVEL = exports.Role = exports.Gender = exports.AccessLevels = void 0;
var AccessLevels;
(function (AccessLevels) {
    AccessLevels["USER"] = "USER";
    AccessLevels["ADMIN"] = "ADMIN";
})(AccessLevels || (exports.AccessLevels = AccessLevels = {}));
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
})(Gender || (exports.Gender = Gender = {}));
var Role;
(function (Role) {
    Role["USER"] = "USER";
    Role["ADMIN"] = "ADMIN";
})(Role || (exports.Role = Role = {}));
var BAN_LEVEL;
(function (BAN_LEVEL) {
    BAN_LEVEL["NONE"] = "NONE";
    BAN_LEVEL["FIRST"] = "FIRST";
    BAN_LEVEL["SECOND"] = "SECOND";
    BAN_LEVEL["THIRD"] = "THIRD";
})(BAN_LEVEL || (exports.BAN_LEVEL = BAN_LEVEL = {}));
var BAN_LEVEL_DURATIONS;
(function (BAN_LEVEL_DURATIONS) {
    BAN_LEVEL_DURATIONS["NONE"] = "0";
    BAN_LEVEL_DURATIONS["FIRST"] = "7d";
    BAN_LEVEL_DURATIONS["SECOND"] = "1m";
    BAN_LEVEL_DURATIONS["THIRD"] = "inf";
})(BAN_LEVEL_DURATIONS || (exports.BAN_LEVEL_DURATIONS = BAN_LEVEL_DURATIONS = {}));
var Notification_types;
(function (Notification_types) {
    Notification_types["VOTE"] = "VOTE";
    Notification_types["COMMENT"] = "COMMENT";
    Notification_types["CHAT"] = "CHAT";
})(Notification_types || (exports.Notification_types = Notification_types = {}));
var Chat_requests_status;
(function (Chat_requests_status) {
    Chat_requests_status["PENDING"] = "PENDING";
    Chat_requests_status["ACCEPTED"] = "ACCEPTED";
    Chat_requests_status["REJECTED"] = "REJECTED";
})(Chat_requests_status || (exports.Chat_requests_status = Chat_requests_status = {}));
//# sourceMappingURL=enum.js.map