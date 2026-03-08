#!/bin/bash
#
# FosCode 运维智能体安装脚本
# 
# 用法:
#   curl -fsSL https://raw.githubusercontent.com/chenwei-linux/opencode/v1.2.21/install-foscode.sh | bash
#   或
#   ./install-foscode.sh
#

set -e

# 配置
VERSION="1.2.21"
REPO="chenwei-linux/opencode"
INSTALL_DIR="${HOME}/.local/bin"
TEMP_DIR="/tmp/foscode-install-$$"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检测操作系统
detect_os() {
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        echo "linux"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        echo "macos"
    elif [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
        echo "windows"
    else
        echo "unknown"
    fi
}

# 检测包管理器
detect_package_manager() {
    if command -v bun &> /dev/null; then
        echo "bun"
    elif command -v npm &> /dev/null; then
        echo "npm"
    elif command -v pnpm &> /dev/null; then
        echo "pnpm"
    elif command -v yarn &> /dev/null; then
        echo "yarn"
    else
        echo "none"
    fi
}

# 安装 Bun
install_bun() {
    log_info "正在安装 Bun 运行时..."
    curl -fsSL https://bun.sh/install | bash
    
    # 加载 Bun 环境
    export BUN_INSTALL="$HOME/.bun"
    export PATH="$BUN_INSTALL/bin:$PATH"
    
    log_info "Bun 安装完成: $(bun --version)"
}

# 克隆仓库
clone_repo() {
    log_info "正在克隆 FosCode 仓库..."
    mkdir -p "${TEMP_DIR}"
    cd "${TEMP_DIR}"
    
    # 克隆指定版本
    git clone --depth 1 --branch v${VERSION} https://github.com/${REPO}.git .
    
    log_info "仓库克隆完成"
}

# 安装依赖
install_deps() {
    log_info "正在安装依赖..."
    bun install
    log_info "依赖安装完成"
}

# 构建项目
build_project() {
    log_info "正在构建项目..."
    cd packages/opencode
    bun run build
    log_info "项目构建完成"
}

# 配置 foscode
configure() {
    log_info "正在创建配置文件..."
    
    # 创建配置目录
    mkdir -p "${HOME}/.config/opencode"
    
    # 创建基础配置
    cat > "${HOME}/.config/opencode/opencode.json" << 'EOF'
{
  "$schema": "https://opencode.ai/config.json",
  "model": "claude-sonnet-4-20250514",
  "default_agent": "sysops",
  "permission": {
    "bash": "allow",
    "read": "allow",
    "grep": "allow",
    "glob": "allow",
    "edit": "deny",
    "write": "deny",
    "multiedit": "deny",
    "apply_patch": "deny"
  }
}
EOF
    
    log_info "配置文件已创建: ${HOME}/.config/opencode/opencode.json"
}

# 创建启动脚本
create_launcher() {
    log_info "正在创建启动脚本..."
    
    mkdir -p "${INSTALL_DIR}"
    
    cat > "${INSTALL_DIR}/foscode" << 'EOF'
#!/bin/bash
# FosCode 运维智能体启动脚本

# 加载 Bun 环境
export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

# 进入项目目录
cd "$(dirname "$0")/../opencode/packages/opencode"

# 启动 foscode
exec bun run index.ts "$@"
EOF
    
    chmod +x "${INSTALL_DIR}/foscode"
    
    log_info "启动脚本已创建: ${INSTALL_DIR}/foscode"
}

# 清理临时文件
cleanup() {
    log_info "正在清理临时文件..."
    rm -rf "${TEMP_DIR}"
}

# 主函数
main() {
    echo "=========================================="
    echo "  FosCode 运维智能体 安装程序"
    echo "  Version: ${VERSION}"
    echo "=========================================="
    echo ""
    
    OS=$(detect_os)
    PKG_MANAGER=$(detect_package_manager)
    
    log_info "检测到操作系统: ${OS}"
    log_info "检测到包管理器: ${PKG_MANAGER}"
    
    # 检查 Bun
    if ! command -v bun &> /dev/null; then
        log_warn "未检测到 Bun，将自动安装"
        install_bun
    else
        log_info "已检测到 Bun: $(bun --version)"
    fi
    
    # 克隆仓库
    clone_repo
    
    # 安装依赖
    install_deps
    
    # 构建项目
    build_project
    
    # 配置
    configure
    
    # 创建启动器
    create_launcher
    
    # 清理
    cleanup
    
    echo ""
    echo "=========================================="
    echo -e "${GREEN}安装完成!${NC}"
    echo "=========================================="
    echo ""
    echo "使用以下命令启动 FosCode:"
    echo "  ${INSTALL_DIR}/foscode"
    echo ""
    echo "或添加到 PATH 后直接运行:"
    echo "  foscode"
    echo ""
    echo "详细说明请参阅: README.foscode.md"
    echo ""
}

# 运行主函数
main "$@"
