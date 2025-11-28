import { readMultipartFormData } from 'h3'
import type { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  // 只允许 POST 请求
  if (getMethod(event) !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method Not Allowed'
    })
  }

  try {
    // 获取配置中的 Imagga API 凭证
    const config = useRuntimeConfig()
    const apiKey = config.imaggaApiKey
    const apiSecret = config.imaggaApiSecret

    if (!apiKey || !apiSecret) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Imagga API 凭证未配置。请在 .env 文件中设置 IMAGGA_API_KEY 和 IMAGGA_API_SECRET，然后重启服务器。'
      })
    }

    // 读取上传的文件
    const formData = await readMultipartFormData(event)
    
    if (!formData || formData.length === 0) {
      throw createError({
        statusCode: 400,
        statusMessage: 'No file uploaded'
      })
    }

    const file = formData[0]
    if (!file.data || !file.filename) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid file data'
      })
    }

    // 检查文件类型
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    if (file.type && !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Unsupported file type. Only JPEG, PNG, and GIF are allowed.'
      })
    }

    // 检查文件大小（5MB）
    if (file.data.length > 5 * 1024 * 1024) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File size exceeds 5MB limit'
      })
    }

    // 准备调用 Imagga API
    // Imagga 的相似图片搜索 API 需要先上传图片，然后进行搜索
    // 这里我们使用相似图片搜索接口
    const auth = Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')

    // 第一步：上传图片到 Imagga 并获取 image_id
    const uploadFormData = new FormData()
    const blob = new Blob([file.data], { type: file.type || 'image/jpeg' })
    uploadFormData.append('image', blob, file.filename)

    // 添加超时控制（30秒）
    const uploadController = new AbortController()
    const uploadTimeout = setTimeout(() => uploadController.abort(), 30000)

    let uploadResponse
    try {
      uploadResponse = await fetch('https://api.imagga.com/v2/uploads', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`
        },
        body: uploadFormData,
        signal: uploadController.signal
      })
    } catch (fetchError: any) {
      clearTimeout(uploadTimeout)
      if (fetchError.name === 'AbortError') {
        throw createError({
          statusCode: 504,
          statusMessage: '上传图片超时，请稍后重试'
        })
      }
      throw createError({
        statusCode: 503,
        statusMessage: '服务暂时不可用，请稍后重试'
      })
    } finally {
      clearTimeout(uploadTimeout)
    }

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text()
      console.error('Imagga upload error:', errorText)
      
      // 处理 503 错误，提供更友好的消息
      if (uploadResponse.status === 503) {
        throw createError({
          statusCode: 503,
          statusMessage: '图片检测服务暂时不可用，请稍后重试'
        })
      }
      
      throw createError({
        statusCode: uploadResponse.status >= 500 ? 503 : uploadResponse.status,
        statusMessage: `图片上传失败: ${errorText || '未知错误'}`
      })
    }

    const uploadResult = await uploadResponse.json()
    const uploadId = uploadResult.result?.upload_id

    if (!uploadId) {
      throw createError({
        statusCode: 500,
        statusMessage: 'Failed to get upload ID from Imagga'
      })
    }

    // 第二步：使用上传的图片进行相似图片搜索
    // 注意：这需要在 Imagga 中先建立索引库
    // 如果没有索引库，我们可以使用 visual similarity 接口来比较两张图片
    // 或者使用 visual search 接口（需要先建立索引）
    
    // 这里我们使用相似图片搜索接口
    // 如果你有预先建立的索引库，可以使用 visual search
    // 否则，这个接口会在 Imagga 的公共图库中搜索相似图片
    
    // 添加超时控制（30秒）
    const searchController = new AbortController()
    const searchTimeout = setTimeout(() => searchController.abort(), 30000)

    let searchResponse
    try {
      searchResponse = await fetch(
        `https://api.imagga.com/v2/similar-images?upload_id=${uploadId}&limit=10`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Basic ${auth}`
          },
          signal: searchController.signal
        }
      )
    } catch (fetchError: any) {
      clearTimeout(searchTimeout)
      if (fetchError.name === 'AbortError') {
        throw createError({
          statusCode: 504,
          statusMessage: '搜索相似图片超时，请稍后重试'
        })
      }
      throw createError({
        statusCode: 503,
        statusMessage: '服务暂时不可用，请稍后重试'
      })
    } finally {
      clearTimeout(searchTimeout)
    }

    if (!searchResponse.ok) {
      const errorText = await searchResponse.text()
      console.error('Imagga search error:', errorText)
      
      // 处理 503 错误，提供更友好的消息
      if (searchResponse.status === 503) {
        throw createError({
          statusCode: 503,
          statusMessage: '图片检测服务暂时不可用，请稍后重试'
        })
      }
      
      throw createError({
        statusCode: searchResponse.status >= 500 ? 503 : searchResponse.status,
        statusMessage: `相似图片搜索失败: ${errorText || '未知错误'}`
      })
    }

    const searchResult = await searchResponse.json()

    // 处理返回结果
    const similarImages = searchResult.result?.images || []
    
    // 计算最高相似度分数
    const maxSimilarity = similarImages.length > 0 
      ? Math.max(...similarImages.map((img: any) => img.score || 0))
      : 0

    // 转换为百分比格式（Imagga 返回的是 0-1 或 0-100）
    const similarityPercentage = maxSimilarity > 1 ? maxSimilarity : maxSimilarity * 100

    // 返回结果
    return {
      success: true,
      uploadId,
      similarity: {
        score: similarityPercentage,
        maxScore: 100,
        riskLevel: getRiskLevel(similarityPercentage),
        message: getRiskMessage(similarityPercentage)
      },
      similarImages: similarImages.slice(0, 5).map((img: any) => ({
        imageId: img.image_id,
        score: img.score > 1 ? img.score : img.score * 100,
        url: img.url || null
      })),
      totalMatches: similarImages.length
    }
  } catch (error: any) {
    console.error('Similarity check error:', error)
    
    // 如果是我们创建的 H3Error，直接抛出
    if (error.statusCode) {
      throw error
    }

    // 其他错误
    throw createError({
      statusCode: 500,
      statusMessage: error.message || 'Internal server error'
    })
  }
})

// 根据相似度分数判断风险等级
function getRiskLevel(score: number): 'low' | 'medium' | 'high' {
  if (score >= 80) return 'high'
  if (score >= 50) return 'medium'
  return 'low'
}

// 根据相似度分数生成风险提示信息
function getRiskMessage(score: number): string {
  if (score >= 80) {
    return '检测到高度相似的图片，存在较高的抄袭风险'
  }
  if (score >= 50) {
    return '检测到中等相似度的图片，建议进一步检查'
  }
  if (score > 0) {
    return '检测到低相似度的图片，原创性较好'
  }
  return '未检测到相似图片，原创性良好'
}

