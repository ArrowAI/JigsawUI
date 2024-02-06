"use strict";

// Class definition
var KTAppChat = function() {
    var chatAsideEl;
    var chatContentEl;
    var chatRightContentEl;

    // Private functions
    var initAside = function() {
        // Mobile offcanvas for mobile mode
        var offcanvas = new KTOffcanvas(chatAsideEl, {
            overlay: true,
            baseClass: 'kt-app__aside',
            closeBy: 'kt_chat_aside_close',
            toggleBy: 'kt_chat_aside_mobile_toggle'
        });

        // User listing 
        var userListEl = KTUtil.find(chatAsideEl, '.kt-scroll');

        if (!userListEl) {
            return;
        }

        // Initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar) 
        KTUtil.scrollInit(userListEl, {
            mobileNativeScroll: true, // enable native scroll for mobile
            desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop 
            resetHeightOnDestroy: true, // reset css height on scroll feature destroyed
            handleWindowResize: true, // recalculate hight on window resize
            rememberPosition: true, // remember scroll position in cookie
            height: function() { // calculate height
                var height;
                var portletBodyEl = KTUtil.find(chatAsideEl, '.kt-portlet > .kt-portlet__body');
                var widgetEl = KTUtil.find(chatAsideEl, '.kt-widget.kt-widget--users');
                var searchbarEl = KTUtil.find(chatAsideEl, '.kt-searchbar');

                if (KTUtil.isInResponsiveRange('desktop')) {
                    height = KTLayout.getContentHeight();
                } else {
                    height = KTUtil.getViewPort().height;
                }

                if (chatAsideEl) {
                    height = height - parseInt(KTUtil.css(chatAsideEl, 'margin-top')) - parseInt(KTUtil.css(chatAsideEl, 'margin-bottom')) + 60;
                    height = height - parseInt(KTUtil.css(chatAsideEl, 'padding-top')) - parseInt(KTUtil.css(chatAsideEl, 'padding-bottom'));
                }

                if (widgetEl) {
                    height = height - parseInt(KTUtil.css(widgetEl, 'margin-top')) - parseInt(KTUtil.css(widgetEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(widgetEl, 'padding-top')) - parseInt(KTUtil.css(widgetEl, 'padding-bottom'));
                }

                if (portletBodyEl) {
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
                }

                if (searchbarEl) {
                    height = height - parseInt(KTUtil.css(searchbarEl, 'height'));
                    height = height - parseInt(KTUtil.css(searchbarEl, 'margin-top')) - parseInt(KTUtil.css(searchbarEl, 'margin-bottom'));
                }

                // remove additional space
                height = height - 5;

                return height;
            }
        });
    }
    var initRiteAside = function() {
        var offcanvas = new KTOffcanvas(chatRightContentEl, {
            overlay: true,
            baseClass: 'kt-app__aside',
            closeBy: 'kt_chat_aside_close',
            toggleBy: 'kt_chat_aside_mobile_toggle'
        });

        // User listing 
        var userPropertyEl = KTUtil.find(chatRightContentEl, '.kt-scroll');
        console.log("height of user Properyes", userPropertyEl);
        if (!userPropertyEl) {
            return;
        }

        // Initialize perfect scrollbar(see:  https://github.com/utatti/perfect-scrollbar) 
        KTUtil.scrollInit(userPropertyEl, {
            mobileNativeScroll: true, // enable native scroll for mobile
            desktopNativeScroll: false, // disable native scroll and use custom scroll for desktop 
            resetHeightOnDestroy: true, // reset css height on scroll feature destroyed
            handleWindowResize: true, // recalculate hight on window resize
            rememberPosition: true, // remember scroll position in cookie
            height: function() { // calculate height
                var height;
                var portletBodyEl = KTUtil.find(chatRightContentEl, '.kt-portlet > .kt-portlet__body');
                var widgetEl = KTUtil.find(chatRightContentEl, '.kt-widget.kt-widget--users');
                var searchbarEl = KTUtil.find(chatRightContentEl, '.kt-searchbar');

                if (KTUtil.isInResponsiveRange('desktop')) {
                    height = KTLayout.getContentHeight();
                } else {
                    height = KTUtil.getViewPort().height;
                }

                if (chatRightContentEl) {
                    height = height - parseInt(KTUtil.css(chatRightContentEl, 'margin-top')) - parseInt(KTUtil.css(chatRightContentEl, 'margin-bottom')) - 20;
                    console.log("height of this", height);
                    height = height - parseInt(KTUtil.css(chatRightContentEl, 'padding-top')) - parseInt(KTUtil.css(chatRightContentEl, 'padding-bottom'));
                }

                if (widgetEl) {
                    height = height - parseInt(KTUtil.css(widgetEl, 'margin-top')) - parseInt(KTUtil.css(widgetEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(widgetEl, 'padding-top')) - parseInt(KTUtil.css(widgetEl, 'padding-bottom'));
                }

                if (portletBodyEl) {
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'margin-top')) - parseInt(KTUtil.css(portletBodyEl, 'margin-bottom'));
                    height = height - parseInt(KTUtil.css(portletBodyEl, 'padding-top')) - parseInt(KTUtil.css(portletBodyEl, 'padding-bottom'));
                }

                if (searchbarEl) {
                    height = height - parseInt(KTUtil.css(searchbarEl, 'height'));
                    height = height - parseInt(KTUtil.css(searchbarEl, 'margin-top')) - parseInt(KTUtil.css(searchbarEl, 'margin-bottom'));
                }

                // remove additional space
                height = height - 5;

                return height;
            }
        });
    }

    return {
        // public functions
        init: function() {
            // elements
            chatAsideEl = KTUtil.getByID('kt_chat_aside');
            chatRightContentEl = KTUtil.getByID('kt_chat_content_right');


            // init aside and user list
            initAside();
            initRiteAside();

            // init inline chat example
            KTChat.setup(KTUtil.getByID('kt_chat_content'));
            // KTChat.setup(KTUtil.getByID('kt_chat_content_right'));

            // trigger click to show popup modal chat on page load
            if (KTUtil.getByID('kt_app_chat_launch_btn')) {
                setTimeout(function() {
                    KTUtil.getByID('kt_app_chat_launch_btn').click();
                }, 1000);
            }
        }
    };
}();

KTUtil.ready(function() {
    KTAppChat.init();
});