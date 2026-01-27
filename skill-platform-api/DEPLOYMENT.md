# Skill Platform API - Docker 部署指南

本文档介绍如何使用 Docker 和 Docker Compose 部署 Skill Platform 后端服务。

## 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- 至少 2GB 可用内存

## 快速开始

### 1. 克隆项目（如果还没有）

```bash
cd /path/to/skill-platform-api
```

### 2. 配置环境变量

```bash
# 复制环境变量模板
cp .env.example .env

# 编辑配置（可选，默认配置应该可以工作）
vim .env
```

默认配置：
- API 端口: 8080
- MySQL 端口: 3306
- 数据库名: skill_platform
- 数据库用户: skill_user
- 数据库密码: skill_password

⚠️ **生产环境请务必修改密码！**

### 3. 一键启动

```bash
# 使用 init 脚本（推荐）
chmod +x scripts/init.sh
./scripts/init.sh

# 或使用 make
make init

# 或使用 docker-compose
docker-compose up -d --build
```

### 4. 验证服务

```bash
# 检查服务状态
docker-compose ps

# 查看 API 日志
docker-compose logs -f api

# 查看 MySQL 日志
docker-compose logs -f mysql

# 测试 API
curl http://localhost:8080/api/v1/skills

# 或使用 make test
make test
```

## 服务说明

### MySQL (skill-platform-mysql)

