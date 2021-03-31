<template>
  <div v-click-outside="hideMenu" class="nav-item theme-selecter">
    <div
      class="dropdown-wrapper"
      ref="themeSelecterIcon"
      @click.prevent="showMenu = !showMenu"
    >
      切换主题
    </div>
    <transition name="menu-transition" mode="out-in">
      <div v-show="showMenu" class="theme-picker-menu" ref="themePickerMenus">
        <ul v-for="group in themesView" :key="group.label">
          <li>{{ group.label }}主题</li>
          <ul>
            <li
              v-for="(item, index) in group.options"
              :key="item + index"
              class="theme-select-option"
            >
              <span
                :class="[
                  'theme-name',
                  item.id == defaultThemeId ? 'theme-name--active' : ''
                ]"
                @click="clickThemeName(item.id)"
              >
                {{ item.pkgName }}
              </span>
              <a
                class="theme-down"
                :href="downloadUrl"
                :download="item.pkgName + '.zip'"
                >↓</a
              >
            </li>
          </ul>
        </ul>
      </div>
    </transition>
  </div>
</template>
<script>
import ClickOutside from 'vue-click-outside'
import axios from 'axios'
import _ from 'lodash'

export default {
  directives: {
    'click-outside': ClickOutside
  },
  data() {
    return {
      themeNameTextInCodeXPath: 14,
      themePathTextInCodeXPath: 10,
      themeNotesTextInCodeXPath: 8,
      showMenu: false,
      downloadUrl: '',
      themesViewName: 'docSet.themesView',
      themesMapViewName: 'docSet.themesMapView',
      defaultThemeIdName: 'docSet.defaultThemeId',
      themesView: [{ label: 'a' }],
      themesMapView: [],
      defaultThemeId: 'default'
    }
  },
  watch: {
    $route(to, from) {
      if (to.path === '/start/theme.html') {
        this.$nextTick(() => {
          let sourceThemeName = _.get(
            this.themesMapView,
            [0, this.defaultThemeId],
            'LGH-DB-01'
          )
          this.changeThemeTextInCode(sourceThemeName)
        })
      }
    }
  },
  beforeMount() {
    const self = this
    this.getDv(dv => {
      this.getViewdata(dv, 'themesView')
    }, this.themesViewName)
    this.getDv(dv => {
      this.getViewdata(dv, 'themesMapView')
    }, this.themesMapViewName)
  },
  methods: {
    clickIcon() {
      this.showMenu = !showMenu
    },
    hideMenu() {
      this.showMenu = false
    },
    returnXPath(number) {
      return `/html/body/div/div[1]/main/div[1]/div[1]/pre/code/span[${number}]`
    },
    getDomByXPath(pathCode) {
      return document.evaluate(
        this.returnXPath(pathCode),
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue
    },
    // 联动下边的注册主题中的内容
    changeThemeTextInCode(themeName) {
      const nameDom = this.getDomByXPath(this.themeNameTextInCodeXPath)
      const pathDom = this.getDomByXPath(this.themePathTextInCodeXPath)
      const notesDom = this.getDomByXPath(this.themeNotesTextInCodeXPath)
      if (themeName === 'LGH-DB-01') {
        nameDom.innerText = `'default.json'`
        pathDom.innerText = `@vislab/LCharts/dist/l-charts.min.css`
        notesDom.innerText = `// 引入css`
      } else {
        nameDom.innerText = `'${themeName}.json'`
        pathDom.innerText = `'css主题文件路径/l-charts.min.css'`
        notesDom.innerText = `// 引入主题css`
      }
    },
    clickThemeName(id) {
      this.defaultThemeId = id
      this.fdata.setState('docSet', 'defaultThemeId', this.defaultThemeId)
      this.transTheme()
      this.hideMenu()
    },
    getDv(cb, name) {
      this.fdata.getDv(...name.split('.'), cb.bind(this))
    },
    getViewdata(dv, target) {
      this[target] = dv.rows
      dv.on('change', rows => {
        this[target] = rows
      })
    },
    transTheme() {
      // this.setTestTheme() // 变色龙测试
      let sourceThemeName = _.get(
        this.themesMapView,
        [0, this.defaultThemeId],
        'LGH-DB-01'
      )
      if (sourceThemeName) {
        this.includeLinkStyle(
          `/falcon-files/CDNs/lcharts/theme/${sourceThemeName}/l-charts.min.css`
        )
        this.getThemeJson(sourceThemeName)
        this.downloadUrl = `/falcon-files/CDNs/lcharts/theme/${sourceThemeName}.zip`
      }
      if (window.location.pathname === '/l-charts/start/theme.html') {
        this.changeThemeTextInCode(sourceThemeName)
      }
    },
    /** 获取css */
    includeLinkStyle(url) {
      var link = document.createElement('link')
      link.rel = 'stylesheet'
      link.type = 'text/css'
      link.href = url
      document.getElementsByTagName('head')[0].appendChild(link)
    },
    /** 获取echarts json */
    async getThemeJson(themeName) {
      const dataURL = `/falcon-files/CDNs/lcharts/theme/${themeName}/${themeName}.json`
      const data = await axios.get(dataURL)
      const themeJson = data.data
      this.$lcharts.useTheme(themeName, themeJson)
    },
    /** 是否显示下载按钮 */
    showDownloadIcon(id) {
      return id === this.defaultThemeId && id !== 'default'
    }
  }
}
</script>
<style lang="less" scoped>
.theme-selecter {
  // display: flex;
  // vertical-align: middle;
  // align-items: center;
  margin-right: 1.5rem;
  // .theme-selecter-icon {
  //   // width: 1.4rem;
  //   // height: 1.4rem;
  //   // margin-right: 1rem;
  //   cursor: pointer;
  //   height: 1.8rem;
  // }
}

.theme-picker-menu {
  position: absolute;
  // top: 40px;
  // left: 50%;
  transform: translateX(-50%);
  z-index: 150;

  // display: block;
  line-height: 1.7rem;
  font-weight: 400;
  background-color: #fff;
  // margin: 0.6rem 0;
  border: 1px solid #ddd;
  border-bottom-color: #ccc;
  text-align: left;
  border-radius: 0.25rem;
  padding: 0.6rem 1.5rem;
  top: 100%;

  &.menu-transition-enter-active,
  &.menu-transition-leave-active {
    transition: all 0.25s ease-in-out;
  }
  &.menu-transition-enter,
  &.menu-transition-leave-to {
    top: 50px;
    opacity: 0;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  .theme-select-option {
    // width: 100%;
    // height: 100%;
    padding: 0 0 0 0.6rem;
    display: flex;
    justify-content: space-between;
    .theme-down {
      margin-left: 15px;
      font-weight: bolder;
    }
    .theme-name {
      cursor: pointer;
    }
    .theme-name--active {
      color: #3eaf7c;
    }
    .theme-name:hover {
      color: #3eaf7c;
    }
  }
}
</style>
