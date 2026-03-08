import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect } from "bun:test"

test("build agent edit permission should be denied", async () => {
  await using tmp = await tmpdir()
  await Instance.provide({
    directory: tmp.path,
    fn: async () => {
      const build = await Agent.get("build")
      expect(build).toBeDefined()

      const editResult = PermissionNext.evaluate("edit", "test.ts", build!.permission)
      expect(editResult.action).toBe("deny")

      const writeResult = PermissionNext.evaluate("write", "test.ts", build!.permission)
      expect(writeResult.action).toBe("deny")
    },
  })
})
