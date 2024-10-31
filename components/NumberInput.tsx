import React, { ChangeEvent, useEffect, useRef, useState } from "react"

type HTMLInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "type">

interface NumberInputProps extends HTMLInputProps {
  value?: string
  onChange?: (value: string) => void
  maxDecimal?: number
}

type FormatNumberOptions = {
  value: string
  maxDecimal?: number
}

export const NumberInput: React.FC<NumberInputProps> = ({
  value = "",
  onChange,
  maxDecimal = 2,
  className = "",
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState<string>("")
  const inputRef = useRef<HTMLInputElement>(null)

  // 格式化数字（添加千分位）
  const formatNumber = (num: string): string => {
    if (!num) return ""

    const isNegative = num.startsWith("-")
    const absNum = num.replace("-", "")
    const [integer, decimal] = absNum.split(".")

    const formattedInteger = integer?.replace(/\B(?=(\d{3})+(?!\d))/g, ",") || ""
    const result = `${isNegative ? "-" : ""}${formattedInteger}${decimal ? `.${decimal}` : ""}`

    return result
  }

  // 处理数字格式化和验证
  const handleNumberFormat = ({ value, maxDecimal = 2 }: FormatNumberOptions): string | null => {
    const unformattedValue = value.replace(/,/g, "")

    // 如果是空值，返回 '0'
    if (!unformattedValue) return "0"

    // 验证数字格式
    const isValid = /^-?(\d*\.?\d*)?$/.test(unformattedValue)
    if (!isValid) return null

    // 处理小数位数限制
    if (unformattedValue.includes(".")) {
      const [integer, decimal] = unformattedValue.split(".")
      if (decimal && decimal.length > maxDecimal) {
        return `${integer}.${decimal.slice(0, maxDecimal)}`
      }
    }

    // 处理特殊情况
    if (unformattedValue === ".") return "0"
    if (unformattedValue === "-.") return "-0"

    return unformattedValue
  }

  // 处理输入变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const input = e.target
    const newValue = input.value
    const currentPos = input.selectionStart || 0

    // 处理数字格式化
    const processedValue = handleNumberFormat({ value: newValue, maxDecimal })
    if (!processedValue) return

    // 处理前导零
    let finalValue = processedValue
    if (
      finalValue.length > 1 &&
      finalValue.startsWith("0") &&
      !finalValue.startsWith("0.") &&
      !finalValue.startsWith("-0.")
    ) {
      finalValue = finalValue.replace(/^0+/, "")
    }

    // 格式化并更新值
    const formattedValue = formatNumber(finalValue)
    setDisplayValue(formattedValue)
    onChange?.(finalValue)

    // 更新光标位置
    requestAnimationFrame(() => {
      if (!inputRef.current) return

      const beforeCursor = newValue.slice(0, currentPos)
      const commasBeforeCursor = (beforeCursor.match(/,/g) || []).length
      const newCommasBeforeCursor = (formattedValue.slice(0, currentPos).match(/,/g) || []).length
      const cursorOffset = newCommasBeforeCursor - commasBeforeCursor
      const newCursorPos = currentPos + cursorOffset

      inputRef.current.setSelectionRange(newCursorPos, newCursorPos)
    })
  }

  // 处理初始值和值的更新
  useEffect(() => {
    if (value === undefined) return

    const processedValue = handleNumberFormat({ value, maxDecimal })
    if (!processedValue) return

    const formattedValue = formatNumber(processedValue)
    setDisplayValue(formattedValue)

    if (processedValue !== value) {
      onChange?.(processedValue)
    }
  }, [value, maxDecimal, onChange])

  return (
    <input {...props} ref={inputRef} type="text" value={displayValue} onChange={handleChange} className={className} />
  )
}
