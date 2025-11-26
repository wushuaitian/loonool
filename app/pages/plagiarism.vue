<!-- 检测查重 -->
<template>
  <div class="middle">
    <!-- 头部 -->
    <div class="plagiarism-head flex-column align-center text-center flex"
      :class="analysisStatus == 'complete' ? 'head-complete' : ''">
      <div class="flex align-center justify-center">
        <img src="/img/plagiarism-left.png" alt="" class="head-img" v-if="analysisStatus != 'complete'">
        <div class="head-text text-bold-500 " v-if="analysisStatus == 'initial'">上传你的图片</div>
        <div class="head-text text-bold-500 " v-if="analysisStatus == 'progress'">正在分析</div>
        <div class="head-text text-bold-500 " v-if="analysisStatus == 'complete'">分析完成</div>
        <img src="/img/plagiarism-right.png" alt="" class="head-img" v-if="analysisStatus != 'complete'">
      </div>
      <div class="prompt-text text-bold-400 m-t-20">上传最大5MB的JPEG\PNG或GIF格式图片，即可立即进行原创性验证。</div>
    </div>

    <!-- 检测工具 -->
    <div class="testing-tool">
      <div class="testing-tabs flex align-center">
        <div class="testing-text text-bold-400">类型：</div>
        <div class="testing-content flex align-center">
          <div class="testing-item m-l-24 " v-for="(el, idnex) in toolList" @click="toolSelect(el)"
            :class="currentTool == el ? 'testing-item-active' : 'testing-text'">{{ el }}</div>
        </div>
      </div>

      <!-- 上传 -->
      <div class="testing-middle flex">
        <div class="img-upload relative flex flex-column" :class="analysisStatus == 'complete' ? 'w-p-40' : 'w-p-50'">
          <!-- 上传前 上传中 -->
          <div v-if="analysisStatus != 'complete'" style="min-height: 450px;">
            <div class="img-upload-text text-bold-400 text-16">选择图像文件</div>
            <div class="upload-moudel">
              <el-upload class="upload-demo" :drag="fileList.length === 0"
                :list-type="fileList.length > 0 ? 'picture-card' : undefined" :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove" v-model:file-list="fileList" multiple :limit="5"
                :before-upload="beforeUpload" accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                :on-exceed="handleExceed">
                <div class="el-upload__text flex justify-center">
                  <img src="/img/uploadimg.png" alt="" class="upload-img">
                  <div class="color-2b57ff text-16">
                    {{ fileList.length === 0 ? '点击或者拖拽上传' : '点击上传' }}
                  </div>
                </div>
              </el-upload>
            </div>
            <div class="flooter w-p-100 flex absolute b-70">
              <el-button class="detec-button text-center" v-if="fileList.length > 0">
                开始检测
                <img src="/img/xingxing.png" alt="" class="xingxing-img">
              </el-button>

            </div>
          </div>
          <!-- 上传完成 -->
          <div v-if="analysisStatus == 'complete'" class="upload-complete">
            <el-button class="text-bold-400 text-16 return-button">返回</el-button>
            <div class="report-card">
              <div class="report-serial text-16 text-bold-500 text-black">
                生产报告1
              </div>
              <div class="report-content m-t-20">
                <div class="flex justify-between">
                  <div class="text-16 text-bold-500 text-black">相似度</div>
                  <div class="text-14 text-bold-400">重新检测</div>
                </div>
                <div class="flex align-center m-t-20">
                  <el-progress type="circle" :percentage="80" :stroke-width="12" class="custom-progress" />
                  <ul>
                    <li class="text-14 text-bold-400 text-4E5969">检测查重相似度为79%</li>
                    <li class="text-14 text-bold-400 text-4E5969">检测查重相似度为79%</li>
                  </ul>
                </div>
                <div class="text-14 text-bold-400 text-262E3B m-t-25">文字相似度</div>
                <el-progress :percentage="50" class="m-t-10 m-b-15" color="#47A5FF" :stroke-width="10" />
                <div class="text-14 text-bold-400 text-262E3B">颜色相似度</div>
                <el-progress :percentage="50" class="m-t-10 m-b-15" color="#47A5FF" :stroke-width="10" />
                <div class="text-14 text-bold-400 text-262E3B">颜色相似度</div>
                <el-progress :percentage="50" class="m-t-10 m-b-15" color="#47A5FF" :stroke-width="10" />
              </div>
            </div>
          </div>
        </div>
        <div class="img-preview" :class="analysisStatus == 'complete' ? 'w-p-60 comment-p' : 'w-p-50 preview-p'">
          <!-- 上传前 -->
          <div class="flex-column flex h-p-100" v-if="analysisStatus == 'initial'">
            <div class="img-upload-text text-bold-400 text-16">以往案例</div>
            <div class="flex align-center justify-center flex-1 ">
              <img src="https://vcg01.cfp.cn/creative/vcg/800/new/VCG211418403645.jpg" alt="" class="preview-case">
            </div>
          </div>

          <!-- 上传中 -->
          <div class="flex-column flex h-p-100" v-if="analysisStatus == 'progress'">
            <div class="text-bold-500 text-26 text-black">正在分析您的文件...</div>
            <div class="text-bold-400 text-14 text-85909C m-t-20 flex align-center">
              <img src="/img/load.png" alt="" class="img-size">
              <div>处理图片检测重复率</div>
            </div>
            <div class="text-bold-400 text-14 text-85909C m-t-20 p-l-20">数据库覆盖广：收录千万级至亿级图片资源，同步更新学术期刊、公开文献等数据源，比对无盲区。
            </div>
            <div class="text-bold-400 text-14 text-85909C m-t-20 p-l-20">精准识别能力强：支持检测旋转、裁剪、缩放等复杂处理后的相似图，部分工具采用 AI +
              人工双重核验，检出准确率超 99%。</div>
            <!-- 进度条 -->
            <el-progress :percentage="50" class="m-t-30 " color="#2AD480" :stroke-width="10" />
            <div class="text-bold-400 text-14 text-85909C m-t-10">大约7～12秒</div>

            <div class="m-t-20 comment-user">
              <div class="user-info flex">
                <img :src="userInfo.avatarUrl" alt="" class="user-ava">
                <!-- 评论用户信息 -->
                <div class="flex flex-column justify-evenly m-l-10">
                  <div class="text-16 text-bold-500 text-black">{{ userInfo.nickName }}</div>
                  <div class="text-12 text-bold-400 ext-85909C">{{ userInfo.position }}</div>
                </div>
              </div>
              <!-- 用户评论内容 -->
              <div class="comment-content m-t-20 text-bold-500 text-14">
                这款查重软件太懂设计师需求！精准识别设计元素重复率，操作简单高效，还能标注相似来源。帮我避开侵权坑，守护原创版权，做设计更省心，创作安全感直接拉满～
              </div>
            </div>
          </div>

          <!-- 上传完成 -->
          <div class="flex-column flex h-p-100" v-if="analysisStatus == 'complete'">
            <div class="preview-complete b-r-8">
              <!-- 相似设计 -->
              <div class="similar-design flex">
                <div class="similar-title text-bold-500 text-16">相似设计</div>
                <div class="flex flex-wrap justify-start similar-imglist">
                  <img v-for="(item, index) in reportData[0]?.similarImgList" :key="index" :src="item" alt=""
                    class="similar-img-item">
                </div>
              </div>
              <!-- 差异度 -->
              <div class="degree-differ flex">
                <div class="similar-title text-bold-500 text-16">差异度</div>
                <img :src="reportData[0]?.differenceImg" alt="" class="difference-img">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img w-full :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
    <svg width="0" height="0" class="gradient-svg">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <!-- 起始颜色：紫色 -->
          <stop offset="0%" style="stop-color:#9774FF; stop-opacity:1" />
          <!-- 中间过渡 -->
          <stop offset="50%" style="stop-color:#8A6FFF; stop-opacity:1" />
          <!-- 结束颜色：蓝色 -->
          <stop offset="100%" style="stop-color:#2134DE; stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<script setup lang="ts">
