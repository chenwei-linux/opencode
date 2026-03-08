import { Agent } from "../../../src/agent/agent"
import { Instance } from "../../../src/project/instance"
import { PermissionNext } from "../../../src/permission/next"
import { tmpdir } from "../../fixture/fixture"
import { test, expect, describe } from "bun:test"

describe("sysops agent functional verification", () => {
  test("sysops agent can execute system commands", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const sysops = await Agent.get("sysops")
        expect(sysops).toBeDefined()

        const result = PermissionNext.evaluate("bash", "uptime", sysops!.permission)
        expect(result.action).toBe("allow")
      },
    })
  })

  test("sysops agent can read files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const sysops = await Agent.get("sysops")
        expect(sysops).toBeDefined()

        const result = PermissionNext.evaluate("read", "/etc/hostname", sysops!.permission)
        expect(result.action).toBe("allow")
      },
    })
  })

  test("sysops agent can search code", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const sysops = await Agent.get("sysops")
        expect(sysops).toBeDefined()

        const result = PermissionNext.evaluate("grep", "main", sysops!.permission)
        expect(result.action).toBe("allow")
      },
    })
  })

  test("sysops agent cannot edit files", async () => {
    await using tmp = await tmpdir()
    await Instance.provide({
      directory: tmp.path,
      fn: async () => {
        const sysops = await Agent.get("sysops")
        expect(sysops).toBeDefined()

        const result = PermissionNext.evaluate("edit", "config.yaml", sysops!.permission)
        expect(result.action).toBe("deny")
      },
    })
  })
})
