(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("CommunityFlag","Echo.StreamServer.Controls.Stream.Item");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){this.extendTemplate("insertAsLastChild","data",plugin.templates.main);plugin.config.proxyURL=wp_e2.metaUrl};plugin.config={"showUserList":false,"markUnreliableFlaggers":{"enabled":true,"markerValue":"unreliable_flagger"}};plugin.labels={"flagged":"Reported","flaggedThis":" reported this.","flagControl":"Report","unflagControl":"Reported",
"flagProcessing":"Reporting...","unflagProcessing":"Unreporting..."};Echo.Labels.set(plugin.labels,"Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI");plugin.templates.main='\x3cdiv class\x3d"{plugin.class:flaggedBy}"\x3e\x3c/div\x3e';plugin.component.renderers.buttons=function(element){var item=this.component;this.parentRenderer("buttons",arguments);element.find(".echo-streamserver-controls-stream-item-button-Flag, .echo-streamserver-controls-stream-item-button-Unflag").unbind("click");
element.find(".echo-streamserver-controls-stream-item-button-Flag").on("mouseenter",this,function(event){event.stopPropagation();var flagControl=$("#comment-flag-container").clone();flagControl.find("li").on("click",event.data,function(event){event.stopPropagation();var markerValue=$(this).attr("id");var name="Flag";var item=event.data.component;var plugin=event.data;if(plugin.config.get("markUnreliableFlaggers").enabled==true){var userMarkers=wp_e2.echo_user.get("markers");$.each(userMarkers||[],
function(index,value){if(value.indexOf(plugin.config.get("markUnreliableFlaggers").markerValue)>-1)markerValue=markerValue+"-"+plugin.config.get("markUnreliableFlaggers").markerValue})}item.view.get("buttons").find(".echo-streamserver-controls-stream-item-button-Flag .echo-streamserver-controls-stream-item-buttonCaption").empty().append(plugin.labels.get(name.toLowerCase()+"Processing"));var activity={"verbs":["http://activitystrea.ms/schema/1.0/"+name.toLowerCase()],"targets":[{"id":item.get("data.object.id")}]};
var request=Echo.StreamServer.API.request({"endpoint":"submit","secure":plugin.config.get("useSecureAPI",false,true),"submissionProxyURL":plugin.config.get("submissionProxyURL","",true),"data":{"content":activity,"appkey":item.config.get("appkey"),"sessionID":item.user.get("sessionID"),"target-query":item.config.get("parent.query")},"onData":function(response){var data='{"verb": "mark","target": "'+item.get("data.object.id")+'","markers": "'+markerValue+'"}';$.get(plugin.config.get("proxyURL"),{"appkey":item.config.get("appkey"),
"content":data,"sessionID":item.user.get("sessionID","")},function(){response.markers=markerValue;plugin._publishEventComplete({"name":name,"state":"Complete","response":response});if(name==="Flag"&&!item.config.get("parent.showFlags")){plugin.set("flagged",true);item.view.render({"name":"buttons"})}plugin.requestDataRefresh()},"jsonp")},"onError":function(response){plugin._publishEventComplete({"name":name,"state":"Error","response":response});item.render()}});request.send()});flagControl.appendTo($(this)).show()});
element.find(".echo-streamserver-controls-stream-item-button-Flag").on("mouseleave",function(event){event.stopPropagation();$(this).find("#comment-flag-container").remove()});return element};plugin.methods._publishEventComplete=function(args){var item=this.component;this.events.publish({"topic":"on"+args.name+args.state,"data":{"item":{"data":item.get("data"),"target":item.config.get("target")},"response":args.response}})};plugin.methods._myFlags=function(flags){var item=this.component;return $.map(flags,
function(entry){if(item.user.has("identity",entry.actor.id))return entry})};plugin.css=".{plugin.class:flaggedBy} { background: url({config:cdnBaseURL.sdk-assets}/images/curation/status/communityflagged.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }";Echo.Plugin.create(plugin)})(Echo.jQuery);
(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("TWP_Stream","Echo.StreamServer.Controls.Stream");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){var self=this,item=this.component;var thisContainer=this.config.get("thisContainer");item.config.set("thisContainer",thisContainer)};plugin.config={"thisContainer":"#echo_container"};plugin.events={"Echo.StreamServer.Controls.Stream.onRender":function(topic,data){},"Echo.StreamServer.Controls.Stream.onRerender":function(topic,
data){}};plugin.component.renderers.more=function(element){var self=this.component;this.parentRenderer("more",arguments);var thisContainer=self.config.get("thisContainer");if(wp_e2[thisContainer].display_more===false)element.remove();if(self.data.hasMoreChildren===false)element.append("No more comments.")};plugin.component.renderers.container=function(element){var self=this.component,plugin=this;this.parentRenderer("container",arguments);var thisContainer=self.config.get("thisContainer");return element};
Echo.Plugin.create(plugin)})(Echo.jQuery);
(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("TWP_Stream_Item","Echo.StreamServer.Controls.Stream.Item");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){var self=this,item=this.component;var thisContainer=this.config.get("thisContainer");item.config.set("thisContainer",thisContainer);if(plugin.methods._ignoreVisible(this.component))this.extendTemplate("insertBefore","buttons",plugin.ignoreUserTemplate);if(thisContainer&&wp_e2[thisContainer]&&wp_e2[thisContainer].includeshare)item.addButtonSpec(this.name,
this._assembleButton("share"));if(thisContainer&&wp_e2[thisContainer].pollincluded)this.extendTemplate("insertAsFirstChild","body",plugin.pollAnswerTemplate);Echo.Labels.set({"childrenMoreItems":"View More Replies"},"Echo.StreamServer.Controls.Stream.Item")};plugin.config={"thisContainer":"#echo_container","includeshare":true,"ignoreuser":true,"verifiedUserMarkers":"verified_preferred","editConfig":{"editMarker":"edited","editText":'\x3cspan class\x3d"edited"\x3e [Edited]\x3c/span\x3e'}};plugin.labels=
{"share":"Share","ignore_user":"Ignore User","verification_complete":"verification_approved","poll_answer_prefix":"","poll_cookie_prefix":"poll_answer_"};plugin.events={"Echo.StreamServer.Controls.Stream.Item.onAdd":function(topic,data){plugin.methods._markNew(data)},"Echo.UserSession.onInit":function(topic,data){},"Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlag.onFlagComplete":function(topic,data){if(data&&data.response.result=="success"&&data.response.skipped.length===0)plugin.methods._processFlag(topic,
data)}};plugin.ignoreUserTemplate=function(){return'\x3cdiv class\x3d"{plugin.class:wrapper} {class:buttons} {class:ignore_user}"\x3e'+'\x3ca class\x3d"{class:button}  {plugin.class:ignore_user}"\x3e\x3cspan class\x3d" {class:buttonCaption} ignore-user"\x3eIgnore User\x3c/span\x3e\x3c/a\x3e'+"\x3c/div\x3e"};plugin.pollAnswerTemplate=function(){var markerArray=this.component.data.object.markers||[];var thisContainer=this.component.config.get("thisContainer");var poll_answer="";for(var x=0;x<markerArray.length;x++)if(markerArray[x].indexOf(plugin.labels.poll_cookie_prefix+
wp_e2[thisContainer].pollid)>=0)poll_answer=markerArray[x].split(plugin.labels.poll_cookie_prefix+wp_e2[thisContainer].pollid+"_")[1];if(poll_answer!==""&&poll_answer!=="undefined")return'\x3cdiv class\x3d"{plugin.class:polls}"\x3e'+'\x3cdiv class\x3d"poll-answer" data-attribute-answer\x3d"'+poll_answer+'"\x3e'+('\x3cspan class\x3d"poll-prefix"\x3e'+plugin.labels.poll_answer_prefix+"\x3c/span\x3e"+poll_answer)+"\x3c/div\x3e"+"\x3c/div\x3e";else return""};plugin.component.renderers.authorName=function(element){var item=
this.component;this.parentRenderer("authorName",arguments);var thisContainer=item.config.get("thisContainer");if(plugin.methods._isVerifiedCommenter(thisContainer,item))$(element).html("\x3cspan\x3e"+wp_e2[thisContainer].verifiedcommenteridlist.userArray[item.data.actor.id].name+" ("+item.data.actor.title+")"+"\x3c/span\x3e")};plugin.component.renderers.date=function(element){var plugin=this;var item=this.component;this.parentRenderer("date",arguments);var thisContainer=item.config.get("thisContainer");
var currDate=new Date;var markers=typeof item.data.object.markers!="undefined"?item.data.object.markers.join(","):"";currDate.setISO8601(item.data.object.published);var currDateFmt=currDate.format("h:MM TT Z");var prevDateFmt=currDate.format("m/d/yyyy h:MM TT Z");var thisCommentURL=item.data.object.id;thisCommentURL=thisCommentURL.replace("http://","");var thisCommentPermalink=item.data.object.context[0].uri+"?outputType\x3dcomment\x26commentID\x3d"+thisCommentURL;if(wp_e2[thisContainer]&&wp_e2[thisContainer].includepermalink&&
(item.data.target.id!=item.data.target.conversationID&&item.data.target.id==item.data.object.context[0].uri)){var currDatePermalink='\x3ca href\x3d"'+thisCommentPermalink+'"\x3e'+currDateFmt+"\x3c/a\x3e";var prevDatePermalink='\x3ca href\x3d"'+thisCommentPermalink+'"\x3e'+prevDateFmt+"\x3c/a\x3e";currDate.format("m/d/yyyy")==(new Date).format("m/d/yyyy")?$(element).html(currDatePermalink):$(element).html(prevDatePermalink)}else currDate.format("m/d/yyyy")==(new Date).format("m/d/yyyy")?$(element).html(currDateFmt):
$(element).html(prevDateFmt);var editConfig=this.config.get("editConfig");if(markers.indexOf(editConfig.editMarker)>=0)$(element).append(editConfig.editText);return element};plugin.component.renderers.children=function(element){var item=this.component;this.parentRenderer("children",arguments);if(!TWP.isSignedIn()||TWP.isSignedIn()&&wapoIdentity&&!wapoIdentity.isMemberOfCommentingGroup())jQuery(item.view.get("plugin-Reply-replyForm")).find("echo-streamserver-controls-submit-body").remove()};plugin.component.renderers.expandChildrenLabel=
function(element){var item=this.component;this.parentRenderer("expandChildrenLabel",arguments);return element.append('\x3cspan class\x3d"fa fa-chevron-down"\x3e\x3c/span\x3e')};plugin.renderers.ignore_user=function(element){var plugin=this,item=this.component;var thisContainer=item.config.get("thisContainer");return element.on("click",function(){var ignoreUser={};ignoreUser.actionData={};ignoreUser.actionData.user_id=wp_e2.echo_user.get("identityUrl");ignoreUser.actionData.action="Ignore";ignoreUser.actionData.target_user_id=
item.data.actor.id;ignoreUser.actionData.target_user_name=item.data.actor.title;ignoreUser.actionData.ignoring_date=(new Date).getTime();var mData={};mData.config={"action":"post","remoteUrl":wp_e2.mongoUserActionUrl,"data":ignoreUser.actionData};TWP.Util.updateMongoDb(mData);if(!wp_e2.ignoredUsers)wp_e2.ignoredUsers=[];wp_e2.ignoredUsers.push(item.data.actor.id);plugin._IgnoreOmniture();plugin._removeIgnoredComments(item,thisContainer)})};plugin.methods._assembleButton=function(name){var plugin=
this,item=this.component;var thisContainer=item.config.get("thisContainer");switch(name){case "share":return function(){var item=this;return{"name":name,"label":plugin.labels.get(name),"visible":plugin._shareVisible()}};break;case "ignore_user":return function(){var item=this;var callback=function(){var ignoreUser={};ignoreUser.actionData={};ignoreUser.actionData.user_id=wp_e2.echo_user.get("identityUrl");ignoreUser.actionData.action="Ignore";ignoreUser.actionData.target_user_id=item.data.actor.id;
ignoreUser.actionData.target_user_name=item.data.actor.title;ignoreUser.actionData.ignoring_date=(new Date).getTime();var mData={};mData.config={"action":"post","remoteUrl":wp_e2.mongoUserActionUrl,"data":ignoreUser.actionData};TWP.Util.updateMongoDb(mData);if(!wp_e2.ignoredUsers)wp_e2.ignoredUsers=[];wp_e2.ignoredUsers.push(item.data.actor.id);plugin._IgnoreOmniture();plugin._removeIgnoredComments(item,thisContainer)};return{"name":name,"label":plugin.labels.get(name),"template":'\x3ca class\x3d"{class:button} {class:ignore_user}"\x3e\x3cspan class\x3d"ignore-user"\x3eIgnore User\x3c/span\x3e\x3c/a\x3e',
"visible":plugin._ignoreVisible(),"callback":callback}};break}};plugin.component.renderers.container=function(element){var plugin=this,item=this.component;this.parentRenderer("container",arguments);var thisContainer=item.config.get("thisContainer");var markerDisplay=wp_e2[thisContainer]&&wp_e2[thisContainer].markerDisplay||{};var classes=[];var postMarkers=[];$.map(item.data.actor.roles||[],function(role){if(role!="")classes.push("echo-item-user-role-"+role)});var markerTranslated="";$.map(item.data.actor.markers||
[],function(marker){if(marker!="")if(marker==plugin.config.get("verifiedUserMarkers")&&!plugin._isVerifiedCommenter(thisContainer,item));else{classes.push("echo-item-user-marker-"+marker);markerTranslated=markerDisplay[marker]||"";postMarkers.push('\x3cdiv class\x3d"marker" title\x3d"'+markerTranslated+'..."\x3e\x3cspan class\x3d"marker echo-item-user-'+marker+'" rel\x3d"#echo-'+marker+'" \x3e\x3c/span\x3e\x3c/div\x3e')}});if(classes.length)$(element).addClass(classes.join(" "));var thisHeader=item.view.get("plugin-CardUIShim-header-box");
if(thisHeader&&thisHeader.length>0){$("div.marker",thisHeader).remove();thisHeader.prepend(postMarkers.join(" "));item.view.get("avatar-wrapper").after(thisHeader)}var isIgnoredPoster=false;if(wp_e2&&typeof wp_e2.ignoredUsers!=="undefined"&&wp_e2.ignoredUsers.length>0)for(var x=0;x<wp_e2.ignoredUsers.length;x++)if(wp_e2.ignoredUsers[x]==item.data.actor.id){isIgnoredPoster=true;break}if(isIgnoredPoster){$(element).addClass("ignored-comment");if(item.children.length>0)$(element).html('\x3cdiv class\x3d"ignored-comment"\x3eYou are ignoring a comment from '+
item.data.actor.title+" that has these replies.\x3c/div\x3e");else $(element).empty();return element}if(wp_e2[thisContainer].includevoteofftopic){var thisMarker="flag-offtopic";var markerMatchCheck=plugin._markerCheck(item,thisMarker),voteSettings=wp_e2["voteSettings_"+thisMarker]||{};if(markerMatchCheck)if($(element).find("."+voteSettings.markClass+".comment-item-hidden").length==0)$(item.view.get("date")).after('\x3cdiv class\x3d"'+voteSettings.markClass+' comment-item-hidden"\x3e'+voteSettings.markText+
"\x3c/div\x3e")}return element};plugin.component.renderers.content=function(element){var item=this.component;this.parentRenderer("content",arguments);var thisContainer=item.config.get("thisContainer");if(wp_e2[thisContainer].includevoteofftopic){var thisMarker="flag-offtopic",classes=[],voteSettings=wp_e2["voteSettings_"+thisMarker]||{};var markerMatchCheck=plugin.methods._markerCheck(item,thisMarker);if(markerMatchCheck){classes.push(voteSettings.markClass);if(classes.length)$(element).addClass(classes.join(" "))}}};
plugin.component.renderers.body=function(element){var item=this.component;item.data.object.content=item.data.object.content||"";var thisContainer=item.config.get("thisContainer");if(!wp_e2[thisContainer].allow_photos)item.data.object.content=item.data.object.content.replace(/<(img|.echo-item-files)(.|\n)*?>/i,"");if(!wp_e2[thisContainer].allow_videos)item.data.object.content=item.data.object.content.replace(/<(object|embed|iframe|.echo-item-files)(.|\n)*?>/i,"");if(!wp_e2[thisContainer].allow_links)item.data.object.content=
item.data.object.content.replace(/<(a)(.|\n)*?>/i,"");this.parentRenderer("body",arguments)};plugin.component.renderers.buttons=function(element){var item=this.component;this.parentRenderer("buttons",arguments);var thisConfig=this;wp_e2._shareRender(element,thisConfig);if(element.find(".echo-streamserver-controls-stream-item-button-Edit").length>0)if(!plugin.methods._editVisible(item))element.find(".echo-streamserver-controls-stream-item-button-Edit").remove();else{if(item.itemsRefreshInterval)clearInterval(item.itemsRefreshInterval);
item.itemsRefreshInterval=setInterval(function(){plugin.methods._refreshItems(item)},3E4)}return element};plugin.component.renderers.inlineButtons=function(element){var item=this.component;this.parentRenderer("buttons",arguments);var thisConfig=this;wp_e2._shareRender(element,thisConfig);if(element.find(".echo-streamserver-controls-stream-item-button-Edit").length>0)if(!plugin.methods._editVisible(item))element.find(".echo-streamserver-controls-stream-item-button-Edit").remove();else{if(item.itemsRefreshInterval)clearInterval(item.itemsRefreshInterval);
item.itemsRefreshInterval=setInterval(function(){plugin.methods._refreshItems(item)},3E4)}return element};plugin.component.renderers.footer=function(element){var item=this.component;this.parentRenderer("footer",arguments);var thisButtons=item.view.get("buttons");element.find(".echo-streamserver-controls-stream-item-plugin-LikeCardUI-likesArea").insertAfter(thisButtons);return element};plugin.component.renderers.avatar=function(element){var item=this.component;var avatar=item.data.actor.avatar;avatar=
(avatar||"").replace("http://akiajc2strzaac3fwsta.post-avatars.s3.amazonaws.com","https://s3.amazonaws.com/akiajc2strzaac3fwsta.post-avatars").replace("http://","https://").replace("'",'"');item.data.actor.avatar=avatar;this.parentRenderer("avatar",arguments);var thisElm=element.find("div");var bkg=thisElm.css("background-image");if(bkg){bkg=bkg.split(",")[0];thisElm.css("background-image",bkg)}return element};plugin.methods._removeIgnoredComments=function(item,thisContainer){if(typeof thisContainer==
"undefined"||typeof item=="undefined")return;var ignoredUserTitle=item.data.actor.title;var ignoredElms=$(".echo-streamserver-controls-stream-item-authorName:contains('"+ignoredUserTitle+"')").closest(".echo-streamserver-controls-stream-item-container");$.each(ignoredElms,function(idx,elm){var thisElm=$(elm);if(thisElm.hasClass("echo-streamserver-controls-stream-item-container-root-thread")){thisElm.addClass("ignored-comment");thisElm.html('\x3cdiv class\x3d"ignored-comment"\x3eYou are ignoring a comment from '+
ignoredUserTitle+" that has these replies.\x3c/div\x3e")}else thisElm.closest(".echo-streamserver-controls-stream-item ").remove()})};plugin.methods._publishEventComplete=function(args){var item=this.component;this.events.publish({"topic":args.topic,"data":args.data})};plugin.methods._markerCheck=function(item,thisMarker){var markerSettings=wp_e2.markerSettings,voteSettings=wp_e2["voteSettings_"+thisMarker]||{},markerMatchCheck=false;$.map(item.data.object.markers||[],function(tag,item){if(tag.indexOf(markerSettings.modPrefix+
markerSettings.delimiter+voteSettings.flag)>=0||tag.indexOf(markerSettings.userPrefix+markerSettings.delimiter+voteSettings.flag)>=0)markerMatchCheck=true});return markerMatchCheck};plugin.methods._markNew=function(data){var thisDom=$(data.item.target);thisDom.mouseenter(function(event){thisDom.animate({"border-left-color":"#ffffff","border-left-width":"0"},800,function(){thisDom.removeClass("newComment");thisDom.unbind("mouseenter")})});thisDom.addClass("newComment")};plugin.methods._editVisible=
function(item){var timeLimit=wp_e2.editTime*60*1E3;var currDate=new Date;return wp_e2.allowEdit==true&&currDate-new Date(item.data.postedTime)<timeLimit};plugin.methods._IgnoreOmniture=function(){var debug=wp_e2.debug;var onIgnoreVars={};onIgnoreVars.eVar26="ignore - user";sendDataToOmniture("echo.ignorecomplete","event74",onIgnoreVars);onIgnoreVars.eVar26=""};plugin.methods._shareVisible=function(){var item=this.component;return item.data.target.id!=item.data.target.conversationID&&item.data.target.id==
item.data.object.context[0].uri};plugin.methods._ignoreVisible=function(item){if(typeof item=="undefined")item=this.component;var readerID=wp_e2&&wp_e2.echo_user&&wp_e2.echo_user.get("identityUrl");var staffComment=false;var markerArray=item.data.actor.markers||[];for(var x=0;x<markerArray.length;x++)if(markerArray[x].indexOf("staff")>=0||markerArray[x].indexOf("contrib")>=0)staffComment=true;return wp_e2.echo_user.is("logged")&&item.data.provider.name!="Arktan"&&item.data.provider.name!="jskit"&&
(readerID&&readerID!=item.data.actor.id)&&!staffComment};plugin.methods._refreshItems=function(item){if(!plugin.methods._editVisible(item)){item.view.render({"name":"buttons"});clearInterval(item.itemsRefreshInterval)}};plugin.methods._isVerifiedCommenter=function(thisContainer,item){var isVerifiedHere=false;if(wp_e2[thisContainer].includeverifiedcommenters==true)if(wp_e2[thisContainer].verifiedcommenteridlist&&wp_e2[thisContainer].verifiedcommenteridlist.userArray&&wp_e2[thisContainer].verifiedcommenteridlist.userArray[item.data.actor.id]&&
wp_e2[thisContainer].verifiedcommenteridlist.userArray[item.data.actor.id].verification_status==plugin.labels.verification_complete)isVerifiedHere=true;return isVerifiedHere};plugin.methods._processFlag=function(topic,data){var item=data.item,response=data.response,thisMarker=response.markers;var currMarker="",markerClass="",updatedMarkers=[],foundCounter=false;var markerSettings=wp_e2.markerSettings,voteSettings=wp_e2["voteSettings_"+thisMarker]||{};$.each(item.data.object.markers||[],function(index,
value){if(value.indexOf(markerSettings.counterPrefix+markerSettings.delimiter+thisMarker)==0){foundCounter=true;currMarker=value;var tempArray=value.split(markerSettings.delimiter);var tempCount=(parseInt(tempArray[2])||0)+1;updatedMarkers.push(markerSettings.counterPrefix+markerSettings.delimiter+thisMarker+markerSettings.delimiter+tempCount);if(tempCount>=voteSettings.threshold)updatedMarkers.push(markerSettings.votedPrefix+markerSettings.delimiter+thisMarker)}});if(foundCounter){var data='{"verb": "unmark","target": "'+
item.data.object.id+'","markers": "'+currMarker+'"}';$.ajax({"url":wp_e2.metaUrl,"data":{"appkey":wp_e2.appkey,"content":data,"sessionID":wp_e2.echo_user&&wp_e2.echo_user.get("sessionID","")},"dataType":"jsonp"})}else updatedMarkers.push(markerSettings.counterPrefix+markerSettings.delimiter+thisMarker+markerSettings.delimiter+"1");$.each(updatedMarkers||[],function(index,value){var data='{"verb": "mark","target": "'+item.data.object.id+'","markers": "'+value+'"}';$.ajax({"url":wp_e2.metaUrl,"data":{"appkey":wp_e2.appkey,
"content":data,"sessionID":wp_e2.echo_user&&wp_e2.echo_user.get("sessionID","")},"dataType":"jsonp"})})};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("TWP_Stream_Item_Top","Echo.StreamServer.Controls.Stream.Item");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){var self=this,item=this.component;var thisContainer=this.config.get("thisContainer");item.config.set("thisContainer",thisContainer)};plugin.config={"thisContainer":"#echo_container","showCollapsed":true,"includeShowConversation":true};plugin.component.renderers.content=function(element){var plugin=this,item=this.component,
itemId=plugin.config.get("itemId"),thisContainer=plugin.config.get("thisContainer");this.parentRenderer("content",arguments);if(plugin.config.get("includeShowConversation")!==false)if(item.data.parentUnique.indexOf(item.data.object.context[0].uri)<0&&item.depth==0)$(element).addClass("has-reply-conversation");return element};plugin.component.renderers.container=function(element){var plugin=this,item=this.component,itemId=plugin.config.get("itemId"),thisContainer=plugin.config.get("thisContainer");
this.parentRenderer("container",arguments);if(item.data.object.id==itemId)$(element).parent(".echo-streamserver-controls-stream-item-plugin-CardUIShim-wrapper").addClass("current-comment");if(plugin.config.get("includeShowConversation")!==false)if(item.data.parentUnique.indexOf(item.data.object.context[0].uri)<0&&item.depth==0){var tagValue=item.data.object.tags&&item.data.object.tags[0]&&item.data.object.tags[0].split("_")[1]?item.data.object.tags[0].split("_")[1]:"in reply to ";var replyToTag=' \x3cdiv class\x3d"replyto-link"\x3e'+
'\x3ca class\x3d"replyto" \x3e\x3cspan class\x3d"replyto-text"\x3eShow conversation\x3c/span\x3e'+"\x3c/a\x3e"+"\x3c/div\x3e";$(element).prepend(replyToTag);$(".replyto",$(element)).on("click",function(){plugin._loadReplyConversation(thisContainer,plugin,element,item.data.object.id)})}return element};plugin.component.renderers.authorName=function(element){var plugin=this,item=this.component,itemId=plugin.config.get("itemId"),thisContainer=plugin.config.get("thisContainer");this.parentRenderer("authorName",
arguments);if(item.data.object.id==itemId)$(element).parent(".echo-streamserver-controls-stream-item-plugin-CardUIShim-wrapper").addClass("current-comment");if(plugin.config.get("includeShowConversation")!==false)if(item.data.parentUnique.indexOf(item.data.object.context[0].uri)<0){var tagValue=item.data.object.tags&&item.data.object.tags[0]&&item.data.object.tags[0].split("_")[1]?item.data.object.tags[0].split("_")[1]:"in reply to ";var replyToTag=' \x3cdiv class\x3d"replyto-text"\x3e'+'\x3cspan class\x3d"fa fa-share"\x3e '+
tagValue+"\x3c/span\x3e"+"\x3c/div\x3e";$(element).append(replyToTag)}return element};plugin.component.renderers.subwrapper=function(element){var plugin=this,item=this.component,thisContainer=item.config.get("thisContainer");this.parentRenderer("subwrapper",arguments);if(plugin.config.get("showCollapsed")===false)return;var thisContent=item.view.get("content");if(item.depth==0&&item.children.length>0){if(!thisContent.hasClass("collapsed")&&!thisContent.hasClass("expanded"))thisContent.addClass("collapsible collapsed");
var thisWrapper=item.view.get("subwrapper");thisWrapper.append('\x3cdiv class\x3d"view-replies collapsed"\x3eSee Replies\x3cspan class\x3d"fa fa-chevron-down icon-chevron-down"\x3e\x3c/span\x3e\x3c/div\x3e');thisWrapper.append('\x3cdiv class\x3d"view-replies expanded"\x3eHide Replies\x3cspan class\x3d"fa fa-chevron-up icon-chevron-up"\x3e\x3c/span\x3e\x3c/div\x3e');$(".view-replies",thisWrapper).on("click",function(){if($(this).hasClass("collapsed"))$(this).closest(".echo-streamserver-controls-stream-item-content.collapsible").addClass("expanded").removeClass("collapsed");
else $(this).closest(".echo-streamserver-controls-stream-item-content.collapsible").addClass("collapsed").removeClass("expanded")})}};plugin.methods._loadReplyConversation=function(thisContainer,plugin,element,itemId){var item=plugin.component;var thisContainer=plugin.config.get("thisContainer");var replyConversationTemplate='\x3cdiv class\x3d"reply-conversation expanded" style\x3d"display:none;"\x3e'+'\x3cdiv class\x3d"reply-conversation-buffer"\x3e\x3c/div\x3e'+'\x3cdiv class\x3d"reply-conversation-close"\x3eHide conversation\x3c/div\x3e'+
'\x3cdiv class\x3d"reply-conversation-container"\x3e\x3c/div\x3e'+"\x3c/div\x3e";var $replyConversation=$(replyConversationTemplate);var pluginArray=[];pluginArray=pluginArray.concat([{"name":"Like"},{"name":"CommunityFlagCardUI","showUserList":false},{"name":"CardUIShim","collapsedContentHeight":280,"labels":{"seeMore":"See More"}}]);pluginArray=pluginArray.concat(wp_e2[thisContainer].plugins.streamPluginArray);pluginArray=pluginArray.concat([{"name":"TWP_Stream_Item_Top","thisContainer":thisContainer,
"showCollapsed":false,"itemId":itemId,"includeShowConversation":false}]);var streamConfig=$.extend({},wp_e2[thisContainer].streamSettings,wp_e2[thisContainer].streamSettings.top,{"target":$replyConversation.find(".reply-conversation-container"),"query":wp_e2.getQuery(wp_e2[thisContainer].guid,thisContainer,item.data.targets[0].id,wp_e2[thisContainer].verifiedcommenteridlist.idlist,"top"),"apiBaseURL":wp_e2.apiBaseURL+"/v1/","plugins":pluginArray,"state":{"label":{"icon":false,"text":false}}});var replyStream=
new Echo.StreamServer.Controls.Stream(streamConfig);var eventInfo={"replyStream":replyStream,"thisContainer":thisContainer,"element":element};$replyConversation.find(".reply-conversation-close").on("click",eventInfo,function(event){$(this).parent(".reply-conversation.expanded").slideUp("fast",function(){event.data.element.parents(".echo-streamserver-controls-stream-item-content").slideDown("slow");event.data.replyStream.destroy();$(this).remove()})});$(element).parents(".echo-streamserver-controls-stream-item-content").slideUp("slow",
function(){$(element).parents(".echo-streamserver-controls-stream-item").prepend($replyConversation);$replyConversation.slideDown("slow")})};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function(jQuery){var $=jQuery;var plugin=Echo.Plugin.manifest("TWP_My_Comments","Echo.StreamServer.Controls.Stream.Item");if(Echo.Plugin.isDefined(plugin))return;plugin.init=function(){var self=this,item=this.component;var thisContainer=this.config.get("thisContainer");this.extendTemplate("insertBefore","buttons",plugin.templates.accumulators);item.config.set("thisContainer",thisContainer)};plugin.config={"thisContainer":"#echo_container","includeshare":true,"ignoreuser":true,"zebraCount":0};plugin.labels=
{"share":"Share"};plugin.events={"Echo.StreamServer.Controls.Stream.Item.onAdd":function(topic,data){},"Echo.StreamServer.Controls.Stream.Item.onButtonClick":function(topic,data){},"Echo.UserSession.onInit":function(topic,data){}};plugin.templates.accumulators=function(){return'\x3cdiv class\x3d"echo-flag-container" style\x3d"display:inline;"\x3e'+'\x3cdiv class\x3d"{plugin.class:likesIndicator}"\x3e\x3c/div\x3e'+'\x3cdiv class\x3d"{plugin.class:childrenIndicator}"\x3e\x3c/div\x3e'+"\x3c/div\x3e"};
plugin.component.renderers.avatar=function(element){$(element).remove()};plugin.component.renderers.authorName=function(element){var item=this.component;this.parentRenderer("authorName",arguments);if(item.data.actor.title==wp_e2.echo_user.get("username"))$(element).html("Me");if(item.depth===0)$(element).remove()};plugin.component.renderers.buttons=function(element){var item=this.component;this.parentRenderer("buttons",arguments);var thisConfig=this;wp_e2._shareRender(element,thisConfig);if(element.find(".echo-streamserver-controls-stream-item-button-Edit").length>
0)if(!plugin.methods._editVisible(item))element.find(".echo-streamserver-controls-stream-item-button-Edit").remove();else{if(item.itemsRefreshInterval)clearInterval(item.itemsRefreshInterval);item.itemsRefreshInterval=setInterval(function(){plugin.methods._refreshItems(item)},3E4)}return element};plugin.component.renderers.children=function(element){var item=this.component;this.parentRenderer("children",arguments);if(!TWP.isSignedIn()||TWP.isSignedIn()&&wapoIdentity&&!wapoIdentity.isMemberOfCommentingGroup())jQuery(item.view.get("plugin-Reply-replyForm")).find("echo-streamserver-controls-submit-body").remove()};
plugin.component.renderers.expandChildrenLabel=function(element){var item=this.component;this.parentRenderer("expandChildrenLabel",arguments);var repliesCount=item.data.object.accumulators.repliesCount;if(repliesCount>0)element.css("display","none")};plugin.renderers.childrenIndicator=function(element){var item=this.component;if(!item.data.object.accumulators.repliesCount){element.remove();return}var repliesCount=item.data.object.accumulators.repliesCount;if(repliesCount>0){var self=item;var extra=
extra||{};extra.state=extra.state||"regular";var states={"loading":{"css":"echo-item-message-loading","label":"loading"},"regular":{"css":"echo-linkColor echo-message-icon","label":"childrenMoreItems"}};element.html(repliesCount+(repliesCount>1?" Replies":" Reply"));element.html('\x3ca href\x3d"javascript:void();"\x3e'+repliesCount+(repliesCount>1?" Replies \x3cspan class\x3d'children-arrow'\x3e\x26#9660;\x3c/span\x3e":" Reply \x3cspan class\x3d'children-arrow'\x3e\x26#9660;\x3c/span\x3e\x3c/a\x3e"));
element.addClass("closed").removeClass("open");element.find(".children-arrow").html("\x26#9660;");element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-children").hide();element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-expandChildren").hide();element.bind("click",function(event){event.stopPropagation();if(element.hasClass("open")){element.addClass("closed").removeClass("open");
element.find(".children-arrow").html("\x26#9660;");element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-children").hide();element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-expandChildren").hide()}else if(element.hasClass("closed")){element.addClass("open").removeClass("closed");element.find(".children-arrow").html("\x26#9650;");element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-children").show();
element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-expandChildren").show();element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-expandChildrenLabel").show();element.closest(".echo-streamserver-controls-stream-item-content").find(".echo-streamserver-controls-stream-item-expandChildrenLabel.echo-streamserver-controls-stream-item-message-loading").hide()}})}else element.remove()};
plugin.renderers.likesIndicator=function(element){var plugin=this,item=this.component;if(!item.data.object.accumulators.likesCount){element.remove();return}var likesCount=item.data.object.accumulators.likesCount;if(likesCount>0){element.css("display","block");element.html(likesCount+(likesCount>1?" Likes":" Like"))}else element.remove()};plugin.component.renderers.container=function(element){var item=this.component;if(item.depth==1)element.find(".echo-item-footer").prepend('\x3cdiv class\x3d"echo-item-authorname"\x3e'+
item.data.actor.title+"\x3c/div\x3e responded on ")};plugin.component.renderers.content=function(element){var item=this.component;this.parentRenderer("content",arguments)};plugin.component.renderers.date=function(element){var item=this.component;this.parentRenderer("date",arguments);var thisContainer=item.config.get("thisContainer");var markers=typeof item.data.object.markers!="undefined"?item.data.object.markers.join():"";var currDate=new Date;currDate.setISO8601(item.data.object.published);var currDateFmt=
currDate.format("h:MM TT Z");var prevDateFmt=currDate.format("m/d/yyyy h:MM TT Z");var isPhoto=typeof item.data.object.markers!="undefined"&&markers.indexOf("photo")>=0;if(wp_e2[thisContainer].includepermalink&&!isPhoto&&(item.data.target.id!=item.data.target.conversationID&&item.data.target.id==item.data.object.context[0].uri)){var thisCommentURL=item.data.object.id;thisCommentURL=thisCommentURL.replace("http://","").replace("https://","");var thisCommentPermalink=item.data.object.context[0].uri;
var currDatePermalink='\x3ca href\x3d"'+thisCommentPermalink+"?outputType\x3dcomment\x26commentID\x3d"+thisCommentURL+'"\x3e'+currDateFmt+"\x3c/a\x3e";var prevDatePermalink='\x3ca href\x3d"'+thisCommentPermalink+"?outputType\x3dcomment\x26commentID\x3d"+thisCommentURL+'"\x3e'+prevDateFmt+"\x3c/a\x3e";currDate.format("m/d/yyyy")==(new Date).format("m/d/yyyy")?$(element).html(currDatePermalink):$(element).html(prevDatePermalink)}else currDate.format("m/d/yyyy")==(new Date).format("m/d/yyyy")?$(element).html(currDateFmt):
$(element).html(prevDateFmt);this.component.view.get("data").after(element);element.after(this.component.view.get("re"));return element};plugin.component.renderers.re=function(element){var item=this.component;var thisElm=this.parentRenderer("re",arguments);if(typeof thisElm!="undefined")if(item.data.parentUnique.indexOf(item.data.object.context[0].uri)<0){var thisCommentURL=item.data.target.id;thisCommentURL=thisCommentURL.replace("http://","").replace("https://","");var thisCommentPermalink=item.data.object.context[0].uri;
thisElm.html(" in reply to "+'\x3cdiv class\x3d"echo-streamserver-controls-stream-item-re-container"\x3e\x3ca href\x3d"'+thisCommentPermalink+"?outputType\x3dcomment\x26commentID\x3d"+thisCommentURL+'"\x3ethis comment\x3c/a\x3e\x3c/div\x3e')}else thisElm.html(" on "+'\x3ca href\x3d"'+item.data.object.context[0].uri+'"\x3e'+"this article"+"\x3c/a");return element};plugin.component.renderers.text=function(element){var item=this.component;this.parentRenderer("text",arguments);element.find(".echo-item-photo img").each(function(idx,
elm){var img=$(elm);img.attr("src",img.attr("data-src-preview"));element.find(".echo-item-files").append('\x3cdiv class\x3d"photo-caption"\x3e'+img.attr("alt")+"\x3c/div\x3e");var photo=element.find(".echo-item-photo");photo.attr("rel","#simple-overlay");photo.attr("href",img.attr("data-src-web"));photo.find("a").remove();photo.append(img)})};plugin.methods._assembleButton=function(name){var plugin=this,item=this.component;switch(name){case "share":return function(){var item=this;return{"name":name,
"label":plugin.labels.get(name),"visible":plugin._shareVisible()}};break}};plugin.methods._editVisible=function(item){var timeLimit=wp_e2.editTime*60*1E3;var currDate=new Date;return wp_e2.allowEdit==true&&currDate-new Date(item.data.postedTime)<timeLimit};plugin.methods._shareVisible=function(){var item=this.component;return item.data.target.id!=item.data.target.conversationID};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function($){var plugin=Echo.Plugin.manifest("TWP_Conversations_App","Echo.Apps.Conversations");plugin.init=function(){var self=this,app=this.component;var thisContainer=this.config.get("thisContainer");app.config.set("thisContainer",thisContainer);Echo.Labels.set({"live":"Pause live updates","paused":"Resume live updates"},"Echo.Apps.Conversations")};plugin.config={"thisContainer":"#echo_container","pauseOnReply":true};plugin.events={"Echo.Apps.Conversations.onRender":function(topic,data){var plugin=
this.component;var container=plugin.view.get("container")},"Echo.StreamServer.Controls.Stream.Item.Plugins.ReplyCardUI.onExpand":function(topic,args){try{data.savedStreamingState=this.component.get("streamingState");this.component.setStreamingState("paused")}catch(err){}},"Echo.StreamServer.Controls.Stream.Item.Plugins.ReplyCardUI.onCollapse":function(topic,args){try{data.savedStreamingState?this.component.setStreamingState(data.savedStreamingState):""}catch(err){}},"Echo.StreamServer.Controls.Submit.onReady":function(topic,
args){try{if($(args.target).hasClass("echo-streamserver-controls-submit-plugin-Edit")){data.savedStreamingState=this.component.get("streamingState");this.component.setStreamingState("paused")}}catch(err){}},"Echo.StreamServer.Controls.Submit.Plugins.Edit.onEditError":function(topic,args){try{data.savedStreamingState?this.component.setStreamingState(data.savedStreamingState):""}catch(err){}},"Echo.StreamServer.Controls.Submit.Plugins.Edit.onEditComplete":function(topic,args){try{data.savedStreamingState?
this.component.setStreamingState(data.savedStreamingState):""}catch(err){}}};plugin.component.renderers.container=function(element){var self=this,plugin=this.component;this.parentRenderer("postComposer",arguments);var thisContainer=this.component.config.get("thisContainer");if(wp_e2[thisContainer].includeverifiedcommenters===true)$(element).addClass("verified-commenters");element.off("TWP.Comments.RequestRefresh");element.on("TWP.Comments.RequestRefresh",function(event,data){try{event.stopPropagation();
event.stopImmediatePropagation();wp_e2[thisContainer].guid=data.url;wp_e2[thisContainer].allow_comments=data.allow_comments||true;var $elm=$("#"+thisContainer);wp_e2._getNotes($elm);wp_e2.renderCommentCount($elm);var allPosts=plugin.getComponent("allPosts");if(typeof allPosts!="undefined")allPosts.destroy();var topPosts=plugin.getComponent("topPosts");if(typeof topPosts!="undefined")topPosts.destroy();var postComposerConfig=plugin.config.get("postComposer");postComposerConfig.visible=wp_e2[thisContainer].allow_comments;
var query;query=plugin.config.get("allPosts").queryOverride;plugin.config.get("allPosts").queryOverride=data.query?data.query:wp_e2.getQuery(data.url);plugin.config.get("allPosts").label=data.label;plugin.config.set("targetURL",data.url);plugin.config.remove("data");plugin.refresh();jQuery(window.document).trigger("TWP.Comments.RefreshComplete")}catch(e){}})};plugin.component.renderers.postComposer=function(element){this.parentRenderer("postComposer",arguments);var thisContainer=this.component.config.get("thisContainer");
if(wp_e2[thisContainer].allow_comments!=true&&!$("#"+thisContainer).hasClass("permalink")){var expiredCommentsMessage=$('\x3cdiv class\x3d"echo-closed-notification"\x3e\x3cspan\x3eComments are now closed. All comments sections close '+wp_e2[thisContainer].comments_period+' days after the story has published. For more details, please see our \x3ca target\x3d"_blank" href\x3d"https://www.washingtonpost.com/news/ask-the-post/discussion-and-submission-guidelines/"\x3eour discussion guidelines   \x3cspan class\x3d"fa fa-chevron-circle-right"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e');
var disabledCommentsMessage=$('\x3cdiv class\x3d"echo-closed-notification"\x3e\x3cspan\x3eComments are now closed. We turn off the comments on stories dealing with personal loss, tragedies or other sensitive topics. For more details, please see our \x3ca target\x3d"_blank" href\x3d"https://www.washingtonpost.com/news/ask-the-post/discussion-and-submission-guidelines/"\x3eour discussion guidelines \x3cspan class\x3d"fa fa-chevron-circle-right"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/span\x3e\x3c/div\x3e');
if(wp_e2[thisContainer].comments_period_expired===true)$(element).prepend(expiredCommentsMessage);else $(element).prepend(disabledCommentsMessage)}return element};plugin.component.renderers.streamingStateContainer=function(element){var thisContainer=this.component.config.get("thisContainer");if(wp_e2[thisContainer].includepause!==true){$(element).remove();return}this.parentRenderer("streamingStateContainer",arguments);return element};plugin.component.renderers.streamingState=function(element){var thisContainer=
this.component.config.get("thisContainer");if(wp_e2[thisContainer].includepause!==true){$(element).remove();return}this.parentRenderer("streamingState",arguments);if(this.component.get("streamingState")=="live")element.append('\x3cspan class\x3d"fa fa-pause"\x3e\x3c/span\x3e');else element.append('\x3cspan class\x3d"fa fa-play"\x3e\x3c/span\x3e');return element};plugin.component.renderers.topPostsHeader=function(element){this.parentRenderer("topPostsHeader",arguments)};plugin.component.renderers.allPostsContainer=
function(element){this.parentRenderer("allPostsContainer",arguments);var thisContainer=this.component.config.get("thisContainer");return element};plugin.component.renderers.streamHeader=function(element){this.parentRenderer("streamHeader",arguments);var thisContainer=this.component.config.get("thisContainer");return element};plugin.component.renderers._tabs=function(element){this.parentRenderer("_tabs",arguments);var thisContainer=this.component.config.get("thisContainer");if(wp_e2[thisContainer].includevoteofftopic===
true){var thisMarker="flag-offtopic",actionTarget=$(element).find("ul.echo-apps-conversations-tabs");var voteSettings=wp_e2["voteSettings_"+thisMarker]||{},offtopicCookie=wp_e2._getCookie(voteSettings.cookie);if($("#"+thisContainer+" .control-"+thisMarker).length==0){if(offtopicCookie=="hiding")$("#"+thisContainer+" .echo-streamserver-controls-stream").addClass(voteSettings.markClass+"-hidden");actionTarget.append('\x3cli class\x3d"pull-right"\x3e\x3cdiv class\x3d"control-'+thisMarker+'"\x3e'+'\x3cspan class\x3d"comment-'+
voteSettings.markClass+"-state "+offtopicCookie+'"\x3e'+(offtopicCookie=="hiding"?voteSettings.controlTextHiding:voteSettings.controlTextShowing)+"\x3c/span\x3e\x3c/div\x3e\x3c/li\x3e");actionTarget.find(".comment-"+voteSettings.markClass+"-state").bind("click",function(event){event.stopPropagation();var thisTarget=$(event.target);thisContainer=$(this).closest(".echo_container").attr("id");if(thisTarget.hasClass("hiding")){thisTarget.removeClass("hiding").html(voteSettings.controlTextShowing);$("#"+
thisContainer+" .echo-streamserver-controls-stream").removeClass(voteSettings.markClass+"-hidden");var cookieOptions={expires:-1,domain:"."+window.document.domain,path:"/"};wp_e2._setCookie(voteSettings.cookie,null,cookieOptions)}else{thisTarget.addClass("hiding").html(voteSettings.controlTextHiding);$("#"+thisContainer+" .echo-streamserver-controls-stream").addClass(voteSettings.markClass+"-hidden");var cookieOptions={domain:"."+window.document.domain,path:"/"};wp_e2._setCookie(voteSettings.cookie,
"hiding",cookieOptions)}})}}var infoCircle=$('\x3cspan id\x3d"featuredPosts-info-button"\x3e\x3c/span\x3e');infoCircle.append($(' \x3ci class\x3d"fa fa-question-circle"\x3e\x3c/i\x3e'));infoCircle.on("mouseenter mouseleave",function(event){if(event.type=="mouseenter"){var infoControl=$("#comment-featuredposts-container").clone().hide();$(".echo-apps-conversations-tabs").append(infoControl);infoControl.show()}else if(event.type=="mouseleave"){var infoControl=$(".echo-apps-conversations-tabs").find("#comment-featuredposts-container");
infoControl.hide().remove()}});$(element).find(".nav-item.featuredPosts .echo-apps-conversations-streamCaption").append(infoCircle);return element};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function($){var plugin=Echo.Plugin.manifest("PageVisibilityDetector","Echo.StreamServer.Controls.Stream");if(Echo.Plugin.isDefined(plugin))return;plugin.events={"Echo.Control.onDestroy":function(){clearInterval(this.component.itemsRefreshInterval)},"Echo.StreamServer.Controls.Stream.onReady":function(){var self=this,stream=this.component,hideTS;this._reactOnPageVisibilityChanges(function(){var curTS=self._getTS();if(curTS-hideTS<2*60)stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.start();
else{clearInterval(stream.itemsRefreshInterval);stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.start(true)}},function(){hideTS=self._getTS();stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.stop()})}};plugin.methods._getTS=function(){return Math.round((new Date).valueOf()/1E3)};plugin.methods._reactOnPageVisibilityChanges=function(onShow,onHide){var self=this;var visProp=this._getHiddenProp();if(visProp){var evtname=visProp.replace(/[H|h]idden/,
"")+"visibilitychange";document.addEventListener(evtname,function(){if(self._isHidden())onHide();else onShow()})}};plugin.methods._getHiddenProp=function(){var prefixes=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var i=0;i<prefixes.length;i++)if(prefixes[i]+"Hidden"in document)return prefixes[i]+"Hidden";return null};plugin.methods._isHidden=function(){var prop=this._getHiddenProp();return prop?document[prop]:false};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function($){var plugin=Echo.Plugin.manifest("PageVisibilityDetectorCount","Echo.StreamServer.Controls.Counter");if(Echo.Plugin.isDefined(plugin))return;plugin.events={"Echo.Control.onDestroy":function(){clearInterval(this.component.itemsRefreshInterval)},"Echo.StreamServer.Controls.Counter.onRender":function(){var self=this,stream=this.component,hideTS;this._reactOnPageVisibilityChanges(function(){var curTS=self._getTS();if(curTS-hideTS<2*60)stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.start();
else{clearInterval(stream.itemsRefreshInterval);stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.start()}},function(){hideTS=self._getTS();stream&&stream.request&&stream.request.liveUpdates&&stream.request.liveUpdates.stop()})}};plugin.methods._getTS=function(){return Math.round((new Date).valueOf()/1E3)};plugin.methods._reactOnPageVisibilityChanges=function(onShow,onHide){var self=this;var visProp=this._getHiddenProp();if(visProp){var evtname=visProp.replace(/[H|h]idden/,
"")+"visibilitychange";document.addEventListener(evtname,function(){if(self._isHidden())onHide();else onShow()})}};plugin.methods._getHiddenProp=function(){var prefixes=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var i=0;i<prefixes.length;i++)if(prefixes[i]+"Hidden"in document)return prefixes[i]+"Hidden";return null};plugin.methods._isHidden=function(){var prop=this._getHiddenProp();return prop?document[prop]:false};Echo.Plugin.create(plugin)})(Echo.jQuery);
(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("TWP_Share", "Echo.StreamServer.Controls.Submit");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {

    var item = this.component;
    var thisContainer =   this.config.get("thisContainer");
    item.config.set("thisContainer",thisContainer);
    if (thisContainer && wp_e2[thisContainer].includeshare && item.config.get("intentID") != "Reply" && typeof FB == 'object') {
        this.extendTemplate("insertBefore", "postButton", plugin.templates.share);
    };

    };

plugin.config = {
        "thisContainer": "#echo_container",
        "includeshare": false
};

plugin.templates.share = function() {
    if (wp_e2 && wp_e2.echo_user && wp_e2.echo_user.is("logged") && $('#ugc-photo-gallery').length == 0){
        return '<div class="echo_share-text"><p>Sharing Off</p></div>' +
        '<div class="echo_share-fb-button {plugin.class:share}" id="social-share-fb"><div class="share-click-div"><div class="fa-facebook"></div></div></div>';
    } else {
        return '';
    }
};

plugin.events = {
        "Echo.StreamServer.Controls.Submit.onPostComplete": function(topic, args) {
               var thisContainer = $(args.target).closest('.echo_container').attr('id');

                if( $('#'+thisContainer + ' .echo_share-fb-button.active').length > 0 && !args.inReplyTo){
                    if (typeof window.FB == 'object') {
                        var obj = {
                          method: 'feed',
                          link: wp_e2[thisContainer].guid,
                          name: document.title,
                          picture: (typeof $("meta[property=og\\:image]").attr("content") != "undefined")?$("meta[property=og\\:image]").attr("content"):'',
                          caption: 'I just commented on washingtonpost.com: ',
                          description: '"' + args.postData.content[0].object.content + '"'
                        };
                        if (wp_e2[thisContainer].display_ugc_photos === true) {
                            obj.caption = $(args.postData.content[0].object.content).find('img').attr('alt');
                            obj.description = '';
                        }
                        plugin.config.fb_callback_container = thisContainer;
                        FB.ui(obj, plugin.methods._FBCallback);
                    }
                }
        },
        "Echo.StreamServer.Controls.Submit.onRender": function(topic, args) {

        },
        "Echo.StreamServer.Controls.Submit.onRerender": function(topic, args) {

        }
    };

plugin.renderers.share = function (element){
    var plugin = this, stream = plugin.component;
    element.click(function(event) {
        var shareClickDiv = $('.share-click-div',element);
        if (shareClickDiv.hasClass('active')) {
            element.removeClass('active');
            shareClickDiv.removeClass('active');
            element.parent().find('.echo_share-text').empty().html('<p>Sharing Off</p>');
        } else {
            element.addClass('active');
            shareClickDiv.addClass('active');
            element.parent().find('.echo_share-text').empty().html('<p>Sharing On</p>');
        }
    });
}

plugin.methods._FBCallback = function(){
    var onPostCompleteVars = {}, thisContainer = plugin.config.fb_callback_container;
    onPostCompleteVars.eVar26 = (wp_e2[thisContainer].display_ugc_photos === true)?"submit - ugc":"submit - comments";
    sendDataToOmniture('echo.fbsharecomplete','event29',onPostCompleteVars);
    debug && window.console && console.log && console.log('[' + (new Date()-TWP_Debug.initialTime)/1000 + ']' + 'echo2/v2/core/twp_comments_echo2.js - Post COmplete: omniture event3');
    onPostCompleteVars.eVar26 = '';
    plugin.config.fb_callback_container = null;
}
Echo.Plugin.create(plugin);


})(Echo.jQuery);

