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
const express_1 = require("express");
require("express-async-errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../utils/config"));
const user_1 = __importDefault(require("../models/user"));
const usersRouter = (0, express_1.Router)();
const populateQuery = [
    { path: 'articles', select: 'title' },
];
// Get All Users
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({}).populate(populateQuery);
    res.json(users);
}));
// Get User by Token
usersRouter.get('/:token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('usersRouter get params:', req.params);
    const { token } = req.params;
    console.log('token:', token);
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.SECRET);
    console.log('getByToken decoded:', decoded);
    const user = decoded;
    const { id } = user;
    const dbUser = yield user_1.default.findById(id);
    res.json({
        success: true,
        user: dbUser,
    });
}));
// Get User Articles by Username
usersRouter.get('/:username/articles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const user = yield user_1.default.findOne({ username: username });
    console.log('backend get user articles user:', user);
    if (user) {
        res.json({
            success: true,
            articles: user.articles,
        });
    }
    else {
        res.status(404).end();
    }
}));
// Delete Article
usersRouter.put('/:username/articles/:articleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, articleId } = req.params;
    console.log('usersRouter put articleId:', articleId);
    const user = yield user_1.default.findOne({ username: username });
    if (user) {
        const { articles } = user;
        const newArticles = articles.filter((article) => article._id.toString() !== articleId);
        user.articles = newArticles;
        yield user.save();
        res.json({
            success: true,
            articles: newArticles,
        });
    }
    else {
        res.status(404).end();
    }
}));
// Delete User
usersRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield user_1.default.findByIdAndDelete(req.params.id);
    res.status(204).end();
}));
exports.default = usersRouter;
