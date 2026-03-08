import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect, describe } from "bun:test"

describe("plan agent functional verification", () => {
  test("plan agent can read files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const plan = await Agent.get("plan")
        expect(plan).toBeDefined()

        const result = PermissionNext.evaluate("read", "test.ts", plan!.permission)
        expect(result.action).toBe("allow")
      },
    })
  })

  test("plan agent cannot edit files except plans", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const plan = await Agent.get("plan")
        expect(plan).toBeDefined()

        const result = PermissionNext.evaluate("edit", "test.ts", plan!.permission)
        expect(result.action).toBe("deny")
      },
    })
  })

  test("plan agent can edit .opencode/plans files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const plan = await Agent.get("plan")
        expect(plan).toBeDefined()

        const result = PermissionNext.evaluate("edit", ".opencode/plans/test.md", plan!.permission)
        expect(result.action).toBe("allow")
      },
    })
  })
})
