# 🚀 手动启动项目指南

## 方法 1：使用启动脚本（最简单）

### 步骤 1：打开终端，添加执行权限
```bash
chmod +x ~/bucode/sp/start.sh ~/bucode/sp/stop.sh ~/bucode/sp/test-start.sh
```

### 步骤 2：运行测试（可选但推荐）
```bash
cd ~/bucode/sp
./test-start.sh
```

这会检查：
- ✅ 项目目录是否存在
- ✅ 依赖是否已安装
- ✅ 端口是否被占用
- ✅ 后端是否能编译

### 步骤 3：启动项目
```bash
cd ~/bucode/sp
./start.sh
```

启动后，您会看到：
```
📡 Starting Backend API on port 8081...
✅ Backend started with PID: xxxx

🎨 Starting Frontend on port 3000...
✅ Frontend started with PID: xxxx

=========================================
✨ Skill Platform is now running!
=========================================

📂 Project Directory: /Users/qinpeng.60/bucode/sp
📡 Backend API:     http://localhost:8081
🎨 Frontend:        http://localhost:3000
```

### 步骤 4：访问应用
- 打开浏览器访问：http://localhost:3000
- 测试后端 API：http://localhost:8081/health

### 停止项目
在启动的终端按 `Ctrl+C`，或者运行：
```bash
cd ~/bucode/sp
./stop.sh
```

---

## 方法 2：分别启动（推荐用于开发）

### 打开两个终端窗口

**终端 1 - 启动后端：**
```bash
cd ~/bucode/sp/skill-platform-api
go run cmd/server/main.go
```

您会看到：
```
2025/01/28 xx:xx:xx 🚀 Skill Platform API starting on port:8081
2025/01/28 xx:xx:xx 📡 API Documentation: http://localhost:8081/api/v1/skills
2025/01/28 xx:xx:xx 🏥 Health Check: http://localhost:8081/health
```

**终端 2 - 启动前端：**
```bash
cd ~/bucode/sp/skill-platform
npm run dev
```

您会看到：
```
  ▲ Next.js 16.1.5
  - Local:        http://localhost:3000
  - Network:      http://192.168.x.x:3000

✓ Ready in 2.3s
```

---

## 方法 3：使用 VS Code 终端

### 1. 在 VS Code 中打开项目
```bash
code ~/bucode/sp
```

### 2. 打开集成终端
- 按 `Ctrl + ` ` (反引号键) 或
- 菜单：终端 → 新建终端

### 3. 拆分终端
- 点击终端面板右上角的 "拆分终端" 图标
- 现在您有两个并排的终端

### 4. 在左侧终端启动后端
```bash
cd skill-platform-api
go run cmd/server/main.go
```

### 5. 在右侧终端启动前端
```bash
cd skill-platform
npm run dev
```

---

## ⚠️ 常见问题解决

### 问题 1：端口被占用
```bash
# 查看占用端口的进程
lsof -i:3000  # 前端
lsof -i:8081  # 后端

# 终止进程
kill -9 <PID>

# 或者运行停止脚本
cd ~/bucode/sp
./stop.sh
```

### 问题 2：依赖未安装
```bash
# 安装前端依赖
cd ~/bucode/sp/skill-platform
npm install

# 下载后端依赖
cd ~/bucode/sp/skill-platform-api
go mod download
```

### 问题 3：权限错误
```bash
# 添加执行权限
chmod +x ~/bucode/sp/*.sh
```

### 问题 4：后端启动失败
检查 Go 版本：
```bash
go version  # 需要 Go 1.21+
```

### 问题 5：前端启动失败
检查 Node 版本：
```bash
node --version  # 需要 Node 18+
npm --version
```

---

## 📝 验证服务是否正常

### 测试后端
```bash
curl http://localhost:8081/health
```
应该返回：
```json
{"message":"Skill Platform API is running","status":"ok"}
```

### 测试前端
打开浏览器访问：http://localhost:3000

---

## 🎯 开发提示

### 查看日志
- 后端日志会在运行 `go run` 的终端显示
- 前端日志会在运行 `npm run dev` 的终端显示

### 热重载
- ✅ 前端已自动配置热重载
- ✅ 修改代码后会自动刷新浏览器

### 调试
- 前端：在浏览器开发者工具中调试
- 后端：查看终端输出的日志

---

需要帮助？请检查：
1. 项目目录是否正确：`/Users/qinpeng.60/bucode/sp`
2. 两个项目是否都在该目录下
3. 依赖是否已安装
4. 端口是否被占用
