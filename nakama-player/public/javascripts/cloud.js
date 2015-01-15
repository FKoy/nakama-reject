$(function(){
    initList('/');
});

function initList(path) {
    $('.items-bar.right').empty();
    for (var i in cloudFiles) {
        if (cloudFiles[i].path === path) {
            if (path !== '/'){
                var prev = '<li data-path="' + cloudFiles[i].path + '" class="prev folder"><p>..</p></li>';
                $('.items-bar.right').append(prev);
            }
            for (var j in cloudFiles[i].files) {
                var fileName = cloudFiles[i].files[j];
                for (var k in cloudFiles){
                    if (cloudFiles[k].name === fileName) {
                        var file = cloudFiles[k];
                        var item = '<li data-path="' + file.path + '" class="' + file.type + '"><p>' + file.name + '</p></li>';
                        $('.items-bar.right').append(item);
                    }
                }
            }

            var addBtn = '<li><button class="add">add</button></li>';
            $('.items-bar.right').append(addBtn);

            setClickListener();

        }
    }

}

function prevPath (path) {
    path = path.split('/');
    path = '/' + path.splice(0,path.length-1).join('/');
    return path;
}

function setClickListener() {
    $('.items-bar.right').children('.folder').each(function() {
        $(this).on('click', function(){
            initList($(this).data('path'));
        });
    });
    $('.prev').on('click', function() {
        initList(prevPath($(this).data('path')));
    });
    $('.items-bar.right').children('.file').each(function() {
        $(this).on('click', function(){
            getFile($(this).data('path'), 'cloud');
        });
    });
}

function getFile(path) {

    $.ajax({
        url: "file/cloud?path=" + path
    }).done(function (data) {
        draw(data);
    }).fail(function (data) {
        console.log(data);
    });
}

function draw(data) {
    $('.container').html(data);
}
