/**
 * @description 失败信息集合，包括 code 和 message
 * @description 博文相关
 */

module.exports = {
    // 创建微博失败
    createArticleFailInfo: {
        code: 11001,
        message: "创建失败，请重试"
    },
   
    // 删除微博失败
    deleteArticleFailInfo: {
        code: 11002,
        message: "删除失败，请重试"
    },

    // 创建微博失败
    createTagFailInfo: {
        code: 11003,
        message: "创建标签失败，请重试"
    },
    // 删除微博失败
    deleteTagFailInfo: {
        code: 11004,
        message: "删除标签失败，请重试"
    },
};
