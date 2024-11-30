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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const amqplib_1 = __importDefault(require("amqplib"));
class messanger {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.connected && this.channel)
                return;
            else
                this.connected = true;
            try {
                console.log(`⌛️ Connecting to Rabbit-MQ Server`);
                this.connection = yield amqplib_1.default.connect(`amqp://localhost`);
                console.log(`✅ Rabbit MQ Connection is ready`);
                this.channel = yield this.connection.createChannel();
                console.log(`🛸 Created RabbitMQ Channel successfully`);
            }
            catch (error) {
                console.error(error);
                console.error(`Not connected to MQ Server`);
            }
        });
    }
}
exports.default = messanger;
