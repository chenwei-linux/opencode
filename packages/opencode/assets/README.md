# FosCode 品牌资源

本目录包含 FosCode 运维智能体的品牌标识和视觉资源。

## 文件说明

| 文件                  | 说明                          |
| --------------------- | ----------------------------- |
| `logo.svg`            | SVG 矢量格式 logo，可无限缩放 |
| `logo-horizontal.svg` | 水平布局版本 (含文字)         |
| `logo-icon.svg`       | 纯图标版本 (不含文字)         |

## Logo 设计规范

### 颜色

```
主色 (Primary):     #1a73e8 (蓝色)
深色 (Dark):        #0d47a1 (深蓝)
背景 (Background):  #0d1117 (深灰黑)
文字 (Text):        #ffffff (白色)
强调 (Accent):      #7ee787 (绿色)
```

### 字体

- 英文: `Arial Bold` 或系统默认无衬线字体
- 中文: `Noto Sans SC` 或系统默认无衬线字体

### 使用场景

| 场景      | 推荐文件      | 尺寸         |
| --------- | ------------- | ------------ |
| 网站 Logo | logo.svg      | 200x200      |
| 社交媒体  | logo-icon.svg | 48x48, 96x96 |
| 文档插图  | logo.svg      | 可缩放       |
| 终端图标  | logo-icon.svg | 32x32        |

## 注意事项

- 请勿修改 Logo 的颜色比例
- 请勿拉伸或扭曲 Logo
- 保持足够的留白空间
- 深色背景使用白色版本，浅色背景使用蓝色版本

## 获取其他格式

如需 PNG、ICO 等格式，请使用以下工具转换：

```bash
# 使用 ImageMagick 转换
convert logo.svg -resize 256x256 logo.png

# 或使用在线工具
# https://svgtopng.com
```

---

> 💡 提示: Logo 设计遵循简洁、现代的原则，体现运维/系统的专业感。
