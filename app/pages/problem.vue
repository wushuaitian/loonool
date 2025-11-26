<template>
  <div class="problem-page">
    <div class="problem-container">
      <div class="faq-title">常见问题</div>
      <div class="faq-list">
        <div class="faq-card" v-for="item in faqList" :key="item.title">
          <div class="faq-content">
            <div class="faq-question">{{ item.title }}</div>
            <p v-if="item.body" class="faq-body" v-html="item.body"></p>
            <ul v-if="item.points?.length" class="faq-points">
              <li v-for="point in item.points" :key="point" v-html="point"></li>
            </ul>
            <p v-if="item.footer" class="faq-footer" v-html="item.footer"></p>
          </div>
          <div class="faq-icon">{{ item.icon }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface FaqItem {
  title: string;
  body?: string;
  points?: string[];
  footer?: string;
  icon: string;
}

const faqList: FaqItem[] = [
  {
    title: '1. LOONOOL 是什么？',
    body: 'LOONOOL 是一款帮助你判断图片是否适合商用（Safe-to-Use）的工具。你上传一张图片，我们会自动分析视觉、文案和基础行业规则，并生成一份清晰易懂的可用性报告。',
    icon: '😊'
  },
  {
    title: '2. LOONOOL 和普通相似度工具有什么不同？',
    body: '大多数相似度工具只告诉你“这张图和别人像不像”。LOONOOL 的关注点不是“像”，而是：这张图是否适合商用？有没有可能造成视觉混淆或误解？我们会从可用性的维度分析图片：',
    points: [
      '是否存在让人看不清、误读、误解的视觉结构',
      '是否有容易被常见误判混淆的关键元素',
      '图形的稳健度、辨识度是否足够',
      '哪些部分可能在应用场景中出现问题'
    ],
    footer:
      '简单来说：相似度工具告诉你像不像；LOONOOL 告诉你“能不能用、哪里要注意、怎么改更稳”。',
    icon: '💡'
  },
  {
    title: '3. LOONOOL 适合谁使用？',
    body: '面向品牌方、设计机构、自由设计师、电商卖家、内容创作者及需要大量视觉素材的团队，帮助在上线前排查潜在风险。',
    icon: '👥'
  },
  {
    title: '4. Safe-to-Use 报告里面有什么？',
    body: '报告会包含整体可用性评估、风险权重、问题定位截图、修改建议以及推荐的备选方案，方便团队快速沟通与决策。',
    icon: '📄'
  }
];
</script>

<style scoped lang="scss">
.problem-page {
  min-height: 100vh;
  padding: 80px 0 120px;
  background: linear-gradient(135deg, #ffe6f5 0%, #f7f3ff 40%, #e7f3ff 100%);
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  color: #1c1f2a;
}

.problem-container {
  width: min(1020px, calc(100% - 80px));
  margin: 0 auto;
  padding: 60px 70px 80px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 36px;
  box-shadow: 0 40px 80px rgba(111, 120, 255, 0.15);
}

.faq-title {
  font-size: 42px;
  font-weight: 600;
  text-align: center;
  letter-spacing: 2px;
}

.faq-list {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.faq-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 32px 36px;
  border-radius: 26px;
  border: 1px solid #eceeff;
  background: #fff;
  box-shadow: 0 20px 40px rgba(180, 186, 255, 0.18);
}

.faq-content {
  flex: 1;
}

.faq-question {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #1f2233;
}

.faq-body,
.faq-footer {
  font-size: 16px;
  color: #5a5e72;
  line-height: 1.8;
  margin: 0;
}

.faq-points {
  margin: 16px 0 0 0;
  padding-left: 20px;
  color: #5a5e72;
  font-size: 15px;
  line-height: 1.9;

  li {
    margin-bottom: 6px;
  }
}

.faq-footer {
  margin-top: 16px;
  font-weight: 500;
  color: #3b3f72;
}

.faq-icon {
  min-width: 70px;
  min-height: 70px;
  border-radius: 22px;
  border: 1px dashed #cfd3ff;
  background: #f5f6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
}

@media (max-width: 768px) {
  .problem-container {
    width: calc(100% - 40px);
    padding: 40px 30px 60px;
  }

  .faq-card {
    flex-direction: column;
    align-items: flex-start;
  }

  .faq-icon {
    align-self: flex-end;
  }
}
</style>