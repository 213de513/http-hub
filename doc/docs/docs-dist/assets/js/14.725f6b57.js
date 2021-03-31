(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{523:function(t,v,_){"use strict";_.r(v);var s=_(2),e=Object(s.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h1",{attrs:{id:"异常提示组件"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#异常提示组件"}},[t._v("#")]),t._v(" 异常提示组件")]),t._v(" "),_("p",[t._v("http-hub 为用户内置了一套异常提示组件，包含 Message、MessageBox、Notice，如果内置不满足可以"),_("RouterLink",{attrs:{to:"/guide/usage/#异常捕获"}},[t._v("局部覆盖")]),t._v("，也可以进行"),_("RouterLink",{attrs:{to:"/guide/global-config/#components"}},[t._v("全局配置")]),t._v("。")],1),t._v(" "),_("h2",{attrs:{id:"message"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#message"}},[t._v("#")]),t._v(" Message")]),t._v(" "),_("div",{staticClass:"language-javascript line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-javascript"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Message "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vislab/http-hub'")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br")])]),_("p",[t._v("此时调用方法为 "),_("code",[t._v("Message(options)")]),t._v(" 。我们也为每个 type 定义了各自的方法，如 "),_("code",[t._v("Message.success(options)")]),t._v(" 。并且可以调用 "),_("code",[t._v("Message.closeAll()")]),t._v(" 手动关闭所有实例。")]),t._v(" "),_("h3",{attrs:{id:"options"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#options"}},[t._v("#")]),t._v(" Options")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("message")]),t._v(" "),_("td",[t._v("消息文字")]),t._v(" "),_("td",[t._v("string / VNode")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("type")]),t._v(" "),_("td",[t._v("主题")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("success/warning/info/error")]),t._v(" "),_("td",[t._v("info")])]),t._v(" "),_("tr",[_("td",[t._v("iconClass")]),t._v(" "),_("td",[t._v("自定义图标的类名，会覆盖 "),_("code",[t._v("type")])]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("dangerouslyUseHTMLString")]),t._v(" "),_("td",[t._v("是否将 message 属性作为 HTML 片段处理")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("customClass")]),t._v(" "),_("td",[t._v("自定义类名")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("duration")]),t._v(" "),_("td",[t._v("显示时间, 毫秒。设为 0 则不会自动关闭")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("3000")])]),t._v(" "),_("tr",[_("td",[t._v("showClose")]),t._v(" "),_("td",[t._v("是否显示关闭按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("center")]),t._v(" "),_("td",[t._v("文字是否居中")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("onClose")]),t._v(" "),_("td",[t._v("关闭时的回调函数, 参数为被关闭的 message 实例")]),t._v(" "),_("td",[t._v("function")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("offset")]),t._v(" "),_("td",[t._v("Message 距离窗口顶部的偏移量")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("20")])])])]),t._v(" "),_("h2",{attrs:{id:"messagebox"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#messagebox"}},[t._v("#")]),t._v(" MessageBox")]),t._v(" "),_("div",{staticClass:"language-javascript line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-javascript"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" MessageBox "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vislab/http-hub'")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br")])]),_("p",[t._v("我们提供了四个全局方法的调用方法依次为：MessageBox, MessageBox.alert, MessageBox.confirm 和 MessageBox.prompt。")]),t._v(" "),_("h3",{attrs:{id:"options-2"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#options-2"}},[t._v("#")]),t._v(" Options")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("title")]),t._v(" "),_("td",[t._v("MessageBox 标题")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("message")]),t._v(" "),_("td",[t._v("MessageBox 消息正文内容")]),t._v(" "),_("td",[t._v("string / VNode")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("dangerouslyUseHTMLString")]),t._v(" "),_("td",[t._v("是否将 message 属性作为 HTML 片段处理")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("type")]),t._v(" "),_("td",[t._v("消息类型，用于显示图标")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("success / info / warning / error")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("iconClass")]),t._v(" "),_("td",[t._v("自定义图标的类名，会覆盖 "),_("code",[t._v("type")])]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("customClass")]),t._v(" "),_("td",[t._v("MessageBox 的自定义类名")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("callback")]),t._v(" "),_("td",[t._v("若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调")]),t._v(" "),_("td",[t._v("function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("showClose")]),t._v(" "),_("td",[t._v("MessageBox 是否显示右上角关闭按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true")])]),t._v(" "),_("tr",[_("td",[t._v("beforeClose")]),t._v(" "),_("td",[t._v("MessageBox 关闭前的回调，会暂停实例的关闭")]),t._v(" "),_("td",[t._v("function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("distinguishCancelAndClose")]),t._v(" "),_("td",[t._v("是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("lockScroll")]),t._v(" "),_("td",[t._v("是否在 MessageBox 出现时将 body 滚动锁定")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true")])]),t._v(" "),_("tr",[_("td",[t._v("showCancelButton")]),t._v(" "),_("td",[t._v("是否显示取消按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false（以 confirm 和 prompt 方式调用时为 true）")])]),t._v(" "),_("tr",[_("td",[t._v("showConfirmButton")]),t._v(" "),_("td",[t._v("是否显示确定按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true")])]),t._v(" "),_("tr",[_("td",[t._v("cancelButtonText")]),t._v(" "),_("td",[t._v("取消按钮的文本内容")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("取消")])]),t._v(" "),_("tr",[_("td",[t._v("confirmButtonText")]),t._v(" "),_("td",[t._v("确定按钮的文本内容")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("确定")])]),t._v(" "),_("tr",[_("td",[t._v("cancelButtonClass")]),t._v(" "),_("td",[t._v("取消按钮的自定义类名")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("confirmButtonClass")]),t._v(" "),_("td",[t._v("确定按钮的自定义类名")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("closeOnClickModal")]),t._v(" "),_("td",[t._v("是否可通过点击遮罩关闭 MessageBox")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true（以 alert 方式调用时为 false）")])]),t._v(" "),_("tr",[_("td",[t._v("closeOnPressEscape")]),t._v(" "),_("td",[t._v("是否可通过按下 ESC 键关闭 MessageBox")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true（以 alert 方式调用时为 false）")])]),t._v(" "),_("tr",[_("td",[t._v("closeOnHashChange")]),t._v(" "),_("td",[t._v("是否在 hashchange 时关闭 MessageBox")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true")])]),t._v(" "),_("tr",[_("td",[t._v("showInput")]),t._v(" "),_("td",[t._v("是否显示输入框")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false（以 prompt 方式调用时为 true）")])]),t._v(" "),_("tr",[_("td",[t._v("inputPlaceholder")]),t._v(" "),_("td",[t._v("输入框的占位符")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("inputType")]),t._v(" "),_("td",[t._v("输入框的类型")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("text")])]),t._v(" "),_("tr",[_("td",[t._v("inputValue")]),t._v(" "),_("td",[t._v("输入框的初始文本")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("inputPattern")]),t._v(" "),_("td",[t._v("输入框的校验表达式")]),t._v(" "),_("td",[t._v("regexp")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("inputValidator")]),t._v(" "),_("td",[t._v("输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage")]),t._v(" "),_("td",[t._v("function")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("inputErrorMessage")]),t._v(" "),_("td",[t._v("校验未通过时的提示文本")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("输入的数据不合法!")])]),t._v(" "),_("tr",[_("td",[t._v("center")]),t._v(" "),_("td",[t._v("是否居中布局")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("roundButton")]),t._v(" "),_("td",[t._v("是否使用圆角按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])])])]),t._v(" "),_("h2",{attrs:{id:"notice"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#notice"}},[t._v("#")]),t._v(" Notice")]),t._v(" "),_("div",{staticClass:"language-javascript line-numbers-mode"},[_("pre",{pre:!0,attrs:{class:"language-javascript"}},[_("code",[_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" Notice "),_("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),_("span",{pre:!0,attrs:{class:"token string"}},[t._v("'@vislab/http-hub'")]),t._v("\n")])]),t._v(" "),_("div",{staticClass:"line-numbers-wrapper"},[_("span",{staticClass:"line-number"},[t._v("1")]),_("br")])]),_("p",[t._v("此时调用方法为 "),_("code",[t._v("Notice(options)")]),t._v(" 。我们也为每个 type 定义了各自的方法，如 "),_("code",[t._v("Notice.success(options)")]),t._v(" 。并且可以调用 "),_("code",[t._v("Notice.closeAll()")]),t._v(" 手动关闭所有实例。")]),t._v(" "),_("h3",{attrs:{id:"options-3"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#options-3"}},[t._v("#")]),t._v(" Options")]),t._v(" "),_("table",[_("thead",[_("tr",[_("th",[t._v("参数")]),t._v(" "),_("th",[t._v("说明")]),t._v(" "),_("th",[t._v("类型")]),t._v(" "),_("th",[t._v("可选值")]),t._v(" "),_("th",[t._v("默认值")])])]),t._v(" "),_("tbody",[_("tr",[_("td",[t._v("title")]),t._v(" "),_("td",[t._v("标题")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("message")]),t._v(" "),_("td",[t._v("说明文字")]),t._v(" "),_("td",[t._v("string/Vue. VNode")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("dangerouslyUseHTMLString")]),t._v(" "),_("td",[t._v("是否将 message 属性作为 HTML 片段处理")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("false")])]),t._v(" "),_("tr",[_("td",[t._v("type")]),t._v(" "),_("td",[t._v("主题样式，如果不在可选值内将被忽略")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("success/warning/info/error")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("iconClass")]),t._v(" "),_("td",[t._v("自定义图标的类名。若设置了 "),_("code",[t._v("type")]),t._v(" ，则 "),_("code",[t._v("iconClass")]),t._v(" 会被覆盖")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("customClass")]),t._v(" "),_("td",[t._v("自定义类名")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("duration")]),t._v(" "),_("td",[t._v("显示时间, 毫秒。设为 0 则不会自动关闭")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("4500")])]),t._v(" "),_("tr",[_("td",[t._v("position")]),t._v(" "),_("td",[t._v("自定义弹出位置")]),t._v(" "),_("td",[t._v("string")]),t._v(" "),_("td",[t._v("top-right/top-left/bottom-right/bottom-left")]),t._v(" "),_("td",[t._v("top-right")])]),t._v(" "),_("tr",[_("td",[t._v("showClose")]),t._v(" "),_("td",[t._v("是否显示关闭按钮")]),t._v(" "),_("td",[t._v("boolean")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("true")])]),t._v(" "),_("tr",[_("td",[t._v("onClose")]),t._v(" "),_("td",[t._v("关闭时的回调函数")]),t._v(" "),_("td",[t._v("function")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("onClick")]),t._v(" "),_("td",[t._v("点击 Notification 时的回调函数")]),t._v(" "),_("td",[t._v("function")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("—")])]),t._v(" "),_("tr",[_("td",[t._v("offset")]),t._v(" "),_("td",[t._v("偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量")]),t._v(" "),_("td",[t._v("number")]),t._v(" "),_("td",[t._v("—")]),t._v(" "),_("td",[t._v("0")])])])])])}),[],!1,null,null,null);v.default=e.exports}}]);