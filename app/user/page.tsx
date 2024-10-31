"use client"

import { useState } from "react"
import { NumberInput } from "components/NumberInput"

export default function UserPage() {
  const [value1, setValue1] = useState("1234567890.2222")
  const [value2, setValue2] = useState("0")

  return (
    <div className="container mx-auto py-8">
      <div className="mx-auto max-w-2xl space-y-8">
        {/* 测试只读展示 */}
        <div className="space-y-2">
          <h3 className="font-bold">只读展示：</h3>
          <NumberInput value="1234567890" />
        </div>

        {/* 测试可编辑与onChange */}
        <div className="space-y-2">
          <h3 className="font-bold">可编辑（带onChange）：</h3>
          <NumberInput value={value1} onChange={setValue1} className="rounded border p-2" />
          <div className="text-gray-500">当前值: {value1}</div>
        </div>

        {/* 测试小数位数限制 */}
        <div className="space-y-2">
          <h3 className="font-bold">限制小数位（1位）：</h3>
          <NumberInput value={value2} onChange={setValue2} maxDecimal={1} className="rounded border p-2" />
          <div className="text-gray-500">当前值: {value2}</div>
        </div>

        {/* 测试样式 */}
        <div className="space-y-2">
          <h3 className="font-bold">自定义样式：</h3>
          <NumberInput value="9876.54" className="rounded-lg border-2 border-blue-500 bg-gray-100 p-2" />
        </div>

        {/* 测试空值 */}
        <div className="space-y-2">
          <h3 className="font-bold">空值：</h3>
          <NumberInput className="rounded border p-2" />
        </div>

        {/* 测试负数 */}
        <div className="space-y-2">
          <h3 className="font-bold">负数：</h3>
          <NumberInput value="-1234.56" className="rounded border p-2" />
        </div>
      </div>
    </div>
  )
}
