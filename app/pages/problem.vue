<template>
  <div class="problem-page">
    <div class="problem-container">
      <div class="faq-title">常见问题</div>
      <p class="faq-subtitle">围绕 Safe-to-Use 评估，我们整理出 4 大类高频问题，方便快速定位。</p>
      <div class="faq-nav">
        <a
          v-for="category in faqCategories"
          :key="category.id"
          class="faq-nav-button"
          :class="{ 'is-active': activeCategory === category.id }"
          :href="`#${category.id}`"
          role="button"
          @click.prevent="scrollToCategory(category.id)"
        >
          {{ category.label }}
        </a>
      </div>
      <div class="faq-list">
        <section
          v-for="(category, categoryIndex) in faqCategories"
          :key="category.id"
          :id="category.id"
          class="faq-category"
        >
          <div class="faq-category-header">
            <div class="faq-category-label">{{ category.label }}</div>
            <p v-if="category.description" class="faq-category-description">{{ category.description }}</p>
          </div>
          <div
            class="faq-card"
            v-for="(item, itemIndex) in category.items"
            :key="item.question"
            :class="{ 'is-open': isExpanded(getItemKey(category.id, itemIndex)) }"
            @click="toggleAccordion(getItemKey(category.id, itemIndex))"
          >
            <div class="faq-header">
              <div class="faq-question">{{ item.question }}</div>
              <div
                class="faq-toggle"
                :class="{ 'is-open': isExpanded(getItemKey(category.id, itemIndex)) }"
              >
                <svg class="toggle-icon" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <transition name="accordion">
              <div
                v-show="isExpanded(getItemKey(category.id, itemIndex))"
                class="faq-content"
                @click.stop
              >
                <p v-if="item.answer" class="faq-body" v-html="item.answer"></p>
                <ul v-if="item.points?.length" class="faq-points">
                  <li v-for="point in item.points" :key="point" v-html="point"></li>
                </ul>
                <p v-if="item.note" class="faq-footer" v-html="item.note"></p>
              </div>
            </transition>
          </div>
        </section>
      </div>
      <div class="contact-section">
        <div class="contact-content">
          <div class="contact-icon">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="6" width="36" height="28" rx="10" stroke="currentColor" stroke-width="2" />
              <path d="M6 10L20 22L34 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <path d="M12 28H28" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </div>
          <div class="contact-text">
            <p class="contact-message">若以上回答仍未覆盖你的场景，欢迎直接邮件 LOONOOL 团队，我们非常重视每一次真实反馈，并会根据情况尽力回复你的问题与建议。</p>
            <a href="mailto:jinxiqian43@gmail.com" class="contact-email">jinxiqian43@gmail.com</a>
            <p class="contact-subtext">邮件仅用于支持沟通，请放心发送需求与反馈。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

interface FaqItem {
  question: string;
  answer?: string;
  points?: string[];
  note?: string;
}

interface FaqCategory {
  id: string;
  label: string;
  description?: string;
  items: FaqItem[];
}