import type { UploadProps, UploadUserFile } from 'element-plus'
// 工具栏数组
const toolList = ref(['LOGO', 'VI', 'WEB', 'APP']);
// 当前选择工具
const currentTool = ref('LOGO');
// 工具栏点击事件
const toolSelect = (el: string) => {
  currentTool.value = el;
};


// 分析状态  initial 初始化  complete：完成  progress：上传中
const analysisStatus = ref('initial');

// 用户信息
const userInfo = ref({
  avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
  nickName: 'Jerry',
  position: '自由设计师'
});



// 上传图片列表
const fileList = ref<UploadUserFile[]>([
])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

// 上传图片
const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
  // 检查文件类型
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const allowedExtensions = /\.(jpg|jpeg|png|webp)$/i;

  if (!allowedTypes.includes(rawFile.type) || !allowedExtensions.test(rawFile.name)) {
    ElMessage.error('只能上传 JPG、PNG 或 WEBP 格式的图片！');
    return false;
  }

  // 检查文件大小 (5MB)
  if (rawFile.size > 5 * 1024 * 1024) {
    ElMessage.error('图片大小不能超过 5MB！');
    return false;
  }

  return true;
}

// 超出限制时的处理
const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(`最多只能上传 ${5} 个文件`);
}
// 分析成功 报告数据
const reportData = ref([
  {
    id: 1,
    name: 'LOGO',
    url: 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211418403645.jpg',
    similarity: 0.5,
    similarity_count: 1,
    similarImgList: [
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
    ],
    differenceImg: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg'
  },
  {
    id: 1,
    name: 'LOGO',
    url: 'https://vcg01.cfp.cn/creative/vcg/800/new/VCG211418403645.jpg',
    similarity: 0.5,
    similarity_count: 1,
    similarImgList: [
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
      'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg',
    ],
    differenceImg: 'https://pic.nximg.cn/file/20190530/21605333_175741758085_2.jpg'
  }
])

