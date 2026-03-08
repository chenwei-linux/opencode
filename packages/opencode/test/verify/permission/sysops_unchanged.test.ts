import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect } from "bun:test"

test("sysops agent should keep original capabilities", async () => {
  await using tmp = await tmpdir()
  await Instance.provide({
    directory: tmp.path,
    fn: async () => {
      const sysops = await Agent.get("sysops")
      expect(sysops).toBeDefined()

      const bashResult = PermissionNext.evaluate("bash", "uptime", sysops!.permission)
      expect(bashResult.action).toBe("allow")

      const readResult = PermissionNext.evaluate("read", "test.ts", sysops!.permission)
      expect(readResult.action).toBe("allow")

      const grepResult = PermissionNext.evaluate("grep", "test", sysops!.permission)
      expect(grepResult.action).toBe("allow")
    },
  })
})