const faqCategories: FaqCategory[] = [
  {
    id: 'usage',
    label: '使用相关',
    description: '介绍 LOONOOL 的定位、适用场景和基本使用方式。',
    items: [
      {
        question: 'LOONOOL 的定位是什么？',
        answer: 'LOONOOL 是面向图片资产的 Safe-to-Use 评估工具，用技术视角识别图片可用性风险。',
        points: [
          '流程：上传单张图片即可生成结构化评估',
          '关注：视觉稳定度、混淆区块、文案敏感词与基础可用性问题',
          '边界：只提供风险提示，LOONOOL 不提供法律判断，也不会告诉你“可以商用/不可以商用”'
        ]
      },
      {
        question: 'LOONOOL 与传统相似度工具有何不同？',
        answer: '传统工具只强调“像不像”，LOONOOL 更关注“稳不稳”，强调可用性与协作效率。',
        points: [
          '方法：结合结构理解、语义分析与稳定度判断，不止像素比对',
          '呈现：报告采用分段说明和图例，直接指向可优化点',
          '价值：输出风险提示与建议，不给出法律结论'
        ]
      },
      {
        question: '哪些团队更适合使用 LOONOOL？',
        answer: '任何想在上线前降低视觉沟通风险的团队都可使用 LOONOOL。',
        points: [
          '品牌与 Logo 团队：验证辨识度、差异化和延展性',
          '电商与运营团队：批量主图/包装上线前快速体检',
          '市场、广告与跨部门团队：需要统一可用性口径的协作场景'
        ]
      },
      {
        question: '生成 Safe-to-Use 报告前需要登录吗？',
        answer: '需要登录后才能生成报告，确保素材安全与历史可追溯。',
        points: [
          '登录后可追踪上传记录与版本迭代',
          '可基于角色控制访问权限与分享范围',
          '异常情况可快速定位责任方并处理'
        ]
      }
    ]
  },
  {
    id: 'report',
    label: '报告相关',
    description: '说明 Safe-to-Use 报告的结构、分享方式与使用方式。',
    items: [
      {
        question: 'Safe-to-Use 报告包含哪些内容？',
        answer: '报告以“是否可安心投入使用”为核心，拆解多项技术指标。',
        points: [
          '视觉稳定度与辨识度结论',
          '潜在混淆点或文案风险的可视化标注（非法律建议）',
          '场景建议与 Safe / Review / Risk 等级提示'
        ]
      },
      {
        question: '报告可以分享或下载吗？',
        answer: '可以。报告支持导出 PDF 或生成安全分享链接，方便协作。',
        points: [
          '导出 PDF 便于内部归档与审批',
          '分享链接默认只读，可设置有效期与访问限制',
          '公开链接不会暴露你的账号和历史记录，可随时撤销'
        ]
      },
      {
        question: '分析异常时应该怎么处理？',
        answer: '系统会提示异常原因，并指引你调整后重试。',
        points: [
          '常见原因：文件超规格、格式不支持或网络异常',
          '修正后直接重新上传，历史报告不会被覆盖',
          '持续异常可附上截图通过邮箱求助'
        ]
      },
      {
        question: '当前一张图片可以生成几种报告？',
        answer: '当前版本只生成 1 种 Safe-to-Use 报告，暂不提供其他类型。',
        points: [
          '保持唯一标准，便于不同团队统一解读',
          '可通过重新上传新版图片刷新同类报告',
          '其他报告类型仅在未来版本评估，不保证上线时间'
        ]
      }
    ]
  },
  {
    id: 'risk',
    label: '风险与原创度',
    description: '解释 LOONOOL 的风险提示边界、原创识别方式与素材要求。',
    items: [
      {
        question: 'LOONOOL 会对商用风险给出最终结论吗？',
        answer: '不会。LOONOOL 只提供风险提示，不提供法律判断，也不会告诉你“可以商用 / 不可以商用”。',
        points: [
          '报告中的 Safe / Review / Risk 仅表示技术风险等级',
          '我们标记易混结构、冲突元素等视觉证据，供内部讨论',
          '是否可商用需结合法务、业务与地区法规综合决策'
        ]
      },
      {
        question: '如何使用 Safe-to-Use 报告中的商用提示？',
        answer: '报告提示仅供识别潜在风险，不能当作法律结论。',
        points: [
          '结合素材来源、投放渠道与品牌策略自行评估',
          '必要时请法务或外部顾问进一步确认',
          'LOONOOL 不会对“能否商用”做最终判断'
        ]
      },
      {
        question: 'LOONOOL 会告诉我原创度是否达标吗？',
        answer: '不会。系统仅提示可能的相似元素，提醒你优化视觉表达。',
        points: [
          '高亮与主流元素相似的结构，方便二次设计',
          '可结合内部设计规范再次检视',
          '原创度是否达标仍需团队自行确认，LOONOOL 不提供法律判断'
        ]
      },
      {
        question: '上传的图片需要满足哪些基本要求？',
        answer: '请确保素材满足基础画质与内容规范，我们只分析视觉与文案风险。',
        points: [
          '支持格式：JPG / PNG / WebP，建议长边 ≥ 2048px，单文件 ≤ 20MB',
          '适合内容：Logo、品牌主视觉、包装、电商主图等静态图片',
          '不建议上传：过度模糊、低分辨率或含大量超出当前 OCR 能力的文本海报',
          '系统暂不支持：法律、医学、政治等复杂判断场景，以及动图、视频帧'
        ]
      }
    ]
  },
  {
    id: 'account',
    label: '账号与隐私',
    description: '说明图片、报告、账号数据的存储与访问方式。',
    items: [
      {
        question: 'LOONOOL 会保存我上传的原图吗？',
        answer: '原图只用于实时分析，默认 72 小时内删除，不会拿去训练或对外使用。',
        points: [
          '开启“保存历史”仅保留报告与缩略图，方便回溯',
          '可随时在控制台手动删除历史记录',
          '访问与操作均受权限控制，避免越权查看'
        ]
      },
      {
        question: '团队成员如何共享报告？',
        answer: '每份报告都能灵活授权，公开链接为只读，不会泄露账号与历史记录。',
        points: [
          '支持按成员、角色或团队分配可见范围',
          '可对分享链接设置有效期、密码或立即撤销',
          '所有分享行为都有日志，方便排查'
        ]
      },
      {
        question: '账号信息和操作记录如何被保护？',
        answer: '系统仅保留必要操作记录，用于排查问题与保证稳定运行。',
        points: [
          '不会记录你的私人内容，也不会对外共享',
          '可选开启多因子登录与 IP 限制提升安全性',
          '异常访问会触发提醒，便于及时处理'
        ]
      },
      {
        question: '遇到特殊问题如何联系人工支持？',
        answer: 'FAQ 之外的场景可通过页面底部邮箱与我们联系，我们会根据情况尽力回复你的问题。',
        points: [
          '邮件中附上截图、图片 ID 或报告编号能加快定位',
          '描述期望结果与发生时间，方便工程师复现',
          '你的反馈会纳入功能与流程优化'
        ]
      }
    ]
  }
];

