<template>
  <div class="tinymce-gallery"
       :class="{fullscreen:isFullscreen}"
       style="position:relative">
    <textarea :id="id"
              :value="value"></textarea>

    <!-- 右侧按钮 -->
    <div class="tinymce-gallery-buttons">
      <el-button v-if="markdown"
                 style="border-radius:50%;width:20px;height:20px;padding:0"
                 type="primary"
                 circle
                 @click="goToMaxiang">?
      </el-button>
      <el-button v-if="markdown"
                 class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="visibleMarkDown=true;toHtml()">MarkDown
      </el-button>
      <el-button v-if="gallery"
                 class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="visibleGallery=true">图片库
      </el-button>
      <el-button class="tinymce-gallery-buttons-button"
                 type="info"
                 plain
                 @click="clearContent">清空
      </el-button>
    </div>

    <!-- 图片库 -->
    <vue-dialog v-if="gallery"
                :visible="visibleGallery"
                :width="widthGallery"
                top="5vh"
                title="图片库"
                type="PhotoGallery"
                :pic-list="galleryData.list"
                :page-size="8"
                @closeHandler="visibleGallery=false"
                @confirmHandler="confirmHandler"></vue-dialog>

    <!-- MarkDown -->
    <el-dialog v-if="markdown"
               title="MarkDown"
               :visible.sync="visibleMarkDown"
               :width="widthMarkDown">
      <mark-down :mark-down-content="markDownContent"></mark-down>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="visibleMarkDown = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// tinymce
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import "tinymce/skins/lightgray/skin.min.css";
import "./plugins.js";

// components
import VueDialog from "@/components/Dialog/VueDialog";
import MarkDown from "@/components/Editors/ShowDown/ShowDown";

