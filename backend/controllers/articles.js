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
const article_1 = __importDefault(require("../models/article"));
const articlesRouter = (0, express_1.Router)();
articlesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('GET');
    const articles = yield article_1.default.find({}).populate('user', { username: 1 });
    console.log('articles:', articles);
    res.json(articles);
}));
articlesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article = yield article_1.default.findById(req.params.id);
    if (article)
        res.json(article);
    else
        res.status(404).end();
}));
articlesRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('POST');
    const { body, user } = req;
    if (!user) {
        return res.status(401).json({ error: 'missing or invalid token' });
    }
    const { article } = body;
    const { title, snippet, url, image_url, created } = article;
    const newArticleModel = new article_1.default({
        title,
        snippet,
        url,
        image_url,
        created,
        user: user.id,
    });
    const savedArticleModel = yield newArticleModel.save();
    user.articles = user.articles.concat(savedArticleModel._id);
    yield user.save();
    res.status(201).json(savedArticleModel);
}));
articlesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const { user } = req;
    if (!user) {
        return res.status(401).json({
            error: 'missing or invalid token',
        });
    }
    const articleToDelete = yield article_1.default.findById(id);
    if (((_a = articleToDelete === null || articleToDelete === void 0 ? void 0 : articleToDelete.user) === null || _a === void 0 ? void 0 : _a.toString()) !== user.id.toString()) {
        res.status(401).end();
    }
    else {
        yield article_1.default.findByIdAndDelete(id);
        res.status(204).end();
    }
}));
articlesRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, snippet, url, image_url, created } = req.body;
    const article = {
        title,
        snippet,
        url,
        image_url,
        created,
    };
    const updatedArticleModel = yield article_1.default.findByIdAndUpdate(id, article, {
        new: true,
    });
    res.json(updatedArticleModel);
}));
exports.default = articlesRouter;