const expandedKey = ref<string | null>(null);
const activeCategory = ref<string>('');

const getItemKey = (categoryId: string, itemIndex: number) => `${categoryId}-${itemIndex}`;

const isExpanded = (key: string) => expandedKey.value === key;

const toggleAccordion = (key: string) => {
  expandedKey.value = expandedKey.value === key ? null : key;
};

const scrollToCategory = (id: string) => {
  activeCategory.value = id;
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (typeof window !== 'undefined') {
      window.location.hash = id;
    }
  }
};

// 监听滚动，更新 activeCategory
const handleScroll = () => {
  if (typeof window === 'undefined') return;
  
  const sections = faqCategories.map(cat => ({
    id: cat.id,
    element: document.getElementById(cat.id)
  })).filter(s => s.element);
  
  let current = '';
  sections.forEach(({ id, element }) => {
    if (element) {
      const rect = element.getBoundingClientRect();
      if (rect.top <= 200) {
        current = id;
      }
    }
  });
  
  if (current) {
    activeCategory.value = current;
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初始检查
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped lang="scss">
.problem-page {
min-height: 100vh;
padding: 80px 0 0;
background: #f7f8fb;
font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
color: #1c1f2a;
scroll-padding-top: 120px;
}

.problem-container {
max-width: 1024px;
width: 100%;
margin: 0 auto;
padding: 56px 16px 48px;
background: #fff;
border-radius: 24px;
border: 1px solid #edf0f5;
box-shadow: 0 16px 40px rgba(18, 23, 43, 0.08);
overflow: visible;

@media (min-width: 768px) {
  padding: 56px 32px 48px;
}
}

.faq-title {
font-size: 38px;
font-weight: 700;
text-align: center;
letter-spacing: 1px;
background: linear-gradient(120deg, #6a6cf6, #71c4ff);
-webkit-background-clip: text;
background-clip: text;
color: transparent;
-webkit-text-fill-color: transparent;
display: inline-block;
position: relative;
padding-bottom: 12px;
}

.faq-title::after {
content: '';
position: absolute;
left: 50%;
bottom: 0;
transform: translateX(-50%);
width: 56px;
height: 3px;
border-radius: 999px;
background: linear-gradient(120deg, #6a6cf6, #71c4ff);
opacity: 0.5;
}

.faq-subtitle {
margin-top: 16px;
text-align: center;
font-size: 16px;
color: #636b85;
max-width: 560px;
margin-left: auto;
margin-right: auto;
}

.faq-nav {
margin-top: 32px;
display: flex;
flex-wrap: wrap;
gap: 12px;
justify-content: center;
position: sticky;
top: 24px;
padding: 14px 24px;
border-radius: 20px;
backdrop-filter: blur(12px);
background: rgba(255, 255, 255, 0.72);
border: 1px solid rgba(111, 122, 156, 0.1);
box-shadow: 0 18px 40px rgba(21, 25, 55, 0.12);
z-index: 12;
}

.faq-nav-button {
padding: 10px 20px;
border-radius: 999px;
border: 1px solid transparent;
background: rgba(255, 255, 255, 0.9);
color: #636b85;
font-size: 14px;
cursor: pointer;
transition: all 0.2s ease;
text-decoration: none;
display: inline-flex;
align-items: center;
justify-content: center;

&:hover {
  color: #1f2233;
  background: rgba(255, 255, 255, 0.95);
}

&.is-active {
  background: linear-gradient(120deg, #6a6cf6, #71c4ff);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 12px rgba(106, 108, 246, 0.3);
  font-weight: 600;
}
}

.faq-list {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.faq-category {
  display: flex;
  flex-direction: column;
  gap: 24px;
  scroll-margin-top: 140px;
}

.faq-category + .faq-category {
  margin-top: 0;
  padding-top: 0;
  border-top: none;
}

.faq-category-header {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
}

.faq-category-label {
  font-size: 28px;
  font-weight: 700;
  color: #16192b;
  letter-spacing: -0.5px;
}

.faq-category-description {
  margin: 0;
  font-size: 14px;
  color: #8a8fa3;
  line-height: 1.5;
}

.faq-card {
border-radius: 18px;
border: 1px solid #e7e9f0;
background: #fff;
transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.25s ease;
overflow: hidden;
cursor: pointer;

& + .faq-card {
  margin-top: 16px;
}

&:hover {
  border-color: rgba(106, 108, 246, 0.3);
  background: rgba(106, 108, 246, 0.04);
  box-shadow: 0 4px 12px rgba(106, 108, 246, 0.08);
}

&.is-open {
  border-color: rgba(106, 108, 246, 0.4);
  background: rgba(106, 108, 246, 0.06);
}
}

.faq-header {
display: flex;
align-items: center;
justify-content: space-between;
gap: 20px;
padding: 26px 32px;
user-select: none;
}

.faq-question {
font-size: 17px;
font-weight: 600;
color: #1f2233;
flex: 1;
}

.faq-toggle {
width: 32px;
height: 32px;
border-radius: 50%;
background: transparent;
color: #8a8fa3;
display: flex;
align-items: center;
justify-content: center;
transition: all 0.2s ease;
flex-shrink: 0;
pointer-events: none;
}

.toggle-icon {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transform: rotate(0deg);
}

.faq-toggle.is-open .toggle-icon {
  transform: rotate(180deg);
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.faq-content {
padding: 0 32px 28px 32px;
overflow: hidden;
margin-top: 0;
}

.faq-body {
font-size: 15px;
color: #4c5265;
line-height: 1.8;
margin: 0 0 16px 0;
}

.faq-points {
margin: 0 0 16px 0;
padding-left: 0;
color: #4c5265;
font-size: 15px;
line-height: 1.8;
list-style: none;

li {
  position: relative;
  padding-left: 20px;
  margin-bottom: 8px;
  
  &::before {
    content: '•';
    position: absolute;
    left: 0;
    color: #8a8fa3;
    font-weight: bold;
  }
}
}

.faq-footer {
margin: 16px 0 0 0;
font-size: 14px;
font-weight: 500;
color: #636b85;
line-height: 1.7;
}

.contact-section {
margin-top: 64px;
padding: 0;
text-align: center;
display: flex;
justify-content: center;
}

.contact-content {
max-width: 560px;
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
gap: 18px;
padding: 36px;
background: #f0f2ff;
border-radius: 24px;
border: 1px solid rgba(106, 108, 246, 0.2);
box-shadow: 0 18px 46px rgba(18, 23, 43, 0.12);
}

.contact-icon {
width: 60px;
height: 60px;
border-radius: 16px;
background: linear-gradient(135deg, #1f2233, #3a3f68);
display: flex;
align-items: center;
justify-content: center;
color: #fff;
box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.12);
}

.contact-text {
display: flex;
flex-direction: column;
align-items: center;
gap: 8px;
}

.contact-message {
font-size: 16px;
color: #3b3f56;
line-height: 1.7;
margin: 0;
max-width: 520px;
}

.contact-email {
font-size: 15px;
font-weight: 600;
color: #1f2233;
text-decoration: none;
padding: 12px 24px;
border-radius: 999px;
background: #fff;
border: 1px solid rgba(31, 34, 51, 0.1);
transition: all 0.2s ease;
display: inline-block;

&:hover {
  background: #fff;
  box-shadow: 0 6px 20px rgba(31, 34, 51, 0.15);
  transform: translateY(-1px);
}
}

.contact-subtext {
font-size: 14px;
color: #5a627c;
margin: 0;
margin-top: 2px;
}

.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s ease;
  max-height: 2000px;
  opacity: 1;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  padding-top: 0;
  padding-bottom: 0;
}

@media (max-width: 768px) {
  .problem-container {
  padding: 32px 16px 48px;
  }
  
  .faq-category-label {
    font-size: 24px;
  }
  
  .faq-category-description {
    font-size: 13px;
  }

  .faq-nav {
    justify-content: flex-start;
    gap: 8px;
    padding: 10px 16px;
    top: 12px;
  }

  .faq-category + .faq-category {
    margin-top: 24px;
    padding-top: 20px;
  }

  .faq-header {
  padding: 20px;
  gap: 12px;
  }

  .faq-question {
  font-size: 16px;
  }

  .faq-category-label {
    font-size: 19px;
  }

  .faq-category-description {
    font-size: 13px;
  }

  .faq-content {
  padding: 0 20px 24px;
  }

  .faq-toggle {
  width: 28px;
  height: 28px;
  }
  
  .contact-section {
  margin-top: 48px;
  }
  
  .contact-content {
  padding: 28px 20px;
  }
  
  .contact-icon {
  width: 50px;
  height: 50px;
  }
  
  .contact-message {
  font-size: 14px;
  }
  
  .contact-email {
  font-size: 14px;
  padding: 10px 20px;
  }
  
  .contact-subtext {
  font-size: 13px;
  }
  
  .faq-list {
  gap: 48px;
  }
}
</style>