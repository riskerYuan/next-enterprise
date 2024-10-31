import { fireEvent, render, screen } from "@testing-library/react"
import React from "react"
import { NumberInput } from "./NumberInput"

describe("NumberInput", () => {
  it("应该正确渲染初始值", () => {
    render(<NumberInput value="1234.56" />)
    expect(screen.getByRole("textbox")).toHaveValue("1,234.56")
  })

  it("应该正确处理数字输入", () => {
    const handleChange = jest.fn()
    render(<NumberInput onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "1234" } })
    expect(input).toHaveValue("1,234")
    expect(handleChange).toHaveBeenCalledWith("1234")
  })

  it("应该限制小数位数", () => {
    const handleChange = jest.fn()
    render(<NumberInput maxDecimal={2} onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "1.234" } })
    expect(input).toHaveValue("1.23")
    expect(handleChange).toHaveBeenCalledWith("1.23")
  })

  it("应该正确处理负数", () => {
    const handleChange = jest.fn()
    render(<NumberInput onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    fireEvent.change(input, { target: { value: "-1234.56" } })
    expect(input).toHaveValue("-1,234.56")
    expect(handleChange).toHaveBeenCalledWith("-1234.56")
  })

  it("应该处理前导零", () => {
    const handleChange = jest.fn()
    render(<NumberInput onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    // 测试单个零
    fireEvent.change(input, { target: { value: "0" } })
    expect(input).toHaveValue("0")

    // 测试前导零后跟小数点
    fireEvent.change(input, { target: { value: "0." } })
    expect(input).toHaveValue("0")

    // 测试多个前导零
    fireEvent.change(input, { target: { value: "000123" } })
    expect(input).toHaveValue("123")
  })

  it("应该正确处理特殊输入", () => {
    const handleChange = jest.fn()
    render(<NumberInput onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    // 测试单个小数点
    fireEvent.change(input, { target: { value: "." } })
    expect(input).toHaveValue("0")

    // 测试负号加小数点
    fireEvent.change(input, { target: { value: "-." } })
    expect(input).toHaveValue("-0")

    // 测试空输入
    fireEvent.change(input, { target: { value: "" } })
    expect(input).toHaveValue("0")
  })

  it("应该忽略无效输入", () => {
    const handleChange = jest.fn()
    render(<NumberInput onChange={handleChange} />)
    const input = screen.getByRole("textbox")

    const currentValue = "123.45"
    fireEvent.change(input, { target: { value: currentValue } })
    expect(input).toHaveValue("123.45")

    // 测试字母输入
    fireEvent.change(input, { target: { value: currentValue + "a" } })
    expect(input).toHaveValue("123.45")

    // 测试特殊字符
    fireEvent.change(input, { target: { value: currentValue + "@" } })
    expect(input).toHaveValue("123.45")
  })
})
