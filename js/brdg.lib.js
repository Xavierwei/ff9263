/*
* Get sibling nodes
* @param nid
*/
$.Node = function(){
    function getPreNextNodes(nid, count, type, cityid, thumbnail, cb)
    {
        $.ajax({
            url: siteurl+"data/third_content/node/pre_next_node",
            dataType: "JSON",
            type: "POST",
            data: JSON.stringify({nid:nid,number:count,resource_type:type,city:cityid,thumbnail:thumbnail}),
            contentType: "application/json",
            success: cb
        });
    }

    function getUnpublishedNodes(cb)
    {
        $.ajax({
            url: siteurl+"data/third_content/unpublished",
            dataType: "JSON",
            type: "GET",
            contentType: "application/json",
            success: cb
        });
    }
    
    function loadPhotowall(url,cb)
    {
        xhr = $.ajax({
            url: url,
            dataType: 'json',
            method: "post",
            success:cb
        });
        return xhr;
    }
    
    return {
        getPreNextNodes: getPreNextNodes,
        getUnpublishedNodes: getUnpublishedNodes,
        loadPhotowall: loadPhotowall
    };
};


/*
* Vote the content if cookie is empty
* @param nid
*/
$.Like = function(nid){
    function vote(cb) {
        var apipath =siteurl+ "data/third_content";
        var nid = $('.input_nid').eq(0).val();
        var cookie = $.cookie('like_'+nid);
        console.log(cookie);
        var like_data = {content_id: nid, flag_name: 'like', uid: 0, action: 'flag','skip_permission_check':1};
        if(!cookie)
        {
           $.ajax({
                   url: apipath + "/flag/flag",
                   dataType: "JSON",
                   type: "POST",
                   data: JSON.stringify(like_data),
                   contentType: "application/json",
                   success: cb
            });
        }
        else
        {
            // nothing to do
           //cb();
        }
    }
    
    function likeit(cb) {
        var cookie = $.cookie('like_'+nid);
        if(!cookie)
        {
            $.ajax({
                url: siteurl+"data/third_content/node/likeit",
                dataType: "JSON",
                type: "POST",
                data: JSON.stringify({nid:nid}),
                contentType: "application/json",
                success: cb
            });
        }
    }
    
    return {
             vote: vote,
             likeit: likeit
    };
};


/*
* Vote the content
* @param nid
*/
$.Comment = function(nid){
    function loadComment(cb){
        $.ajax({
            url: siteurl+"data/third_content/source_content_comments",
            dataType: "JSON",
            method: 'GET',
            data: {nid: nid},
            contentType: "application/json",
            success: cb
        });
    }
    
    function submitComment(form, cb, errorCb){
        var apipath = siteurl+"data/third_content";
        var comment = {
               nid: form.find('input[name="nid"]').val(),
               comment_body: {und: [{value: form.find('textarea[name="comment"]').val(), summary: form.find('textarea[name="comment"]').val()}]},
               field_email: {und: [{value: form.find('input[name="email"]').val()+"@ff9263.com"}]}
        };
        $.ajax({
                url: apipath + "/comment",
                dataType: "JSON",
                type: "POST",
                data: JSON.stringify(comment),
                contentType: "application/json",
                success: cb,
                error: errorCb
         });
    }
    
    return {
             loadComment: loadComment,
             submitComment: submitComment
    };
};


/*
* Utility
*/
$.BrdgUtility = function(){
    function updateDay(day) {
            var iDay = 0;

            var updateDayTO = setInterval(function(){
                    iDay++;
                    iDayText = (iDay < 10) ? "0" + iDay : iDay;
                    $('.photo_date .day').html(iDayText);
                    if(iDay === day)
                    {
                            clearInterval(updateDayTO);
                    }
            },30);
    };

    function formateNumber(number)
    {
            number = (number < 10) ? "0" + number : number;
            return number;
    }
    
    function replaceURLWithHTMLLinks(text) 
    {
         var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
         return text.replace(exp,"<a target='_blank' href='$1'>$1</a>"); 
    }

    function clearHtmlTag(str) {
        str = str.replace(/<.*?>/g,"");
        return str;
    }



    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }



    return {
        updateDay: updateDay,
        formateNumber: formateNumber,
        replaceURLWithHTMLLinks: replaceURLWithHTMLLinks,
        clearHtmlTag: clearHtmlTag,
        getQueryString: getQueryString
    };


};



/*
* Ensure Images load completed
*/
jQuery.fn.extend({
    ensureLoad: function(handler) {
        return this.each(function() {
            if(this.complete) {
                handler.call(this);
            } else {
                $(this).load(handler);
            }
        });
    }
});