export default {
  components: { VueDialog, MarkDown },
  props: {
    // 富文本规格
    tinyOpt: {
      type: Object,
      default: function() {
        return { height: 350 };
      }
    },
    // id
    id: {
      type: String,
      required: false,
      default: "tinymce"
    },
    // 富文本内容 - 完整标签
    value: { type: String, default: "" },
    // 插件
    plugins: {
      default: function() {
        return [];
      },
      type: Array
    },
    other_options: {
      type: Object,
      default: function() {
        return {};
      }
    },
    // 是否只读
    readonly: { type: Boolean, default: false },

    /* 图片库 */
    // 是否显示图片库
    gallery: {
      type: Boolean,
      default: false
    },
    // 图片库宽度
    widthGallery: {
      type: String,
      default: "80%"
    },
    // 图片库原始数据
    galleryData: {
      type: Object,
      default: () => {}
    },

    /* Markdown */
    // 是否显示Markdown
    markdown: {
      type: Boolean,
      default: false
    },
    widthMarkDown: {
      type: String,
      default: "60%"
    }
  },
  data() {
    return {
      // 富文本内容 - 编辑区
      content: "",
      // 富文本编辑区
      editor: null,
      // 是否正在输入
      isTyping: false,
      // 正在输入时的按键延时
      checkerTimeout: null,
      // 是否全屏 -> 顶部右侧按钮定位（非全屏：position；全屏：fixed）
      isFullscreen: false,
      // 弹窗 - 图片库
      visibleGallery: false,
      // 弹窗 - Markdown
      visibleMarkDown: false,
      // Markdown内容
      markDownContent: ""
    };
  },
  mounted() {
    this.content = this.value;
    this.init();
  },
  beforeDestroy() {
    this.editor.destroy();
    // try {
    //   this.editor.destroy();
    // } catch (e) {
    //   console.error(e);
    // }
  },
  watch: {
    $route(to, from) {
      this.init();
    },
    value: function(newValue) {
      if (!this.isTyping) {
        this.content = newValue;
        // try {
        //   if (this.hasOwnProperty('editor')) {
        //     this.editor.setContent(this.content);
        //   }
        // } catch (e) {
        //   console.error(e);
        // }
      }
    },
    readonly(value) {
      if (value) {
        this.editor.setMode("readonly");
      } else {
        this.editor.setMode("design");
      }
    }
  },
  methods: {
    init() {
      // 编辑器配置项
      const options = {
        selector: "#" + this.id,
        skin: false,
        init_instance_callback: this.initEditor,
        // 编辑区尺寸 - 高度
        height: this.tinyOpt.height,
        // 汉化：部署环境和生产环境的路径不同
        language_url:
          process.env.NODE_ENV === "development"
            ? document.location.protocol +
              "//" +
              window.location.host +
              "/static/langs/zh_CN.js"
            : document.location.protocol +
              "//" +
              window.location.host +
              process.env.TINYMCE_URL +
              "/static/langs/zh_CN.js",
        // menubar: false,  // 去掉顶部菜单
        branding: false, // 是否显示POWERED BY TINYMCE
        theme: "modern",
        toolbar_items_size: "small", // 按钮大小
        // 样式
        style_formats: [
          { title: "Bold", icon: "bold", format: "bold" },
          { title: "Italic", icon: "italic", format: "italic" },
          { title: "Underline", icon: "underline", format: "underline" },
          {
            title: "Strikethrough",
            icon: "strikethrough",
            format: "strikethrough"
          },
          { title: "Superscript", icon: "superscript", format: "superscript" },
          { title: "Subscript", icon: "subscript", format: "subscript" },
          { title: "Code", icon: "code", format: "code" }
        ],
        // 插件
        plugins: [
          "advlist autolink link image lists charmap print hr anchor pagebreak contextmenu searchreplace  visualchars code fullscreen media nonbreaking preview table directionality emoticons textcolor paste textcolor colorpicker textpattern insertdatetime hr code"
          // visualblocks
        ],
        // 顶栏1
        block_formats:
          "Paragraph=p;Heading 1=h1;Heading 2=h2;Heading 3=h3;Heading 4=h4;Heading 5=h5;Heading 6=h6;",
        // 顶栏2
        toolbar1:
          "insertfile undo redo | formatselect | hr bullist numlist | link unlink | uploadimg image media | emoticons anchor insertdatetime | preview fullscreen",
        // 顶栏3
        toolbar2:
          "styleselect fontsizeselect | forecolor backcolor | bold italic underline strikethrough | charmap code | alignleft aligncenter alignright alignjustify | outdent indent | removeformat"
      };
      // 编辑器初始化
      tinymce.init(this.concatAssciativeArrays(options, this.other_options));
    },
    // 事件监听
    initEditor(editor) {
      this.editor = editor;
      editor.setContent(this.content);
      // KeyUp
      editor.on("KeyUp", e => {
        this.submitNewContent("keyup");
      });
      // Change
      editor.on("Change", e => {
        if (this.editor.getContent() !== this.value) {
          this.submitNewContent("keyup");
        }
      });
      // FullscreenStateChanged
      editor.on("FullscreenStateChanged", e => {
        this.isFullscreen = e.state;
      });
      // init
      editor.on("init", e => {
        editor.setContent(this.content);
        this.$emit("input", this.content);
      });
      // 如果只读
      if (this.readonly) {
        this.editor.setMode("readonly");
      } else {
        this.editor.setMode("design");
      }
      this.$emit("editorInit", editor);
    },
    // 对 options 和 other_options 进行数据处理
    concatAssciativeArrays(array1, array2) {
      if (array2.length === 0) return array1;
      if (array1.length === 0) return array2;
      const dest = [];
      for (const key in array1) dest[key] = array1[key];
      for (const key in array2) dest[key] = array2[key];
      return dest;
    },
    submitNewContent(eventType) {
      this.isTyping = true;
      if (this.checkerTimeout !== null) {
        clearTimeout(this.checkerTimeout);
      }
      this.checkerTimeout = setTimeout(() => {
        this.isTyping = false;
        this.$emit(eventType, this.editor.getContent());
        // console.log(eventType);
      }, 300);
    },
    // 清空内容
    clearContent() {
      tinymce.activeEditor.setContent("");
      this.submitNewContent("keyup");
    },
    // 图片库按钮 - 确认
    confirmHandler(params) {
      this.visibleGallery = false;
      let picSelectedList = "";
      params.galleryList.forEach(pic => {
        picSelectedList += "<img src=" + pic.uploadLocalUrl + ">";
      });
      tinymce.execCommand("mceInsertContent", false, picSelectedList);
      this.submitNewContent("keyup");
    },
    // markdown -> html
    toHtml() {
      this.$nextTick(() => {
        var html = tinymce.activeEditor.getContent();
        // 去掉标签（但保留空格）
        this.markDownContent = html.replace(/<\/?.+?>/g, "");
        // console.log(this.transMessageContent);
        // var afterMessageContent = transMessageContent.replace(/ /g, '');
        // console.log(afterMessageContent);
      });
    },
    goToMaxiang() {
      window.open("https://maxiang.io", "_blank");
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tinymce-gallery /deep/ {
  .tinymce-gallery-buttons {
    position: absolute;
    top: 5px;
    right: 5px;
    &-button {
      position: relative;
      height: 25px;
      margin-left: 0;
      padding: 5px 15px;
      span {
        display: inline-block;
        margin: auto;
      }
    }
  }
  .mce-fullscreen {
    z-index: 2000;
  }
}

// dialog
.el-dialog__wrapper /deep/ {
  .el-dialog__body {
    padding: 10px 0 0 0;
  }

  .show-content {
    padding: 5px 15px;
    // overflow-y: auto;
  }
  #html-test {
    // padding: 0 20px;
    display: inline-block;
    min-width: 100%;
    max-width: 100%;
    min-height: 400px;
    max-height: 600px;
    resize: none;
    border: 0;
  }
}

// 全屏
.fullscreen {
  .tinymce-gallery-buttons {
    z-index: 2000;
    position: fixed;
  }
  .el-dialog__wrapper {
    z-index: 10000;
  }
}
</style>
