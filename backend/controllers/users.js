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
// Get All Users
usersRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_1.default.find({});
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
// Get User Articles by userId
usersRouter.get('/:userId/articles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_1.default.findById(userId);
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
// Get User Categories by userId
usersRouter.get('/:userId/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield user_1.default.findById(userId);
    console.log('backend get user categories user:', user);
    if (user) {
        res.json({
            success: true,
            categories: user.categories,
        });
    }
    else {
        res.status(404).end();
    }
}));
// Add Article
usersRouter.post('/:userId/articles', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('save');
    const { userId } = req.params;
    const { article } = req.body;
    const user = yield user_1.default.findById(userId);
    console.log('user:', user);
    if (user) {
        const { articles } = user;
        console.log('articles:', articles);
        if (articles.includes(article)) {
            return res.json({
                success: false,
                message: 'Article already saved',
            });
        }
        const newArticles = articles.concat(article);
        console.log('newArticles:', newArticles);
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
// Delete Article
usersRouter.delete('/:userId/articles/:articleId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, articleId } = req.params;
    console.log('usersRouter put articleId:', articleId);
    const user = yield user_1.default.findById(userId);
    if (user) {
        const { articles } = user;
        const newArticles = articles.filter((article) => article.uuid !== articleId);
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
// Add Category
usersRouter.post('/:userId/categories', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('save');
    const { userId } = req.params;
    const { category } = req.body;
    console.log('usersRouter put category:', category);
    const user = yield user_1.default.findById(userId);
    console.log('user:', user);
    if (user) {
        const { categories } = user;
        console.log('categories:', categories);
        if (categories.includes(category)) {
            return res.json({
                success: false,
                message: 'Category already saved',
            });
        }
        const newCategories = categories.concat(category);
        console.log('newCategories:', newCategories);
        user.categories = newCategories;
        yield user.save();
        res.json({
            success: true,
            categories: newCategories,
        });
    }
    else {
        res.status(404).end();
    }
}));
// Delete Category
usersRouter.delete('/:userId/categories/:category', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('delete');
    const { userId, category } = req.params;
    console.log('usersRouter put category:', category);
    const user = yield user_1.default.findById(userId);
    if (user) {
        const { categories } = user;
        const newCategories = categories.filter((c) => c !== category);
        user.categories = newCategories;
        yield user.save();
        res.json({
            success: true,
            categories: newCategories,
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
