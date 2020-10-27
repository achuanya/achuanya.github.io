/*!-----------------------------------*\
     @author achuan
     @email achuan@achuan.io
\*------------------------------------*/

$(function () {
    //搜索框文字变化时间
    $("#search-input").keyup(function () {
        $("#pl__container").scrollTop(0);
        //$("#s-box").hide("slow");
        var text = $("#search-input").val().toLowerCase();
        //console.log(text);

        if (text == "" || text == undefined) {
            $("#pl__container a").show();
        } else {
            $("#pl__container a").hide();
            $(".pl__title").each(function () {
                var htmlstr = $(this).html().toLowerCase();
                if (htmlstr.indexOf(text) != -1) {
                    console.log(htmlstr);
                    $(this).parent().show();
                }
            })
        }
    })
})

// Variables
var sidebar         = $('#sidebar'),
    container       = $('#post'),
    content         = $('#pjax'),
    button          = $('#icon-arrow');
    lists           = $('#icon-lists');
    scrollTop       = $('#icon-arrow-up');
    tocbar          = $('#post__toc-trigger');
    chaptersCover   = $('#post__chapters-cover');
    explorer        = window.navigator.userAgent;

if (explorer.indexOf("MSIE") >= 0) {
    alert("阿川推荐您使用Firefox、Chrome浏览本博客！");
}
if ($(window).width() < 1280) {
    sidebar.addClass('mobile');
}
// 移动端自动折叠导航栏
if ($(window).width() < 1024) {
    button.addClass('fullscreen');
    sidebar.addClass('fullscreen');
    content.addClass('fullscreen');
}

// 切换导航菜单清空搜索栏并重置目录滚动条
$("#tags__ul, #lists").on('click',function () {
    $("#search-input").val('');
    $("#pl__container").scrollTop(0);
    // 文章内章节栏
    $("#post__toc").scrollTop(0);
})

// 章节列表
new PerfectScrollbar("#post__toc");
// 文章
new PerfectScrollbar("#post");
// 文章列表
new PerfectScrollbar("#pl__container");

/**
 * Tags switcher
 * @param id
 * @returns {function(...[*]=)}
 */
var clickHandler = function (id) {
    return function () {
        $(this).addClass('active').siblings().removeClass('active');
        $('.pl__all').hide();
        $('.' + id).delay(50).fadeIn(350);
    }
};

$('#tags__ul li').each(function (index) {
    $('#' + $(this).attr('id')).on('click', clickHandler($(this).attr('id')));
});

/**
 * If sidebar has class 'mobile', hide it after clicking.
 */
$('.pl__all').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    if (sidebar.hasClass('mobile')) {
        $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
    }
});

$('.fill').on('click', function () {
    $(this).addClass('icon_active').siblings().removeClass('icon_active');
});

/**
 * Enable fullscreen.
 */
$('#js-fullscreen').on('click', function () {
    if (button.hasClass('fullscreen')) {
        sidebar.removeClass('fullscreen');
        button.removeClass('fullscreen');
        // tocbar.removeClass('fullscreen');
        content.delay(300).queue(function () {
            $(this).removeClass('fullscreen').dequeue();
        });
    } else {
        sidebar.addClass('fullscreen');
        button.addClass('fullscreen');
        // tocbar.addClass('fullscreen');
        content.delay(200).queue(function () {
            $(this).addClass('fullscreen').dequeue();
        });
    }
});

/**
 * Chapter lists.
 */
$('#lists').on('click', function () {
    if (lists.hasClass('fullscreen')) {
        $(lists).text("打开");
        // 把章节列表脱离到HTML外
        $(tocbar).css({"right": "0px"});
        // 如果页面小于1281，页面无法章节列表
        if ($(document).width() >= 1281) {
            $(chaptersCover).css({"z-index": "-99"});
        }
        // 关闭章节列表
        lists.removeClass('fullscreen');
        tocbar.removeClass('fullscreen');
    } else {
        $(lists).text("关闭");
        $(tocbar).css({"right": "28px"});
        if ($(document).width() >= 1281) {
            $(chaptersCover).css({"z-index": "-1"});
        }
        lists.addClass('fullscreen');
        tocbar.addClass('fullscreen');
    }
});

$('#article').on('click', function () {
    if (button.hasClass('fullscreen')) {
        sidebar.removeClass('fullscreen');
        button.removeClass('fullscreen');
        tocbar.removeClass('fullscreen');
        content.delay(300).queue(function () {
            $(this).removeClass('fullscreen').dequeue();
        });
    } else {
        sidebar.addClass('fullscreen');
        button.addClass('fullscreen');
        tocbar.addClass('fullscreen');
        content.delay(200).queue(function () {
            $(this).addClass('fullscreen').dequeue();
        });
    }
})

$('#scroll-top').on('click', function () {
    container.animate({
        scrollTop: 0
    }, 200);

    $('#pl__container').animate({
        scrollTop: 0
    }, 500);
});

$('#mobile-avatar').on('click', function () {
    $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
});

// Pjax
$(document).pjax('#avatar, #mobile-avatar, .pl__all', '#pjax', {fragment: '#pjax', timeout: 10000});

$(document).on({
    'pjax:click': function () {
        content.removeClass('fadeIn').addClass('fadeOut');
        NProgress.start();
    },
    'pjax:start': function () {
        content.css({'opacity': 0});
    },
    'pjax:end': function () {
        NProgress.done();
        container.scrollTop(0);
        content.css({'opacity': 1}).removeClass('fadeOut').addClass('fadeIn');
        afterPjax();
    }
});

// Re-run scripts for post content after pjax
function afterPjax() {
    // Open links in new tab
    $('#post__content a').attr('target', '_blank');

    // Generate post TOC for h1 and h2
    var toc = $('#post__toc-ul');
    // Empty TOC and generate an entry for post title
    var title = $('#post__title').text()
    toc.empty().append('<li class="post__toc-li post__toc-h1"><a href="#post__title" class="js-anchor-link">' + title + '</a></li>');

    // Generate entries for h1 and h2
    $('#post__content').children('h1,h2,h3').each(function () {
        // Skip post title
        if ($(this).attr('id') == 'post__title') {
            return;
        }

        // Generate random ID for each heading
        $(this).attr('id', function () {
            var ID       = "",
                alphabet = "abcdefghijklmnopqrstuvwxyz";

            for (var i = 0; i < 5; i++) {
                ID += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            }
            return ID;
        });

        // Add each chapter to TOC
        if ($(this).prop("tagName") == 'H2') {
            toc.append('<li class="post__toc-li post__toc-h2"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
        } else if ($(this).prop("tagName") == 'H3') {
            toc.append('<li class="post__toc-li post__toc-h3"><a href="#' + $(this).attr('id') + '" class="js-anchor-link">' + $(this).text() + '</a></li>');
        }
    });

    // Smooth scrolling
    $('.js-anchor-link').on('click', function () {
        var target = $(this.hash);
        container.animate({scrollTop: target.offset().top + container.scrollTop() - 70}, 500, function () {
            target.addClass('flash').delay(700).queue(function () {
                $(this).removeClass('flash').dequeue();
            });
        });
    });

    if (sidebar.hasClass('mobile')) {
        $('#sidebar, #pjax, #icon-arrow').addClass('fullscreen');
    }
}
afterPjax();