/* */

(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("TWP_formAuth", "Echo.StreamServer.Controls.CardUIAuth");

plugin.init = function() {
    var self = this, item = this.component;
    var thisContainer =  this.config.get("thisContainer");
    item.config.set("thisContainer",thisContainer);
};

plugin.labels = {
    "viewProfile": "View Profile",
    "viewMyComments": "View My Comments",
    "ignoreUsers": "Stop Ignoring Users",
    "logout": "Sign Out",
    "login": "Sign In",
    //"anonUserMessage":'<span>You must be signed in to comment.  <a href="' + wp_e2.logInURL + window.location.href + '">Sign In</a>'
    //                  + ' or <a href="' + wp_e2.registerURL + window.location.href + '">Register</a></span>',
    //"anonUserMessage":'<span>You must be signed in to comment.  <a class="signin" href="">Sign In</a>'
    //                    + ' or <a class="register" href="">Register</a></span>',
    "anonUserMessage":'<div class="account-error"><a class="signin" href="">Please Sign In to Comment</a></div>',
    "notCommenterUserMessage":'<div class="account-error">Your profile is incomplete. Please <a class="verify" href="">update it in order to comment</a>.</div>',
    "notOkUserMessage":'<div class="account-error">We\’re having trouble connecting to your account. Please <a class="logout" href="">log out</a> and log in again.</div>'
};

plugin.config = {
        "dropdownEntries":[{
            "visible": true,
            "title": plugin.labels["viewProfile"],
            "handler": function() {
                window.location.href = wp_e2.profileURL + encodeURIComponent((window.location.href.split('?')[0])) + '&commenting=1';
            }
        },
            {
                "visible": true,
                "title": plugin.labels["viewMyComments"],
                "handler": function() {
                    window.location.href = "http://" + window.location.hostname + "/mycomments";
                }
            },
            {
                "visible": true,
                "title": plugin.labels["ignoreUsers"],
                "handler": function() {
                    window.location.href = "http://" + window.location.hostname + "/mycomments#myignoredusers";
                }
            },
            {
            "visible": true,
            "title": plugin.labels["logout"],
            "handler": function() {
                Backplane.resetCookieChannel();
                window.location.href = TWP.signin.logouturl_page;
            }
        }]
};

plugin.component.renderers.userAnonymous = function(element) {
    var plugin = this, component = this.component;
    this.parentRenderer("userAnonymous", arguments);
    this.component.view.get("or").hide();
    this.component.view.get("signup").hide();
    this.component.view.get("login").remove();

    if (wp_e2._userHasCookies() == "some") {
          //console.log("CASE 3: user account NOT ok, Anonymous user");
          element.prepend(plugin.labels.get("notOkUserMessage"));
    } else { 
      if (wp_e2._isUserSynced() ) {
          if (TWP.isSignedIn() && wapoIdentity && !wapoIdentity.isMemberOfCommentingGroup()) {
              //console.log("CASE 4: user account ok, not a member of commenting group");
              element.prepend(plugin.labels.get("notCommenterUserMessage"));
          } else {
              //console.log("CASE 5: not signed in");
              element.prepend(plugin.labels.get("anonUserMessage"));
          }
      }         
    }
    element.on("click","a",function(event){
    var thisTarget = $(event.target);
    if (thisTarget.hasClass("signin")) {
        window.location.href = wp_e2.logInURL + encodeURIComponent(window.location.href);
        return false;
    }
    if (thisTarget.hasClass("register")) {
           window.location.href = wp_e2.registerURL + encodeURIComponent(window.location.href);
           return false;
    }
    if (thisTarget.hasClass("verify")) {
           window.location.href = wp_e2.profileURL +  encodeURIComponent((window.location.href.split('?')[0])) + '&commenting=1';
           return false;
    }
    if (thisTarget.hasClass("logout")) {
           window.location.href = wp_e2.logOutURL +  encodeURIComponent((window.location.href.split('?')[0])) + '&commenting=1';
           return false;
    }          
  });
};

plugin.component.renderers.name = function(element) {
    var self = this, component = this.component;
    this.parentRenderer("name", arguments);
    var template = '<span class="{class:dropdown}"></span>';
    var entries = this.config.get("dropdownEntries");

    new Echo.GUI.Dropdown({
        "target": element,
        "title": component.user.get("name", "") + self.substitute({"template": template}),
        "extraClass": "nav",
        "entries": $.grep(entries, function(entry) {
            return !!entry.visible;
        })
    });
    element.find('.echo-streamserver-controls-carduiauth-dropdown').addClass("caret")
    return element;
};

plugin.component.renderers.via = function(element){
    element.remove();
};

plugin.component.renderers.userLogged = function(element){
    var self = this, component = this.component;
    this.parentRenderer("userLogged", arguments);
    element.find('.echo-clear').remove();     
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
    "use strict";

    var $ = jQuery;

    /**
     * @class Echo.StreamServer.Controls.Submit.Plugins.TextCounter
     * Adds the character counter under the text field in the Echo Submit control.
     * Allows to set the maximum length of the text to enter.
     *
     *  new Echo.StreamServer.Controls.Submit({
     *      "target": document.getElementById("echo-submit"),
     *      "appkey": "echo.jssdk.demo.aboutecho.com",
     *      "plugins": [{
     *          "name": "TextCounter"
     *      }]
     *  });
     *
     * More information regarding the plugins installation can be found
     * in the [How to initialize Echo component](#!/guide/how_to_initialize_components-section-2) guide.
     *
     * @extends Echo.Plugin
     *
     * @package streamserver/plugins.pack.js
     * @package streamserver.pack.js
     */
    var plugin = Echo.Plugin.manifest("TextCounter", "Echo.StreamServer.Controls.Submit");

    if (Echo.Plugin.isDefined(plugin)) return;

    /**
     * @cfg {Number} limit
     * Specifies the maximum length of the text.
     * There is no limit if it is not defined.
     */
    /**
     * @cfg {String} label
     * Specifies the custom label for the counter. Parameter string is
     * a template that has several placeholders. A placeholder is a
     * word wrapped in curly brackets. It supports the following
     * list of placeholder words:
     *
     * + limit - The number from the limit parameter.
     * + typed - The number of characters currently typed in the text field.
     * + left - The number of characters left (limit - typed).
     *
     * Default parameter value is:
     *
     * + "{typed}/{limit} characters" if limit parameter is provided
     * + "{typed} characters" if limit parameter is not provided
     */
    plugin.init = function() {
        this.extendTemplate("insertAfter", "postContainer", plugin.templates.counter);
    };

    plugin.events = {
        "Echo.StreamServer.Controls.Submit.onPostComplete": function(topic, args) {
            this.view.render({"name": "counterLabel"});
        }
    };

    plugin.labels = {
        /**
         * @echo_label
         * Label to show in the counter if maximum character limit is provided
         */
        "limited": "{typed}/{left}",
        /**
         * @echo_label
         * Label to show in the counter if no character limit is provided
         */
        "unlimited": "{typed}"
    };

    /**
     * @echo_template
     */
    plugin.templates.counter =
         '<div class="{plugin.class:counterLabel} echo-primaryFont echo-primaryColor"></div><div class="controls-divider"><div class="controls-inner-divider"></div></div>';

    /**
     * @echo_renderer
     */
    plugin.component.renderers.text = function(element) {
        var plugin = this;
        plugin.parentRenderer("text", arguments);
        var limit = plugin.config.get("limit", 0);
        var handler = function() {
            if (limit) {
                var text = element.val();
                if (text.length <= limit) {
                    plugin.set("text", text);
                } else if (text.length > limit) {
                    element.val(plugin.get("text"));
                    return;
                }
            }
            plugin.view.render({"name": "counterLabel"});
        };
        return element.on("blur focus keyup keypress", handler);
    };

    /**
     * @echo_renderer
     */
    plugin.renderers.counterLabel = function(element) {
        var plugin = this, submit = this.component;
        var limit = plugin.config.get("limit", 0);
        var typed = (submit.view.get("text") && submit.view.get("text").val())?submit.view.get("text").val().length:0;
        var label = plugin.labels.get(
            plugin.config.get("label", limit ? "limited" : "unlimited"),
            {
                "typed": typed,
                "left": Math.max(limit - typed, 0),
                "limit": limit
            }
        );
        return element.text(label);
    };


    Echo.Plugin.create(plugin);

    })(Echo.jQuery);

