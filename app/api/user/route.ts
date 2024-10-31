import { NextResponse } from "next/server"
import { UserService } from "@/services/user.service"
import type { CreateUserInput } from "@/types/user"
import { ApiResponseHandler } from "@/utils/api-response"

export async function GET() {
  try {
    const users = await UserService.getAllUsers()
    return NextResponse.json(ApiResponseHandler.success(users, "获取用户列表成功"))
  } catch (error) {
    return NextResponse.json(ApiResponseHandler.error("获取用户列表失败"), { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as CreateUserInput
    const newUser = await UserService.createUser(data)
    return NextResponse.json(ApiResponseHandler.success(newUser, "创建用户成功"))
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建用户失败"
    return NextResponse.json(ApiResponseHandler.error(message), { status: 500 })
  }
}
