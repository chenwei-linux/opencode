import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect } from "bun:test"

test("explore agent query permissions should remain", async () => {
  await using tmp = await tmpdir()
  await Instance.provide({
    directory: tmp.path,
    fn: async () => {
      const explore = await Agent.get("explore")
      expect(explore).toBeDefined()

      const grepResult = PermissionNext.evaluate("grep", "test", explore!.permission)
      expect(grepResult.action).toBe("allow")

      const globResult = PermissionNext.evaluate("glob", "*.ts", explore!.permission)
      expect(globResult.action).toBe("allow")

      const readResult = PermissionNext.evaluate("read", "test.ts", explore!.permission)
      expect(readResult.action).toBe("allow")

      const websearchResult = PermissionNext.evaluate("websearch", "query", explore!.permission)
      expect(websearchResult.action).toBe("allow")
    },
  })
})