(function(jQuery) {
    "use strict";

    var $ = jQuery;

    var plugin = Echo.Plugin.manifest("TWP_Submit", "Echo.StreamServer.Controls.Submit");

    if (Echo.Plugin.isDefined(plugin)) return;

    plugin.init = function() {
        var self = this, submit = this.component;
        var thisContainer =  this.config.get("thisContainer");
        submit.config.set("thisContainer",thisContainer);

        if (thisContainer && wp_e2[thisContainer].includevoteofftopic) {
            this.extendTemplate("insertAsFirstChild", "controls", plugin.templates.usermarkOfftopic);
        }

        if (thisContainer && wp_e2[thisContainer].pollincluded) {
            this.extendTemplate("insertAsFirstChild", "controls", plugin.templates.polls);

        }

        submit.addPostValidator(function() {

        });

    };

    plugin.config = {
            "thisContainer": "#echo_container",
            "includeshare": false,
            "overlayConfig":{
                  mask: {
                      color: '#000000',
                      loadSpeed: 200,
                      opacity: 0.50
                  },
                  top: '10%',
                  left: 'center',
                  closeOnClick: true,
                  closeOnEsc: true,
                  onBeforeLoad: function(){
                       $(this.getTrigger().attr("rel")).find("iframe").attr('src',this.getTrigger().attr("href"));

                  }
                },
            "verification_status": {
                "display_warning": false,
                "notCommenterUserWarning":'<div class="echo-feature-notification">Your profile is incomplete. Please  <a class="verify" href="' + wp_e2.profileURL + (window.location.href.split('?')[0]) + '&commenting=1">update it in order to comment.</a>.<div class="echo-close"></div></div>',
                "verified_commenter_cookie": "commenting_verified"
                }
    };

    plugin.labels = {
            "usermark_offtopic_text": "Off-topic",
            "usermark_offtopic_value": "user__flag-offtopic",
            "marker_photo": "photo",
            "marker_video": "video",
            "marker_link": "link",
            "poll_no_answer": "You haven't answered yet",
            "poll_answer_prefix": "You picked: ",
            "poll_marker_prefix": "poll_answer_",
            "notOkUserMessage": '<div class="account-error">We\’re having trouble connecting to your account. Please <a class="logout" href="">log out</a> and log in again.</div>',
            "notConnectedUserMessage": '<div class="account-error">Please wait a few moments while we connect to your account, or reload the page to retry.</div>'
    };

    plugin.templates.usermarkOfftopic = function() {
        if (wp_e2 && wp_e2.echo_user && wp_e2.echo_user.is("logged") &&
            $('#ugc-photo-gallery').length == 0 &&
            this.component.config.get("name").indexOf("Reply") < 0 &&
            this.component.config.get("name") !== "TWP_Submit_VerifiedCommenter"){
            return '<div class="{plugin.class:userMarkOfftopic}">' +
            '<input type="checkbox" name="usermark" value="' + plugin.labels.usermark_offtopic_value + '">' + plugin.labels.usermark_offtopic_text +
            '</div>' +
            '<div class="controls-divider"><div class="controls-inner-divider"></div></div>';
        } else {
            return '';
        }
    };

    plugin.templates.polls = function() {
        if (wp_e2 && wp_e2.echo_user && wp_e2.echo_user.is("logged") &&
            this.component.config.get("name").indexOf("Reply") < 0){
             return '<div class="{plugin.class:polls}">' +
            '<div class="poll-answer">' +  '</div>' +
            '<div class="poll-include-answer"><input type="checkbox" name="include_answer" value="no">Don’t display my poll answer' + '</div>' +
            '</div>';
        } else {
            return '';
        }
    };

    plugin.events = {
            "Echo.StreamServer.Controls.Submit.onPostComplete": function(topic, args) {
                $(args.target).find('input').prop('checked',false);
            },
            "Echo.StreamServer.Controls.Submit.onPostInit": function(topic, args) {
            },
            "Echo.StreamServer.Controls.Submit.onRender": function(topic, args) {
                var thisContainer = this.config.get("thisContainer");
                if (wp_e2[thisContainer].includefeaturenotification !== false) {
                  $(".echo-apps-conversations-postComposer").find(".echo-feature-notification").fadeOut("slow");
                    $.ajax({
                      "url": wp_e2.pbBaseURL + "/comments-feature-notifications/?outputType=jsonFront",
                    }).always(function(data, status){  
                      if (data.entries && data.entries.length > 0) {
                        var entries = data.entries;
                        var guid = (wp_e2[thisContainer].guid).split("?")[0];
                        var siteHierarchy = [guid, wp_e2.authors, wp_e2.siteServiceSection, wp_e2.siteServiceParentSection, "comments_sitewide"];
                        var keepLooping = true;
                        $.each(siteHierarchy, function(i, site){
                          $.each(entries, function(j, entry){
                            if (entry.scope == site){
                              if (entry.type == "ask"){
                                $(entry.notificationContent).hide().prependTo($(".echo-apps-conversations-postComposer")).fadeIn("slow");
                              } else {
                                $(entry.notificationContent).hide().appendTo($(".echo-apps-conversations-postComposer")).fadeIn("slow");                                
                              }
                              keepLooping = false;
                            }
                          })
                          return keepLooping;
                        })
                        $(".echo-close").on("click", function () {
                          $(this).parent().fadeOut("slow");
                        })
                      }
                    });
                  }             

                if (wp_e2[thisContainer].includefeaturenotification !== false &&
                    wp_e2._isUserSynced() &&
                    wp_e2._hasUserCookies !== "some" && 
                    TWP.isSignedIn() && wapoIdentity && !wapoIdentity.isMemberOfCommentingGroup(plugin.config["verification_status"]["verified_commenter_cookie"]) &&
                    (typeof args.inReplyTo == "undefined" ) &&
                    plugin.config["verification_status"]["display_warning"] === true ){
                    var thisNotification = $(plugin.config["verification_status"]["notCommenterUserWarning"]).insertAfter($('.echo-streamserver-controls-submit-container',args.target));
                    thisNotification.find(' .echo-close').click(function(){
                            $(this).parent().fadeOut("slow");

                        });
                }

                if (wp_e2[thisContainer].allow_comments != true && !$('#' + thisContainer).hasClass("permalink")) {
                  var expiredCommentsMessage = $('<div class="echo-closed-notification"><span>Comments are now closed. All comments sections close ' + wp_e2[thisContainer].comments_period + ' days after the story has published. For more details, please see our <a target="_blank" href="https://www.washingtonpost.com/news/ask-the-post/discussion-and-submission-guidelines/">our discussion guidelines   <span class="fa fa-chevron-circle-right"></span></a></span></div>');
                  var disabledCommentsMessage = $('<div class="echo-closed-notification"><span>Comments are now closed. We turn off the comments on stories dealing with personal loss, tragedies or other sensitive topics. For more details, please see our <a target="_blank" href="https://www.washingtonpost.com/news/ask-the-post/discussion-and-submission-guidelines/">our discussion guidelines <span class="fa fa-chevron-circle-right"></span></a></span></div>');
                  if (wp_e2[thisContainer].comments_period_expired === true) {
                    expiredCommentsMessage.insertAfter($('.echo-streamserver-controls-submit-container',args.target));
                  } else {
              			disabledCommentsMessage.insertAfter($('.echo-streamserver-controls-submit-container',args.target));
                  }
                } 

              /* Error Conditions based on missing cookies:
                - _hasUserCookies() == "none" & is("logged") - user has valid backplane, but no other cookies 
                - _hasUserCookies() == "some"  - user is missing some number of wapo cookies &  is("logged).  Always an error.  
                                                Note: missing cookies & user is not logged  error already caught
                                                 in TWP_formAuth plugin
              */
              if ((wp_e2._userHasCookies() == "none" && wp_e2.echo_user.is("logged")) ||
                  (wp_e2._userHasCookies() == "some" && wp_e2.echo_user.is("logged"))) {
                    //console.log("CASE 1: user account NOT ok, but user is logged or not synced")
                    var element = $('.echo-streamserver-controls-submit-container',args.target);
                    element.find(".echo-streamserver-controls-carduiauth-userLogged").remove();
                    element.append(this.labels.get("notOkUserMessage"));
                    element.on("click","a",function(event){
                      var thisTarget = $(event.target);
                      if (thisTarget.hasClass("logout")) {
                          window.location.href = wp_e2.logOutURL + encodeURIComponent(window.location.href);
                          return false;
                      }
                    });      
              } else if (wp_e2._userHasCookies() == "all" && !wp_e2._isUserSynced()){    
                  //generally things are ok, but user is not currently synced
                   //console.log("CASE 2: user account ok, user is not synced");
                   $('.echo-streamserver-controls-carduiauth-userAnonymous',args.target).append(this.labels.get("notConnectedUserMessage"));
              }

            },
            "Echo.StreamServer.Controls.Submit.onRerender": function(topic, args) {
            }
        };


    plugin.component.renderers.container = function(element) {
        var plugin = this, component = this.component;
        this.parentRenderer("container", arguments);
        var thisContainer = component.config.get("thisContainer");

        if (!wp_e2._isUserSynced() ||
            wp_e2._userHasCookies() == "some" || 
            !TWP.isSignedIn() ||
            (TWP.isSignedIn() && wapoIdentity && !wapoIdentity.isMemberOfCommentingGroup()) ||
            wp_e2.echo_user.userSuspended ||
            (!($('#' + thisContainer).hasClass("submitbox") || $('#' + thisContainer).hasClass("permalink")) && component.config.get("name") != "Reply") ||
            (wp_e2._isUserSynced() && wp_e2.echo_user && !wp_e2.echo_user.is("logged"))) {
            component.view.get("body").remove();
            component.view.get("controls").remove();
        } else {
            //user can see submit box. Add some wrapper code for better formatting
            var wrapper = $('<div class="submit-controls-outer-wrapper"></div>');
            component.view.get("header").after(wrapper);
            wrapper.append(component.view.get("body"));
            wrapper.append(component.view.get("controls"));
            wrapper.after('<div class="clearfix"></div>');
        }


        //check if user is banned
        if (wp_e2.echo_user.userSuspended) {
            var bannedTimes = wp_e2["suspend_user_markers"] || {}, bannedTexts = wp_e2["suspend_type_text"] || {},  userBanned = false, currBanTime = '', currBanText = '';
            var userMarkers = (wp_e2._isUserSynced() && wp_e2.echo_user.is("logged") && wp_e2.echo_user.get("markers") || []);
            $.each(bannedTimes, function(key,value){
                if ($.inArray(key,userMarkers) >= 0) {
                    currBanTime = key;
                    return;
                }
            });
            $.each(bannedTexts, function(key,value){
                if ($.inArray(key,userMarkers) >= 0) {
                    currBanText = key;
                    return;
                }
            });

            var bannedText = bannedTexts[currBanText];
            var bannedNotification = '<div class="echo-feature-notification suspended"><i class="fa fa-exclamation"></i>'
                + '<div class="notification-text"><p>'
                + ((typeof bannedText != 'undefined')?bannedText:bannedTexts["default"])
                + wp_e2["suspend_core_text"]
                + '</p>'
                + '<p>'
                + bannedTimes[currBanTime]
                + '</p></div>'
                + '</div>';
            component.view.get("header").after(bannedNotification);

        }


    };



    plugin.component.renderers.text = function(element) {
        var plugin = this, component = this.component;
        if (component.data && component.data.object && component.data.object.content){
            component.data.object.content = "";
        }
        this.parentRenderer("text", arguments);
        var thisContainer =   this.config.get("thisContainer");
        component.view.get("text").on({
          focus: function() {
                        $(this).closest('.submit-controls-outer-wrapper').addClass('active');
         }
            });
    };

    plugin.component.renderers.markers = function(element) {
        var plugin = this, component = this.component;
        this.parentRenderer("markers", arguments);
        var thisContainer =   this.config.get("thisContainer");

        if (thisContainer && wp_e2[thisContainer].pollincluded && (component.config.get("name") && component.config.get("name").indexOf("Reply") < 0)) {
          var poll = plugin.config.get("poll") || {},
          poll_marker = "";
          if (poll && poll.answerText && typeof poll.answerText !== 'undefined'){
            poll_marker = (poll && poll.pollid)?plugin.labels.get("poll_marker_prefix") + wp_e2[thisContainer].pollid + "_" + (poll && poll.answerText):'';
            if (poll_marker !== '') {
              component.view.get("markers").val(component.view.get("markers").val() + "," + poll_marker);
            }
          }
        }
        var submitMarkers = wp_e2[thisContainer].submitMarkers.join(',');
        if (submitMarkers !== '') {
          this.component.view.get("markers").val(this.component.view.get("markers").val() + "," + submitMarkers);
        }
    };

    plugin.component.renderers.tags = function(element) {
        var plugin = this, component = this.component;
        this.parentRenderer("tags", arguments);
        if (component.config.get("name") && component.config.get("name").indexOf("Reply") >= 0){
            var tags = component.view.get("tags").val().split(',');
            tags.push('replyto_' + plugin.component._prepareEventParams().inReplyTo.actor.title);
            component.view.get("tags").val(tags.join(','));
        }
    };


    plugin.renderers.userMarkOfftopic = function (element) {
        var plugin = this, item = this.component;
        element.find('input').on("change",item, function(event){
            var thisMarker = this.value, thisVal = item.view.get("markers").val(),finalVal = [],thisValArray = [];
            if (this.checked) {
                thisValArray = thisVal.split(",");
                thisValArray.push(thisMarker);
            } else {
                thisVal = thisVal.replace(new RegExp(thisMarker,'g'),'').trim();
                thisValArray = thisVal.split(",");

            }

            $.each(thisValArray,function(idx, value){
                if (value !== '') {finalVal.push(value);}
            });
            item.view.get("markers").val(finalVal.join(','));
        });

    };

    plugin.renderers.polls = function (element) {
        var plugin = this, item = this.component,
        thisContainer = item.config.get("thisContainer"),
        poll_marker = '',
        poll = {};

        if (window.wpGamesData && window.wpGamesData[wp_e2[thisContainer].pollid]) {
          poll.pollid = window.wpGamesData[wp_e2[thisContainer].pollid];
          poll.questionId = window.wpGamesData[wp_e2[thisContainer].pollid].answerText[0].questionId;
          poll.answerText = window.wpGamesData[wp_e2[thisContainer].pollid].answerText[0].answerText;
        }

        pollUpdate(plugin,element,poll);
        element.find('input').on("change",plugin, function(event){
            var poll = plugin.config.get("poll") || {},
            item = plugin.component,
            element = this,
            poll_marker = (poll && poll.pollid)?plugin.labels.get("poll_marker_prefix") + wp_e2[thisContainer].pollid + "_" + (poll && poll.answerText):'';
            markerUpdate(item,poll_marker,element);
        });

        function markerUpdate(item,poll_marker,element) {
            var thisMarker = poll_marker, thisVal = item.view.get("markers").val(),finalVal = [],thisValArray = [];
            if (!element.checked && thisMarker !== '') {
                thisValArray = thisVal.split(",");
                thisValArray.push(thisMarker);
            } else {
                thisVal = thisVal.replace(new RegExp(thisMarker,'g'),'').trim();
                thisValArray = thisVal.split(",");
            }

            $.each(thisValArray,function(idx, value){
                if (value !== '') {finalVal.push(value);}
            });
            item.view.get("markers").val(finalVal.join(','));
        }

       function pollUpdate(plugin,element,poll) {
            var thisContainer = plugin.config.get("thisContainer"),
            poll_marker = (poll)?plugin.labels.get("poll_marker_prefix") + wp_e2[thisContainer].pollid + "_" + (poll && poll.answerText):'',
            poll_answer = '';
            if (poll && poll.pollid ) {
              poll_answer = poll.answerText;
            }
            var poll_elm = element.find('.poll-answer');
            poll_elm.empty();
            if (poll_answer !== '') {
              poll_elm.append('<span class="poll-prefix">' + plugin.labels.get('poll_answer_prefix') + '</span>' + poll_answer);
              plugin.config.set("poll",poll);
              markerUpdate(plugin.component,poll_marker,element);
            } else {
              poll_elm.append(plugin.labels.get('poll_no_answer'));
            }

        }
        function listenerHandler(ev) {
            var item = plugin.component,
            thisContainer = item.config.get("thisContainer");
            if (wp_e2[thisContainer].pollid !== ev.message.pollid) {
                return;
            }
            console.log ("heard: " + ev.message.pollid + "  for " + wp_e2[item.config.get("thisContainer")].pollid);
            pollUpdate(plugin,element,ev.message);
        }

        var listener = 'wp-games.poll.' + wp_e2[thisContainer].pollid + '.answer';
        window.$(document).off(listener);
        console.log('listening for: ' + listener);
        window.$(document).on(listener,{"element":element,"plugin":plugin},listenerHandler);

    };

    Echo.Plugin.create(plugin);

    })(Echo.jQuery);

