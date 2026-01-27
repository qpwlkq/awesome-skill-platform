# Skill Platform - 启动指南

## 📁 项目结构

```
~/bucode/sp/
├── skill-platform/      # 前端项目 (Next.js)
├── skill-platform-api/  # 后端项目 (Go + Gin)
├── start.sh            # 启动脚本
├── stop.sh             # 停止脚本
└── README.md           # 本文件
```

## 🚀 快速启动

### 一键启动（推荐）

```bash
cd ~/bucode/sp
chmod +x start.sh stop.sh
./start.sh
```

启动脚本会自动：
1. ✅ 检查前后端项目是否存在
2. ✅ 启动后端 API（端口 8081）
3. ✅ 启动前端应用（端口 3000）
4. ✅ 显示访问地址

按 `Ctrl+C` 可以同时停止两个服务。

### 手动启动

**终端 1 - 启动后端：**
```bash
cd ~/bucode/sp/skill-platform-api
go run cmd/server/main.go
```

**终端 2 - 启动前端：**
```bash
cd ~/bucode/sp/skill-platform
npm run dev
```

## 🛑 停止服务

### 使用停止脚本

```bash
cd ~/bucode/sp
./stop.sh
```

### 手动停止

```bash
# 方法 1：按 Ctrl+C（如果使用 start.sh 启动）

# 方法 2：终止进程
lsof -ti:3000 | xargs kill -9  # 停止前端
lsof -ti:8081 | xargs kill -9  # 停止后端
```

## 📍 访问地址

启动成功后访问：

- **前端应用**: http://localhost:3000
- **后端 API**: http://localhost:8081
- **健康检查**: http://localhost:8081/health
- **API 示例**: http://localhost:8081/api/v1/skills

## 🔧 首次运行

### 前端依赖安装

```bash
cd ~/bucode/sp/skill-platform
npm install
```

### 后端依赖安装

```bash
cd ~/bucode/sp/skill-platform-api
go mod download
```

### 数据库初始化（可选）

如果使用真实数据库：

```bash
cd ~/bucode/sp/skill-platform-api
mysql -u root -p skill_platform < migrations/001_init.sql
```

## ⚠️ 常见问题

### 端口被占用

```bash
# 查看占用端口的进程
lsof -i:3000  # 前端
lsof -i:8081  # 后端

# 终止进程
kill -9 <PID>
```

### 权限错误

```bash
chmod +x ~/bucode/sp/start.sh
chmod +x ~/bucode/sp/stop.sh
```

### 后端连接失败

检查：
1. 后端是否正常运行（访问 http://localhost:8081/health）
2. 前端 API 配置是否正确（lib/api.ts）
3. 防火墙是否阻止了端口

## 📝 开发模式

### 前端热重载
前端已配置热重载，修改代码后会自动刷新浏览器。

### 后端热重载
如需后端热重载，可安装 air：

```bash
go install github.com/cosmtrek/air@latest
cd ~/bucode/sp/skill-platform-api
air
```

## 🎯 下一步

1. 访问 http://localhost:3000 查看前端应用
2. 浏览技能列表和详情页
3. 创建新技能（开发中）
4. 查看用户资料和统计
5. 查看 API 文档：http://localhost:8081/api/v1/skills

## 📚 更多信息

- 前端技术栈：Next.js 16 + React 19 + TypeScript + Tailwind CSS 4
- 后端技术栈：Go 1.25 + Gin + GORM + MySQL
- 设计风格：终端/CLI 风格界面
