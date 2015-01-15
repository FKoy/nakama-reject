$(function () {

    setClickListener();

    function setClickListener() {
        var $itemBar = $('.items-bar.left');

        $itemBar.children('.folder').each(function() {
            $(this).on('click', function(){
                initList($(this).data('path'));
            });
        });
        $itemBar.children('.file').each(function() {
            $(this).on('click', function(){
                getFile($(this).data('path'));
            });
        });
    }

    function initList(path) {
        $.ajax({
            url: "tree?path="+path
        }).done(function(data){
            drawList(data, path);
        }).fail(function(data){
            console.log(data);
        });
    }

    function drawList(files, path) {
        var $itemBar = $('.items-bar.left');

        $itemBar.empty();

        // if path is not root
        if (path.split('/')[1] !== ''){
            var prev = '<li data-path="' + prevPath(path) + '" class="folder"><p>..</p></li>';
            $itemBar.append(prev);
        }


        $.each(files, function() {
            var file = $(this)[0];
            var item = '<li data-path="' + file.path + '" class="' + file.type + '"><p>' + file.name + '</p></li>';
            $itemBar.append(item);
        });

        var addBtn = '<li><button class="add">add</button></li>';
        $itemBar.append(addBtn);

        setClickListener();

    }

    function prevPath (path) {
        var path = path.split('/');
        path = path.splice(0, path.length-1).join('/');
        return path;
    }

    function getFile(path) {
        $.ajax({
            url: "file/local?path=" + path
        }).done(function (data) {
            drawContent(data, path);
        }).fail(function (data) {
            console.log(data);
        });
    }

    function drawContent(data) {
        $('.container').empty();

        var tag = generateTag(data);

        $('.container').html(tag);

        var sendBtn = '<button class="send">send</button>';
        $('.container').append(sendBtn);
        $('.send').on('click', function(){
            postFile(data.path);
        });
    }

    function postFile(path) {
        var cloudPath = $('.items-bar.right').children('li').first().data('path'); //.split('/');
        //cloudPath = '/' + cloudPath.slice(1, cloudPath.length-1).join('/');
        $.ajax({
            url: "file/post",
            type:'POST',
            dataType: 'json',
            data : {
                path : path,
                cloudPath: cloudPath
            }
        }).done(function(data){
        }).fail(function(data){
            console.log('response ' + data.responseText);
            if (data.responseText === 'OK') {
                location.href = 'http://localhost:3333/';
            }
        });
    }


    function generateTag (data) {

        var tag;

        var type = data.type.split('/');
        type = type[0];

        var path = data.path;

        switch(type) {

            case 'image':
                tag = generateImageTag(path);
                return tag;
                break;

            case 'audio':
                tag = generateAudioTag(path);
                return tag;
                break;

            case 'video':
                tag = generateVideoTag(path, type);
                return tag;
                break;

            case 'text':
                tag = generateTextTag(data.buf);
                return tag;
                break;

            default :

        }

    }

    function generateImageTag (path) {
        return '<img src="'+path+'"/>';
    }

    function generateAudioTag (path) {

    }

    function generateVideoTag (path, type) {
        /*return '<video id="example_video_1" class="video-js vjs-default-skin"' +
        'controls preload="auto" width="640" height="264"' +
        'data-setup=\'{"example_option":true}\'>' +
        '<source src="'+path+'" type=\''+type+'\' />' +
        '<p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>' +
        '</video>'*/
    }

    function generateTextTag (text) {
        text = escapeHTML(text);
        return '<p>'+text+'</p>';
    }

    var escapeHTML = function(val) {

        val = val.replace(/[\n\r]/g, "<br/>");
        return val;
        //return $('<div />').html(val).html();
    };
});