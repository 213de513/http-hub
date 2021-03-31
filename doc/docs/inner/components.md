# 异常提示组件

http-hub 为用户内置了一套异常提示组件，包含 Message、MessageBox、Notice，如果内置不满足可以[局部覆盖](/guide/usage/#异常捕获)，也可以进行[全局配置](/guide/global-config/#components)。

## Message

```javascript
import { Message } from '@vislab/http-hub'
```

此时调用方法为 `Message(options)` 。我们也为每个 type 定义了各自的方法，如 `Message.success(options)` 。并且可以调用 `Message.closeAll()` 手动关闭所有实例。

### Options

| 参数                     | 说明                                          | 类型           | 可选值                     | 默认值 |
| ------------------------ | --------------------------------------------- | -------------- | -------------------------- | ------ |
| message                  | 消息文字                                      | string / VNode | —                          | —      |
| type                     | 主题                                          | string         | success/warning/info/error | info   |
| iconClass                | 自定义图标的类名，会覆盖 `type`               | string         | —                          | —      |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理         | boolean        | —                          | false  |
| customClass              | 自定义类名                                    | string         | —                          | —      |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭         | number         | —                          | 3000   |
| showClose                | 是否显示关闭按钮                              | boolean        | —                          | false  |
| center                   | 文字是否居中                                  | boolean        | —                          | false  |
| onClose                  | 关闭时的回调函数, 参数为被关闭的 message 实例 | function       | —                          | —      |
| offset                   | Message 距离窗口顶部的偏移量                  | number         | —                          | 20     |

## MessageBox

```javascript
import { MessageBox } from '@vislab/http-hub'
```

我们提供了四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt。

### Options

| 参数                      | 说明                                                                                               | 类型                                                                                                                                                                      | 可选值                           | 默认值                                          |
| ------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------------------------------------------- |
| title                     | MessageBox 标题                                                                                    | string                                                                                                                                                                    | —                                | —                                               |
| message                   | MessageBox 消息正文内容                                                                            | string / VNode                                                                                                                                                            | —                                | —                                               |
| dangerouslyUseHTMLString  | 是否将 message 属性作为 HTML 片段处理                                                              | boolean                                                                                                                                                                   | —                                | false                                           |
| type                      | 消息类型，用于显示图标                                                                             | string                                                                                                                                                                    | success / info / warning / error | —                                               |
| iconClass                 | 自定义图标的类名，会覆盖 `type`                                                                    | string                                                                                                                                                                    | —                                | —                                               |
| customClass               | MessageBox 的自定义类名                                                                            | string                                                                                                                                                                    | —                                | —                                               |
| callback                  | 若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调                                       | function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法                                      | —                                | —                                               |
| showClose                 | MessageBox 是否显示右上角关闭按钮                                                                  | boolean                                                                                                                                                                   | —                                | true                                            |
| beforeClose               | MessageBox 关闭前的回调，会暂停实例的关闭                                                          | function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例 | —                                | —                                               |
| distinguishCancelAndClose | 是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分                      | boolean                                                                                                                                                                   | —                                | false                                           |
| lockScroll                | 是否在 MessageBox 出现时将 body 滚动锁定                                                           | boolean                                                                                                                                                                   | —                                | true                                            |
| showCancelButton          | 是否显示取消按钮                                                                                   | boolean                                                                                                                                                                   | —                                | false（以 confirm 和 prompt 方式调用时为 true） |
| showConfirmButton         | 是否显示确定按钮                                                                                   | boolean                                                                                                                                                                   | —                                | true                                            |
| cancelButtonText          | 取消按钮的文本内容                                                                                 | string                                                                                                                                                                    | —                                | 取消                                            |
| confirmButtonText         | 确定按钮的文本内容                                                                                 | string                                                                                                                                                                    | —                                | 确定                                            |
| cancelButtonClass         | 取消按钮的自定义类名                                                                               | string                                                                                                                                                                    | —                                | —                                               |
| confirmButtonClass        | 确定按钮的自定义类名                                                                               | string                                                                                                                                                                    | —                                | —                                               |
| closeOnClickModal         | 是否可通过点击遮罩关闭 MessageBox                                                                  | boolean                                                                                                                                                                   | —                                | true（以 alert 方式调用时为 false）             |
| closeOnPressEscape        | 是否可通过按下 ESC 键关闭 MessageBox                                                               | boolean                                                                                                                                                                   | —                                | true（以 alert 方式调用时为 false）             |
| closeOnHashChange         | 是否在 hashchange 时关闭 MessageBox                                                                | boolean                                                                                                                                                                   | —                                | true                                            |
| showInput                 | 是否显示输入框                                                                                     | boolean                                                                                                                                                                   | —                                | false（以 prompt 方式调用时为 true）            |
| inputPlaceholder          | 输入框的占位符                                                                                     | string                                                                                                                                                                    | —                                | —                                               |
| inputType                 | 输入框的类型                                                                                       | string                                                                                                                                                                    | —                                | text                                            |
| inputValue                | 输入框的初始文本                                                                                   | string                                                                                                                                                                    | —                                | —                                               |
| inputPattern              | 输入框的校验表达式                                                                                 | regexp                                                                                                                                                                    | —                                | —                                               |
| inputValidator            | 输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage | function                                                                                                                                                                  | —                                | —                                               |
| inputErrorMessage         | 校验未通过时的提示文本                                                                             | string                                                                                                                                                                    | —                                | 输入的数据不合法!                               |
| center                    | 是否居中布局                                                                                       | boolean                                                                                                                                                                   | —                                | false                                           |
| roundButton               | 是否使用圆角按钮                                                                                   | boolean                                                                                                                                                                   | —                                | false                                           |

## Notice

```javascript
import { Notice } from '@vislab/http-hub'
```

此时调用方法为 `Notice(options)` 。我们也为每个 type 定义了各自的方法，如 `Notice.success(options)` 。并且可以调用 `Notice.closeAll()` 手动关闭所有实例。

### Options

| 参数                     | 说明                                                                     | 类型              | 可选值                                      | 默认值    |
| ------------------------ | ------------------------------------------------------------------------ | ----------------- | ------------------------------------------- | --------- |
| title                    | 标题                                                                     | string            | —                                           | —         |
| message                  | 说明文字                                                                 | string/Vue. VNode | —                                           | —         |
| dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理                                    | boolean           | —                                           | false     |
| type                     | 主题样式，如果不在可选值内将被忽略                                       | string            | success/warning/info/error                  | —         |
| iconClass                | 自定义图标的类名。若设置了 `type` ，则 `iconClass` 会被覆盖              | string            | —                                           | —         |
| customClass              | 自定义类名                                                               | string            | —                                           | —         |
| duration                 | 显示时间, 毫秒。设为 0 则不会自动关闭                                    | number            | —                                           | 4500      |
| position                 | 自定义弹出位置                                                           | string            | top-right/top-left/bottom-right/bottom-left | top-right |
| showClose                | 是否显示关闭按钮                                                         | boolean           | —                                           | true      |
| onClose                  | 关闭时的回调函数                                                         | function          | —                                           | —         |
| onClick                  | 点击 Notification 时的回调函数                                           | function          | —                                           | —         |
| offset                   | 偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量 | number            | —                                           | 0         |
