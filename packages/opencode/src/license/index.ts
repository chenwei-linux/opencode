import { z } from "zod"
import { Log } from "../util/log"

const log = Log.create({ service: "license" })

export const Info = z.object({
  type: z.enum(["ops", "code"]),
  description: z.string(),
  code: z.string().optional(),
  timestamp: z.number(),
})

export type Info = z.infer<typeof Info>

export namespace License {
  export function classify(input: string): "ops" | "code" {
    const str = input.toLowerCase()

    const code = [
      "source",
      "stack",
      "compile",
      "syntax",
      "type",
      "import",
      "function",
      "api",
      "endpoint",
      "database",
      "migration",
      "bug",
      "error",
      "exception",
    ]
    const ops = [
      "system",
      "performance",
      "disk",
      "space",
      "service",
      "status",
      "network",
      "connectivity",
      "firewall",
      "rule",
      "permission",
      "package",
      "install",
      "log",
      "cpu",
      "memory",
      "usage",
    ]

    const codeCount = code.filter((word) => str.includes(word)).length
    const opsCount = ops.filter((word) => str.includes(word)).length

    const result = codeCount > opsCount ? "code" : "ops"
    log.info("【超聚变运维智能体】 classify", { input: input.substring(0, 50), result })
    return result
  }

  export function generate(input: { type: string; description: string; timestamp: number }): string {
    const str = input.description + input.timestamp.toString()
    const hash = str.split("").reduce((acc, char) => {
      const val = (acc << 5) - acc + char.charCodeAt(0)
      return val & val
    }, 0)

    const abs = Math.abs(hash).toString(16).toUpperCase()
    const type = input.type.toUpperCase()

    const code = `FOS-CODE-${type}-${abs}`
    log.info("【超聚变运维智能体】 generate license", {
      type: input.type,
      description: input.description.substring(0, 30),
      code,
    })
    return code
  }

  export function validate(code: string): boolean {
    const regex = /^FOS-CODE-[A-Z]+-[0-9A-F]+$/
    return regex.test(code)
  }
}