- **端口**: 3306
- **镜像**: mysql:8.0
- **数据卷**: mysql_data
- **初始化**: 自动执行 migrations/*.sql 文件
- **Root 密码**: rootpassword
- **应用用户**: skill_user / skill_password

### API (skill-platform-api)

- **端口**: 8080
- **镜像**: 自定义构建（基于 Go 1.21 Alpine）
- **健康检查**: 每 30s 检查一次
- **依赖**: 等待 MySQL 健康后才启动

### Nginx (skill-platform-nginx)

- **端口**: 80 (HTTP), 443 (HTTPS)
- **功能**: 反向代理、负载均衡、SSL 终止
- **配置文件**: nginx/nginx.conf

## Make 命令

```bash
make help          # 显示所有可用命令
make init          # 初始化并启动所有服务
make build         # 构建 Docker 镜像
make up            # 启动服务（后台运行）
make down          # 停止并删除容器
make restart       # 重启服务
make logs          # 查看所有服务日志
make logs-api      # 查看 API 日志
make logs-mysql    # 查看 MySQL 日志
make ps            # 查看运行中的容器
make clean         # 清理所有容器、卷和镜像
make mysql         # 连接到 MySQL shell
make migrate       # 手动运行数据库迁移
make test          # 测试 API
make rebuild       # 重新构建并重启
make health        # 检查服务健康状态
```

## 数据库管理

### 连接到 MySQL

```bash
# 使用 make 命令
make mysql

# 或使用 docker-compose
docker-compose exec mysql mysql -uskill_user -pskill_password skill_platform
```

### 备份数据库

```bash
# 备份
docker-compose exec mysql mysqldump -uskill_user -pskill_password skill_platform > backup_$(date +%Y%m%d).sql

# 恢复
docker-compose exec -T mysql mysql -uskill_user -pskill_password skill_platform < backup_20250128.sql
```

### 查看数据库文件

```bash
# 进入 MySQL 容器
docker-compose exec mysql sh

# 查看数据目录
ls -la /var/lib/mysql/

# 查看数据库
mysql -uskill_user -pskill_password -e "SHOW DATABASES;"
mysql -uskill_user -pskill_password skill_platform -e "SHOW TABLES;"
```

## 生产环境部署

### 1. 修改密码

编辑 `.env` 文件：

```bash
# 修改数据库密码
DB_PASSWORD=your_secure_password

# 修改 root 密码
# 需要同时修改 docker-compose.yml 中的 MYSQL_ROOT_PASSWORD
```

同时修改 `docker-compose.yml`：

```yaml
mysql:
  environment:
    MYSQL_ROOT_PASSWORD: your_secure_root_password
```

### 2. 配置 SSL（HTTPS）

1. 将 SSL 证书放到 `nginx/ssl/` 目录：
   - cert.pem
   - key.pem

2. 取消注释 `nginx/nginx.conf` 中的 HTTPS server 块

3. 配置证书路径：
```nginx
ssl_certificate /etc/nginx/ssl/cert.pem;
ssl_certificate_key /etc/nginx/ssl/key.pem;
```

### 3. 配置域名

修改 `nginx/nginx.conf`：

```nginx
server {
    listen 80;
    server_name your-domain.com;  # 修改这里
    ...
}
```

### 4. 资源限制

编辑 `docker-compose.yml`，添加资源限制：

```yaml
api:
    deploy:
      resources:
        limits:
          cpus: '0.5'
          memory: 512M
        reservations:
          cpus: '0.25'
          memory: 128M

mysql:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

### 5. 日志管理

配置日志轮转：

```yaml
services:
  api:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## 监控和调试

### 查看容器资源使用

```bash
docker stats
```

### 查看容器详情

```bash
docker inspect skill-platform-api
docker inspect skill-platform-mysql
```

### 进入容器调试

```bash
# 进入 API 容器
docker-compose exec api sh

# 查看 API 进程
docker-compose top api
```

### 重启单个服务

```bash
# 重启 API
docker-compose restart api

# 重启 MySQL
docker-compose restart mysql
```

## 常见问题

### 1. 端口冲突

如果 8080 或 3306 端口已被占用：

```bash
# 修改 docker-compose.yml 中的端口映射
ports:
  - "8081:8080"  # 将主机端口改为 8081
```

### 2. 数据库连接失败

```bash
# 检查 MySQL 是否就绪
docker-compose logs mysql

# 检查网络连接
docker-compose exec api ping mysql

# 查看环境变量
docker-compose exec api env | grep DB_
```

### 3. 容器无法启动

```bash
# 查看详细日志
docker-compose logs api

# 重新构建
docker-compose up -d --build --force-recreate
```

### 4. 清理并重新开始

```bash
# 停止所有服务
make down

# 清理所有数据（⚠️ 警告：会删除数据库数据）
make clean

# 重新初始化
make init
```

## API 文档

### 基础 URL

```
http://localhost:8080/api/v1
```

### 端点列表

#### Skills

- `GET /skills` - 获取所有技能
- `GET /skills/:slug` - 根据 slug 获取技能详情
- `POST /skills` - 创建新技能
- `PUT /skills/:slug` - 更新技能
- `DELETE /skills/:slug` - 删除技能

#### Users

- `GET /users/:username` - 获取用户信息
- `GET /users/:username/skills` - 获取用户的技能列表

#### Activity

- `GET /activity` - 获取全局活动日志
- `GET /skills/:id/activity` - 获取技能活动日志

### 示例请求

```bash
# 获取所有技能
curl http://localhost:8080/api/v1/skills

# 创建技能
curl -X POST http://localhost:8080/api/v1/skills \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-skill",
    "name": "test_skill",
    "description": "A test skill",
    "category": "testing",
    "content": "You are a helpful assistant...",
    "author_id": 1
  }'

# Star 技能
curl -X POST http://localhost:8080/api/v1/skills/test-skill/star
```

## 开发环境

### 热重载

Docker 容器不支持热重载，建议在宿主机开发：

```bash
# 本地运行 API
go run cmd/server/main.go

# 或使用 air 热重载
air
```

### 使用 Docker 进行开发

如果想在 Docker 中开发，可以挂载源代码：

```yaml
api:
  volumes:
    - .:/app
  working_dir: /app
  command: go run cmd/server/main.go
```

## 更新部署

### 更新代码

```bash
# 1. 拉取最新代码
git pull

# 2. 重新构建并部署
make rebuild

# 或手动
docker-compose up -d --build
```

### 零停机部署

```bash
# 1. 构建新镜像（不中断服务）
docker-compose build

# 2. 启动新容器
docker-compose up -d --no-deps --build api

# 3. 健康检查通过后，停止旧容器
docker-compose up -d
```

## 性能优化

### MySQL 优化

在 `docker-compose.yml` 中添加 MySQL 命令：

```yaml
mysql:
  command:
    - --default-authentication-plugin=mysql_native_password
    - --character-set-server=utf8mb4
    - --collation-server=utf8mb4_unicode_ci
    - --max_connections=200
    - --innodb_buffer_pool_size=256M
```

### Go 优化

构建时使用优化标志：

```dockerfile
RUN CGO_ENABLED=0 GOOS=linux GOAMD64=1 go build -ldflags="-s -w" -o server cmd/server/main.go
```

## 安全建议

1. ✅ 使用环境变量存储敏感信息
2. ✅ 不要在代码中硬编码密码
3. ✅ 生产环境使用强密码
4. ✅ 启用 HTTPS
5. ✅ 配置防火墙规则
6. ✅ 定期更新镜像
7. ⚠️ 不要在提交代码中包含 `.env` 文件

## 支持

如有问题，请查看：
- [项目 README](README.md)
- [API 文档](README.md#api-endpoints)
- [Docker 文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
