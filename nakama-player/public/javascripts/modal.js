$(function() {
    $( 'a[rel*=leanModal]').leanModal({
        top: 50,                     // #modal-windowの縦位置
        overlay : 0.7,               // #modal-windowの背面の透明度
        closeButton: ".modal_close"  // #modal-windowを閉じるボタンのdivのclass
    });


});