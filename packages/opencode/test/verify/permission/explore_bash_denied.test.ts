import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect } from "bun:test"

test("explore agent bash permission should be denied", async () => {
  await using tmp = await tmpdir()
  await Instance.provide({
    directory: tmp.path,
    fn: async () => {
      const explore = await Agent.get("explore")
      expect(explore).toBeDefined()

      const bashResult = PermissionNext.evaluate("bash", "ls -la", explore!.permission)
      expect(bashResult.action).toBe("deny")
    },
  })
})