(function(jQuery) {
    "use strict";

    var $ = jQuery;

    var plugin = Echo.Plugin.manifest("TWP_Edit", "Echo.StreamServer.Controls.Submit");

    if (Echo.Plugin.isDefined(plugin)) return;

    plugin.init = function() {
        var self = this, submit = this.component;
        var thisContainer =  this.config.get("thisContainer");
        submit.config.set("thisContainer",thisContainer);

    };

    plugin.config = {
            "thisContainer": "#echo_container",
            "editMarker": ["edited"]
    };

    plugin.events = {
            "Echo.StreamServer.Controls.Submit.onPostComplete": function (topic, args){
                var self = this;
                var thisContainer = self.config.get("thisContainer");
                var updatedMarkers = self.config.get("editMarker");
                $.each(updatedMarkers || [], function(index, value){
                    var data = '{"verb": "mark","target": "' + args.targetURL + '","markers": "' + value + '"}';
                    $.ajax({
                        "url": wp_e2.metaUrl,
                        "data": {
                            "appkey": wp_e2.appkey,
                            "content": data,
                            "sessionID": wp_e2.echo_user && wp_e2.echo_user.get("sessionID", "")
                        },
                        "dataType":"jsonp"
                    });
                });
            }
    };

    Echo.Plugin.create(plugin);

})(Echo.jQuery);


