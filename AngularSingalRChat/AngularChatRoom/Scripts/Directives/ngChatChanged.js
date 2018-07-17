app.directive('ngChatChanged', function () {
    return {
        template: changedTemplate
    };
});

//var changedTemplate = '<div class="row" ng-bind="item.message"></div>';
var changedTemplate = '<div class="row">';
changedTemplate += '<div class="col-md-5"><span ng-bind="item.time"></span> > <strong><span ng-bind="item.message"></span></strong></div>'
changedTemplate += "</div>"