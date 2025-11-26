<!-- 博客列表页 -->
<template>
   <div class="middle">
      <div class="aerocle-text">
         以查重为盾，守护原创核心价值
      </div>
      <div class="aerocle-input">
         <el-input v-model="input3" style="max-width: 600px" placeholder="请输入搜索内容" class="input-with-select">
            <template #append>
               <el-button>搜索</el-button>
            </template>
         </el-input>
      </div>

      <div class="article-content flex-wrap flex justify-start">
         <div class="article-list" v-for="(el, index) in aerocleList" :key="index">
            <div class="article-img">
               <img :src="el.imgurl" alt="" style="width: 100%; height: 100%;">
            </div>
            <div class="article-text">
               <div class="article-title m-b-10 ellipsis">{{ el.title }}</div>
               <div class="article-intro ellipsis">{{ el.content }}</div>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup>

const select = ref(null)

const aerocleList = ref([
   {
      imgurl: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      title: '以查重为盾，守护原创核心价值',
      content: 'Aerocle是一个开源知识库，基于知识图谱，基于知识图谱，基于知识图谱'
   },
   {
      imgurl: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      title: '以查重为盾，守护原创核心价值',
      content: 'Aerocle是一个开源知识库，基于知识图谱，基于知识图谱，基于知识图谱'
   },
   {
      imgurl: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      title: '以查重为盾，守护原创核心价值',
      content: 'Aerocle是一个开源知识库，基于知识图谱，基于知识图谱，基于知识图谱'
   },
   {
      imgurl: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      title: '以查重为盾，守护原创核心价值',
      content: 'Aerocle是一个开源知识库，基于知识图谱，基于知识图谱，基于知识图谱'
   },
   {
      imgurl: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      title: '以查重为盾，守护原创核心价值',
      content: 'Aerocle是一个开源知识库，基于知识图谱，基于知识图谱，基于知识图谱'
   },
])

</script>

<style scoped lang="scss">
.middle {
   .aerocle-text {
      text-align: center;
      font-family: PingFangSC, PingFang SC;
      font-weight: 500;
      font-size: 37px;
      color: #100F12;
      line-height: 52px;
      font-style: normal;
   }

   .aerocle-input {
      width: 28vw;
      display: block;
      margin: 34px auto 40px auto;
      border: 1px solid #2134DE;
      border-radius: 50px;
      background-color: #fff;

      .el-input__wrapper {
         border-top-left-radius: 50px;
         border-bottom-left-radius: 50px;
      }


   }


   .article-content {
      padding: 20px 100px;

      .article-list {
         width: 300px;
         height: 330px;
         background: #FFFFFF;
         box-shadow: 0px 7px 18px 0px rgba(217, 224, 247, 0.5);
         border-radius: 8px;
         margin-right: 40px;
         margin-bottom: 40px;

         .article-img {
            width: 300px;
            height: 212px;
         }

         .article-text {
            padding: 18px 22px;
            font-family: PingFangSC, PingFang SC;
            text-align: left;
            font-style: normal;

            .article-title {
               font-weight: 500;
               font-size: 23px;
               color: #100F12;
               line-height: 32px;
            }

            .article-intro {
               font-weight: 400;
               font-size: 14px;
               color: #85909C;
               line-height: 20px;
            }
         }
      }


   }

}

::v-deep {
   .aerocle-input {
      .el-input {
         --el-input-inner-height: none;
      }

      .el-input-group__append {
         color: #fff;
         background-color: #2134DE;
         border-radius: 50px !important;
         // border-top-right-radius: 50px !important;
         // border-bottom-right-radius: 50px !important;
      }

      .el-input__wrapper {
         box-shadow: none !important;
         border-top-left-radius: 50px;
         border-bottom-left-radius: 50px;
      }
   }

}
</style>