/******************************************************************************************************
 *
 * Plugin TWP_Submit_VerifiedCommenter
 *
 * Loaded for submitbox where (includeverifiedcommenters == true || (includetabs==true && defaulttab=="top")
 *
 *
 *
 */

(function(jQuery) {
"use strict";

    var $ = jQuery;

    var plugin = Echo.Plugin.manifest("TWP_Submit_VerifiedCommenter", "Echo.StreamServer.Controls.Submit");

    if (Echo.Plugin.isDefined(plugin)) return;

    plugin.init = function() {
        var self = this, submit = this.component;
        var thisContainer =  this.config.get("thisContainer");
        self.config.set("thisContainer",thisContainer);
        var i = document.createElement('input');
        self.config.set("isPlaceholder",( 'placeholder' in i));
        var userMarkers = (typeof self.config.get("userMarkers") == 'undefined ' || self.config.get("userMarkers") == null)?self.config.get("userMarkers"):self.config.get("userMarkers");

        if (self.config.get("isVerifiedCommenterForm") === true) {
            this.extendTemplate("replace", "textArea", plugin.contentTemplate);
            submit.validators = [];
            submit.addPostValidator(function() {
                    var thisContainer = submit.config.get("thisContainer"), thisText = submit.view.get("text"), validationFailed = false;
                    var thisForm = submit.view.get("content").find('.echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-topCommenterForm');
                    thisForm.find('input').removeClass("echo-streamserver-controls-submit-mandatory");
                    //validate that required fields have been entered.

                    if (thisForm.find('input[name="fullName"]').val().length == 0 ) {
                        thisForm.find('input[name="fullName"]').addClass("echo-streamserver-controls-submit-mandatory");
                        validationFailed = true;
                    } else {
                        thisForm.find('input[name="fullName"]').removeClass("echo-streamserver-controls-submit-mandatory");
                    };

                    if (thisForm.find('input[name="phoneNumber"]').val().length == 0 ) {
                        thisForm.find('input[name="phoneNumber"]').addClass("echo-streamserver-controls-submit-mandatory");
                        validationFailed = true;
                    } else {
                        thisForm.find('input[name="phoneNumber"]').removeClass("echo-streamserver-controls-submit-mandatory");
                    };
                    if (thisForm.find('textarea[name="address"]').val().length == 0 ) {
                        thisForm.find('textarea[name="address"]').addClass("echo-streamserver-controls-submit-mandatory");
                        validationFailed = true;
                    } else {
                        thisForm.find('textarea[name="address"]').removeClass("echo-streamserver-controls-submit-mandatory");
                    };
                    if (thisForm.find('input[name="email"]').val().length == 0 ) {
                        thisForm.find('input[name="email"]').addClass("echo-streamserver-controls-submit-mandatory");
                        validationFailed = true;
                    } else {
                        thisForm.find('input[name="email"]').removeClass("echo-streamserver-controls-submit-mandatory");
                    };
                    if (!thisForm.find('input[name="agreetopolicy"]').prop('checked')) {
                        thisForm.find('div.agreetopolicy').addClass("echo-streamserver-controls-submit-mandatory");
                        validationFailed = true;
                    } else {
                        thisForm.find('div.agreetopolicy').removeClass("echo-streamserver-controls-submit-mandatory");
                    };
                    if(validationFailed) {return false;};

                    //move fields to text area so item can be submitted
                    var requestHtml = '';
                    $.each(thisForm.find('input, textarea'),function(idx,elm){
                        requestHtml = requestHtml + elm.getAttribute('name') + ':  ' + elm.value + '\n';
                    });


                    thisText.val(requestHtml);
                    return true;
            },"high");
        } else {
            this.extendTemplate("insertAsFirstChild","container",plugin.templates.verifiedCommenterCheckbox);
        }
    };

    Echo.Events.subscribe({
        "topic":"TWP.Badge.Request.Complete",
        "context": "global",
        "handler":function(topic,data){
               if (data && data.echocontainer) {
                    var thisContainer = data.echocontainer;
                    if (wp_e2[thisContainer].includeverifiedcommenters === true  && wp_e2.echo_user){
                            if (wp_e2[thisContainer].verifiedcommenteridlist
                                    && (wp_e2[thisContainer].verifiedcommenteridlist.userArray &&   wp_e2[thisContainer].verifiedcommenteridlist.userArray[wp_e2.echo_user.get("identityUrl")])
                                    ){
                                        var thisStatus = wp_e2[thisContainer].verifiedcommenteridlist.userArray[wp_e2.echo_user.get("identityUrl")].verification_status;
                                        var thisElm = $('#' + thisContainer + ' .echo-streamserver-controls-submit-container.original-submit');
                                        var thisReq = thisElm.find('.echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-verifiedCommenterRequest');
                                        thisReq.find('a').remove();
                                        thisReq.append('<span class="verification-status">' + plugin.labels[thisStatus] + '</span>');
                            }
                    }
                }
            }
    });

    plugin.config = {
            "thisContainer": "#echo_container",
            "userMarkers" : "verified_preferred",
            "addVerifiedCommenterRequest": true,
            "isVerifiedCommenterForm": false,
            "verifiedCommenterRequestTarget": "echo-apps-conversations-postComposer",
            "verifiedCommenterSubmitTarget": "echo-topcommenter-form",
            "overlayConfig":{
                  mask: {
                      color: '#000000',
                      loadSpeed: 200,
                      opacity: 0.50
                  },
                  top: '10%',
                  left: 'center',
                  closeOnClick: true,
                  closeOnEsc: true,
                  onBeforeLoad: function(){
                       $(this.getTrigger().attr("rel")).find("iframe").attr('src',this.getTrigger().attr("href"));

                  }
                }
    };

    plugin.labels = {
            "topComments": "Top Comments",
            "verifiedinput_value": "verified_manual_request",
            "verifiedinput_text": '<span>Mentioned in this story and want to comment? <strong>Click here</strong> <i class="caret"></i></span>',
            "verifiedinput_text_anon": '<span>Mentioned in this story and want to comment? <a href="http://www.washingtonpost.com/blogs/ask-the-post/wp/2014/02/27/comments-what-is-a-preferred-commenter/" target="_policy">Learn more</a></span>',
            "verifiedinput_description": '<p><b>Are you mentioned in this story?</b></p><p>We need to verify your identity. Please provide the following info: </p>',
            "verification_request":'Your verification request has been received.',
            "verification_processing": 'Your verification request is being reviewd.',
            "verification_approved": 'Your verification request has been approved.',
            "verification_denied": 'Your verification request has not been approved.',
            "none":""
    };


    plugin.events = {
            "Echo.StreamServer.Controls.Submit.onRender": function(topic, data) {
            },
            "Echo.StreamServer.Controls.Submit.onPostInit": function (topic, data){
            },
            "Echo.StreamServer.Controls.Submit.onPostComplete": function (topic, data){
                var self = this;
                var thisContainer = self.config.get("thisContainer");
                if ($(data.target).hasClass(self.config.get("verifiedCommenterSubmitTarget")) ){
                    //comment posted
                    $(data.target).slideUp("fast", function(){
                        self.component.destroy();
                        var thisElm = $('#' + thisContainer + ' .echo-streamserver-controls-submit-container.original-submit');
                        var thisReq = thisElm.find('.echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-verifiedCommenterRequest');
                        thisReq.find('a').remove();
                        thisReq.append('<span class="verification-status">' + plugin.labels.verification_request + '</span>');
                        thisElm.slideDown("slow");
                    });

                }
            }
    };


    plugin.templates.verifiedCommenterCheckbox = function() {
        var inputText = (wp_e2 && wp_e2.echo_user && wp_e2.echo_user.is("logged") )
                ?'<a class="submit-request-form">' +plugin.labels.verifiedinput_text + '</a>'
                :plugin.labels.verifiedinput_text_anon;
        if (wp_e2
            && wp_e2.echo_user
            //&&    wp_e2.echo_user.is("logged")
            &&  (wp_e2.echo_user.get("state") != "ModeratorBanned" && wp_e2.echo_user.get("state") != "ModeratorDeleted")
            &&  !wp_e2.echo_user.userSuspended
            &&  $('#ugc-photo-gallery').length == 0
            && (!this.component.config.get("name") || (this.component.config.get("name") && this.component.config.get("name").indexOf("Reply") < 0))){
            return '<div class="{plugin.class:verifiedCommenterRequest}">' +
                inputText   +
            '</div>';
        } else {
            return '';
        }
    };

    plugin.contentTemplate =
        '<div class="{plugin.class:topCommenterForm}">' +
        '<div class="echo-close">&#215;</div>' +
        '<div class="description">' + plugin.labels.verifiedinput_description +
        '</div>' +
        '<input type="text" name="fullName" placeholder="Full Name" maxlength="50">' +
        '<input type="text" name="phoneNumber" placeholder="Phone number" maxlength="20">' +
        '<input type="text" name="affiliation" placeholder="Affiliation (if relevant)" maxlength="100">' +
        '<input type="text" name="twitterHandle"  placeholder="Twitter handle (optional)"  maxlength="30">' +
        '<textarea rows="2" cols="50"  name="address"  placeholder="Street address" maxlength="100"/>' +
        '<input type="text" name="email"  placeholder="E-mail address" maxlength="50">' +
        '<input type="text" name="fbPage"  placeholder="Facebook page (optional)" maxlength="30">' +
        '<div class="agreetopolicy"><input type="checkbox" name="agreetopolicy" value="agreedtopolicy"><p>I have read and understood The Washington Post\'s ' +
        '<span class="discussion-policy"><a href="http://www.washingtonpost.com/blogs/ask-the-post/discussion-and-submission-guidelines/" target="_policy">discussion policy</a></span>' +
        ' and ' +
        '<span class="discussion-policy"><a href="http://www.washingtonpost.com/blogs/ask-the-post/discussion-and-submission-guidelines/#preferred-commenters" target="_policy">guidelines on preferred comment placement</a></span>.</p></div>' +
        '</div>' +
        '<textarea class="{class:text} {class:textArea} echo-primaryFont echo-primaryColor" style="display:none;"></textarea>' ;

    plugin.component.renderers.container = function(element) {
        var item = this.component,  thisContainer = this.config.get("thisContainer");
        this.parentRenderer("container", arguments);

        if (this.config.get("addVerifiedCommenterRequest") === true) {
            element.addClass("original-submit");
        }

        if (wp_e2[thisContainer].verifiedcommenteridlist
                && (wp_e2[thisContainer].verifiedcommenteridlist.userArray &&   wp_e2[thisContainer].verifiedcommenteridlist.userArray[wp_e2.echo_user.get("identityUrl")])
                ){
                    var thisStatus = wp_e2[thisContainer].verifiedcommenteridlist.userArray[wp_e2.echo_user.get("identityUrl")].verification_status;
                    var thisElm = $(element).find('.echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-verifiedCommenterRequest');
                    thisElm.find('a').remove();
                    thisElm.append('<span class="verification-status">' + plugin.labels[thisStatus] + '</span>');
        }
    };

    plugin.component.renderers.userInfoWrapper = function (element) {
        var item = this.component;
        this.parentRenderer("userInfoWrapper", arguments);
        $(element).hide();
    };

    plugin.renderers.topCommenterForm = function(element) {
        var plugin = this, item = this.component;
        var thisContainer = plugin.config.get("thisContainer");
        var overlay = $('#comment_policy_overlay');
        overlay.hide();
        $('body').prepend(overlay);
        try {
            window.$(element).find('a').overlay(plugin.config.get("overlayConfig"));
        } catch(e){
        }

        element.find('.echo-close').on('click',plugin,function(event){
            var thisContainer = plugin.config.get("thisContainer");
            if ($('#' + thisContainer + ' .' + plugin.config.get("verifiedCommenterSubmitTarget")).length > 0) {
                $('#' + thisContainer + ' .' +  plugin.config.get("verifiedCommenterSubmitTarget")).slideUp("fast", function(){
                    plugin.component.destroy();
                    var thisElm = $('#' + thisContainer + ' .echo-streamserver-controls-submit-container.original-submit');
                    thisElm.find('.echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-verifiedCommenterRequest a').removeClass("open");
                    thisElm.slideDown("slow");
                });

            }
        });
    };

    plugin.renderers.verifiedCommenterRequest = function(element) {
        var plugin = this, item = this.component;

        element.find('a.submit-request-form').on("click",plugin, function(event){
            if (!$(this).hasClass("open")) {
                $(this).addClass("open");
                plugin._startTopCommentsSubmit(plugin);
            }
        });

        return element;

    };

//helpers
    plugin.methods._publishEventComplete = function(args) {
        var item = this.component;
        this.events.publish({
            "topic": args.topic,
            "data": args.data
        });
    };

    plugin.methods._startTopCommentsSubmit = function(plugin) {
        var item = plugin.component;
        var thisContainer = plugin.config.get("thisContainer"), guid = wp_e2[thisContainer].guid;



        if ($('#' + thisContainer).find('.' + plugin.config.get("verifiedCommenterSubmitTarget")).length == 0){
            $('.' + plugin.config.get("verifiedCommenterRequestTarget")).prepend('<div class="' + plugin.config.get("verifiedCommenterSubmitTarget") + '"></div>');
        };


        var pluginArray = [{   "name": "CardUIShim",
                                "submitPermissions": "forceLogin",
                                "displaySharingOnPost": false,
                                "nestedPlugins": [{
                                    "name": "TWP_formAuth",
                                    "thisContainer": thisContainer
                                }],
                                "labels":{"post": 'Submit',
                                    "posting": 'Submitting...'
                                    }
                            },{
                                "name": "TWP_Submit",
                                "thisContainer": thisContainer
                            },{
                                "name":"TWP_Submit_VerifiedCommenter",
                                "thisContainer": thisContainer,
                                "addVerifiedCommenterRequest": false,
                                "isVerifiedCommenterForm": true
                                }
                          ];

        $('.' + plugin.config.get("verifiedCommenterSubmitTarget")).css("display","none");
        var submitConfig = {
                "name": "TWP_Submit_VerifiedCommenter",
                "target": $('.' + plugin.config.get("verifiedCommenterSubmitTarget")),
                "targetURL": guid,
                "markers": ["verification_request"],
                "appkey": wp_e2.appkey,
                "type": "http://activitystrea.ms/schema/1.0/badge",
                "plugins":pluginArray,
                "useSecureAPI": true,
                "apiBaseURL": wp_e2.apiBaseURL + "/v1/",
                "submissionProxyURL": wp_e2.echoSubmissionProxyURL,
                "requestMethod": "POST",
                "labels": {"post": 'Submit',
                    "posting": 'Submitting...' }
                };

        var topCommentsSubmit = new Echo.StreamServer.Controls.Submit(submitConfig);

        plugin.config.set("topCommentsSubmit",topCommentsSubmit);
        $('#' + thisContainer + ' .echo-streamserver-controls-submit-container.original-submit').slideUp("fast", function(){
            if (!plugin.config.get("isPlaceholder")) {
                $(".echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-topCommenterForm textarea").css({"width":"40%","margin-right":"20px"});
                //make "placeholder" for older browsers
                $(".echo-streamserver-controls-submit-plugin-TWP_Submit_VerifiedCommenter-topCommenterForm").find('[placeholder]').each(function(){
                    $(this).val($(this).attr('placeholder'));
                    $(this).on("focus",function() {
                      if ($(this).attr('placeholder')==$(this).val()) {
                        $(this).val('');
                      }
                    });
                    $(this).on("blur",function() {
                      if ($(this).val() == '') {
                        $(this).val($(this).attr('placeholder'));
                      }
                    });
                  });
            };
            $('.' + plugin.config.get("verifiedCommenterSubmitTarget")).slideDown("slow", function(){

            });
        });

    };

    Echo.Plugin.create(plugin);

    })(Echo.jQuery);
