app.directive('ngChatBox', function () {
    return {
        template: htmlTemplate
    };
});

var htmlTemplate = '<div class="row">';
htmlTemplate += '<div class="col-md-5"><span ng-bind="item.time"></span> > <span ng-bind="item.name"></span><span>:</span></div>'
htmlTemplate += '<div class="col-md-7"><span ng-bind="item.message"></span></div>'
htmlTemplate += "</div>"