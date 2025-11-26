<template>
  <div class="faq-page">
    <!-- FAQ 主体 -->
    <main class="faq-wrapper">
      <section class="faq-panel">
        <h1 class="faq-title">常见问题</h1>

        <div class="faq-list">
          <article
            v-for="item in faqs"
            :key="item.id"
            class="faq-item"
          >
            <!-- 问题行 -->
            <button class="faq-header" @click="toggle(item.id)">
              <span class="faq-q">{{ item.id }}. {{ item.question }}</span>
              <span class="square" :class="{ open: activeId === item.id }"></span>
            </button>

            <!-- 答案 -->
            <div class="faq-body" :class="{ show: activeId === item.id }">
              <p class="faq-p" v-for="(p, idx) in item.answer" :key="idx">{{ p }}</p >
            </div>
          </article>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    id: 1,
    question: "LOONOOL 是什么？",
    answer: [
      "LOONOOL 是一款帮助你判断图片是否适合商用（Safe-to-Use）的工具。",
      "你上传图片后，系统会自动分析视觉、文案和基础行业规则，并生成清晰易懂的可用性报告。"
    ]
  },
  {
    id: 2,
    question: "LOONOOL 和普通相似度工具有什么不同？",
    answer: [
      "普通相似度工具告诉你像不像，而 LOONOOL 告诉你能不能用、哪里需要注意、怎么改更稳。",
      "我们分析视觉结构、文案表达、行业规则来识别潜在误读或风险。",
      "我们会从可用性的角度分析图片：",
      "•	是否存在让人看不清、误读、误解的视觉结构",
      "•	是否有容易和常见图形混淆的关键元素",
      "•	图形的稳定度、辨识度是否足够",
      "•	哪些部分可能在应用场景中出现问题",
      "简单来说：",
      "相似度工具告诉你像不像；",
      "LOONOOL 告诉你“能不能用、哪里要注意、怎么改更稳”。",
    ]
  },
  {
    id: 3,
    question: "LOONOOL 适合谁使用？",
    answer: [
      "适合设计师、电商运营、品牌方、市场团队、内容创作者等需要频繁输出视觉内容的人群。",
      "报告能帮助减少返工和沟通成本。"
    ]
  },
  {
    id: 4,
    question: "Safe-to-Use 报告里面有什么？",
    answer: [
      "包括视觉结构分析、文案敏感点识别、基础行业规则提示和修改建议。",
      "报告不构成法律意见。"
    ]
  },
  {
    id: 5,
    question: "LOONOOL 会保存我的图片吗？",
    answer: [
      "不会长期保存。",
      "原图仅用于分析，最多保留 72 小时，之后自动删除。",
      "开启“保存历史”时，保存的也只是报告和缩略图，不是原图。"
    ]
  },
  {
    id: 6,
    question: "图片可以商用吗？你们会给结论吗？",
    answer: [
      "我们提供的是 技术层面的可用性分析与提示，",
      "最终能否商用，还需要结合你的使用场景、地区、文案和实际业务决定。"
    ]
  },
  {
    id: 7,
    question: "支持哪些类型的图片？",
    answer: [
      "•	支持 JPG / PNG / WebP",
      "•	适用于 Logo、图形主视觉、包装图、电商主图等",
      "•	不支持文档、视频、人脸识别或违法违规图像"
    ]
  },
])

const activeId = ref(1)
const toggle = id => {
  activeId.value = activeId.value === id ? null : id
}
</script>

<style>
/* --------- 真正和原型图一致的渐变背景 --------- */
.faq-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 85% 20%, #D8E9FF 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 20% 85%, #E6D7FF 0%, rgba(255,255,255,0) 50%),
    radial-gradient(circle at 50% 50%, #F1ECFF 0%, rgba(255,255,255,0) 60%),
    #FBFBFF; /* 基底 */
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, BlinkMacSystemFont, sans-serif;
}

/* --------- 导航栏 --------- */
.navbar {
  height: 60px;
  padding: 0 48px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

.nav-center {
  display: flex;
  gap: 26px;
}

.nav-link {
  color: #6b7280;
  font-size: 14px;
  text-decoration: none;
}

.nav-link:hover {
  color: #111827;
}

.nav-active {
  font-weight: 600;
  color: #2563eb;
  position: relative;
}

.nav-active::after {
  content: "";
  position: absolute;
  left: 0; right: 0;
  bottom: -6px;
  height: 2px;
  border-radius: 999px;
  background: #2563eb;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background-image: radial-gradient(circle at 30% 30%, #eeeeee 0%, #374151 100%);
}

/* --------- FAQ 主体 --------- */
.faq-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 40px 16px 64px;
}

.faq-panel {
  width: 100%;
  max-width: 1040px;
  background: rgba(255,255,255,0.88);
  backdrop-filter: blur(8px);
  border-radius: 24px;
  padding: 32px 40px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.06);
}

/* 标题 */
.faq-title {
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
  color: #111827;
}

/* FAQ 项 */
.faq-item {
  background: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  overflow: hidden;
  margin-bottom: 16px;
}

/* 问题行（白底） */
.faq-header {
  width: 100%;
  padding: 18px 20px;
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  background: white;
  border: none;
  outline: none;
  cursor: pointer;
}

.faq-header:hover {
  background: #f8f9fa;
}

.faq-q {
  font-weight: 500;
  color: #111827;
}

/* 小正方形占位图标（和你图保持一致） */
.square {
  width: 18px;
  height: 18px;
  border-radius: 6px;
  border: 1px dashed #cbd5e1;
  transition: all 0.2s;
}

.square.open {
  background: #e6f0ff;
  border: 1px solid #93c5fd;
}

/* 答案区域（浅灰） */
.faq-body {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  background: #f5f5f7;
  padding: 0 20px;
  transition: max-height 0.28s ease, opacity 0.18s ease, padding 0.25s ease;
}

.faq-body.show {
  max-height: 500px;
  opacity: 1;
  padding: 14px 20px 18px;
}

.faq-p {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 6px;
  line-height: 1.8;
}
</style>