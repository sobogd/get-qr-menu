"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
var typeorm_1 = require("typeorm");
var Restaurant_1 = require("./Restaurant");
var Category_1 = require("./Category");
var Item = /** @class */ (function () {
    function Item() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
        __metadata("design:type", String)
    ], Item.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Index)(),
        (0, typeorm_1.Column)({ type: 'varchar', length: 200 }),
        __metadata("design:type", String)
    ], Item.prototype, "name", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], Item.prototype, "description", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int' }),
        __metadata("design:type", Number)
    ], Item.prototype, "priceCents", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', length: 8, default: 'USD' }),
        __metadata("design:type", String)
    ], Item.prototype, "currency", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: true }),
        __metadata("design:type", Boolean)
    ], Item.prototype, "available", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'boolean', default: false }),
        __metadata("design:type", Boolean)
    ], Item.prototype, "isDemo", void 0);
    __decorate([
        (0, typeorm_1.Column)({ type: 'int', default: 0 }),
        __metadata("design:type", Number)
    ], Item.prototype, "sortIndex", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Restaurant_1.Restaurant; }, { onDelete: 'CASCADE' }),
        __metadata("design:type", Restaurant_1.Restaurant)
    ], Item.prototype, "restaurant", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Category_1.Category; }, { onDelete: 'SET NULL', nullable: true }),
        __metadata("design:type", Category_1.Category)
    ], Item.prototype, "category", void 0);
    __decorate([
        (0, typeorm_1.CreateDateColumn)(),
        __metadata("design:type", Date)
    ], Item.prototype, "createdAt", void 0);
    __decorate([
        (0, typeorm_1.UpdateDateColumn)(),
        __metadata("design:type", Date)
    ], Item.prototype, "updatedAt", void 0);
    Item = __decorate([
        (0, typeorm_1.Entity)()
    ], Item);
    return Item;
}());
exports.Item = Item;
