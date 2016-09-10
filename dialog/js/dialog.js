/**
 * Created by Administrator on 2016/9/10 0010.
 */
;(function($){
    var Dialog = function (config) {
        var _this_ =this;
        this.config={
            width:"auto",
            height:"auto",
            type:"waiting",
            buttons:null,
            delay:null,
            message:null,
            maskOpacity:null
        };
        if (config && $.isPlainObject(config)){
            $.extend(this.config,config);
        }else {
            this.isConfig = true;
        }

        console.log(this.config)

    };
    Dialog.prototype = {

    };
    window.Dialog = Dialog;
    
} )(Zepto);