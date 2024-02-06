(function(window, document) {
    window.ArrowChat = window.ArrowChat || {};
    var merge2 = function(obj1, obj2) {
        for (var attrName in obj2) {
            obj1[attrName] = obj2[attrName];
        }
        return obj1;
    };

    var obj2 = {
        loadRunner: function() {
            var dfd = jQuery.Deferred();
            var script = document.createElement("script");
            // script.type = "text/javascript";
            script.text = "function(){}";
            // document.getElementById("arrow_wrapper_frame").contents().find("body").append(script);
            var iframe = document.getElementById('arrow_wrapper_frame');
            iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
            // iframe.getElementsByTagName("head")[0].appendChild(script);
            return dfd.promise();
        },
        loadScript: function(url) {
            var dfd = jQuery.Deferred();
            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        dfd.resolve();
                    }
                };
            } else { //Others
                script.onload = function() {
                    dfd.resolve();
                };
            }
            script.src = url;
            // document.getElementById("arrow_wrapper_frame").contents().find("body").append(script);
            var iframe = document.getElementById('arrow_wrapper_frame');
            iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
            // iframe.getElementsByTagName("head")[0].appendChild(script);
            return dfd.promise();
        },

        loadAppConfig: function(appId) {
            var dfd = jQuery.Deferred();
            //Make a Query Call
            dfd.resolve();
            //
            return dfd.promise();
        },
        getCss: function(cssPath) {
            var dfd = jQuery.Deferred();
            var linkElem = document.createElement('link');
            var iframe = document.getElementById('arrow_wrapper_frame');
            iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(linkElem);
            linkElem.rel = 'stylesheet';
            linkElem.type = 'text/css';
            linkElem.href = cssPath;

            if (linkElem.readyState) {
                linkElem.onreadystatechange = function() {
                    if (linkElem.readyState == "loaded" || linkElem.readyState == "complete") {
                        linkElem.onreadystatechange = null;
                        dfd.resolve();
                    }
                };
            } else { //Others
                linkElem.onload = function() {
                    dfd.resolve();
                };
            }
            return dfd.promise();
        },
        addEvent: function(event, eventProperty) {
            console.log(event);
            return new Promise((resolve, reject) => {
                window.ArrowChat.addCustomEvent(event, eventProperty);
                resolve({ success: true })
            })

        },
        setProperties: function() {

        },
        updateProfile: function() {

        },
        loadJquery: function(cb) {
            if (!!window.jQuery) {
                cb(window.jQuery);
            } else if (!!window.$) {
                cb(window.$);
            } else {

                var script = document.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) {
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            cb(window.$);
                        }
                    };
                } else { //Others
                    script.onload = function() {
                        cb(window.$);
                    };
                }
                script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js";
                document.getElementsByTagName("head")[0].appendChild(script);
            }
        },
        loadJqueryForFrame: function(cb) {

            var script = document.createElement("script");
            script.type = "text/javascript";
            if (script.readyState) {
                script.onreadystatechange = function() {
                    if (script.readyState == "loaded" || script.readyState == "complete") {
                        script.onreadystatechange = null;
                        cb(window.$);
                    }
                };
            } else { //Others
                script.onload = function() {
                    cb(window.$);
                };
            }
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/1.10.2/jquery.min.js";
            var iframe = document.getElementById('arrow_wrapper_frame');
            iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);

        },
        initializeTemplates: function() {
            window.ArrowChat['html'] =
                '<div class="bot-chat animated arrowai-chatbot" id="arrowChatFullWindow">\
            <div id="arrowai-chatbot" class="bot-chat-fix">\
                <div class="bot-chat__top-header" style="background-image: url(' + window.ArrowChat['headerImageUrl'] + ');">\
                <div class="bot-chat__header-title">\
                                    <div class="wrap-chat-title">\
                                        <div class="bot-chat-img">\
                                            <img style="/* max-height: 35px; */margin-left: -23px;margin-bottom: 8px;margin-top: -10px;" src=' + window.ArrowChat['botImage'] + ' alt="team-1" class="img-responsive team--img team--one">\
                                        </div>\
                                        <div id="bot-show" class="bot-title">\
                                            <h4>' + window.ArrowChat['applicationName'] + '</h4>\
                                        </div>\
                                    </div>\
                                    <div class="team-details">\
                                        <h3>$configTitle</h3>\
                                        <p>$configMessage</p>\
                                    </div>\
                                </div>\
                </div>\
                <div class="bot-chat__chat-list chat-box scrollable-block" style="background-image: url(' + window.ArrowChat['messageBackground'] + ');">\
                    <div id="messageTextArea" class="overlay chat-area">\
                    </div>\
                      <div class="chat-bot__qust-btn hidden" id="suggestionArea">\
                </div>\
                </div>\
                <div id="typingMessage" class="hidden" style="padding-left: 17px;">\
                <div class="bot-chat__admin">\
                <div class="admin-img">\
                    <span>\
                        <img src="' + window.ArrowChat['botImage'] + '" class="img-responsive" alt="team-1">\
                        </span>\
                        <div class="messages" style=" margin-left: 27px; margin-top: -33px;">\
                        <div class="message">\
                                    <div>\
                                        <img src="http://pages.arrowai.com/royal_enfield/loading_dots.gif" style="padding-left:10px;margin-top:10px;width: 24px;">\
                                    </div>\
                                </div>\
                                <div class="time-ago"></div>\
                        <div class="avatar">\
                        </div>\
                    </div>\
                </div>\
            </div>\
            </div>\
                <div class="bot-chat__footer chat-area-bottom">\
                <div style="pointer-events: auto;">\
            <div id="bottom-bar-id" class="bottom-bar" style="height: auto;">\
                <span>\
                    <span class="" id="animid">\
                        <div style="display: inherit;" id="ajax-example">\
                        <input autocomplete="off" data-single data-minchars="1" id="arrowTextArea"  type="text" style=" width:260px" placeholder="Type your message here..."/> </label>\
                            <a href="javascript:void(0)" id="arrowChatClick" class="chat-submit-red"></a>\
                        </div>\
                    </span>\
                    <div id="categoryAream">\
                    </div>\
                </span>\
            </div>\
        </div>\
                </div>\
            </div>\
        </div>\
        <div id="chat-btn" class="bot-chat__chat-btn" style=' + window.ArrowChat['chatIconStyle'] + '>\
            <img style="width:' + window.ArrowChat['chatIconAbsuluteX'] + ';height:' + window.ArrowChat['chatIconAbsuluteY'] + ';" src=' + window.ArrowChat['chatIconUrl'] + ' alt="chat" class="img-responsive img_45_45">\
            <span id="helper-text"></span>\
            <svg style="height:14px;width:14px;margin-top:87px;fill: red;"><path d="M13.978 12.637l-1.341 1.341L6.989 8.33l-5.648 5.648L0 12.637l5.648-5.648L0 1.341 1.341 0l5.648 5.648L12.637 0l1.341 1.341L8.33 6.989l5.648 5.648z" fill-rule="evenodd"></path></svg>\
        </div>'
                //     '<div class="bot-chat animated arrowai-chatbot" id="arrowChatFullWindow">\
                //         <div id="arrowai-chatbot" class="bot-chat-fix">\
                //             <div class="bot-chat__top-header chat-area-header" style="background-image: url(' + window.ArrowChat['headerBackgroundUrl'] + ');">\
                //                 <div class="bot-chat__header-title">\
                //                     <div class="wrap-chat-title">\
                //                         <div class="bot-chat-img">\
                //                             <img style="/* max-height: 35px; */margin-left: -23px;margin-bottom: 8px;" src="' + window.ArrowChat['botImage'] + '" alt="team-1" class="img-responsive team--img team--one">\
                //                         </div>\
                //                         <div id="bot-show" class="bot-title">\
                //                             <h4>' + window.ArrowChat['applicationName'] + '</h4>\
                //                         </div>\
                //                     </div>\
                //                     <div class="team-details">\
                //                         <h3>$configTitle</h3>\
                //                         <p>$configMessage</p>\
                //                     </div>\
                //                 </div>\
                //             </div>\
                //             <div class="bot-chat__chat-list chat-box scrollable-block" style="background-image: url(' + window.ArrowChat['backgroundUrl'] + ');">\
                //                 <div id="messageTextArea" class="overlay chat-area">\
                //                 </div>\
                //                 <div class="chat-bot__qust-btn hidden" id="suggestionArea" style="width:97%">\
                //             </div>\
                //             </div>\
                //             <div id="typingMessage" class="hidden" style="padding-left: 17px;">\
                //                         <div class="messenger-message-container">\
                //                             <div class="avatar" style="height: 0px;">\
                //                             </div>\
                //                             <div class="messages">\
                //                                 <ul>\
                //                                     <li>\
                //                                         <div class="message">\
                //                                             <div>\
                //                                                 <img src="http://pankajmalhotra.com/public/images/loading_dots.gif" style="width: 24px;">\
                //                                             </div>\
                //                                         </div>\
                //                                         <div class="time-ago"></div>\
                //                                     </li>\
                //                                 </ul>\
                //                                 <div class="avatar">\
                //                                 </div>\
                //                             </div>\
                //                         </div>\
                //                     </div>\
                //             <div class="bot-chat__footer chat-area-bottom">\
                //             <div style="pointer-events: auto;">\
                //             <div id="bottom-bar-id" class="bottom-bar" style="height: auto;">\
                //             <span>\
                //                 <span class="" id="animid">\
                //                     <div style="display: inherit;" id="ajax-example">\
                //                     <input autocomplete="off" data-single data-minchars="1" id="arrowTextArea"  type="text" style=" width:260px" placeholder="Type your message here..."/> </label>\
                //                         <a href="javascript:void(0)" id="arrowChatClick" class="chat-submit-red"></a>\
                //                     </div>\
                //                 </span>\
                //                 <div id="categoryAream">\
                //                 </div>\
                //             </span>\
                //         </div>\
                //     </div>\
                //             </div>\
                //         </div>\
                //     </div>\
                //     <div id="chat-btn" class="bot-chat__chat-btn">\
                //     <img src="' + window.ArrowChat["serverUrl"] + '/img/chatButton.png" alt="chat" class="img-responsive img_45_45">\
                //     <span id="helper-text"></span>\
                //     <svg width="14" height="14"><path d="M13.978 12.637l-1.341 1.341L6.989 8.33l-5.648 5.648L0 12.637l5.648-5.648L0 1.341 1.341 0l5.648 5.648L12.637 0l1.341 1.341L8.33 6.989l5.648 5.648z" fill-rule="evenodd"></path></svg>\
                // </div>';

            window.ArrowChat['templates'] = window.ArrowChat['templates'] || {};
            window.ArrowChat.templates['toMessage'] =
                '<div class="bot-chat__user">\
                    <h3>{{{enhance text}}}</h3>\
                    <span class="user-time"></span>\
                </div>';
            window.ArrowChat.templates['fromBotMessage'] =
                '<div class="bot-chat__admin">\
                    <div class="admin-img">\
                        <span><img src="' + window.ArrowChat['botImage'] + '" class="img-responsive" alt="team-1"></span>\
                        <h3 style="overflow-wrap: break-word;">{{{text}}}</h3>\
                    </div>\
                </div>';
            window.ArrowChat.templates['fromRepMessage'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/Default-profile_.png">\
                </div>\
                <div class="messages">\
                    <ul style="width: 100%;">\
                        <li>\
                            <div class="message">\
                                <div style="background: #FFDB83;">\
                                    {{{text}}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['showLastMessagesCount'] = '<div class="text-center" id="lastMessageLoader">\
            <span id="loadMoreMessages"  class="btn btn-rounded btn-inline btn-default-outline btn-sm">Show last <span id="counterText">{{count}}</span> messages</span>\
        </div>\
        <br class="clearfix" \>';
            window.ArrowChat.templates['selectedBotTemplate'] = '<a id="arrowChangeModuleButton" class="btn btn-rounded btn-sm $menuClass">Menu</a>\
            <span style="text-align: left; margin-left:-50px;" class="$menuClass">\
                Talking To: {{moduleName}}\
            </span>';
            window.ArrowChat.templates['selectedBotTemplateInChat'] = '<div class="text-center" id="startedTalkingTo" style="margin-bottom: 10px;">\
            <span class="btn btn-rounded btn-inline btn-default-outline btn-sm disabled">Started Talking to: {{moduleName}}</span>\
        </div>';
            window.ArrowChat.templates['initialMessageTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="messages">\
                    <ul>\
                        <li>\
                            <div class="message">\
                                <div>\
                                    <header class="widget-header" style="padding-left: 5px; padding-bottom: 5px;">\
                                        {{initialGreeting}}\
                                    </header>\
                                    {{#each suggestions}}\
                                    <div style="background: #fafcff;padding: 5px; width:100%;">\
                                        <div class="widget-tasks-item choose-sentence" style="width: 99%;padding: 5px;margin: 2px;padding-left: 10px;">\
                                            <a style="width: 100%;font-size: small;">\
                                                {{this}}\
                                            </a>\
                                        </div>\
                                    </div>\
                                    {{/each}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['buttonTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="messages">\
                    <ul>\
                        <li>\
                            <div class="message">\
                                <div style="text-align: center;">\
                                    <header class="widget-header" style="padding-left: 5px; padding-bottom: 5px;">\
                                        {{{text}}}\
                                    </header>\
                                    {{#each buttons}}\
                                        {{#ifPostback this.type}}\
                                            <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" class="btn btn-rounded btn-inline btn-primary-outline payload-btn" style="font-size: small; min-width: 44%;">{{this.title}}</a>\
                                        {{/ifPostback}}\
                                        {{#ifWebUrl this.type}}\
                                            <a href="{{this.url}}" target="_blank" class="btn btn-rounded btn-inline btn-primary-outline" style="font-size: small;min-width: 44%;">{{this.title}}</a>\
                                        {{/ifWebUrl}}\
                                    {{/each}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['buttonsBottomTemplate'] = '{{#each buttons}}\
            <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" class="payload-btn-bottom">{{this.title}}</a>\
        {{/each}}';
            window.ArrowChat.templates['keyboardTemplate'] = '{{#each options}}\
            <a data-value="{{this.text}}" data-variable="{{this.conversation}}" class="payload-btn-keyboard">{{this.text}}</a>\
        {{/each}}';
            window.ArrowChat.templates['transactionTableTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="messages">\
                    <ul>\
                        <li>\
                            <div class="message">\
                                <div>\
                                    <header class="widget-header" style="padding-left: 5px; padding-bottom: 5px;">\
                                        {{{text}}}\
                                    </header>\
                                    {{#createTransactionTable list}}{{/createTransactionTable}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['cardListTemplate'] = '<section class="bot-slide">\
            <div id="card-slider" class="card-slider owl-carousel owl-theme">\
                {{#each list}}\
                <div class="item" >\
                    <div class="slider-img">\
                            <img src="{{this.image}}" alt="{{this.title}}">\
                    </div>\
                    <div>\
                    <div>\
                    {{#if this.buttons}}\
                    <div class="slider-text">\
                        <h2>\
                        {{#if this.url}}\
                            <a href="{{this.url}}" target="_blank" tabindex="-1">{{this.title}}</a>\
                        {{else}}\
                            {{this.title}}\
                        {{/if}}\
                        </h2>\
                        <p>{{this.description}}</p>\
                    </div>\
                    {{/if}}\
                    </div>\
                    <div class="readmore_area">\
                        {{#each buttons}}\
                            {{#ifPostback this.type}}\
                            <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" class="payload-btn">{{this.title}}</a>\
                            {{/ifPostback}}\
                            {{#ifWebUrl this.type}}\
                            <a href="{{this.url}}" target="_blank">{{this.title}}</a>\
                            {{/ifWebUrl}}\
                        {{/each}}\
                    </div>\
                </div>\
                </div>\
                {{/each}}\
            </div>\
        </section>';
            window.ArrowChat.templates['confirmationTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="messages">\
                    <ul>\
                        <li>\
                            <div class="message">\
                                <div>\
                                    <header class="widget-header" style="padding-left: 5px; padding-bottom: 5px;">\
                                        {{{text}}}\
                                    </header>\
                                    <table class="table">\
                                        <tbody>\
                                        {{#each confirmation.actionButton}}\
                                        <tr>\
                                            <td class="col-md-6">{{this.title}}</td>\
                                            <td class="col-md-6">\
                                                {{#ifPostback this.type}}\
                                                <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" class="btn btn-sm btn-rounded btn-inline btn-primary-outline payload-btn" style="font-size: small; min-width: 44%;">{{this.title}}</a>\
                                                {{/ifPostback}}\
                                                {{#ifWebUrl this.type}}\
                                                <a href="{{this.url}}" target="_blank" class="btn btn-sm btn-rounded btn-inline btn-primary-outline" style="font-size: small;min-width: 44%;">{{this.title}}</a>\
                                                {{/ifWebUrl}}\
                                            </td>\
                                        </tr>\
                                        {{/each}}\
                                        </tbody>\
                                    </table>\
                                    <hr style="margin:8px;">\
                                    {{#each confirmation.details}}\
                                    <ul>\
                                        <li class="col-md-12">\
                                            <h5>{{this.title}}</h5>\
                                        </li>\
                                        <li class="col-md-12">\
                                            {{this.message}}\
                                        </li>\
                                        <li class="col-md-12">\
                                            {{#ifPostback this.type}}\
                                            <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" class="col-md-12 btn btn-rounded btn-inline btn-primary-outline payload-btn" style="font-size: small; min-width: 44%;">Change</a>\
                                            {{/ifPostback}}\
                                            {{#ifWebUrl this.type}}\
                                            <a href="{{this.url}}" target="_blank" class="btn btn-rounded btn-inline btn-primary-outline col-md-12" style="font-size: small;min-width: 44%;">Change</a>\
                                            {{/ifWebUrl}}\
                                        </li>\
                                    </ul>\
                                    {{/each}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['paymentTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="messages">\
                    <ul>\
                        <li>\
                            <div class="message">\
                                <div>\
                                    <header class="widget-header" style="padding-left: 5px; padding-bottom: 5px;">\
                                        {{{text}}}\
                                    </header>\
                                    {{#ifPostback this.type}}\
                                        <a data-amount="{{this.payload.amount}}" data-api-key="rzp_test_xSkp4LPbXzTBiu" data-description="{{this.payload.description}}" data-contact="{{this.payload.contact}}" data-name="{{this.payload.name}}" data-email="{{this.payload.email}}" class="btn btn-rounded btn-inline btn-primary-outline payment-btn" style="font-size: small; min-width: 44%;">Pay {{this.payload.amount}}</a>\
                                    {{/ifPostback}}\
                                </div>\
                            </div>\
                            <div class="time-ago"></div>\
                        </li>\
                    </ul>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['imageTemplate'] = ' <div class="clearfix">\
            <div class="messenger-message-container" style="width: 333px;">\
                <div class="avatar">\
                <span>\
                <img src="' + window.ArrowChat['botImage'] + '" class="img-responsive" alt="team-1">\
                </span>\
                </div>\
                <div class="">\
  <img src="{{this.images.url}}" alt="Avatar" style="width:100%">\
  <div class="container">\
    <h4><b>{{this.images.title}}</b></h4> \
  </div>\
</div>\
            </div>\
        </div>';
            window.ArrowChat.templates['videoTemplate'] = ' <div class="clearfix">\
        <div class="messenger-message-container" style="width: 333px;">\
            <div class="avatar">\
            <span>\
            <img src="' + window.ArrowChat['botImage'] + '" class="img-responsive" alt="team-1">\
            </span>\
            </div>\
            <div class="">\
            <video width="320" height="240" controls>\
            <source src="{{this.video.url}}" type="video/mp4">\
            Your browser does not support the video tag.\
          </video>\
<div class="container">\
<h4><b>{{this.video.title}}</b></h4> \
</div>\
</div>\
        </div>\
    </div>';
            window.ArrowChat.templates['audioTemplate'] = ' <div class="clearfix">\
    <div class="messenger-message-container" style="width: 333px;">\
        <div class="avatar">\
        <span>\
        <img src="' + window.ArrowChat['botImage'] + '" class="img-responsive" alt="team-1">\
        </span>\
        </div>\
        <div class="">\
        <audio controls>\
        <source src="{{this.audio.url}}" type="audio/mpeg">\
      Your browser does not support the audio element.\
      </audio>\
<div class="container">\
<h4><b>{{this.text}}</b></h4> \
</div>\
</div>\
    </div>\
</div>';
            window.ArrowChat.templates['compactListTemplate'] = '<div class="clearfix">\
            <div class="messenger-message-container" style="width: 250px;">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="card-grid-col">\
                    <article class="card-typical">\
                       {{#each list}}\
                        <div class="card-typical-section">\
                            {{#if this.image}}\
                            <div class="pull-right">\
                                <img style="width: 50px; height: 50px;"src="{{this.image}}" alt="">\
                                </div>\
                                {{/if}}\
                            <div style="font-size: x-small">\
                            <strong> {{this.title}}</strong>\
                            </div>\
                            <div style="font-size: x-small"> {{this.description}}</div>\
                            <div style="padding-bottom: 10px">\
                            </div>\
                            {{#each buttons}}\
                            {{#ifPostback this.type}}\
                                <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" style="font-size: xx-small;margin-bottom: -5px;max-width:50%" class="btn  btn-inline btn-primary-outline btn-sm payload-btn">{{this.title}}</a>\
                            {{/ifPostback}}\
                            {{#ifWebUrl this.type}}\
                            <a href="{{this.url}}" target="_blank" class="btn btn-rounded btn-inline btn-primary-outline" style="font-size: xx-small;margin-bottom: -5px;max-width:50%" class="btn  btn-inline btn-primary-outline btn-sm payload-btn">{{this.title}}</a>\
                            {{/ifWebUrl}}\
                        {{/each}}\
                        </div>\
                        {{/each}}\
                        {{#each button}}\
                        <div class="card-typical-section">\
                        <div class="text-center">\
                         <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" style="font-size: small;margin-bottom: -5px; max-width:100%" class="btn  btn-inline btn-primary-outline btn-sm payload-btn">{{this.title}}</a>\
                        </div>\
                        </div>\
                        {{/each}}\
                    </article>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['profileTemplate'] = ' <div class="clearfix">\
            <div class="messenger-message-container" style="width: 250px;">\
                <div class="avatar">\
                    <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/' + window.ArrowChat['icon_img'] + '">\
                </div>\
                <div class="card-grid-col">\
                    <article class="card-typical">\
                       {{#each list}}\
                        <div class="card-typical-section card-typical-content">\
                                            <div class="photo">\
                                                <img src="{{this.image}}" alt="">\
                                            </div>\
                                            <div style="font-size: small">\
                                                <strong>{{this.title}}</strong>\
                                            </div>\
                                            <div style="font-size: x-small">{{this.description}}</div>\
                                            <div class="card-typical-section">\
                                                {{#each buttons}}\
                                                {{#ifPostback this.type}}\
                                                <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" style="font-size: xx-small;margin-bottom: -5px;max-width:50%" class="btn  btn-inline btn-primary-outline btn-sm payload-btn">{{this.title}}</a>\
                                                {{/ifPostback}}\
                                                {{#ifWebUrl this.type}}\
                                                <a href="{{this.url}}" target="_blank" class="btn btn-rounded btn-inline btn-primary-outline" style="font-size: small;min-width: 44%;">{{this.title}}</a>\
                                                {{/ifWebUrl}}\
                                                {{/each}}\
                                            </div>\
                                        </div>\
                        {{/each}}\
                        {{#each button}}\
                        <div class="card-typical-section">\
                        <div class="text-center">\
                         <a data-value="{{this.payload.value}}" data-variable="{{this.payload.variable}}" style="font-size: small;margin-bottom: -5px; max-width:100%" class="btn  btn-inline btn-primary-outline btn-sm payload-btn">{{this.title}}</a>\
                        </div>\
                        </div>\
                        {{/each}}\
                    </article>\
                </div>\
            </div>\
        </div>';
            window.ArrowChat['widget'] = window.ArrowChat['widget'] || {};
            window.ArrowChat.widget['moveMessengerOrWebConfirmation'] = '$moveMessengerOrWebConfirmation';
            window.ArrowChat.widget['templateAfterMove'] = '<div id="confirmationtextNew" class="avatar">\
            <span style="padding-top:130px;" class="btn btn-rounded btn-inline btn-default-outline btn-sm disabled">You can continue with Web</span>\
            <div class="avatar">\
            <input id="chk_remember" type="checkbox" name="remember" value="yes">Remember me</input>\
            </div>\
            <div style="text-align: center" class="avatar" id="arrow-web-btn">\
                <a href="#" title="continue with web">  <img src="' + window.ArrowChat['serverUrl'] + '/webchat/assets/img/web.png" id="arrowwebbtn" style="width:15%"></a>\
                <div class="clearfix"></div>\
            </div>';
            window.ArrowChat.widget['botList'] =
                '<div id="botmainmenu">\
            <h4 style="padding-top:30px;color: rgb(143, 138, 140);">Please Select:</h4>\
            <div id="botlistmenu">\
               {{#each bots}}\
                <div class="col-xs-4" id="selectBotWidget" data-bot-id={{this.bot_id}} data-bot-text="{{this.bot_text}}">\
                {{#image this.bot_id}}{{/image}}\
                <div style="line-height: 15px"><span style="font-size:small;">{{this.bot_text}}</span></div>\
                </div>\
              {{/each}}\
            </div>\
          <div class="clearfix"></div>';
            window.ArrowChat.templates['categoryArea'] = '<div class="bottom-menu-expand hide" id="chat-bar-options" >\
            <div class="btm-link">\
                <div class="links-scroll">\
                    <ul style="list-style-type: none;" class="list-unstyled" >\
                    {{#each categoryList}}\
                        <li id="{{{category}}}"  " >\
                            <a href="javascript:void(0)" onclick="window.ArrowChat.showCategory({{@index}})">\
                                <span style="text-transform: uppercase;">{{{category}}}\</span>\
                            </a>\
                        </li>\
                        {{/each}}\
                    </ul>\
                </div>\
            </div>\
            <div tolerance="0">\
                <div id="optionsScenarioList" class="options custom-scrollbar" style="height: 195px;">\
                </div>\
            </div>\
        </div>';
            window.ArrowChat.templates['categoryRecomndArea'] =
                '<ul>{{#each questions}}\
            <li>\
                <a href="javascript:void(0)">{{{questions}}}</a>\
            </li>\
            {{/each}}\
        </ul>';
        },
        sysVars: {
            production: {
                firebase_messagingSenderId: "123123"
            },
            staging: {
                firebase_messagingSenderId: "234234"
            },
            local: {
                firebase_messagingSenderId: "1324"
            }
        },
        getQueryString: function() {


            var assoc = {};
            var decode = function(s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
            var queryString = location.search.substring(1);
            var keyValues = queryString.split('&');

            for (var i in keyValues) {
                var key = keyValues[i].split('=');
                if (key.length > 1) {
                    assoc[decode(key[0])] = decode(key[1]);
                }
            }

            return assoc;

        },
        init: function(params) {
            return new Promise((resolve, reject) => {
                if (params.hasOwnProperty('applicationId')) {
                    var self = this;
                    var environment = params['environment'] || 'production';
                    self.loadJquery(function($) {
                        self.loadAppConfig(params['applicationId']).then(function() {
                            window.ArrowChat = window.ArrowChat || {};
                            window.ArrowChat['serverUrl'] = params.serverUrl || '';
                            window.ArrowChat['fireBaseUrl'] = params.fireBaseUrl || '${environment.INTERACTION_ENGINE}/';
                            window.ArrowChat['cdnUrl'] = '';
                            window.ArrowChat['applicationId'] = params.applicationId || '5be525e4b65adb7e008b456a';
                            window.ArrowChat['uiMessageRepeat'] = '$uiMessageRepeat';
                            window.ArrowChat['theme'] = params.theme || '';
                            window.ArrowChat['applicationName'] = params.applicationName || 'Test Application';
                            window.ArrowChat['backgroundUrl'] = params.backgroundUrl || '';
                            window.ArrowChat['headerBackgroundUrl'] = params.backgroundUrl || 'http://pages.arrowai.com/royal_enfield/bbb.png';
                            window.ArrowChat['paramOnce'] = !!params.paramOnce ? Object.assign(params.paramOnce, self.getQueryString()) : {};
                            window.ArrowChat['paramAll'] = !!params.paramAll ? Object.assign(params.paramAll, self.getQueryString()) : {};
                            window.ArrowChat['botId'] = params.defaulBotId || ''

                            window.ArrowChat['botImage'] = params.botImage || window.ArrowChat['serverUrl'] + `/img/bogImage.png`;
                            window.ArrowChat['icon_img'] = params.icon_img || 'royalimage.jpg';
                            window.ArrowChat.firebaseConfig = {
                                apiKey: '$apiKey',
                                authDomain: 'arroaaimainlocal.firebaseapp.com',
                                databaseURL: 'https://arroaaimainlocal.firebaseio.com',
                                storageBucket: 'arroaaimainlocal.appspot.com', //TODO Change all the Variables here
                                messagingSenderId: '1060626291067'
                            };
                            window.ArrowChat['headerImageUrl'] = params.headerImageUrl || ''
                            window.ArrowChat['messageBackground'] = params.messageBackground || ''
                            window.ArrowChat['chatIconUrl'] = params.chatIconUrl || window.ArrowChat['serverUrl'] + '/img/chatIcon.png'
                            window.ArrowChat['suggestion'] = params.suggestion || { showSuggestion: false }
                            window.ArrowChat['chatIconStyle'] = params.chatIconStyle || '"width:103px;height:103px;background-color:transparent;box-shadow:none;",';

                            window.ArrowChat['chatIconAbsuluteX'] = params.chatIconAbsuluteX || '80';
                            window.ArrowChat['chatIconAbsuluteY'] = params.chatIconAbsuluteY || '80';
                            //Get the data from Application  Config
                            //No Need of Dreamfactory
                            //Adding the Other Templates
                            self.initializeTemplates();
                            // self.loadJquery(function($) {
                            if ($('#arrow_wrapper').length == 0) {
                                $('<div>').attr({
                                    'id': "arrow_wrapper",
                                    name: "arrow_wrapper",
                                    class: "arrow_wrapper",
                                    style: " z-index:111",
                                    frameborder: 0
                                }).html(window.html).prependTo('body');

                                $("<iframe>").attr({
                                    'id': "arrow_wrapper_frame",
                                    name: "arrow_wrapper_frame",
                                    class: "frame",
                                    style: " display:none",
                                    frameborder: 0
                                }).html(window.ArrowChat.html).prependTo('#arrow_wrapper').contents().find('body').append('<div id="arrow_wrapper"  class="arrow-wrapper"> ' + window.ArrowChat.html + ' </div>');

                                self.loadJqueryForFrame(function($) {
                                    resolve($);
                                    var script = document.createElement("link");
                                    script.rel = "manifest";
                                    script.href = window.ArrowChat.serverUrl + '/webchat/manifest.json';
                                    var iframe = document.getElementById('arrow_wrapper_frame');
                                    iframe.contentWindow.document.getElementsByTagName('head')[0].appendChild(script);
                                })

                                var css1 = self.getCss(window.ArrowChat.serverUrl + '/css/webchat/dist/new/bootstrap.css');
                                var css2 = self.getCss(window.ArrowChat.serverUrl + '/css/webchat/dist/new/themify-icons.css');
                                var css3 = self.getCss(window.ArrowChat.serverUrl + '/css/webchat/dist/new/style.css');
                                var css4 = self.getCss(window.ArrowChat.serverUrl + '/css/webchat/dist/new/owl.carousel.css');
                                var css5 = self.getCss(window.ArrowChat.serverUrl + '/webchat/prism/prism.css');
                                var css6 = self.getCss(window.ArrowChat.serverUrl + '/webchat/awesomplete.css');
                                var css5;
                                if (window.ArrowChat.theme != '') {
                                    css5 = self.getCss(window.ArrowChat.serverUrl + '/css/webchat/theme/' + window.ArrowChat.theme + '.css');

                                } else {
                                    self.getCss(window.ArrowChat.serverUrl + '/css/webchat/theme/barclays.css');

                                }
                                // if () {
                                // }

                                var script1;
                                if (true) {
                                    script1 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/handlebars.js');
                                } else {
                                    script1 = $.Deferred().resolve().promise()
                                }
                                var script2 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/new/config.js');
                                var script3 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/new/util.js');
                                var script4 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/new/jquery.emojiarea.js');
                                var script5 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/new/emoji-picker.js');
                                var script6 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/build/concat.js');
                                var script7 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/assets/js/new/owl.carousel.js');
                                var script10 = self.loadScript("https://cdn.jsdelivr.net/algoliasearch/3/algoliasearchLite.min.js");
                                self.loadScript('https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js');
                                self.loadScript('https://oss.maxcdn.com/respond/1.4.2/respond.min.js');

                                $('.arrow-wrapper').hide();
                                // $.when.apply($, [script6, script1, script2, script3, script4, script5, script7, script8, script9, script10]).then(function() {
                                //     self.loadScript(window.ArrowChat.serverUrl + '/webchat/royal/runner.js');
                                // });
                                console.log(window.ArrowChat['suggestion'].showSuggestion)
                                if (window.ArrowChat['suggestion'].showSuggestion) {
                                    var script8 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/main_awesomplete.js');
                                    var script9 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/autocomplete.js');

                                    $.when.apply($, [script6, script1, script2, script3, script4, script5, script7, script8, script9, script10]).then(function() {
                                        self.loadScript(window.ArrowChat.serverUrl + '/webchat/royal/runner.js');
                                    });
                                } else {
                                    // var script8 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/main_awesomplete.js');
                                    // var script9 = self.loadScript(window.ArrowChat.serverUrl + '/webchat/autocomplete.js');

                                    $.when.apply($, [script6, script1, script2, script3, script4, script5, script7, script10]).then(function() {
                                        self.loadScript(window.ArrowChat.serverUrl + '/webchat/royal/runner.js');
                                    });
                                }




                            } else {
                                console.log("ArrowAI: Sorry. Not able to Load as No App Id is Present.");
                            }
                        })


                    });
                }
            })
        },

    }
    window.ArrowChat = merge2(window.ArrowChat, obj2);

})(window, document);