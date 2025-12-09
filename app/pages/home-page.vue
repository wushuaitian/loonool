<!-- 首页 -->
<template>
    <div class="home">
        <!-- 介绍 -->
        <div class="introduc introduc-one bg-img">
            <div class="introduc-title text-bold-600">视觉内容进入商业世界前的安全层。</div>
            <div class="introduc-text-one p-t-50 text-16 text-bold-600 text-center">查重・存证・维权 —— 一站式原创设计保护平台</div>
            <div class="introduc-text-one p-t-20 text-16 text-bold-600 text-center">精准识别抄袭风险，锁定原创权属，让每一份创意都有专属 “保护盾”
            </div>
            <div class="flex m-auto align-center justify-center p-t-50">
                <div class="enter b-r-40 m-r-30">进入</div>
                <div class="view-report b-r-40">查看示例报告</div>
            </div>
        </div>
        <!-- <div class="introduc introduc-two bg-img flex justify-center align-center m-r-20">
            <div class="introduc-book book-one bg-img m-r-20 flex justify-end flex-column">
            </div>
            <div class="book-two bg-img m-r-20"></div>
            <div class="introduc-book book-three bg-img"></div>
        </div>

        <div class="audience introduc">
            <div class="audience-tab flex justify-around align-center">
                <div class="tab-text text-18 text-bold-500" v-for="(el, idnex) in tabList" @click="tabClick(el.value)"
                    :class="currentTab == el.value ? 'active-tab' : ''">
                    {{ el.text }}
                </div>
                 <div class="audience-content">

                 </div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const currentTab = ref('ip')

const tabList = ref([
    {
        value: 'ip',
        text: 'IP人员'
    },
    {
        value: 'designer',
        text: '设计师'
    },
    {
        value: 'student',
        text: '学生'
    },
    {
        value: 'enterprise',
        text: '企业'
    },
    {
        value: 'contestants',
        text: '参赛选手'
    }
])
const tabClick = (el: string) => {
    currentTab.value = el;
};
</script>

<style scoped lang="scss">
.home {
    height: auto;
    font-size: 20px;
    color: #333;
    font-family: PingFangSC, PingFang SC;
}

.introduc {
    width: 100%;
    height: calc(100vh - 15vh);
    color: #1D2129;

}

.introduc-one {
    padding-top: 140px;
    background-image: url('/img/introduc-one.png');

    .introduc-title {
        margin: auto;
        width: 700px;
        text-align: center;
        font-size: 80px;
    }

    .enter {
        color: #fff;
        padding: 10px 30px;
        background-color: #1D2129;

    }

    .view-report {
        padding: 10px 30px;
        border: 2px solid #1D2129;
    }
}

.introduc-two {
    padding-top: 140px;
    background-image: url('/img/introduc-two.png');
    background-color: #fff;
    margin: auto;

    .introduc-book {
        width: 450.18px;
        height: 480.09px;
    }

    .book-one {
        // background-image: url('/img/book-one.png');
    }

    .book-two {
        width: 390px;
        height: 430.09px;
        // background-image: url('/img/book-two.png');
    }

    .book-three {
        // background-image: url('/img/book-three.png');
    }

}


.audience {
    padding-top: 100px;

    .audience-tab {
        width: 50%;
        margin: auto;
        height: 50px;
        background: #F8F8FF;
        border-radius: 40px;

        .tab-text {
            padding: 5px 20px;
            border-radius: 27px;
            color: #1D2129;
        }
    }

    .active-tab {
        color: #2134DE !important;
        background-color: #E3E3FF;
    }

    .audience-content{}
}
</style>