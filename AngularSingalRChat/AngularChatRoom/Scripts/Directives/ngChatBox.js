app.directive('ngChatBox', function () {
    return {
        template: htmlTemplate
    };
});

var htmlTemplate = '<div class="row">';
htmlTemplate += '<div class="col-md-3" ng-bind="item.name"><span>:</span></div>'
htmlTemplate += '<div class="col-md-9" ng-bind="item.message"></div>'
htmlTemplate += "</div>"