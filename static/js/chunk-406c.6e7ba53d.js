(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-406c"],{"8usN":function(t,e,i){},IsxU:function(t,e,i){"use strict";i.d(e,"b",function(){return a}),i.d(e,"c",function(){return s}),i.d(e,"a",function(){return n});var l=i("7Qib");function a(){return Object(l.f)({url:"/photo/list",method:"get"})}function s(t){return Object(l.f)({url:"/photo/update",method:"put",data:t})}function n(){return Object(l.f)({url:"/photo/delete",method:"delete"})}},P7US:function(t,e,i){"use strict";var l=i("j5eQ");i.n(l).a},j5eQ:function(t,e,i){},"qoH+":function(t,e,i){"use strict";var l={name:"Gallery",props:{visible:{type:Boolean,default:!1},type:{type:String,default:"PhotoGallery"},picListOrg:{type:Array,default:function(){return[]}},pageSize:{type:Number,default:8}},data:function(){return{picListAll:[],picList:[],pageNum:1,filterFormData:{uploadName:"",uploadIsfavorite:""},filters:[{key:"all",label:"全部",total:0},{key:"favorites",label:"我的收藏",total:0}],imgBox:{width:"100%",height:""},screenWidth:document.body.clientWidth,selectList:[],picBigShow:!1,picUrl:"",index:0}},watch:{visible:function(t){t?this.init():this.filterFormData={uploadName:"",uploadIsfavorite:""}},picListOrg:{deep:!0,handler:function(){this.refreshGallery()}},filters:{deep:!0,handler:function(t){this.filters=t}}},mounted:function(){var t=this;this.init();var e=this;window.onresize=function(){return window.screenWidth=document.body.clientWidth,e.screenWidth=window.screenWidth,void t.$nextTick(function(){var e=t.$refs.imgBox;if(t.visible){var i=e[0].getBoundingClientRect().width;t.imgBox.height=.6*i+"px"}})}},methods:{init:function(){var t=this;"PhotoGallery"===this.type&&(this.picListOrg.map(function(e){return t.$set(e,"edit",!1),t.$set(e,"select",!1),e}),this.refreshGallery(),this.picList.length>0&&this.$nextTick(function(){var e=t.$refs.imgBox;if(t.visible){var i=e[0].getBoundingClientRect().width;t.imgBox.height=.6*i+"px"}}))},getFiltersData:function(){var t=this,e=0;this.picListOrg.forEach(function(t){1===t.uploadIsfavorite&&(e+=1)}),this.filters.forEach(function(i){"all"===i.key?i.total=t.picListOrg.length:"favorites"===i.key&&(i.total=e)})},refreshGallery:function(){var t=this;this.getFiltersData(),this.picListAll=this.picListOrg.filter(function(e){if(e.uploadName.indexOf(t.filterFormData.uploadName)>-1&&e.uploadIsfavorite.toString().indexOf(t.filterFormData.uploadIsfavorite.toString())>-1)return e}),this.picList=this.picListAll.slice((this.pageNum-1)*this.pageSize,this.pageNum*this.pageSize)},asideSelect:function(t){switch(t){case"all":this.filterFormData.uploadIsfavorite="",this.pageNum=1,this.refreshGallery();break;case"favorites":this.filterFormData.uploadIsfavorite="1",this.pageNum=1,this.refreshGallery()}},handlePageChange:function(t){this.pageNum=t,this.refreshGallery()},picClickHander:function(t){var e=this;this.selectList=[],t.select=!t.select,this.picList.map(function(t){!0===t.select&&e.selectList.push(t)}),this.$emit("picClickHander",this.selectList)},picsDelHandler:function(){this.$emit("picsDelHandler",this.selectList)},picDelHandler:function(t){this.$emit("picDelHandler",t)},picReName:function(t){this.$emit("picReName",t)},insertFavor:function(t){this.$emit("insertFavor",t)},deleteFavor:function(t){this.$emit("deleteFavor",t)},picsUpload:function(t){"image/jpeg"===t.type||"image/png"?this.$emit("picsUpload",t):this.$message.error("上传图片只能是 JPG/PNG 格式!")},handleExceed:function(t,e){this.$message.warning("最多选择 10 张图片")},clipboardSuccess:function(){this.$message({message:"图片链接复制成功",type:"success",duration:1500})},picGlass:function(t,e){this.index=e,this.picUrl=t.uploadLocalUrl,this.picBigShow=!0},picBigLeft:function(){this.index>0&&(this.picUrl=this.picList[this.index-1].uploadLocalUrl,this.index--)},picBigRight:function(){this.index<this.pageSize-1&&(this.picUrl=this.picList[this.index+1].uploadLocalUrl,this.index++)},showOrgPic:function(){var t="https://"+this.picUrl;console.log(t),window.open(t,"_blank")},picBigSelect:function(){},picBigZoom:function(){}}},a=(i("P7US"),i("KHd+")),s=Object(a.a)(l,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("el-container",{staticClass:"gallery-container gallery"},[i("el-container",{staticClass:"gallery-container"},[i("el-aside",{staticClass:"gallery-container-aside",attrs:{width:"15%"}},[i("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"0"},on:{select:t.asideSelect}},[t._l(t.filters,function(e){return[i("el-menu-item",{key:e.key,attrs:{index:e.key}},[i("li",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(e.label)+"（"+t._s(e.total)+"）")])])]})],2)],1),t._v(" "),i("el-main",{staticStyle:{"text-align":"right"}},[i("div",{staticClass:"gallery-list-header"},[i("div",{staticClass:"gallery-list-search"},[i("el-input",{attrs:{placeholder:"PhotoGallery"===t.type?"图片标题":"脚本标题"},nativeOn:{keyup:function(e){if(!("button"in e)&&t._k(e.keyCode,"enter",13,e.key,"Enter"))return null;t.refreshGallery()}},model:{value:t.filterFormData.uploadName,callback:function(e){t.$set(t.filterFormData,"uploadName",e)},expression:"filterFormData.uploadName"}}),t._v(" "),i("el-button",{attrs:{icon:"el-icon-search",size:"mini",type:"primary",plain:""},on:{click:function(e){t.refreshGallery()}}},[t._v("搜索\n            ")]),t._v(" "),i("el-button",{staticStyle:{"margin-left":"5px"},attrs:{size:"mini",type:"danger",icon:"el-icon-delete",plain:""},on:{click:t.picsDelHandler}},[t._v("删除")])],1),t._v(" "),i("el-upload",{staticClass:"upload-demo",staticStyle:{display:"inline-block"},attrs:{accept:".jpg,.png,.bmp,jpge,",multiple:"",action:"","http-request":function(){},limit:10,"on-exceed":t.handleExceed,"before-upload":t.picsUpload,"show-file-list":!1,"auto-upload":""}},[i("el-button",{attrs:{size:"mini",type:"success"}},[t._v("本地上传")])],1)],1),t._v(" "),i("el-row",{staticClass:"gallery-list-row",attrs:{gutter:20}},[t._l(t.picList,function(e,l){return[i("el-col",{key:e.value,attrs:{span:6}},[i("div",{staticClass:"gallery-list-col"},[i("div",{ref:"imgBox",refInFor:!0,staticClass:"gallery-list-col-img",style:t.imgBox,on:{click:function(i){t.picClickHander(e)}}},[i("img",{attrs:{src:e.uploadLocalUrl}}),t._v(" "),i("div",{directives:[{name:"show",rawName:"v-show",value:e.select,expression:"pic.select"}],staticClass:"gallery-list-col-mask"},[i("i",{staticClass:"el-icon-check"})]),t._v(" "),i("div",{staticClass:"gallery-list-col-glass"},[i("i",{staticClass:"el-icon-search",on:{click:function(i){i.preventDefault(),i.stopPropagation(),t.picGlass(e,l)}}})])]),t._v(" "),i("div",{staticClass:"gallery-list-col-edit"},[i("span",{directives:[{name:"show",rawName:"v-show",value:!e.edit,expression:"!pic.edit"}],staticClass:"gallery-list-col-edit-picName",on:{click:function(t){e.edit=!e.edit}}},[i("span",[t._v("\n                      "+t._s(e.uploadName)+"\n                      "),i("i",{staticClass:"el-icon-edit",staticStyle:{"font-size":"12px",color:"#409EFF"}})])]),t._v(" "),i("el-input",{directives:[{name:"show",rawName:"v-show",value:e.edit,expression:"pic.edit"}],nativeOn:{keyup:function(i){if(!("button"in i)&&t._k(i.keyCode,"enter",13,i.key,"Enter"))return null;e.edit=!e.edit,t.picReName(e)}},model:{value:e.uploadName,callback:function(i){t.$set(e,"uploadName",i)},expression:"pic.uploadName"}}),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.edit,expression:"pic.edit"}],staticClass:"gallery-list-button",attrs:{icon:"el-icon-check",size:"mini",type:"success"},on:{click:function(i){e.edit=!e.edit,t.picReName(e)}}}),t._v(" "),i("el-button",{directives:[{name:"show",rawName:"v-show",value:e.edit,expression:"pic.edit"}],staticClass:"gallery-list-button",attrs:{icon:"el-icon-close",size:"mini",type:"warning"},on:{click:function(t){e.edit=!e.edit}}})],1),t._v(" "),i("div",{staticClass:"gallery-list-col-operation"},[i("el-tooltip",{directives:[{name:"show",rawName:"v-show",value:e.uploadIsfavorite,expression:"pic.uploadIsfavorite"}],attrs:{content:"取消收藏",placement:"top"}},[i("el-button",{staticClass:"gallery-list-button",attrs:{icon:"el-icon-star-off",size:"mini",type:"warning"},on:{click:function(i){t.deleteFavor(e)}}})],1),t._v(" "),i("el-tooltip",{directives:[{name:"show",rawName:"v-show",value:!e.uploadIsfavorite,expression:"!pic.uploadIsfavorite"}],attrs:{content:"收藏",placement:"top"}},[i("el-button",{staticClass:"gallery-list-button",attrs:{plain:"",icon:"el-icon-star-off",size:"mini",type:"warning"},on:{click:function(i){t.insertFavor(e)}}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"重命名",placement:"top"}},[i("el-button",{staticClass:"gallery-list-button",attrs:{plain:"",icon:"el-icon-edit",size:"mini",type:"primary"},on:{click:function(t){e.edit=!0}}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"复制",placement:"top"}},[i("el-button",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.uploadLocalUrl,expression:"pic.uploadLocalUrl",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:t.clipboardSuccess,expression:"clipboardSuccess",arg:"success"}],staticClass:"gallery-list-button",attrs:{plain:"",icon:"el-icon-share",size:"mini",type:"success"}})],1),t._v(" "),i("el-tooltip",{attrs:{content:"删除",placement:"top"}},[i("el-button",{staticClass:"gallery-list-button",attrs:{plain:"",icon:"el-icon-delete",size:"mini",type:"danger"},on:{click:function(i){t.picDelHandler(e)}}})],1)],1)])])]})],2),t._v(" "),i("el-pagination",{attrs:{"page-size":t.pageSize,"pager-count":5,layout:"total, prev, pager, next, jumper",total:t.picListAll.length},on:{"current-change":t.handlePageChange}}),t._v(" "),t.picBigShow?i("div",{staticClass:"gallery-list-bigMask",on:{click:function(e){e.preventDefault(),e.stopPropagation(),t.picBigShow=!t.picBigShow},mousewheel:t.picBigZoom}},[i("el-button",{staticClass:"gallery-list-bigMask-button gallery-list-bigMask-button-left",attrs:{type:"info",icon:"el-icon-arrow-left"},on:{click:function(e){return e.stopPropagation(),t.picBigLeft(e)}}}),t._v(" "),i("el-button",{staticClass:"gallery-list-bigMask-button gallery-list-bigMask-button-right",attrs:{type:"info",icon:"el-icon-arrow-right"},on:{click:function(e){return e.stopPropagation(),t.picBigRight(e)}}}),t._v(" "),i("img",{staticClass:"gallery-list-bigMask-img",attrs:{src:t.picUrl},on:{click:function(e){return e.preventDefault(),e.stopPropagation(),t.picBigSelect(e)}}})],1):t._e()],1)],1)],1)],1)},[],!1,null,"f12d80b4",null);s.options.__file="Gallery.vue";var n={name:"VueDialog",components:{Gallery:s.exports},props:{top:{type:String,default:"15vh"},title:{type:String,default:"提示"},width:{type:String,default:"60%"},visible:{type:Boolean,default:!1},type:{type:String,default:"UploadExcel"},loading:{type:Boolean,default:!1},picList:{type:Array,default:function(){return[]}},pageSize:{type:Number,default:8},uploadResult:{type:String,default:""}},watch:{visible:function(t){}},data:function(){return{galleryList:[]}},methods:{openHandler:function(){this.$emit("openHandler",this.isVisable)},closeHandler:function(){this.$emit("closeHandler",this.isVisable)},confirmHandler:function(){this.$emit("confirmHandler",{visable:this.isVisable,galleryList:this.galleryList})},httpRequestHandler:function(t){this.$emit("httpRequestHandler",t)},picClickHander:function(t){this.galleryList=t},picsDelHandler:function(t){this.$emit("picsDelHandler",t)},picDelHandler:function(t){this.$emit("picDelHandler",t)},picReName:function(t){this.$emit("picReName",t)},insertFavor:function(t){this.$emit("insertFavor",t)},deleteFavor:function(t){this.$emit("deleteFavor",t)},picsUpload:function(t){this.$emit("picsUpload",t)}}},o=(i("wtxG"),Object(a.a)(n,function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("el-dialog",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],attrs:{title:t.title,width:t.width,top:t.top,visible:t.visible,"before-close":t.closeHandler,"custom-class":"dialog","element-loading-text":"数据加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"},on:{"update:visible":function(e){t.visible=e},open:t.openHandler}},[(t.type="PhotoGallery")?i("div",[i("Gallery",{attrs:{visible:t.visible,"page-size":t.pageSize,type:t.type,"pic-list-org":t.picList,"gallery-list":t.galleryList},on:{picDelHandler:t.picDelHandler,picsDelHandler:t.picsDelHandler,insertFavor:t.insertFavor,deleteFavor:t.deleteFavor,picReName:t.picReName,picsUpload:t.picsUpload,picClickHander:t.picClickHander}})],1):t._e(),t._v(" "),"ScriptCreate"!==t.type?i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:t.closeHandler}},[t._v("取 消")]),t._v(" "),i("el-button",{attrs:{type:"primary"},on:{click:t.confirmHandler}},[t._v("确 定")])],1):t._e()])},[],!1,null,"63ba1434",null));o.options.__file="VueDialog.vue";e.a=o.exports},wtxG:function(t,e,i){"use strict";var l=i("8usN");i.n(l).a}}]);