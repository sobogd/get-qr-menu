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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitSchema1756339200000 = void 0;
var InitSchema1756339200000 = /** @class */ (function () {
    function InitSchema1756339200000() {
        this.name = 'InitSchema1756339200000';
    }
    InitSchema1756339200000.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: 
                    // Ensure pgcrypto for gen_random_uuid()
                    return [4 /*yield*/, queryRunner.query("CREATE EXTENSION IF NOT EXISTS pgcrypto")];
                    case 1:
                        // Ensure pgcrypto for gen_random_uuid()
                        _a.sent();
                        // Restaurants
                        return [4 /*yield*/, queryRunner.query("\n      CREATE TABLE \"gqm_restaurant\" (\n        \"id\" uuid NOT NULL DEFAULT gen_random_uuid(),\n        \"slug\" varchar(160),\n        \"name\" varchar(200) NOT NULL,\n        \"defaultLocale\" varchar(10) NOT NULL DEFAULT 'en',\n        \"description\" text,\n        \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        CONSTRAINT \"PK_gqm_restaurant_id\" PRIMARY KEY (\"id\"),\n        CONSTRAINT \"UQ_gqm_restaurant_slug\" UNIQUE (\"slug\")\n      )\n    ")];
                    case 2:
                        // Restaurants
                        _a.sent();
                        // Categories
                        return [4 /*yield*/, queryRunner.query("\n      CREATE TABLE \"gqm_category\" (\n        \"id\" uuid NOT NULL DEFAULT gen_random_uuid(),\n        \"name\" varchar(160) NOT NULL,\n        \"slug\" varchar(160),\n        \"sortIndex\" integer NOT NULL DEFAULT 0,\n        \"restaurantId\" uuid NOT NULL,\n        \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        CONSTRAINT \"PK_gqm_category_id\" PRIMARY KEY (\"id\"),\n        CONSTRAINT \"FK_gqm_category_restaurant\" FOREIGN KEY (\"restaurantId\") REFERENCES \"gqm_restaurant\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION\n      )\n    ")];
                    case 3:
                        // Categories
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_gqm_category_name\" ON \"gqm_category\" (\"name\")")];
                    case 4:
                        _a.sent();
                        // Items
                        return [4 /*yield*/, queryRunner.query("\n      CREATE TABLE \"gqm_item\" (\n        \"id\" uuid NOT NULL DEFAULT gen_random_uuid(),\n        \"name\" varchar(200) NOT NULL,\n        \"description\" text,\n        \"priceCents\" integer NOT NULL,\n        \"currency\" varchar(8) NOT NULL DEFAULT 'USD',\n        \"available\" boolean NOT NULL DEFAULT true,\n        \"sortIndex\" integer NOT NULL DEFAULT 0,\n        \"restaurantId\" uuid NOT NULL,\n        \"categoryId\" uuid,\n        \"createdAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        \"updatedAt\" TIMESTAMP NOT NULL DEFAULT now(),\n        CONSTRAINT \"PK_gqm_item_id\" PRIMARY KEY (\"id\"),\n        CONSTRAINT \"FK_gqm_item_restaurant\" FOREIGN KEY (\"restaurantId\") REFERENCES \"gqm_restaurant\"(\"id\") ON DELETE CASCADE ON UPDATE NO ACTION,\n        CONSTRAINT \"FK_gqm_item_category\" FOREIGN KEY (\"categoryId\") REFERENCES \"gqm_category\"(\"id\") ON DELETE SET NULL ON UPDATE NO ACTION\n      )\n    ")];
                    case 5:
                        // Items
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("CREATE INDEX \"IDX_gqm_item_name\" ON \"gqm_item\" (\"name\")")];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    InitSchema1756339200000.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("DROP INDEX IF EXISTS \"IDX_gqm_item_name\"")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE IF EXISTS \"gqm_item\"")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP INDEX IF EXISTS \"IDX_gqm_category_name\"")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE IF EXISTS \"gqm_category\"")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE IF EXISTS \"gqm_restaurant\"")];
                    case 5:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return InitSchema1756339200000;
}());
exports.InitSchema1756339200000 = InitSchema1756339200000;
