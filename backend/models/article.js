"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const articleSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
    },
    teaser: {
        type: String,
        required: true,
    },
    articleBody: {
        type: String,
        required: true,
    },
    articleStatus: {
        type: Number,
        default: 1,
    },
    created: {
        type: Date,
        required: true,
        default: new Date(),
    },
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
});
articleSchema.set('toJSON', {
    transform: (document, returnedArticle) => {
        returnedArticle.id = returnedArticle._id.toString();
        delete returnedArticle._id;
        delete returnedArticle.__v;
    },
});
const ArticleModel = mongoose_1.default.model('Article', articleSchema);
exports.default = ArticleModel;
