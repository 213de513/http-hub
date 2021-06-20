---
sidebarDepth: 0
---

# 更新日志

## v1.1.0 <Badge text="new" />

- 适配了 REST API 规范

## v1.0.2

- 修改了 eolinker 文件的 API 构建方式，由 **API 名称** 改为 **method+URL 最后一级的驼峰形式** 为调用方法名

## v1.0.1

- 修改了文件夹中模块的调用方式，统一采用驼峰形式

## v1.0.0

- 增加异常处理及客户端异常捕获
- 增加模块化调用
- 增加响应缓存功能
- 增加解析 eolinker 导出的 json 文件功能
- 增加 allRes 配置，可为某个接口配置返回 response，response.data，response.data.data
