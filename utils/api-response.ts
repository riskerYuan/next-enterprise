interface ApiResponse<T> {
  code: number
  data: T | null
  message: string
  timestamp: number
  success: boolean
}

export class ApiResponseHandler {
  static success<T>(data: T, message: string = "操作成功"): ApiResponse<T> {
    return {
      code: 200,
      data,
      message,
      timestamp: Date.now(),
      success: true,
    }
  }

  static error(message: string = "操作失败", code: number = 500): ApiResponse<null> {
    return {
      code,
      data: null,
      message,
      timestamp: Date.now(),
      success: false,
    }
  }

  static badRequest(message: string = "请求参数错误"): ApiResponse<null> {
    return {
      code: 400,
      data: null,
      message,
      timestamp: Date.now(),
      success: false,
    }
  }
}
