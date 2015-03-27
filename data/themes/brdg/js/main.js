$(".switch input").switchbutton();
$('.city_switch').each(function(){
    if($(this).hasClass('city_paris'))
    {
        $(this).find('div').eq(0).addClass('actived');
    }
    if($(this).hasClass('city_shanghai'))
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


if($('.page-admin-people-ranking').length > 0)
{
    var path = Drupal.settings.basePath + "third_content/node/statistics_list";
    var time = new Date().getTime() - 365*24*60*60*1000
    var data = {order: 'count', page: 0, pagenum: 150,ts_s:time/1000}
    $.ajax({
        url: path,
        dataType: "json",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(res){
            for(i in res.users)
            {
                var email = res.users[i].mail;
                var name = res.users[i].name;
                var uid = res.users[i].uid;
                var count = res.node_statictis[i];
                var comments = res.comments[i];
                var like = res.like[i];
                var img = res.node[i];
                if(name != undefined){
                    $('#user_ranking').append('<div class="views-row"><div class="node-item">' +
                        '<div class="img"><a title="'+email+'" href="'+Drupal.settings.basePath+"admin/usernodes/"+uid+'" target="_blank"><img width="150" height="150" src="'+img+'"></a></div>' +
                        '<div class="username">'+name+'</div>' +
                        '<div class="posts">Posts:'+count+'</div>' +
                        '<div class="comment"><span>Like: '+like+'</span> <span>Comments: '+comments+'</span></div>' +
                        '</div></div>');
                }
            }
        }
    });
}

$('.page-admin-people-ranking .form-submit').click(function(){
   var date_filter = $('#date_range').val();
    var time = new Date().getTime() - 365*24*60*60*1000;
    var time_s = "1 year";
    if(date_filter == 'week')
    {
        time = new Date().getTime() - 7*24*60*60*1000;
        time_s = "1 week";
    }
    if(date_filter == 'month')
    {
        time = new Date().getTime() - 30*7*24*60*60*1000;
        time_s = "1 month";
    }
    $('#user_ranking').html('');
    var path = Drupal.settings.basePath + "third_content/node/statistics_list";
    var sort = $('#sort_by').val();
    var data = {order: sort, page: 0, pagenum: 150,ts_s:parseInt(time/1000)};
    $.ajax({
        url: path,
        dataType: "json",
        type: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        success: function(res){
            for(i in res.users)
            {
                var email = res.users[i].mail;
                var name = res.users[i].name;
                var uid = res.users[i].uid;
                var count = res.node_statictis[i];
                var comments = res.comments[i];
                var like = res.like[i];
                var img = res.node[i];
                if(name != undefined){
                    $('#user_ranking').append('<div class="views-row"><div class="node-item">' +
                    '<div class="img"><a title="'+email+'" href="'+Drupal.settings.basePath+"admin/usernodes/"+uid+'" target="_blank"><img width="150" height="150" src="'+img+'"></a></div>' +
                    '<div class="username">'+name+'</div>' +
                    '<div class="posts">Posts:'+count+'</div>' +
                    '<div class="comment"><span>Like: '+like+'</span> <span>Comments: '+comments+'</span></div>' +
                    '</div></div>');
                }
            }
        }
    });
});

$('.page-admin-content-sort .view-admin-pages').before('<div class="sort_form" id="sort_from">' +
    '<div class="sort_item"><p>Time range:</p>' +
        '<select id="date_range">' +
        '<option value="year">Year</option>' +
        '<option value="month">Month</option>' +
        '<option value="week">Week</option>' +
        '</select>' +
    '</div>' +
    '<div class="sort_item"><p>Sort by:</p>' +
        '<select id="sort_by">' +
        '<option value="field_anonymous_flaged_value"># of likes</option>' +
        '<option value="comment_count"># of comments</option>' +
        '<option value="comment_flag"># of average likes and comments</option>' +
    '</select>' +
    '</div>' +
    '<div class="sort_item"><input type="button" class="form-submit" value="Apply" /></div>'+
    '</div>');

$('.page-admin-content-sort .form-submit').click(function(){
    var date_range = $('#date_range').val();
    var sort_by = $('#sort_by').val();
    window.location.href=date_range+'?sort_by='+sort_by+'&sort_order=DESC&date='+date_range;
});

if($('.page-admin-content-sort').length > 0)
{
    var date_range = getQueryString('date');
    var sort_by = getQueryString('sort_by');
    $('option[value="'+date_range+'"]').prop('selected','selected');
    $('option[value="'+sort_by+'"]').prop('selected','selected');
}



function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}