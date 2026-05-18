const posts = [
  {
    title: "第一篇：这个博客准备写什么",
    date: "2026-05-18",
    summary: "先把 ruiyao.bond 作为一个长期记录空间跑起来，再逐步补文章、分类和个人介绍。",
    tags: ["Blog", "Start"],
    body: [
      "这个站点目前是一个静态博客雏形，重点是轻、快、容易部署。",
      "后续可以把文章拆成 Markdown，也可以接入更完整的博客框架。现在先保留最少依赖，方便直接放到 Cloudflare Pages。",
      "第一批内容可以从 AI 工具链、个人自动化、工程实践、域名和部署踩坑开始。"
    ]
  },
  {
    title: "Cloudflare Pages 适合个人博客吗",
    date: "2026-05-18",
    summary: "如果博客主要是文章和静态页面，Pages 是很舒服的选择：免费额度够用，部署简单，域名绑定顺滑。",
    tags: ["Cloudflare", "Deploy"],
    body: [
      "个人博客如果不需要数据库和后台评论，静态站通常是最省心的方案。",
      "把代码放到 GitHub，Cloudflare Pages 绑定仓库后，每次 push 都会自动发布。",
      "如果以后需要评论、搜索或订阅，也可以逐步接入第三方服务或 Cloudflare Workers。"
    ]
  },
  {
    title: "下一步可以升级的方向",
    date: "2026-05-18",
    summary: "补真实文案、增加 Markdown 文章源、做标签页、加搜索和深色阅读体验。",
    tags: ["Roadmap", "Design"],
    body: [
      "第一版先确认视觉方向和信息结构。",
      "第二版可以加入 Markdown 文章目录，让每篇文章都是独立链接，更利于搜索引擎收录。",
      "第三版再考虑评论、全文搜索、访问统计和自动生成 RSS。"
    ]
  }
];

const postGrid = document.querySelector("#postGrid");
const reader = document.querySelector("#reader");
const readerMeta = document.querySelector("#readerMeta");
const readerTitle = document.querySelector("#readerTitle");
const readerBody = document.querySelector("#readerBody");

function renderPosts() {
  postGrid.innerHTML = posts.map((post, index) => `
    <article class="post-card" tabindex="0" role="button" data-post="${index}">
      <time datetime="${post.date}">${post.date}</time>
      <h3>${post.title}</h3>
      <p>${post.summary}</p>
      <div class="tag-row">${post.tags.map(tag => `<span>${tag}</span>`).join("")}</div>
    </article>
  `).join("");
}

function openPost(index) {
  const post = posts[index];
  readerMeta.textContent = `${post.date} / ${post.tags.join(" · ")}`;
  readerTitle.textContent = post.title;
  readerBody.innerHTML = post.body.map(paragraph => `<p>${paragraph}</p>`).join("");
  reader.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeReader() {
  reader.hidden = true;
  document.body.style.overflow = "";
}

renderPosts();

postGrid.addEventListener("click", event => {
  const card = event.target.closest(".post-card");
  if (card) openPost(Number(card.dataset.post));
});

postGrid.addEventListener("keydown", event => {
  if ((event.key === "Enter" || event.key === " ") && event.target.matches(".post-card")) {
    event.preventDefault();
    openPost(Number(event.target.dataset.post));
  }
});

document.addEventListener("click", event => {
  if (event.target.matches("[data-close-reader]")) closeReader();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !reader.hidden) closeReader();
});

const canvas = document.querySelector("#signalField");
const context = canvas.getContext("2d");
let points = [];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * ratio);
  canvas.height = Math.floor(window.innerHeight * ratio);
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.min(72, Math.floor(window.innerWidth / 16)) }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35
  }));
}

function drawSignalField() {
  context.clearRect(0, 0, window.innerWidth, window.innerHeight);
  context.fillStyle = "rgba(80, 230, 255, 0.75)";
  context.strokeStyle = "rgba(80, 230, 255, 0.15)";

  for (const point of points) {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < 0 || point.x > window.innerWidth) point.vx *= -1;
    if (point.y < 0 || point.y > window.innerHeight) point.vy *= -1;

    context.beginPath();
    context.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
    context.fill();
  }

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const dx = points[i].x - points[j].x;
      const dy = points[i].y - points[j].y;
      const distance = Math.hypot(dx, dy);
      if (distance < 130) {
        context.globalAlpha = 1 - distance / 130;
        context.beginPath();
        context.moveTo(points[i].x, points[i].y);
        context.lineTo(points[j].x, points[j].y);
        context.stroke();
      }
    }
  }
  context.globalAlpha = 1;
  requestAnimationFrame(drawSignalField);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();
drawSignalField();
