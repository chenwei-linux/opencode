import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect, describe } from "bun:test"

describe("build agent functional verification", () => {
  test("build agent can execute bash commands", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const build = await Agent.get("build")
        expect(build).toBeDefined()

        const bashResult = PermissionNext.evaluate("bash", "ls", build!.permission)
        expect(bashResult.action).toBe("allow")
      },
    })
  })

  test("build agent can read files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const build = await Agent.get("build")
        expect(build).toBeDefined()

        const readResult = PermissionNext.evaluate("read", "test.ts", build!.permission)
        expect(readResult.action).toBe("allow")
      },
    })
  })

  test("build agent cannot edit files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const build = await Agent.get("build")
        expect(build).toBeDefined()

        const editResult = PermissionNext.evaluate("edit", "test.ts", build!.permission)
        expect(editResult.action).toBe("deny")
      },
    })
  })
})
