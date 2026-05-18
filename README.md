# Rui Yao Bond Blog

静态科技博客雏形，适合直接部署到 Cloudflare Pages。

## 本地预览

直接用浏览器打开 `index.html` 即可。

## Cloudflare Pages 部署建议

1. 新建一个 GitHub 仓库，把这些文件推上去。
2. Cloudflare Dashboard 进入 `Workers & Pages`。
3. 选择 `Create application`，在 `Pages` 里导入 Git 仓库。
4. 构建设置：
   - Production branch: `main`
   - Build command: 留空
   - Build output directory: `/`
5. 部署成功后，在 Pages 项目的 `Custom domains` 添加 `ruiyao.bond`。

## 后续可升级

- 把文章改成独立 Markdown 文件。
- 增加 `/posts/article-slug/` 独立文章页。
- 增加标签页、搜索、评论和访问统计。
