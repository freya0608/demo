
/**
 * Created by freya on 2016/11/8.
 */

'use strict';

angular.module('mean.common').directive('cropImg', function($uibModal,Classes) {
    return {
        restrict:'A',
        replace: false,
        scope:{ngDataurl:'=',ngUrl:'=',onSuccess:'&onSuccess'},
        controller:function () {

        },
        link: function(scope, element, attrs) {
            element.on('click',function(){
                cropImg();
            });
            var cropImg=function (att) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'common/views/cropImg.html',
                    windowClass:'theme-modal dialog-lg',
                    resolve: {
                        dataUrl:function () {
                            return scope.ngDataurl;
                        },
                        url:function () {
                            return scope.ngUrl;
                        }
                    },
                    controller:function ($scope, $uibModalInstance,$timeout,Cropper,dataUrl,url) {
                        $scope.dataUrl=dataUrl;
                        if($scope.dataUrl) {
                            $timeout(showCropper,50);
                        }else if(url){
                            var img=new Image();
                            img.src=url;
                            img.onload=function () {
                                $scope.dataUrl=getBase64Image(img);
                                if($scope.dataUrl) $timeout(showCropper,200);
                                img=null;
                                // $timeout(showCropper);
                            };
                        }
                        var getBase64Image= function(img) {
                            var canvas = document.createElement("canvas");
                            canvas.width = img.width;
                            canvas.height = img.height;
                            var ctx = canvas.getContext("2d");
                            ctx.drawImage(img, 0, 0, img.width, img.height);
                            var dataURL = canvas.toDataURL("image/png");
                            ctx=null;
                            return dataURL ;
                        };
                        var file, data;
                        $scope.cropper = {};
                        $scope.cropperProxy = 'cropper.first';
                        $scope.clear = function(degrees) {
                            if (!$scope.cropper.first) return;
                            $scope.cropper.first('clear');
                        };
                        $scope.options = {
                            autoCropArea:0.2,
                            crop: function(dataNew) {
                                data = dataNew;
                            }
                        };
                        $scope.showEvent = 'show';
                        $scope.hideEvent = 'hide';

                        function showCropper() { $scope.$broadcast($scope.showEvent); }
                        function hideCropper() { $scope.$broadcast(scope.hideEvent); }
                        //双击保存
                        $scope.getCrop=function (event) {
                            if(event.target && event.target.className && event.target.className.indexOf('cropper-face')>-1){
                                $scope.ok();
                            }
                        };
                        $scope.ok=function () {
                            if(!data) return;
                            var info=$scope.cropper.first('getData');
                            var croppedCanvas=$scope.cropper.first('getCroppedCanvas');
                            var dataUrl = croppedCanvas.toDataURL('image/png');
                            var result={info:info,dataUrl:dataUrl};
                            // hideCropper();
                            $uibModalInstance.close(result);
                        }
                        $scope.cancel=function () {
                            // hideCropper();
                            $uibModalInstance.dismiss();
                        }
                    }
                }).result.then(function (result) {
                    if(result){
                        //调用方式： on-success="func(newSchool)"
                        if(scope.onSuccess){
                            scope.onSuccess({result:result});
                        }
                    }
                });
            }
        }
    };
});



