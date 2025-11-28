# Imagga 图片相似度检测集成说明

## 功能概述

已集成 Imagga Visual Similarity Search API，用于检测上传图片的相似度和原创性。

## 配置步骤

### 1. 注册 Imagga 账号

1. 访问 [Imagga 官网](https://imagga.com)
2. 注册账号并登录
3. 在 Dashboard 中获取你的 `API Key` 和 `API Secret`

### 2. 配置环境变量

1. 在项目根目录创建 `.env` 文件（如果不存在）
2. 添加以下配置：

```env
IMAGGA_API_KEY=your_imagga_api_key_here
IMAGGA_API_SECRET=your_imagga_api_secret_here
```

3. 将 `your_imagga_api_key_here` 和 `your_imagga_api_secret_here` 替换为你在 Imagga 获取的实际密钥

### 3. 重启开发服务器

配置完成后，需要重启 Nuxt 开发服务器：

```bash
npm run dev
```

## API 接口说明

### 后端接口

**路径**: `/api/similarity`  
**方法**: `POST`  
**Content-Type**: `multipart/form-data`

**请求参数**:
- `image`: 图片文件（JPEG/PNG/GIF，最大 5MB）

**响应格式**:
```json
{
  "success": true,
  "uploadId": "上传ID",
  "similarity": {
    "score": 85.5,
    "maxScore": 100,
    "riskLevel": "high",
    "message": "检测到高度相似的图片，存在较高的抄袭风险"
  },
  "similarImages": [
    {
      "imageId": "图片ID",
      "score": 85.5,
      "url": "图片URL或null"
    }
  ],
  "totalMatches": 10
}
```

**风险等级说明**:
- `high`: 相似度 ≥ 80%，存在较高的抄袭风险
- `medium`: 相似度 50-80%，建议进一步检查
- `low`: 相似度 < 50%，原创性较好

## 使用流程

1. 用户在 `tool-ai.vue` 页面上传图片
2. 前端将图片发送到 `/api/similarity` 接口
3. 后端调用 Imagga API 进行相似度检测
4. 返回检测结果并在前端展示

## 注意事项

1. **API 密钥安全**: 
   - 永远不要在前端代码中暴露 API 密钥
   - API 密钥只在服务端使用（通过 `runtimeConfig` 配置）

2. **Imagga API 限制**:
   - 免费版有调用次数限制
   - 建议在生产环境使用付费版
   - 查看 [Imagga 定价页面](https://imagga.com/pricing) 了解详情

3. **相似图片搜索**:
   - 当前实现使用 Imagga 的公共图库进行搜索
   - 如果需要搜索自定义图库，需要先在 Imagga 中建立索引库
   - 参考 [Imagga 文档](https://docs.imagga.com/) 了解如何建立自定义索引

4. **错误处理**:
   - 如果 API 调用失败，会返回相应的错误信息
   - 检查浏览器控制台和服务器日志以获取详细错误信息

## 故障排查

### 问题：API 调用失败，提示 "Imagga API credentials not configured"

**解决方案**:
- 检查 `.env` 文件是否存在
- 确认环境变量名称正确：`IMAGGA_API_KEY` 和 `IMAGGA_API_SECRET`
- 确认已重启开发服务器

### 问题：上传失败，提示文件类型不支持

**解决方案**:
- 确认上传的图片格式为 JPEG、PNG 或 GIF
- 检查文件大小是否超过 5MB

### 问题：搜索不到相似图片

**解决方案**:
- Imagga 的相似图片搜索基于其公共图库
- 如果图片不在图库中，可能搜索不到结果
- 考虑建立自定义索引库以提高搜索准确性

## 后续优化建议

1. **建立自定义索引库**: 
   - 将你的参考图片库上传到 Imagga
   - 建立索引后，搜索准确性会大幅提升

2. **添加缓存机制**:
   - 对相同图片的检测结果进行缓存
   - 减少 API 调用次数

3. **批量检测**:
   - 支持一次上传多张图片进行检测
   - 提高用户体验

4. **结果存储**:
   - 将检测结果保存到数据库
   - 支持历史记录查询

