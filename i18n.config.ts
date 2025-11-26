// i18n.config.ts
import { defineI18nConfig } from "@nuxtjs/i18n"

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'zh',
    fallbackLocale: 'en',
    messages: {
        zh: {
            welcome: '欢迎来到我的网站',
            home: '首页',
            about: '关于我们',
            contact: '联系我们',
            description: '这是一个使用 Nuxt 3 和 i18n 的多语言网站示例',
            button: {
                save: '保存',
                cancel: '取消',
                submit: '提交'
            }
        },
        en: {
            welcome: 'Welcome to my website',
            home: 'Home',
            about: 'About',
            contact: 'Contact',
            description: 'This is a multilingual website example using Nuxt 3 and i18n',
            button: {
                save: 'Save',
                cancel: 'Cancel',
                submit: 'Submit'
            }
        }
    }
})