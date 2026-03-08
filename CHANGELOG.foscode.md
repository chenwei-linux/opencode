# 更新日志

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.2.21] - 2026-03-08

### 新增 (Added)

- **运维智能体 (SysOps Agent)**
  - 新增专门的 Linux 系统运维 Agent
  - 支持系统诊断、故障排查、性能调优、安全加固
  - 支持服务管理、日志分析、网络排查

- **许可证模块 (License Module)**
  - 新增代码问题分类器
  - 自动识别运维类 vs 代码类问题
  - 代码类问题自动生成许可证请求码
  - 支持 `FOS-CODE-XXX-XXXXXX` 格式许可证

- **运维技能 (SysOps Skills)**
  - 新增运维知识技能模块
  - 支持外部技能扩展 (.claude/skills, .agents/skills)

### 变更 (Changed)

- **权限收紧**
  - `build` agent: 禁用 edit/write/multiedit/apply_patch
  - `general` agent: 禁用 edit/write/multiedit/apply_patch
  - `explore` agent: 禁用 bash，保留纯查询能力

### 测试 (Testing)

- 新增权限验证测试套件 (5 个测试用例)
- 新增功能验证测试套件 (10 个测试用例)
- 所有测试通过

### 文档 (Documentation)

- 新增中文版 README (README.foscode.md)
- 详细说明架构设计和使用方法

---

## [1.2.20] - 2026-03-XX

### 基础版本 (基于 OpenCode v1.2.21)

- 沿用 OpenCode 核心框架
- 保留原始功能但重新定位目标用户

---

## 已知问题 (Known Issues)

- 暂无

---

## 升级指南 (Upgrade Guide)

### 从 v1.2.20 升级到 v1.2.21

```bash
# 拉取最新代码
git pull origin v1.2.21

# 重新安装依赖
bun install

# 运行测试验证
cd packages/opencode
bun test test/verify/
```

---

## 术语表 (Glossary)

| 术语               | 说明                              |
| ------------------ | --------------------------------- |
| **SysOps Agent**   | 运维智能体，专用 Linux 系统运维   |
| **License Module** | 许可证模块，用于区分运维/代码问题 |
| **Skill**          | 技能扩展，兼容 Claude Code 格式   |
| **Permission**     | 权限控制，定义 Agent 可用工具     |

---

## 如何贡献

欢迎提交 Issue 和 Pull Request！

详见 [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## 许可证

MIT License - see [LICENSE](./LICENSE) for details.

---

> 💡 **提示**: 本项目为 OpenCode 二次开发版本，专注于非编程场景。
