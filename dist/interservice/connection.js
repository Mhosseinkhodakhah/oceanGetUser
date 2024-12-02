"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class interConnection {
    reqto() {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {};
            const rawResponse = yield fetch(`${process.env.content}/interservice/`, {
                method: 'GET',
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            const response = yield rawResponse.json();
            return response;
        });
    }
    getLessons() {
        return __awaiter(this, void 0, void 0, function* () {
            const rawResponse = yield fetch(`http://localhost:5003/app/interservice/get-data-for-headers`, {
                method: 'GET',
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                },
            });
            const response = yield rawResponse.json();
            return response;
        });
    }
}
exports.default = interConnection;