</script>

<style scoped lang="scss">
.middle {
  padding: 56px 135px;
  font-family: PingFangSC, PingFang SC;
  color: #2134DE;

  .head-complete {
    background-image: url('../../public/img/flower.png');
    background-size: 27% 86%;
    /* 或者使用 'contain' */
    background-position: center center;
    /* 图片居中显示 */
    background-repeat: no-repeat;
    /* 不重复背景图片 */
  }

  // 头部
  .plagiarism-head {
    padding-top: 30px;

    margin-bottom: 23px;

    .head-img {
      width: 23px;
      height: 23px;
    }

    .head-text {
      font-size: 30px;
      line-height: 24px;
      font-style: normal;
      margin: 0 12px;
      font-weight: 500;
    }



    .prompt-text {
      font-size: 16px;
      line-height: 12px;
      font-style: normal;
      color: #2134DE;
    }
  }

  .testing-tool {
    width: 95%;
    // height: 602px;
    height: auto;
    background: #FFFFFF;
    border: 1px solid #EBEFEE;
    margin: auto;
    display: flex;
    flex-direction: column;
    border-radius: 8px;

    .testing-tabs {
      color: #101414;
      border-bottom: 1px solid #EBEFEE;
      padding: 9px 11px;
      flex-shrink: 0;
      /* 防止tabs被压缩 */

      .testing-text {
        color: #101414;
        font-size: 14px;
        line-height: 11px;
        font-style: normal;
      }

      .testing-content {
        .testing-item {
          padding: 5px 16px;
        }

        .testing-item-active {
          background: rgba(149, 171, 255, 0.2); // 使用带透明度的背景色
          border-radius: 6px;
          // opacity: 0.2;
          font-weight: 500;
          font-size: 14px;
          color: #001aff;
          line-height: 20px;
        }
      }
    }

    .testing-middle {
      flex: 1;
      /* 占据剩余空间 */
      display: flex;
      height: calc(100% - 40px);

      .img-upload-text {
        padding: 20px;
        color: #101414;
        line-height: 22px;
      }

      .img-upload {
        height: 100%;
        /* 占满父容器高度 */
        border-right: 1px solid #EBEFEE;
        padding: 9px 20px;

        .upload-moudel {
          flex: 1;
          padding: 10px 32px;

          :deep(.el-upload-dragger) {
            height: 100%;
            min-height: 400px;
            /* 确保上传区域有足够高度 */
          }
        }

        .detec-button {
          padding: 20px 30px;
          background-color: #2134DE;
          color: #fff;
          margin: auto;
          border-radius: 50px;
        }

        .xingxing-img {
          width: 26px;
          height: 26px;
        }

        .upload-img {
          width: 16px;
          height: 16px;
          margin-right: 5px;
        }

        // 上传完成
        .upload-complete {
          .return-button {
            padding: 6px 14px;
            background-color: #F7F8FA;
            border-radius: 6px;
            border: none;
          }

          .return-button:hover {
            color: #4E5969;
          }

          .report-card {
            margin-top: 10px;

            .report-serial {}

            .report-content {
              margin: 10px 0px 16px 0px;
              background-color: rgba(247, 248, 250, 0.6);
              height: 370px;
              // background: #F7F8FA;
              border-radius: 8px;
              padding: 16px 20px;
            }

          }
        }


      }


      .comment-p {
        padding: 15px 20px;
      }

      .preview-p {
        padding: 15px 30px;
      }

      .img-preview {
        height: 100%;
        min-height: 450px;
        color: #101414;

        .preview-part {
          flex: 1;
        }

        .preview-case {
          width: 360px;
          height: 201px;
          border-radius: 12px;
          border: 2px solid #EAEEFF;
        }

        .comment-user {
          height: 206px;
          background: linear-gradient(90deg, rgba(216, 225, 255, 0.3) 0%, rgba(243, 182, 255, 0.3) 100%);
          border-radius: 8px;
          padding: 14px 24px;

          .user-info {
            .user-ava {
              width: 54px;
              height: 54px;
              border-radius: 50%;
            }
          }

          .comment-content {
            color: #4E5969;

            :deep(.el-progress-bar__outer) {
              background-color: #384558;
            }
          }
        }

        .preview-complete {
          background-color: rgba(247, 248, 250, 0.6);
          // height: 448px;
          height: auto;
          padding: 20px 16px;

          .similar-title {
            width: 64px;
            height: 22px;
          }

          .similar-design {
            .similar-imglist {
              width: calc(100% - 64px);
            }

            .similar-img-item {
              width: 240px;
              height: 134px;
              border-radius: 8px;
              border: 1px solid #EAEEFF;
              margin: 0px 18px 14px 18px;
            }
          }


          .degree-differ {
            .difference-img {
              width: 360px;
              height: 201px;
              border-radius: 12px;
              border: 2px solid #EAEEFF;
              margin: auto;
            }
          }
        }
      }
    }
  }
}

::v-deep {
  .upload-moudel {
    .el-upload-dragger {
      border: 1px solid #E4E5EA;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      height: 450px;
      background-color: #F7F8FA;
    }

    .el-upload-dragger:hover {
      border: 1px dashed #DDE0E7;
    }
  }

  .custom-progress {
    --el-progress-track-color: red !important;

    .el-progress-circle__path {
      stroke: url(#gradient);
    }
  }

  .img-preview {
    .el-progress__text {
      color: #000;
      padding-left: 19px;
      font-weight: 500;
      font-size: 16px;
    }
  }

  :root {
    --el-progress-track-color: #E4E5EA;
  }

  .report-content {
    ul {
      list-style: none;
      padding-left: 20px;

      li {
        position: relative;
        padding-left: 20px;
        color: #4E5969;

        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: #2637E0; // 小圆点颜色
        }
      }
    }
  }
}
</style>