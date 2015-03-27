$(".switch input").switchbutton();
$('.city_switch').each(function(){
    if($(this).hasClass('city_paris'))
    {
        $(this).find('div').eq(0).addClass('actived');
    }
    else
    {
        $(this).find('div').eq(1).addClass('actived');
    }
});

$(".node-item .switch").click(function () {
    var input = $(this).find('input');
    var v = input.prop('checked');
    var val = input.val();
    var _this = $(this);
    if (v) {
        _this.parents('.node-item').removeClass('Disabled').addClass('Enabled');
        $.Node(val).publish(function (data) {});
    } else {
        _this.parents('.node-item').removeClass('Enabled').addClass('Disabled');
        $.Node(val).unpublish(function (data) {});
    }
});

$(".node-item .city_switch>div").click(function(){
    if($(this).hasClass('actived')){
        return false;
    }
    var cityId = $(this).attr('data-city');
    var nid = $(this).parent().attr('data-nid');
    $.Node(nid).changeCity(cityId);
    $(this).parent().find('div').removeClass('actived');
    $(this).addClass('actived');
});

$(".user_item .switch").click(function () {
    var input = $(this).find('input');
    var v = input.prop('checked');
    var val = input.val();
    var _this = $(this);

    if (v) {
        _this.parents('.user_box').removeClass('Disabled').addClass('Enabled');
        $.User(val).publish(function (data) {});
    } else {
        _this.parents('.user_box').removeClass('Enabled').addClass('Disabled');
        $.User(val).unpublish(function (data) {});
    }
});

$(".comment_item .switch").click(function () {
    var input = $(this).find('input');
    var v = input.prop('checked');
    var val = input.val();

    var _this = $(this);
    if (v) {
        _this.parents('.comment_item').removeClass('No').addClass('Yes');
        $.Comment(val).publish(function (data) {
            console.log(data);
        });
    } else {
        _this.parents('.comment_item').removeClass('Yes').addClass('No');
        $.Comment(val).unpublish(function (data) {
            console.log(data);
        });
    }
});

$.Node = function (nid) {
    var path = Drupal.settings.basePath + "third_content/node/" + nid;
    var ajax = function (data, cb) {
        data['node']['nid'] = nid;
        $.ajax({
            url: path,
            dataType: "json",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: cb
        });
    };
    return {
        publish: function (cb) {
            var data = {
                node: {
                    status: 1
                }
            };
            ajax(data, cb);
        },
        unpublish: function (cb) {
            var data = {
                node: {
                    status: 0
                }
            };
            ajax(data, cb);
        },
        changeCity: function (cityId, cb) {
            var data = {node: {field_user_city: cityId}};
            ajax(data, cb);
        }
    };
};

$.User = function (uid) {
    var path = Drupal.settings.basePath + "third_content/user/" + uid;
    var ajax = function (data, cb) {
        data['user']['uid'] = uid;
        $.ajax({
            url: path,
            dataType: "json",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: cb
        });
    };
    return {
        publish: function (cb) {
            var data = {
                user: {
                    status: 1
                }
            };
            ajax(data, cb);

        },
        unpublish: function (cb) {
            var data = {
                user: {
                    status: 0
                }
            };
            ajax(data, cb);
        }
    };
};

$.Comment = function (cid) {
    var path = Drupal.settings.basePath + "third_content/comment/" + cid;
    var ajax = function (data, cb) {
        data['comment']['cid'] = cid;
        $.ajax({
            url: path,
            dataType: "json",
            type: "PUT",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: cb
        });
    };
    return {
        publish: function (cb) {
            var data = {
                comment: {
                    status: 1
                }
            };
            ajax(data, cb);
        },
        unpublish: function (cb) {
            var data = {
                comment: {
                    status: 0
                }
            };
            ajax(data, cb);
        }
    };
};