var debug=wp_e2.debug;debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"starting twp_comments_echo2.js");
(function($){var isRendered=false;var userLoginState=null;var echo_user=null;var onPostCompleteVars={};var onMoreVars={};var isWashingtonpostDomain=true;wp_e2.isMobile=typeof window.mobile_browser!=="undefined"&&window.mobile_browser===1?true:false;wp_e2.initStatus={badge_init:false,wp_e2_init:false,user_init:false,canvas_init:false};wp_e2.wp_site_domain=["washingtonpost.com","digitalink.com"];wp_e2.USER_ROLE_ADMINISTRATOR="administrator";wp_e2.SORT_DESCENDING="reverseChronological";wp_e2.SORT_ASCENDING=
"chronological";wp_e2.MODERATION_REQUIRED="premodreq";wp_e2.MODERATOR_APPROVED="ModeratorApproved";wp_e2.MODERATOR_BANNED="ModeratorBanned";wp_e2.MODERATOR_DELETED="ModeratorDeleted";wp_e2.COMMUNITY_FLAGGED="CommunityFlagged";wp_e2.MODERATOR_FLAGGED="ModeratorFlagged";wp_e2.SYSTEM_FLAGGED="SystemFlagged";wp_e2.UNTOUCHED="Untouched";wp_e2.PHOTO="photo";wp_e2.WEBTYPE_PHOTO="ugc_photo_story";wp_e2.WEBTYPE_BLOG="blogstory";wp_e2.WEBTYPE_PROMO="promo_story";wp_e2.WEBTYPE_DISCUSSION_STORY="discussion_story";
wp_e2.STREAM_BASE="http://www.washingtonpost.com";wp_e2.SUBMIT_BOX_CLASS="comment-box";wp_e2.STREAM_CLASS="echo-stream";wp_e2.COUNTER_CLASS="echo-counter";wp_e2.SUBMIT_BOX_TARGET="."+wp_e2.SUBMIT_BOX_CLASS;wp_e2.STREAM_TARGET="."+wp_e2.STREAM_CLASS;wp_e2.COUNTER_TARGET="."+wp_e2.COUNTER_CLASS;wp_e2.ECHO_CONTAINER=".echo_container";wp_e2.ECHO_CANVAS=".echo_container.echo-canvas";wp_e2.getQuery=function(guid,thisContainer,itemurl,userIdList,streamContainer){streamContainer=typeof streamContainer=="undefined"?
"all":streamContainer;var currContainer=typeof thisContainer=="undefined"?wp_e2:wp_e2[thisContainer];var guid=!guid?currContainer.guid:guid;itemurl=typeof itemurl=="undefined"?"":itemurl;userIdList=typeof userIdList=="undefined"?"":userIdList;var webType=typeof currContainer.webType!=="undefined"?currContainer.webType.toLowerCase():"";var parenturl=typeof currContainer.parenturl=="undefined"?"":currContainer.parenturl;var includechildren=typeof currContainer.includechildren!=="undefined"?currContainer.includechildren:
true;if(includechildren)childrenLevelsToShow=currContainer.streamSettings.childrenMaxDepth;else childrenLevelsToShow=0;var childrenToShow=currContainer.streamSettings[streamContainer].childrenItemsPerPage;var queryFilter=userIdList!==""?"scope: ":"childrenof: ";var userQuery="";if(typeof wp_e2.echo_user!=="undefined"&&typeof wp_e2.echo_user.get("state")!=="undefined"&&wp_e2.echo_user.is("logged"))if(wp_e2.echo_user.get("state")===wp_e2.UNTOUCHED||wp_e2.echo_user.get("state")===wp_e2.MODERATOR_BANNED||
wp_e2.echo_user.get("state")===wp_e2.MODERATOR_DELETED||currContainer.moderationrequired===true)userQuery="OR (-state:"+wp_e2.SYSTEM_FLAGGED+","+wp_e2.MODERATOR_FLAGGED+" AND user.id:'"+wp_e2.echo_user.get("identityUrl")+"')";var itemMarkerQuery=typeof currContainer.streamSettings[streamContainer].markers!=="undefined"?" markers: "+currContainer.streamSettings[streamContainer].markers.toString()+" ":"";var userMarkerQuery=typeof currContainer.streamSettings[streamContainer].usermarkers!=="undefined"&&
currContainer.streamSettings[streamContainer].usermarkers.toString()!==""?" user.markers: "+currContainer.streamSettings[streamContainer].usermarkers.toString()+" ":"";var markerQuery="";if(itemMarkerQuery!==""&&userMarkerQuery!=="")markerQuery="("+itemMarkerQuery+" OR "+userMarkerQuery+" AND ( -markers:ignore ) "+") ";else if(itemMarkerQuery!=="")markerQuery="("+itemMarkerQuery+" -markers:ignore "+") ";else if(userMarkerQuery!=="")markerQuery="("+userMarkerQuery+" -markers:ignore "+")";if(currContainer.display_ugc_photos)currContainer.streamSettings.allowedItemStates=
[wp_e2.MODERATOR_APPROVED];var stateQuery="";var standardQuery="(state:"+wp_e2.UNTOUCHED+"  AND user.state:"+wp_e2.MODERATOR_APPROVED+") "+"OR (state:"+wp_e2.MODERATOR_APPROVED+"  AND user.state:"+wp_e2.MODERATOR_APPROVED+","+wp_e2.UNTOUCHED+") "+"OR (state:"+wp_e2.COMMUNITY_FLAGGED+","+wp_e2.MODERATOR_DELETED+" AND user.state:"+wp_e2.MODERATOR_APPROVED+") ";var moderatedQuery="(state:"+wp_e2.MODERATOR_APPROVED+"  AND user.state:"+wp_e2.MODERATOR_APPROVED+","+wp_e2.UNTOUCHED+") "+"OR (state:"+wp_e2.COMMUNITY_FLAGGED+
" AND user.state:"+wp_e2.MODERATOR_APPROVED+") ";if(webType===wp_e2.WEBTYPE_PHOTO)stateQuery="(state:"+wp_e2.MODERATOR_APPROVED+" AND -user.state:"+wp_e2.MODERATOR_BANNED+","+wp_e2.MODERATOR_DELETED+") ";else if(currContainer.moderationrequired===true)stateQuery=moderatedQuery;else stateQuery=standardQuery;var streamStateQuery="";if(webType===wp_e2.WEBTYPE_PHOTO)streamStateQuery="(state:"+wp_e2.MODERATOR_APPROVED+" AND -user.state:"+wp_e2.MODERATOR_BANNED+","+wp_e2.MODERATOR_DELETED+") ";else if(currContainer.moderationrequired===
true)streamStateQuery=moderatedQuery;else streamStateQuery="(state:Untouched AND user.state:"+wp_e2.MODERATOR_APPROVED+","+wp_e2.UNTOUCHED+") "+"OR (state:"+wp_e2.COMMUNITY_FLAGGED+","+wp_e2.MODERATOR_APPROVED+","+wp_e2.MODERATOR_DELETED+" AND -user.state:"+wp_e2.MODERATOR_BANNED+","+wp_e2.MODERATOR_DELETED+") ";var childrenStateQuery="";if(webType===wp_e2.WEBTYPE_PHOTO)childrenStateQuery="(state:"+wp_e2.MODERATOR_APPROVED+" AND -user.state:"+wp_e2.MODERATOR_BANNED+","+wp_e2.MODERATOR_DELETED+") ";
else if(currContainer.moderationrequired===true)childrenStateQuery=moderatedQuery;else childrenStateQuery=standardQuery;var numDisplayItems=0;if(typeof currContainer.streamSettings[streamContainer].maxitems!=="undefined")numDisplayItems=currContainer.streamSettings[streamContainer].maxitems;var filterQuery=" (("+stateQuery+userQuery+") "+(markerQuery!=""?" AND "+markerQuery:"")+")  ";var twitterQuery="";if(typeof currContainer.source!=="undefined"&&currContainer.source.indexOf("Twitter")>=0)twitterQuery=
"("+currContainer.streamSettings.request+": "+guid+" ("+streamStateQuery+")"+" "+markerQuery+" source:Twitter"+") ";var washpostQuery="";if(typeof currContainer.source!=="undefined"&&currContainer.source.indexOf("washpost.com")>=0)washpostQuery="("+currContainer.streamSettings.request+": "+guid+" source:"+currContainer.source.toString()+filterQuery+" )";var streamIdQuery="";if(typeof currContainer.streamid!=="undefined"&&currContainer.streamid!="")streamIdQuery="("+currContainer.streamSettings.request+
": "+currContainer.streamid+(typeof currContainer.streamSettings.allowedItemMarkers!=="undefined"&&currContainer.streamSettings.allowedItemMarkers.toString()!=""?" markers: "+currContainer.streamSettings.allowedItemMarkers.toString():"")+" ("+streamStateQuery+")"+")";var query=washpostQuery!=""?washpostQuery:"";if(typeof wp_e2[thisContainer]!=="undefined"&&wp_e2[thisContainer].displayuserstream)query=""+"user.id:'"+wp_e2.echo_user.get("identityUrl")+"'"+" "+queryFilter+guid+" itemsPerPage: "+numDisplayItems+
" sortOrder:"+currContainer.streamSettings.sortorder+" safeHTML: permissive"+" type:comment"+" -markers: ignore "+" children: "+childrenLevelsToShow+" childrenSortOrder:"+currContainer.streamSettings.childrenSortOrder+" childrenItemsPerPage:"+childrenToShow+" "+" ("+childrenStateQuery+userQuery+") ";else if(parenturl!="")query=queryFilter+parenturl+" itemsPerPage: "+numDisplayItems+" sortOrder:"+currContainer.streamSettings.sortorder+" safeHTML:"+currContainer.streamSettings.safeHTML+" type:comment"+
" childrenItemsPerPage:"+childrenToShow+" children: "+childrenLevelsToShow+" childrenSortOrder:"+currContainer.streamSettings.childrenSortOrder+" "+" (("+childrenStateQuery+userQuery+") "+(markerQuery!=""?" AND "+markerQuery:"")+") ";else if(itemurl!="")query="url: "+itemurl+" itemsPerPage: "+numDisplayItems+" sortOrder:"+currContainer.streamSettings.sortorder+" safeHTML:"+currContainer.streamSettings.safeHTML+" children: "+childrenLevelsToShow+" childrenSortOrder:"+currContainer.streamSettings.childrenSortOrder+
" childrenItemsPerPage:"+childrenToShow+" "+" (("+childrenStateQuery+userQuery+") "+(markerQuery!=""?" AND "+markerQuery:"")+") ";else if(userIdList!="")query=queryFilter+guid+" user.id:"+userIdList+" itemsPerPage: "+numDisplayItems+" sortOrder: "+currContainer.streamSettings.sortorder+" safeHTML: "+currContainer.streamSettings.safeHTML+" type:comment"+" -markers: ignore "+" children: "+childrenLevelsToShow+" childrenSortOrder:"+currContainer.streamSettings.childrenSortOrder+" childrenItemsPerPage:"+
childrenToShow+" "+" ("+childrenStateQuery+userQuery+") ";else{query=query+(streamIdQuery!=""&&query!==""?" OR "+streamIdQuery:streamIdQuery);query=query+(twitterQuery!=""&&query!==""?" OR "+twitterQuery:twitterQuery);query="("+query+")"+" itemsPerPage: "+numDisplayItems+" sortOrder:"+currContainer.streamSettings.sortorder+" safeHTML:"+currContainer.streamSettings.safeHTML+" children: "+childrenLevelsToShow+" childrenSortOrder:"+currContainer.streamSettings.childrenSortOrder+" childrenItemsPerPage:"+
childrenToShow+" "+" (("+childrenStateQuery+userQuery+") "+(markerQuery!=""?" AND "+markerQuery:"")+") "}debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - query - "+thisContainer+": "+query);return query};wp_e2.init=function(){wp_e2._initOmnitureVariables();if(typeof Echo!=="undefined"){if(typeof Backplane!=="undefined"){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - initializing backplane");
if(!TWP.Util.User.getAuthentication())Backplane.resetCookieChannel();Backplane.init(wp_e2.backplaneSettings)}else debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - no backplane");if(typeof wapoIdentityInit==="function")wapoIdentityInit();Echo.LoginStateChange=function(loginState){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Echo.LoginStateChange triggered for login state: "+
loginState);userLoginState=loginState;$(".comment-stream").trigger("wp_e2Init.Complete");switch(loginState){case "logout":Backplane.resetCookieChannel();break;default:}}}else debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - no echo present");debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - init complete");Echo.Events.subscribe({"topic":"Echo.UserSession.onInit",
"context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Echo.UserSession.onInit triggered - "+(wp_e2.echo_user&&wp_e2.echo_user.get("activeIdentities")[0]&&wp_e2.echo_user.get("activeIdentities")[0].username)+" - synced: "+wp_e2._isUserSynced());wp_e2.echo_user=new Echo.UserSession({"appkey":wp_e2.appkey,"apiBaseURL":wp_e2.apiBaseURL});var accounts=wp_e2.echo_user.get("activeIdentities");
var avatar=wp_e2.echo_user.get("avatar");avatar=(avatar||"").replace("http://akiajc2strzaac3fwsta.post-avatars.s3.amazonaws.com","https://s3.amazonaws.com/akiajc2strzaac3fwsta.post-avatars").replace("http://","https://").replace("'",'"');wp_e2.echo_user.set("avatar",avatar);wp_e2._getIgnoredUsers();wp_e2.initStatus.user_init=true;$(document).trigger("TWP.Echo.User.InitComplete");$(document).trigger("TWP.Apps.Init.Complete")}});Echo.Events.subscribe({"topic":"Echo.UserSession.onInvalidate","context":"global",
"handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Echo.UserSession.onInvalidate triggered "+(wp_e2.echo_user&&wp_e2.echo_user.get("activeIdentities")[0]&&wp_e2.echo_user.get("activeIdentities")[0].username)+" - synced: "+wp_e2._isUserSynced());wp_e2.echo_user=new Echo.UserSession({"appkey":wp_e2.appkey,"apiBaseURL":wp_e2.apiBaseURL});var accounts=wp_e2.echo_user.get("activeIdentities");
wp_e2.initStatus.user_init=true;$(document).trigger("TWP.Echo.User.InitComplete");$(document).trigger("TWP.Apps.Init.Complete")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.onMoreButtonPress","context":"global","handler":function(topic,data,contextId){var thisContainer=$(data.target).closest(wp_e2.ECHO_CONTAINER).attr("id");if(typeof sendDataToOmniture==="function")try{sendDataToOmniture("echo.onmore","event5",onMoreVars);debug&&window.console&&console.log&&console.log("["+
(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - MORE: omniture event5")}catch(err){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - MORE: omniture event5"+err)}}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Submit.onPostComplete","context":"global","handler":function(topic,data,contextId){var thisContainer=$(data.target).closest(wp_e2.ECHO_CONTAINER).attr("id");if(typeof sendDataToOmniture===
"function")try{onPostCompleteVars.eVar26=wp_e2[thisContainer].display_ugc_photos===true?"submit - ugc":"submit - comments";sendDataToOmniture("echo.onpostcomplete","event3",onPostCompleteVars);debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Post COmplete: omniture event3");onPostCompleteVars.eVar26=""}catch(err){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Post COmplete: omniture event3 - "+
err)}}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.onRender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Stream.onRender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChangedQueue")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.onRerender","context":"global","handler":function(topic,data,contextId){debug&&
window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Stream.onRerender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChangedQueue")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.onReady","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Stream.onReady");
window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChangedQueue");window.wp_pb&&wp_pb.report&&wp_pb.report("comments","commentsReady");if(typeof sendDataToOmniture==="function")try{sendDataToOmniture("echo.commentsLoaded","event29",{"eVar26":"comments loaded"});debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - LOADED: omniture event29")}catch(err){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/
1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - LOADED: omniture event29"+err)}if(typeof $.lockfixed=="function"&&$(".lockfix").length>0){var top=0;$.lockfixed(".echo-apps-conversations-allPostsContainer .echo-apps-conversations-streamHeader",{"fixClass":"lockfixed","offset":{"top":top}});window.wp_pb&&wp_pb.report&&wp_pb.report("streamHeader","lockfixed",true)}if(!$(".site-header").hasClass("bar-hidden"))window.wp_pb&&wp_pb.report&&wp_pb.report("nav","finish_open",true);if($(".sticky-top-sharebar").hasClass("top-sharebar-fixed"))window.wp_pb&&
wp_pb.report&&wp_pb.report("sticky-top-sharebar","sharebar_fixed",true);var rootBackground=$("body").css("background-color");if(rootBackground=="transparent"||rootBackground=="rgba(0, 0, 0, 0)"||rootBackground=="rgb(0, 0, 0)")$(".echo-apps-conversations-streamHeader").css("background-color","#fff");else $(".echo-apps-conversations-streamHeader").css("background-color",rootBackground)}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Counter.onUpdate","context":"global","handler":function(topic,
data,contextId){if(data&&typeof data.data.count!="undefined"){var targets=$(wp_e2.COUNTER_TARGET);var rawCount=data.data.count;for(var i=0;i<targets.length;i++){if(rawCount>=1E3&&targets[i].classList.contains("format_short")){var shortCount=(Math.floor(10*(rawCount/1E3))/10).toFixed(1);targets[i].innerHTML=shortCount+"K"}else targets[i].innerHTML=rawCount;debug&&console.log("raw count:"+rawCount+"****************"+i+":"+targets[i].innerHTML)}}debug&&window.console&&console.log&&console.log("["+(new Date-
TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Counter.onUpdate")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.Item.onRender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Stream.Item.onRender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChangedQueue")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Stream.Item.onRerender",
"context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Stream.Item.onRerender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChangedQueue")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Submit.onReady","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/
1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Submit.onReady")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Submit.onRender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Submit.onRender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChanged")}});Echo.Events.subscribe({"topic":"Echo.StreamServer.Controls.Submit.onRerender","context":"global",
"handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Submit.onRerender");window.wp_pb&&wp_pb.report&&wp_pb.report("global","domChanged")}});Echo.Events.subscribe({"topic":"Echo.IdentityServer.Controls.Auth.onRender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Echo.IdentityServer.Controls.Auth.onRender triggered - "+
(wp_e2.echo_user&&wp_e2.echo_user.get("activeIdentities")[0]&&wp_e2.echo_user.get("activeIdentities")[0].username)+" - synced: "+wp_e2._isUserSynced())}});Echo.Events.subscribe({"topic":"Echo.IdentityServer.Controls.Auth.onRerender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Echo.IdentityServer.Controls.Auth.onRerender triggered - "+(wp_e2.echo_user&&
wp_e2.echo_user.get("activeIdentities")[0]&&wp_e2.echo_user.get("activeIdentities")[0].username)+" - synced: "+wp_e2._isUserSynced())}});Echo.Events.subscribe({"topic":"Echo.Canvas.onRender","context":"global","handler":function(topic,data,contextId){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - Canvas.onReady")}});wp_e2.initStatus.wp_e2_init=true;$(document).trigger("TWP.Apps.Init.Complete")};wp_e2._getIgnoredUsers=
function(){if(typeof wp_e2!=="undefined"&&(wp_e2.echo_user&&wp_e2.echo_user.is("logged"))&&!wp_e2.ignoredUsers){var current_user_id=encodeURI(wp_e2.echo_user.get("identityUrl"));var ignoredUsers=$.getJSON(wp_e2.mongoUserActionUrl+"?jsonp\x3d?",'q\x3d{"user_id":"'+current_user_id+'","action":"Ignore"}',function(data){wp_e2.ignoredUsers=[];$.each(data.q_results[0].rows,function(index,row){wp_e2.ignoredUsers.push(row.target_user_id)})})}};wp_e2._initOmnitureVariables=function(){var commonVars={};try{commonVars=
{"eVar1":s.eVar1,"eVar2":s.eVar2,"eVar8":s.eVar8,"eVar17":s.eVar17,"eVar33":s.eVar33}}catch(err){}$.extend(onPostCompleteVars,commonVars);onMoreVars={"eVar26":"load more comments"};$.extend(onMoreVars,commonVars)};wp_e2.setSubmitMarkers=function(thisContainer){var newMarker=wp_e2[thisContainer].sectionid!==""&&typeof wp_e2[thisContainer].sectionid!=="undefined"?wp_e2[thisContainer].sectionid:"";newMarker+=wp_e2[thisContainer].moderationrequired===true?", "+wp_e2.MODERATION_REQUIRED:"";newMarker+=
wp_e2[thisContainer].display_ugc_photos===true?", "+wp_e2.PHOTO:"";wp_e2[thisContainer].submitMarkers=newMarker.split(", ")};wp_e2._getTimeoutValue=function(classType,webType,thisContainer){if(typeof thisContainer!=="undefined"&&wp_e2[thisContainer].allow_comments==false)webType="closed";else if(typeof webType=="undefined"||webType=="")webType="no_webtype";var timeout=typeof wp_e2.liveUpdatesTimeout[classType][webType]!=="undefined"?wp_e2.liveUpdatesTimeout[classType][webType]:wp_e2.liveUpdatesTimeout[classType]["default"];
return timeout};wp_e2._toString=function(myObj,key){for(myKey in myObj){console.log("config"+(typeof key==="undefined"||key===-1?"":"["+key+"]")+"["+myKey+"] \x3d "+myObj[myKey]);if(typeof myObj[myKey]==="object")wp_e2.toString(myObj[myKey],myKey)}};wp_e2._isUserSynced=function(){var userSynced=false;if(typeof userLoginState!=="undefined"&&userLoginState!==null&&typeof wp_e2.echo_user!=="undefined"&&(userLoginState==="login"&&wp_e2.echo_user.is("logged")||userLoginState==="logout"&&!wp_e2.echo_user.is("logged")))userSynced=
true;return userSynced};wp_e2._userHasCookies=function(){var userHasCookies="none";if(wp_e2._getCookie("wapo_display")===""&&wp_e2._getCookie("wapo_groups")===""&&wp_e2._getCookie("wapo_login_id")==="")userHasCookies="none";else if(wp_e2._getCookie("wapo_display")!==""&&wp_e2._getCookie("wapo_groups")!==""&&wp_e2._getCookie("wapo_login_id")!=="")userHasCookies="all";else userHasCookies="some";return userHasCookies};wp_e2._shareRender=function(element,thisConfig){element.find(".echo-streamserver-controls-stream-item-button-share").on("mouseenter",
thisConfig,function(event){var shareOverlay;var thisConfig=event.data;var thisContainer=thisConfig.config.get("thisContainer");var thisComment=thisConfig.component;event.stopPropagation();if($(this).find(".more").length==0){var FBappId=TWP&&TWP.Data&&TWP.Data.environment&&(TWP.Data.environment=="prod"||TWP.Data.environment=="stage")?"41245586762":"98319225937";var shareControl=$(".comment-share-info").html();var thisCommentURL=thisComment.data.object.id;thisCommentURL=thisCommentURL.replace("http://",
"");var thisCommentPermalinkURL=thisComment.data.object.context[0].uri+encodeURIComponent("?outputType\x3dcomment\x26commentID\x3d")+thisCommentURL;var conversationHeadline='"'+(thisComment.data.object.context[0].title||$("h1.headline").text()||document.title&&document.title.split(" - ")[0])+'"';var thisAuthorAvatar=thisComment.data.actor.avatar;var FBImageCheck=thisAuthorAvatar.indexOf("facebook");var FBCDNImageCheck=thisAuthorAvatar.indexOf("fbcdn");if(FBImageCheck>0||FBCDNImageCheck>0)thisAuthorAvatar=
"//img.washingtonpost.com/pb/resources/img/echo2/avatar-default.png";var thisCommentAuthor=thisComment.data.actor.title;var thisFBHeadline=thisCommentAuthor+" commented on ";var thisCommentPermalinkHeadline=thisFBHeadline+conversationHeadline;var thisFBHeadline=thisFBHeadline+"...";thisCommentPermalinkHeadline=encodeURI(thisCommentPermalinkHeadline);var thisFBConversationHeadline=conversationHeadline;conversationHeadline=encodeURI(conversationHeadline);var thisCommentContent=thisComment.data.object.content;
if(thisComment.data.object.content.length>100)thisCommentContent=thisCommentContent.substr(0,100)+"...";var thisFBCommentContent=thisCommentContent;thisCommentContent=escape(thisCommentContent);shareControl=shareControl.replace(/{shareURL}/g,thisCommentPermalinkURL);shareControl=shareControl.replace(/{headline}/g,thisCommentPermalinkHeadline);shareControl=shareControl.replace(/{summaryText}/g,thisCommentContent);shareControl=shareControl.replace(/{FBCaption}/g,conversationHeadline);shareControl=shareControl.replace(/{FBHeadline}/g,
thisFBHeadline);shareControl=shareControl.replace(/{readerAvatar}/g,thisAuthorAvatar);shareControl=shareControl.replace(/{appKey}/g,FBappId);var obj=$(shareControl);obj.appendTo($(this));shareOverlay=$(this).find(".more");$(shareOverlay).show()}else $(this).find("#newsharebar").show()});element.find(".echo-streamserver-controls-stream-item-button-share").on("mouseleave",thisConfig,function(event){event.stopPropagation();$(this).find("#newsharebar").hide()})};wp_e2._getCookie=function(cookieName){var cookieValue=
$.cookie(cookieName);return cookieValue!=null?cookieValue:""};wp_e2._setCookie=function(cookieName,cookieValue,options){$.cookie(cookieName,cookieValue,options)};wp_e2.renderCommentCount=function(elm){if(wp_e2._isUserSynced()){var guid="";var thisContainer=elm.closest(wp_e2.ECHO_CONTAINER).attr("id");if(typeof elm.attr("guid")!=="undefined")guid=elm.attr("guid");if(typeof guid=="undefined"||guid=="")guid=typeof thisContainer!=="undefined"?wp_e2[thisContainer].guid:wp_e2.guid;if(wp_e2[thisContainer].displayuserstream===
true&&(TWP&&TWP.Util&&TWP.Util.User&&!TWP.Util.User.getAuthentication())){$(".echo-stream-container").html('\x3cdiv class\x3d"account-error"\x3e\x3ca class\x3d"signin" href\x3d""\x3ePlease Sign In to See Comments\x3c/a\x3e\x3c/div\x3e');return}try{new Echo.StreamServer.Controls.Counter({"target":elm&&elm.hasClass(wp_e2.COUNTER_CLASS)?elm:elm&&elm.find(wp_e2.COUNTER_TARGET),"apiBaseURL":wp_e2.apiBaseURL+"/v1/","appkey":wp_e2.appkey,"query":wp_e2.getQuery(wp_e2[thisContainer].guid,thisContainer,wp_e2[thisContainer].itemurl),
"liveUpdates":{"enabled":true,"polling":{"timeout":wp_e2._getTimeoutValue("counter","default",thisContainer)}},"plugins":[{"name":"PageVisibilityDetectorCount","thisContainer":thisContainer}]})}catch(e){}debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"echo2/v2/core/twp_comments_echo2.js - started counter and attached to .echo-counter for stream: ["+thisContainer+"]")}};wp_e2.refreshComments=function(data){Echo.jQuery(data.id+" .echo-apps-conversations-container").trigger("TWP.Comments.RequestRefresh",
data);$(window.document).on("TWP.Comments.RefreshComplete",function(event,data){})};wp_e2._getNotes=function(elm){elm.each(function(){var thisContainer=$(this).attr("id");wp_e2[thisContainer].verifiedcommenteridlist={};wp_e2[thisContainer].verifiedcommenteridlist.idlist="";if(wp_e2[thisContainer].includeverifiedcommenters==true){var requestData={};requestData.echocontainer=thisContainer;requestData.targetUrl=wp_e2[thisContainer].guid;wp_e2.echo_user?requestData.userid=wp_e2.echo_user.get("identityUrl"):
"";$.ajax({"url":wp_e2.commentBadgesUrl,"cache":true,"data":requestData,"timeout":3E3,"dataType":"jsonp"}).always(function(data,status){var temp={};if(status=="success"&&data&&data.content!=""){temp=eval(data.content);var thisContainer=temp.echocontainer;wp_e2[thisContainer].verifiedcommenteridlist.userArray={};$.each(temp.userSet,function(key,obj){wp_e2[thisContainer].verifiedcommenteridlist.userArray[obj.id]={"name":obj.name,"verification_status":obj.verification_status}});wp_e2[thisContainer].verifiedcommenteridlist.idlist=
temp.verifiedidlist}wp_e2.initStatus.badge_init=true;$(document).trigger("TWP.Apps.Init.Complete");if(Echo&&Echo.Events)Echo.Events.publish({"topic":"TWP.Badge.Request.Complete","data":temp})})}else{wp_e2.initStatus.badge_init=true;$(document).trigger("TWP.Apps.Init.Complete")}})};wp_e2.validateVersion=function(){try{setInterval(function(){$.ajax({"url":wp_e2.validateURL,"cache":false,"data":{"outputType":"javascript","v":wp_e2.echo_version||"3.1","sp":"echo_version"},"timeout":3E3,"dataType":"jsonp",
"jsonp":"callback"}).always(function(data,status){if(status=="success"&&data&&data.version_check!=="ok")if(data.action=="notify"){$(".echo-apps-conversations-postComposer").find(".echo-feature-notification").remove();$(".echo-apps-conversations-postComposer").append('\x3cdiv class\x3d"echo-feature-notification"\x3eYour version of the Comments application is out of date.  Please refresh your page. \x3c/div\x3e')}else if(data.action=="refresh")location.reload()})},18E5)}catch(e){}};wp_e2.initCanvas=
function(elm){var pluginArray=[];var canvasConfig=wp_e2.initConfig(elm);var thisContainer=elm.attr("id");var thisCanvasId=wp_e2[thisContainer]["data-canvas-id"];var thisCanvasApp=wp_e2[thisContainer]["data-app-instance"];var thisCanvasTarget=$("#"+thisContainer+" .echo-canvas");thisCanvasTarget.attr({"data-app-instance":thisCanvasApp,"data-canvas-id":thisCanvasId});if(wp_e2[thisContainer].displayuserstream===true&&(TWP&&TWP.Util&&TWP.Util.User&&!TWP.Util.User.getAuthentication()));else{Echo.Loader.override(thisCanvasId,
thisCanvasApp,canvasConfig);Echo.Loader.init({"canvases":thisCanvasTarget})}};wp_e2.initConfig=function(elm){var thisContainer=elm.attr("id");wp_e2.setSubmitMarkers(thisContainer);var tmpSortOrder=wp_e2&&wp_e2[thisContainer].streamSettings&&wp_e2[thisContainer].streamSettings.defaultsort?wp_e2[thisContainer].streamSettings.defaultsort:"reverseChronological";var cookieName="comments_sortorder";var tempCookie=Echo.Cookie.get("comments_sortorder")&&Echo.Cookie.get("comments_sortorder").split("|")||[];
var tmpSortOrder={};$.each(tempCookie,function(key,value){var pair=value.split(":");tmpSortOrder[pair[0]]=pair[1]});var conversationsPluginArray=[{"name":"TWP_Conversations_App","thisContainer":thisContainer}];var canvasConfig={"targetURL":wp_e2&&wp_e2[thisContainer].guid,"streamingControl":{"pauseOnHover":false,"displayStreamingStateHeader":true,"enablePausePlayToggle":true},"dependencies":{"StreamServer":{"apiBaseURL":wp_e2.apiBaseURL+"/v1/","submissionProxyURL":wp_e2.echoSubmissionProxyURL,"appkey":wp_e2&&
wp_e2.appkey,"openLinksInNewWindow":true,"liveUpdates":wp_e2.isMobile?wp_e2.liveUpdates.mobile:wp_e2.liveUpdates.desktop,"componentSpecific":wp_e2.componentSpecific,"item":{}}},"auth":{"plugins":[{"name":"TWP_formAuth","thisContainer":thisContainer}]},"postComposer":{"visible":$("#"+thisContainer).hasClass("submitbox")&&wp_e2[thisContainer].allow_comments===true?true:false,"displaySharingOnPost":false,"displayCompactForm":true,"plugins":wp_e2[thisContainer].plugins.submitboxPluginArray},"replyComposer":{"visible":($("#"+
thisContainer).hasClass("submitbox")||$("#"+thisContainer).hasClass("permalink"))&&wp_e2[thisContainer].allow_comments===true&&!wp_e2.echo_user.userSuspended?true:false,"displayCompactForm":false,"displaySharingOnPost":false,"plugins":wp_e2[thisContainer].plugins.submitboxPluginArray},"topPosts":{"visible":wp_e2&&typeof wp_e2[thisContainer].itemurl=="undefined"&&(wp_e2[thisContainer].includeverifiedcommenters===true&&wp_e2[thisContainer].verifiedcommenteridlist.idlist!=""),"label":wp_e2[thisContainer].includeverifiedcommenters===
true?"Commenters mentioned in this story":"Top Comments","queryOverride":wp_e2.getQuery(wp_e2[thisContainer].guid,thisContainer,wp_e2[thisContainer].itemurl,wp_e2[thisContainer].verifiedcommenteridlist.idlist,"top"),"plugins":wp_e2[thisContainer].plugins.streamPluginArray.concat([{"name":"Edit","nestedPlugins":[{"name":"TextCounter","limit":wp_e2[thisContainer].commentmaxlength},{"name":"TWP_Edit","thisContainer":thisContainer}]},{"name":"CardUIShim","collapsedContentHeight":291,"labels":{"seeMore":"See More"}},
{"name":"TWP_Stream_Item_Top","thisContainer":thisContainer}]),"displaySharingIntent":false,"initialItemsPerPage":wp_e2[thisContainer].streamSettings.top.maxitems,"initialSortOrder":wp_e2[thisContainer].streamSettings.sortorder,"displaySortOrderPulldown":false,"displayCounter":false,"displayTopPostHighlight":false,"displaySharingIntent":false,"displayLikeIntent":wp_e2[thisContainer].recommend,"displayReplyIntent":wp_e2[thisContainer].includereply,"displayCommunityFlagIntent":wp_e2[thisContainer].includereport,
"replyNestingLevels":2,"itemTypes":["comment"],"maxItemBodyCharacters":750,"labels":{"seeMore":"See Morexxx","childrenMoreItems":"See More Replies"},"sortOrderEntries":[{"title":"Newest First ","value":"reverseChronological"},{"title":"Oldest First ","value":"chronological"},{"title":"Most Replies ","value":"repliesDescending"},{"title":"Most Liked ","value":"likesDescending"}]},"allPosts":{"visible":$("#"+thisContainer).hasClass("stream"),"label":wp_e2[thisContainer].streamlabel&&wp_e2[thisContainer].streamlabel!==
""?wp_e2[thisContainer].streamlabel:$("#"+thisContainer).hasClass("permalink")||$("#"+thisContainer).hasClass("mycomments")?"":"All Comments","queryOverride":wp_e2[thisContainer].initialquery&&wp_e2[thisContainer].initialquery!==""?wp_e2[thisContainer].initialquery:wp_e2.getQuery(wp_e2[thisContainer].guid,thisContainer,wp_e2[thisContainer].itemurl).replace(/sortOrder:\S+/,"sortOrder:"+(tmpSortOrder.allPosts||"reverseChronological")),"displaySharingIntent":false,"plugins":wp_e2[thisContainer].plugins.streamPluginArray.concat([{"name":"Edit",
"nestedPlugins":[{"name":"TextCounter","limit":2E3},{"name":"TWP_Edit","thisContainer":thisContainer}]},{"name":"CardUIShim","collapsedContentHeight":511,"labels":{"seeMore":"See More"}}]),"initialItemsPerPage":wp_e2[thisContainer].streamSettings.all.maxitems,"initialSortOrder":wp_e2[thisContainer].streamSettings.sortorder,"displaySortOrderPulldown":wp_e2[thisContainer].includesorts,"displayCounter":false,"displayTopPostHighlight":false,"displaySharingIntent":false,"displayLikeIntent":wp_e2[thisContainer].recommend,
"displayReplyIntent":wp_e2[thisContainer].includereply,"displayCommunityFlagIntent":wp_e2[thisContainer].includereport,"replyNestingLevels":2,"itemTypes":["comment"],"maxItemBodyCharacters":750,"itemsRefreshInterval":60,"sortOrderEntries":[{"title":"Newest First ","value":"reverseChronological"},{"title":"Oldest First ","value":"chronological"},{"title":"Most Replies ","value":"repliesDescending"},{"title":"Most Liked ","value":"likesDescending"}]},"featuredPosts":{"visible":$("#"+thisContainer).hasClass("stream")&&
(wp_e2[thisContainer].includetabs&&(wp_e2[thisContainer].usermarkersfeatured!=""||wp_e2[thisContainer].markersfeatured!="")),"label":wp_e2[thisContainer].streamlabel&&wp_e2[thisContainer].streamlabel!==""?wp_e2[thisContainer].streamlabel:$("#"+thisContainer).hasClass("permalink")||$("#"+thisContainer).hasClass("mycomments")?"":"Featured Comments","queryOverride":wp_e2[thisContainer].initialquery&&wp_e2[thisContainer].initialquery!==""?wp_e2[thisContainer].initialquery:wp_e2.getQuery(wp_e2[thisContainer].guid,
thisContainer,wp_e2[thisContainer].itemurl,"","featured").replace(/sortOrder:\S+/,"sortOrder:"+(tmpSortOrder.featuredPosts||"reverseChronological")),"displaySharingIntent":false,"plugins":wp_e2[thisContainer].plugins.streamPluginArray.concat([{"name":"Edit","nestedPlugins":[{"name":"TextCounter","limit":2E3},{"name":"TWP_Edit","thisContainer":thisContainer}]},{"name":"CardUIShim","collapsedContentHeight":511,"labels":{"seeMore":"See More"}}]),"initialItemsPerPage":wp_e2[thisContainer].streamSettings.all.maxitems,
"initialSortOrder":wp_e2[thisContainer].streamSettings.sortorder,"displaySortOrderPulldown":wp_e2[thisContainer].includesorts,"displayCounter":false,"displayTopPostHighlight":false,"displaySharingIntent":false,"displayLikeIntent":wp_e2[thisContainer].recommend,"displayReplyIntent":false,"displayCommunityFlagIntent":wp_e2[thisContainer].includereport,"replyNestingLevels":2,"itemTypes":["comment"],"maxItemBodyCharacters":750,"itemsRefreshInterval":60,"sortOrderEntries":[{"title":"Newest First ","value":"reverseChronological"},
{"title":"Oldest First ","value":"chronological"},{"title":"Most Replies ","value":"repliesDescending"},{"title":"Most Liked ","value":"likesDescending"}]},"plugins":wp_e2[thisContainer].plugins.streamPluginArray.concat(wp_e2[thisContainer].plugins.submitPluginArray,conversationsPluginArray),"query":wp_e2.getQuery(wp_e2[thisContainer].guid,thisContainer,wp_e2[thisContainer].itemurl)};return canvasConfig};wp_e2.initContainers=function(elms){wp_e2.initStatus.canvas_init=true;elms.each(function(){var elm=
$(this);if(elm.hasClass("canvas")){wp_e2.initCanvas(elm);wp_e2.renderCommentCount(elm)}else;})};$(window.document).on("TWP.Apps.Init.Complete",function(){if(wp_e2.initStatus&&wp_e2.initStatus.badge_init===true&&wp_e2.initStatus.wp_e2_init===true&&wp_e2.initStatus.user_init===true&&wp_e2.initStatus.canvas_init===false){wp_e2.initContainers($(wp_e2.ECHO_CONTAINER));wp_e2._getNotes($(wp_e2.ECHO_CONTAINER+".stream"));wp_e2.validateVersion()}});$(window.document).on("TWP.Echo.User.InitComplete",function(){var bannedTimes=
wp_e2["suspend_user_markers"]||{},currBanTime="";var userMarkers=wp_e2._isUserSynced()&&wp_e2.echo_user.is("logged")&&wp_e2.echo_user.get("markers")||[];$.each(bannedTimes,function(key,value){if($.inArray(key,userMarkers)>=0){wp_e2.echo_user.userSuspended=true;return}})});Echo.Loader.config.errorTimeout=15E3;Echo.Loader.config.cdnBaseURL="https://js.washingtonpost.com/",Echo.Loader.config.storageURL={"aws":{"prod":"https://js.washingtonpost.com/wp-stat/echo2/canvases/","dev":"https://js.washingtonpost.com/wp-stat/echo2/canvases/"}};
Echo.Loader.initEnvironment(function(){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"starting loader.download");Echo.Loader.download([],function(){debug&&window.console&&console.log&&console.log("["+(new Date-TWP_Debug.initialTime)/1E3+"]"+"starting wp_e2.init");wp_e2&&wp_e2.init();$(window.document).trigger("TWP.Apps.Init.Complete")})});wp_e2._getNotes($(wp_e2.ECHO_CONTAINER+".stream"))})(jQuery);
/**
 * Copyright 2012-2014 Echo.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Version: 1.3.8 (2014-08-21 14:18:34 UTC)
 */
(function($) {
"use strict";

if (Echo.App.isDefined("Echo.Apps.Conversations")) return;

var conversations = Echo.App.manifest("Echo.Apps.Conversations");

conversations.config = {
	"targetURL": "",
	"bozoFilter": false,
	"viewportChangeTimeout": 50,
	"streamingControl": {
		"pauseOnHover": true,
		"displayStreamingStateHeader": false,
		"enablePausePlayToggle": true
	},
	"postComposer": {
		"visible": true,
		"displaySharingOnPost": true,
		"contentTypes": {
			"comments": {
				"visible": true,
				"prompt": "What's on your mind?",
				"resolveURLs": true,
				"attachments": {
					"visible": false,
					"sources": ""
				}
			}
		},
		"confirmation": {
			"enable": true,
			"message": "Thanks, your post has been submitted for review",
			"timeout": 5000,
			"hidingTimeout": 300
		},
		"plugins": []
	},
	"replyComposer": {
		"visible": true,
		"displaySharingOnPost": true,
		"displayCompactForm": true,
		"contentTypes": {
			"comments": {
				"visible": true,
				"prompt": "What's on your mind?",
				"resolveURLs": true,
				"attachments": {
					"visible": false,
					"sources": ""
				}

			}
		},
		"confirmation": {
			"enable": true,
			"message": "Thanks, your post has been submitted for review",
			"timeout": 5000
		},
		"plugins": []
	},
	"topPosts": {
		"visible": true,
		"label": "Top Posts",
		"markItemsAsReadOn": "viewportenter", // "viewportenter" or "mouseenter"
		"queryOverride": "",
		"collapsedContentHeight": 110, // px
		"initialItemsPerPage": 5,
		"initialSortOrder": "reverseChronological",
		"includeTopContributors": true,
		"displaySourceIcons": true,
		"displaySortOrderPulldown": true,
		"displayCounter": true,
		"displayTopPostHighlight": true,
		"displaySharingIntent": true,
		"displayLikeIntent": true,
		"displayReplyIntent": true,
		"displayEditIntent": true,
		"displayCommunityFlagIntent": false,
		"displayTweets": true,
		"likesDisplayStyle": "number",
		"replyNestingLevels": 2,
		"itemStates": ["Untouched", "ModeratorApproved"],
		"itemMarkers": [],
		"itemTypes": [],
		"openLinksInNewWindow": true,
		"sortOrderEntries": [{
			"title": "Newest First",
			"value": "reverseChronological"
		}, {
			"title": "Oldest First",
			"value": "chronological"
		}, {
			"title": "Most popular",
			"value": "repliesDescending"
		}, {
			"title": "Most likes",
			"value": "likesDescending"
		}],
		"moderation": {
			"displayCommunityFlaggedPosts": true,
			"displaySystemFlaggedPosts": true
		},
		"events": {
			"onPostCountUpdate": null
		},
		"plugins": []
	},
	"allPosts": {
		"visible": true,
		"label": "All Posts",
		"markItemsAsReadOn": "viewportenter", // "viewportenter" or "mouseenter"
		"queryOverride": "",
		"collapsedContentHeight": 110, // px
		"initialItemsPerPage": 15,
		"initialSortOrder": "reverseChronological",
		"displaySourceIcons": true,
		"displaySortOrderPulldown": true,
		"displayCounter": true,
		"displayTopPostHighlight": true,
		"displaySharingIntent": true,
		"displayLikeIntent": true,
		"displayReplyIntent": true,
		"displayEditIntent": true,
		"displayCommunityFlagIntent": true,
		"displayTweets": true,
		"likesDisplayStyle": "number",
		"replyNestingLevels": 2,
		"noPostsMessage": "There are no posts yet.<br>Be the first to chime in!",
		"itemStates": ["Untouched", "ModeratorApproved"],
		"itemMarkers": [],
		"itemTypes": [],
		"openLinksInNewWindow": true,
		"sortOrderEntries": [{
			"title": "Newest First",
			"value": "reverseChronological"
		}, {
			"title": "Oldest First",
			"value": "chronological"
		}, {
			"title": "Most popular",
			"value": "repliesDescending"
		}, {
			"title": "Most likes",
			"value": "likesDescending"
		}],
		"moderation": {
			"displayCommunityFlaggedPosts": false,
			"displaySystemFlaggedPosts": true,
			"premoderation": {
				"enable": false,
				"approvedUserBypass": true,
				"markers": ["Conversations.Premoderation"]
			}
		},
		"events": {
			"onPostCountUpdate": null
		},
		"plugins": []
	},
	"featuredPosts": {
		"visible": true,
		"label": "Featured Posts",
		"markItemsAsReadOn": "viewportenter", // "viewportenter" or "mouseenter"
		"queryOverride": "",
		"collapsedContentHeight": 110, // px
		"initialItemsPerPage": 5,
		"initialSortOrder": "reverseChronological",
		"includeTopContributors": true,
		"displaySourceIcons": true,
		"displaySortOrderPulldown": true,
		"displayCounter": false,
		"displayTopPostHighlight": true,
		"displaySharingIntent": false,
		"displayLikeIntent": true,
		"displayReplyIntent": false,
		"displayEditIntent": true,
		"displayCommunityFlagIntent": true,
		"displayTweets": false,
		"likesDisplayStyle": "number",
		"replyNestingLevels": 2,
		"itemStates": ["Untouched", "ModeratorApproved"],
		"itemMarkers": [],
		"itemTypes": [],
		"openLinksInNewWindow": true,
		"sortOrderEntries": [{
			"title": "Newest First",
			"value": "reverseChronological"
		}, {
			"title": "Oldest First",
			"value": "chronological"
		}, {
			"title": "Most popular",
			"value": "repliesDescending"
		}, {
			"title": "Most likes",
			"value": "likesDescending"
		}],
		"moderation": {
			"displayCommunityFlaggedPosts": true,
			"displaySystemFlaggedPosts": false
		},
		"events": {
			"onPostCountUpdate": null
		},
		"plugins": []
	},
	"moderationQueue": {
		"label": "Moderation Queue",
		"displayReplyIntent": false,
		"displaySharingIntent": false,
		"events": {
			"onPostCountUpdate": null
		}
	},
	"auth": {
		"enableBundledIdentity": true,
		"hideLoginButtons": false,
		"allowAnonymousSubmission": false,
		"authWidgetConfig": {},
		"sharingWidgetConfig": {},
		"plugins": []
	},
	"dependencies": {
		"Janrain": {
			"appId": undefined
		},
		"StreamServer": {
			"appkey": undefined,
			"apiBaseURL": "//api.echoenabled.com/v1/",
			"submissionProxyURL": "https://apps.echoenabled.com/v2/esp/activity",
			"liveUpdates": {
				"transport": "websockets",
				"websockets": {
					"URL": "//live.echoenabled.com/v1/"
				},
			},
			"componentSpecific": {
				"featuredPosts": {
					"liveUpdates": {
						"transport": "websockets",
						"websockets": {
							"URL": "//live.echoenabled.com/v1/"
						}
					}
				}
			}	
		},
		"FilePicker": {
			"apiKey": "AFLWUBllDRwWZl7sQO1V1z"
		}
	},
	"topMarkers": {
		"item": "Conversations.TopPost",
		"user": "Conversations.TopContributor"
	},
	"presentation": {
		"minimumWidth": 320,
		"maximumHeight": undefined,
		"maximumWidth": undefined,
		"maximumMediaWidth": undefined
	}
};

conversations.vars = {
	"streamingState": "live",
	"changeStateOnHover": true,
	"activitiesCount": 0
};

conversations.labels = {
	"paused": "Paused",
	"live": "Streaming...",
	"itemsWaiting": "({count} new items waiting)"
};

conversations.config.normalizer = {
	"dependencies": function(value) {
		// Parameters order in a config might be different,
		// so we are handling all possible situations to make sure
		// that all required params are defined.
		var streamServer = Echo.Utils.get(value, "StreamServer", {});
		this.set("appkey", streamServer.appkey);
		this.set("apiBaseURL", streamServer.apiBaseURL);
		this.set("submissionProxyURL", streamServer.submissionProxyURL);
		return value;
	},
	"appkey": function(value) {
		return Echo.Utils.get(this.data, "dependencies.StreamServer.appkey", value);
	},
	"apiBaseURL": function(value) {
		return Echo.Utils.get(this.data, "dependencies.StreamServer.apiBaseURL", value);
	},
	"submissionProxyURL": function(value) {
		return Echo.Utils.get(this.data, "dependencies.StreamServer.submissionProxyURL", value);
	},
	"moderationQueue": function(value) {
		// TODO this code doesn't work if there is "moderationQueue" hash defined before "allPosts" in the app config.
		return $.extend(true, {}, this.get("allPosts"), value);
	},
	"targetURL": function(value) {
		if (value) {
			return value;
		}
		var pageURL = $("link[rel='canonical']").attr('href');
		if (!pageURL || !Echo.Utils.parseURL(pageURL).domain) {
			pageURL =  document.location.href.split("#")[0];
		}
		return pageURL;
	},
	"auth": function(value) {
		value.buttons = !!value.hideLoginButtons ? [] : ["login", "signup"];
		return value;
	}
};

conversations.dependencies = [{
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js",
	"control": "Echo.StreamServer.Controls.Stream"
}, {
	"loaded": function() { return !!Echo.GUI; },
	"url": "{config:cdnBaseURL.sdk}/gui.pack.js"
}, {
	"url": "{config:cdnBaseURL.sdk}/gui.pack.css"
}, {
	"url": "{config:cdnBaseURL.apps}/conversations/v1.3.8/third-party/jquery.embedly.js",
	"loaded": function() { return !!$.fn.embedly; }
}];

conversations.events = {
	"Echo.StreamServer.Controls.Stream.onActivitiesCountChange": function(_, data) {
		var allPosts = this.getComponent("allPosts");
		// display activities for 'allPosts' section only.
		if (allPosts && allPosts.config.get("context") === data.context) {
			this.set("activitiesCount", data.count);
			this.view.render({"name": "itemsWaiting"});
		}
	},
	"Echo.StreamServer.Controls.Counter.onUpdate": function(_, data) {
		var app = this;
		$.each(["featuredPosts", "allPosts", "topPosts", "moderationQueue"], function(k, componentName) {
			var component = app.getComponent(componentName + "Counter");
			if (component && component.config.get("target").is(data.target)) {
				app._triggerCounterUpdateEvent({
					"component": componentName,
					"count": data.data.count
				});
				return false;
			}
		});
	}
};

conversations.init = function() {
	var app = this;
	this._retrieveData(function() {
		app.render();
		app.ready();
	});

	this._viewportChangeTimeout = null;
	// We cannot pass _viewportChange method as an event handler. In this case it will be called with wrong context.
	this._viewportChangeHandler = function() {
		app._viewportChange.call(app);
	};
	if (
		this.config.get("allPosts.markItemsAsReadOn") === "viewportenter"
		|| this.config.get("topPosts.markItemsAsReadOn") === "viewportenter"
	) {
		$(window).on("scroll resize", this._viewportChangeHandler);
	}
};

conversations.destroy = function() {
	$(window).off("scroll resize", this._viewportChangeHandler);
};

conversations.templates.utilHeader =
	'<ul class="{class:utilHeader}">' +
		'<li class="pull-left echo-primaryFont {class:streamSorter}"></li>' +
		'<li class="pull-right echo-primaryFont {class:streamingStateContainer}">' + 
			'<div class="{class:streamingState}">' +
				'<div class="pull-right {class:itemsWaiting}"></div>' +
				'<div class="{class:streamingState}"></div>' +
				'<div class="clearfix"></div>' +
			'</div>' +
		'</li>' +		
	'</ul>';

conversations.templates.main =
	'<div class="{class:container}">' +
		'<iframe class="{class:resizeFrame}"  width=100% height=100% frameBorder=0 ></iframe>' +
		'<div class="{class:content}">' +
			'<div class="{class:postComposer}"></div>' +
			'<div class="{class:topPostsContainer}">' +
				'<div class="{class:topPostsHeader}"></div>' +
				'<div class="{class:topPosts}"></div>' +
			'</div>' +			
			'<div class="{class:allPostsContainer}">' +
				'<div class="active {class:allPosts}">' + 			
				'</div>' +
				conversations.templates.utilHeader + 
			'</div>' +
		'</div>' +
	'</div>';

conversations.templates.streamingState = 
		'<div class="{class:streamingState}">' +
			'<div class="pull-right {class:itemsWaiting}"></div>' +
			'<div class="{class:streamingState}"></div>' +
			'<div class="clearfix"></div>' +
		'</div>';

conversations.templates.streamHeader =
	'<div class="{class:streamHeader}">' +
	'<ul class="nav nav-tabs {class:tabs} ">' +
		'<li class="echo-primaryFont {class:streamTitle}"></li>' +
		'<li class="pull-right echo-primaryFont {class:streamSorter}"></li>' +
	'</ul>' +
	'</div>';



conversations.templates.streamTitle =
	'<span class="{class:streamTitle}">' +
		'<span class="{class:streamCaption}">{data:label}</span>' +
		'<span class="{class:streamCounter}"></span>' +
	'</span>';

conversations.templates.tabs = new Echo.GUI.Tabs({
  		"target": ".css-selector",
  		"entries": [{
  			"id": "tab1",
  			"label": "Tab 1",
  			"panel": $(".panel-css-selector"),
  			"extraClass": "extra-class"
  		}, {
  			"id": "tab2",
  			"label": "Tab 2",
  			"panel": $(".panel-css-selector2"),
  		}],
  		"extraClass": "extra-class",
  		"select": function() {},
  		"show": function() {},
  		"shown": function() {}
  	});
conversations.templates.tabs.nav =
	'<div class="{class:streamHeader} "><ul class="nav nav-tabs has-tabs {class:tabs} "></ul></div>';

conversations.templates.tabs.navItem =
	'<li class="nav-item {data:class}  {data:tabName}">' +
		'<a href="#{data:tabId}" data-toggle="{data:type}"></a>' +
	'</li>';

conversations.templates.tabs.content =
	'<div class="tab-content {class:tabsContent}">' + 
	'</div>';

conversations.templates.tabs.contentItem =
	'<div class="tab-pane {data:class} {data:tabName}" id="{data:tabId}"></div>';

conversations.templates.defaultQuery =
	'{data:filter}:{data:targetURL} {data:excludedSources} sortOrder:{data:initialSortOrder} safeHTML:permissive ' +
	'itemsPerPage:{data:initialItemsPerPage} {data:markers} {data:type} ' +
	'{data:operators} children:{data:replyNestingLevels} {data:childrenOperators}';

conversations.renderers.streamingStateContainer = function(element) {
	if (!this.config.get("streamingControl.displayStreamingStateHeader")) {
		element.hide();
	}
	return element;
};

conversations.renderers.resizeFrame = function(element) {
	var self = this;
	element.on('load', function() {
		var timeout;
		this.contentWindow.onresize = function() {
			if (timeout) {
				clearTimeout(timeout);
			}
			timeout = setTimeout(function() {
				self.events.publish({
					"topic": "onAppResize"
				});
			}, 50);
		};
	});
	return element;
};

conversations.renderers.streamingState = function(element) {
	var self = this;
	var state = this.get("streamingState");
	var oldState = {"paused": "live", "live": "paused"}[state];
	if (this.config.get("streamingControl.enablePausePlayToggle")) {
		element.addClass("echo-clickable");
		element
			.off("click.streamingState")
			.on("click.streamingState", function() {
			self.setStreamingState(oldState, true);
		});
	}
	return element
		.empty()
		.removeClass(this.cssPrefix + "streamingState-" + oldState)
		.addClass(this.cssPrefix + "streamingState-" + state)
		.append(this.labels.get(state));
};

conversations.renderers.itemsWaiting = function(element) {
	var streamingState = this.get("streamingState");
	var activitiesCount = this.get("activitiesCount");
	element.empty();
	if (streamingState === "paused" && activitiesCount) {
		return element
			.append(this.labels.get("itemsWaiting", {"count": activitiesCount}))
			.show();
	} else {
		element.hide();
	}
	return element;
};

conversations.renderers.container = function(element) {
	var presentationParams = this.config.get("presentation");
	element.css({
		"min-width": presentationParams.minimumWidth + "px",
		"max-width": presentationParams.maximumWidth + "px",
		"max-height": presentationParams.maximumHeight + "px",
		"overflow-y": "auto"
	});
	return element;

};

conversations.renderers.content = function(element) {
	var self = this;
	if (this.config.get("streamingControl.pauseOnHover")) {
		element
			.on("mouseenter", function() { self.setStreamingState("paused"); })
			.on("mouseleave", function() { self.setStreamingState("live"); });
	}
	return element;
};

conversations.renderers.postComposer = function(element) {
	var config = this.config.get("postComposer");

	if (!this._isComposerVisible("postComposer")) {
		return element;
	}

	var targetURL = this.config.get("targetURL");
	var enableBundledIdentity = this.config.get("auth.enableBundledIdentity");
	var ssConfig = this.config.get("dependencies.StreamServer");

	this.initComponent({
		"id": "postComposer",
		"component": "Echo.StreamServer.Controls.Submit",
		"config": $.extend(true, {
			"appkey": ssConfig.appkey,
			"apiBaseURL": ssConfig.apiBaseURL,
			"submissionProxyURL": ssConfig.submissionProxyURL,
			"requestMethod": "POST",
			"target": element,
			"targetURL": targetURL,
			"infoMessages": {"enabled": false},
			"markers": this._getSubmitMarkers(),
			"data": {
				"object": {
					"content": Echo.Utils.get(Echo.Variables, targetURL, "")
				}
			},
			"ready": function() {
				this.view.get("text").on("change", function() {
					Echo.Utils.set(Echo.Variables, targetURL, $(this).val());
				});
			}
		}, this.config.get("postComposer"), {
			"plugins": this._mergeSpecsByName([{
				"name": "URLResolver",
				"enabled": this.config.get("postComposer.contentTypes.comments.resolveURLs"),
				"filePicker": {
					"key": this.config.get("dependencies.FilePicker.apiKey"),
				"visible": this.config.get("postComposer.contentTypes.comments.attachments.visible"),
				"sources": this.config.get("postComposer.contentTypes.comments.attachments.sources")
				}
			}, {
				"name": "JanrainBackplaneHandler",
				"appId": this.config.get("dependencies.Janrain.appId"),
				"enabled": enableBundledIdentity,
				"authWidgetConfig": this.config.get("auth.authWidgetConfig"),
				"sharingWidgetConfig": this.config.get("auth.sharingWidgetConfig")
			}, $.extend(true, this.config.get("postComposer"), {
				"name": "CardUIShim",
				"submitPermissions": this._getSubmitPermissions(),
				"confirmation": {
					"enable": this._isModerationRequired() && this.config.get("postComposer.confirmation.enable")
				},
				"auth": this.config.get("auth")
			})], config.plugins)
		})
	});
	return element;
};

conversations.renderers.topPostsContainer = function(element) {
	var topPosts = this.getComponent("topPosts");

	var visible = this.config.get("topPosts.visible")
		&& topPosts
		&& $.grep(topPosts.get("threads"), function(item) { return !item.deleted; }).length > 0;

	return visible
		? element.show()
		: element.hide();
};

conversations.renderers.topPostsHeader = function(element) {
	if (this.config.get("topPosts.visible")) {
		this.view.render({
			"target": element,
			"name": "_streamHeader",
			"extra": {"id": "topPosts"}
		});
	}
	return element;
};

conversations.renderers.topPosts = function(element) {
	var self = this;
	if (this.config.get("topPosts.visible")) {
		this.initComponent({
			"id": "topPosts",
			"component": "Echo.StreamServer.Controls.Stream",
			"config": this._assembleStreamConfig("topPosts", {
				"onItemAdd": function() {
					self.view.render({"name": "topPostsContainer"});
				},
				"onItemDelete": function() {
					self.view.render({"name": "topPostsContainer"});
				},
				"ready": function() {
					self.view.render({"name": "topPostsContainer"});
				},
				"target": element
			})
		});
	}
	return element;
};

conversations.renderers.allPosts = function(element) {
	if (!this.config.get("allPosts.visible")) {
		return element;
	}
	if (this._moderationQueueEnabled()) {
		this.view.render({
			"name": "_tabs",
			"target": element,
			"extra": {
				"tabs": [{
					"name": "allPosts",
					"active": true,
					"renderer": "_streamTitle"
				}, {
					"name": "moderationQueue",
					"renderer": "_streamTitle"
				}, {
					"name": "sorter",
					"type": "dropdown",
					"extraClass": "pull-left no-tab",
					"renderer": "_streamSorter"
				}]
			}
		});
	} else if (this.config.get("featuredPosts.visible")){

		this.view.render({
			"name": "_tabs",
			"target": element,
			"extra": {
				"tabs": [ {
					"name": "featuredPosts",
					"active": true,
					"renderer": "_streamTitle"
				},{
					"name": "allPosts",
					"active": false,
					"renderer": "_streamTitle"
				}]
			}
		});
		this.view.render({
			"name":"_utilHeader",
			"target": this.view.get("utilHeader"),			
			"extra":{"id":"featuredPosts"}
		});

	} else {
		this.view.render({
			"name": "_tabs",
			"target": element,
			"extra": {
				"tabs": [ {
					"name": "allPosts",
					"active": true,
					"renderer": "_streamTitle"
				}]
			}
		});
		this.view.render({
			"name":"_utilHeader",
			"target": this.view.get("utilHeader"),			
			"extra":{"id":"allPosts"}
		});		
	}
	var featuredPosts = this.getComponent("featuredPosts");
	if (featuredPosts && featuredPosts.get("data").entries.length === 0) {
		featuredPosts.set("visible",false);
		this.view.render({
			"name":"_utilHeader",
			"target": this.view.get("utilHeader"),			
			"extra":{"id":"allPosts"}
		});		
		element.find(".tab-pane" + "." + "featuredPosts").remove();
		element.find(".nav-item" + "." + "featuredPosts").remove();		
		this.destroyComponent("featuredPosts");
		this.view.get("container").find(".has-tabs").removeClass("has-tabs");
		element.find(".nav-item,.tab-pane").addClass("active echo-active");
	}
	return element;
};

conversations.renderers._tabs = function(element, extra) {
	var self = this;

	var tpls = conversations.templates.tabs;

	var nav = $(this.substitute({"template": tpls.nav}));
	var content = $(this.substitute({"template": tpls.content}));

	$.map(extra.tabs, function(tab) {
		tab.type = tab.type || "tab"; // tab || dropdown
		tab.id = tab.id || (tab.name + "-" + Echo.Utils.getUniqueString());
		var li = $(self.substitute({
			"template": tpls.navItem,
			"data": {
				"class": (tab.active ? "active echo-active" : "") + " " + (tab.extraClass || ""),
				"type": tab.type,
				"tabId": tab.id,
				"tabName": tab.name
			}
		}));
		if (tab.renderer) {
			self.view.render({
				"target": li.find("a"),
				"name": tab.renderer,
				"extra": {"id": tab.name}
			});
			li.on("shown", function(ev) {
				var sorter = element.find("." + self.cssPrefix + "streamSorter");
				if (sorter) {
					// re-render sorter dropdown in case if customer switched tab
					self.view.render({
						"target": sorter,
						"name": "_streamSorter",
						"extra": {"id": tab.name}
					});
				}
			});
		}
		nav.find("ul").append(li);

		if (tab.type === "tab") {
			var container = $(self.substitute({
				"template": tpls.contentItem,
				"data": {
					"tabId": tab.id,
					"tabName": tab.name,
					"class": tab.active ? "active echo-active": ""
				}
			}));
			var component = self.initComponent({
				"id": tab.name,
				"component": "Echo.StreamServer.Controls.Stream",
				"config": self._assembleStreamConfig(tab.name, {
					"target": $("<div>")
				})
			});

			content.append(container.append(component.config.get("target")));
		}
	});
	return element.empty().append(nav).append(content);
};

conversations.renderers._streamHeader = function(element, extra) {
	var view = this.view.fork();
	var header = view.render({
		"template": conversations.templates.streamHeader
	});
	this.view.render({
		"target": view.get("streamTitle"),
		"name": "_streamTitle",
		"extra": {"id": extra.id}
	});
	if (this.config.get(extra.id + ".displaySortOrderPulldown")) {
		this.view.render({
			"target": view.get("streamSorter"),
			"name": "_streamSorter",
			"extra": {"id": extra.id}
		});
	}
	return element.empty().append(header);
};

conversations.renderers._utilHeader = function(element, extra) {
	if (this.config.get(extra.id + ".displaySortOrderPulldown")) {	
		this.view.render({
			"target": this.view.get("streamSorter"),
			"name": "_streamSorter",
			"extra": {"id": extra.id}
		});
		var parent = this.view.get("allPosts");

		return parent.find("." + this.cssPrefix + "tabs").after(element);
	}
};

conversations.renderers._streamSorter = function(element, extra) {
	var self = this;
	if (!~$.inArray(extra.id, ["featuredPosts", "allPosts", "topPosts", "moderationQueue"])) {
		extra.id = "allPosts";
	}
	var config = this.config.get(extra.id);

	var getCurrentTitle = function() {
		var tempCookie = (Echo.Cookie.get("comments_sortorder") && Echo.Cookie.get("comments_sortorder").split("|")) || [];
		var tempValue;
		$.each(tempCookie,function(key,value) {
										var pair = value.split(":");
										if (pair[0] == extra.id) {tempValue = pair[1];}
									});
		var value = tempValue
			|| (function() {

				var stream = self.getComponent(extra.id);
				var query = stream
					? stream.config.get("query")
					: self._assembleSearchQuery(extra.id);

				var sortOrder = query.match(/sortOrder:(\S+)/);

				return $.isArray(sortOrder) && sortOrder.length
					? sortOrder.pop() : config.initialSortOrder;
			})();

		var values = $.grep(config.sortOrderEntries || [], function(entry) {
			return entry.value === value;
		});
		return values.length ? values.pop().title : "";
	};

	var dropdown = new Echo.GUI.Dropdown({
		"target": element,
		"title": getCurrentTitle()  + '<i class="fa fa-caret-down icon-chevron-down"></i>',
		"extraClass": "nav",
		"entries": $.map(config.sortOrderEntries || [], function(entry) {
			return {
				"title": entry.title,
				"handler": function() {
					var tempCookie = (Echo.Cookie.get("comments_sortorder") && Echo.Cookie.get("comments_sortorder").split("|")) || [];
					if (tempCookie.length > 0) {
						var present = false;
						$.each(tempCookie, function(key,value) {
													var pair = value.split(":");

													if (pair[0] == extra.id) {
															pair[1] = entry.value;
															tempCookie[key] = pair.join(":");
															present = true;
													}
												});
						if (!present) {tempCookie.push (extra.id + ":" + entry.value);}
					} else {
						tempCookie.push (extra.id + ":" + entry.value);
					}	
					Echo.Cookie.set("comments_sortorder", tempCookie.join("|"),{"path":"/"});
					dropdown.setTitle(entry.title + '<i class="fa fa-caret-down icon-chevron-down"></i>');

					var stream = self.getComponent(extra.id);
					if (stream) {
						var query = stream.config.get("query");
						stream.config.set("query", query.replace(/sortOrder:\S+/, "sortOrder:" + entry.value));
						stream.config.remove("data");
						stream.refresh();
					}
				}
			};
		})
	});

	// TODO: find a better solution to right-align the menu
	//       and/or extend the Echo.GUI.Dropdown class to support this
	element.find(".dropdown-menu").addClass("pull-right");
	return element.addClass(this.cssPrefix + "streamSorter");
};

conversations.renderers._streamTitle = function(element, extra) {
	var config = this.config.get(extra.id);
	var view = this.view.fork();
	var title = view.render({
		"template": conversations.templates.streamTitle,
		"data": {
			"label": config.label
		}
	});
	if (config.displayCounter) {
		this.initComponent({
			"id": extra.id + "Counter",
			"component": "Echo.StreamServer.Controls.Counter",
			"config": {
				"target": view.get("streamCounter"),
				"infoMessages": {
					"layout": "compact"
				},
				"plugins": [{"name": "CounterCardUI"}],
				"query": this._assembleCounterQuery(extra.id),
				"data": this.get("data." + extra.id + "-count")
			}
		});
	}

	return element.append(title);
};

conversations.methods.setStreamingState = function(state, permanent) {
	var self = this;
	if (!this.get("changeStateOnHover") && !permanent) {
		return;
	}
	this.set("streamingState", state);
	// prohibit to change state on mouse enter/leave container if user set 'pause' state using button
	this.set("changeStateOnHover", !(permanent && state === "paused"));

	// change state of all streams
	$.map(["featuredPosts", "allPosts", "topPosts", "moderationQueue"], function(streamName) {
		var stream = self.getComponent(streamName);
		if (stream) {
			stream.setState(state);
		}
	});
	this.view.render({"name": "streamingState"});
};

conversations.methods._viewportChange = function() {
	var self = this;
	if (this._viewportChangeTimeout) {
		clearTimeout(this._viewportChangeTimeout);
	}
	this._viewportChangeTimeout = setTimeout(function() {
		self.events.publish({
			"topic": "onViewportChange",
			"global": false,
			"bubble": false
		});
	}, this.config.get("viewportChangeTimeout"));
};

conversations.methods._moveStreamingStateCursor = function(event) {
	var cursor = this.view.get("streamingStateCursor");
	if (cursor) {
		cursor.css({
			"left": event.clientX,
			"top": event.clientY
		});
	}
};

conversations.methods._assembleStreamConfig = function(componentID, overrides) {
	// StreamServer config
	var ssConfig = this.config.get("dependencies.StreamServer");
	var liveUpdates = (ssConfig.componentSpecific[componentID] && ssConfig.componentSpecific[componentID].liveUpdates)?$.extend({},ssConfig.liveUpdates,ssConfig.componentSpecific[componentID].liveUpdates):ssConfig.liveUpdates;
	// component config
	var config = $.extend(true, {}, this.config.get(componentID));
	config.plugins = this._getStreamPluginList(componentID, overrides);

	return $.extend(true, {
		"id": componentID,
		"appkey": ssConfig.appkey,
		"context": this.config.get("context"),
		"apiBaseURL": ssConfig.apiBaseURL,
		"liveUpdates": liveUpdates,
		"submissionProxyURL": ssConfig.submissionProxyURL,
		"asyncItemsRendering": true,
		"state": {
			"toggleBy": "none"
		},
		"labels": {
			"emptyStream": config.noPostsMessage
		},
		"item": {
			"reTag": false,
			"markAsRead": config.markItemsAsReadOn,
			"viaLabel": {
				"icon": config.displaySourceIcons
			}
		},
		"data": this.get("data." + componentID + "-search"),
		"query": this._assembleSearchQuery(componentID)
	}, config, overrides);
};

conversations.methods._getStreamPluginList = function(componentID, overrides) {
	var self = this;
	var auth = this.config.get("auth");
	var config = this.config.get(componentID);
	var moderationExtraActions = this.config.get("topPosts.visible")
		? this.config.get("topPosts.includeTopContributors")
			? ["topPost", "topContributor"]
			: ["topPost"]
		: [];

	var plugins = [].concat([{
		"name": "JanrainBackplaneHandler",
		"appId": this.config.get("dependencies.Janrain.appId"),
		"enabled": auth.enableBundledIdentity,
		"authWidgetConfig": auth.authWidgetConfig,
		"sharingWidgetConfig": auth.sharingWidgetConfig
	}, {
		"name": "CardUIShim",
		"topPost": {
			"visible": config.displayTopPostHighlight,
			"marker": this.config.get("topMarkers.item")
		},
		"collapsedContentHeight": this.config.get(componentID + ".collapsedContentHeight"),
		"displayTopPostHighlight": config.displayTopPostHighlight,
		"initialIntentsDisplayMode": this.config.get(componentID + ".initialIntentsDisplayMode")
	}, {
		"name": "TweetDisplayCardUI"
	}, {
		"name": "ItemEventsProxy",
		"onAdd": function() {
			var counter = self.getComponent(componentID + "Counter");
			counter && counter.request.liveUpdates.start(true);
			overrides.onItemAdd && overrides.onItemAdd();
		},
		"onDelete": function() {
			var counter = self.getComponent(componentID + "Counter");
			counter && counter.request.liveUpdates.start(true);
			overrides.onItemDelete && overrides.onItemDelete();
		}
	}, {
		"name": "ItemsRollingWindowRemoved",
		"moreButton": true
	}, {
		"name": "URLResolver",
		"presentation": this.config.get("presentation")
	}], this._getConditionalStreamPluginList(componentID), [{
		"name": "ModerationCardUI",
		"extraActions": moderationExtraActions,
		"topMarkers": this.config.get("topMarkers")
	}]);

	return this._mergeSpecsByName(plugins, config.plugins);
};

conversations.methods._getConditionalStreamPluginList = function(componentID) {
	var auth = this.config.get("auth");
	var config = this.config.get(componentID);

	var plugins = [{
		"intentID": "Like",
		"name": "LikeCardUI",
		"displayStyle": config.likesDisplayStyle
	}, {
		"intentID": "CommunityFlag",
		"name": "CommunityFlagCardUI"
	}, $.extend(true, {
		"requestMethod": "POST"
	}, this.config.get("replyComposer"), {
		"intentID": "Reply",
		"name": "ReplyCardUI",
		"enabled": this._isComposerVisible("replyComposer"),
		"actionString": this.config.get("replyComposer.contentTypes.comments.prompt"),
		"pauseTimeout": +this._isModerationRequired() && this.config.get("replyComposer.confirmation.timeout"),
		"displayCompactForm": this.config.get("replyComposer.displayCompactForm"),
		// TODO: pass markers through data
		"extraMarkers": this._getSubmitMarkers(["topPost"]),
		"nestedPlugins": this._mergeSpecsByName([{
			"name": "URLResolver",
			"enabled": this.config.get("replyComposer.contentTypes.comments.resolveURLs"),
			"filePicker": {
				"key": this.config.get("dependencies.FilePicker.apiKey"),
				"visible": this.config.get("replyComposer.contentTypes.comments.attachments.visible"),
				"sources": this.config.get("replyComposer.contentTypes.comments.attachments.sources")
			}
		}, {
			"name": "JanrainBackplaneHandler",
			"appId": this.config.get("dependencies.Janrain.appId"),
			"enabled": auth.enableBundledIdentity,
			"authWidgetConfig": auth.authWidgetConfig,
			"sharingWidgetConfig": auth.sharingWidgetConfig
		}, $.extend(true, this.config.get("replyComposer"), {
			"name": "CardUIShim",
			"auth": this.config.get("auth"),
			"confirmation": {
				"enable": this._isModerationRequired() && this.config.get("replyComposer.confirmation.enable")
			},
			"submitPermissions": this._getSubmitPermissions()
		})], this.config.get("replyComposer.plugins"))
	}), {
		"intentID": "Sharing",
		"name": "CardUISocialSharing"
	}, {
		"intentID": "Edit",
		"name": "Edit",
		"icon": "icon-pencil", // TODO: get rid of it when new buttons protocol will be implemented
		"requestMethod": "POST",
		"nestedPlugins": [{
			"name": "URLResolver",
			// we enable resolving through separate parameter
			// because it should works for submit and item as well
			"resolveURLs": this._getResolverSettingForEditPlugin(),
			"filePicker": {
				"key": this.config.get("dependencies.FilePicker.apiKey"),
				"visible": this.config.get("postComposer.contentTypes.comments.attachments.visible"),
				"sources": this.config.get("postComposer.contentTypes.comments.attachments.sources")
			}
		}]
	}];

	return $.grep(plugins, function(plugin) {
		return !!config["display" + plugin.intentID + "Intent"];
	});
};

conversations.methods._getResolverSettingForEditPlugin = function() {
	var postComposer = this.config.get("postComposer.contentTypes.comments.resolveURLs");
	var replyComposer = this.config.get("replyComposer.contentTypes.comments.resolveURLs");
	var setting;
	if (postComposer && replyComposer) {
		setting = "all";
	} else if (postComposer) {
		setting = "only-roots";
	} else if (replyComposer) {
		setting = "only-children";
	} else {
		setting = "disabled";
	}
	return setting;
};

conversations.methods._isComposerVisible = function(composerID) {
	var config = this.config.get(composerID);
	return config.visible && !!$.map(config.contentTypes, function(type) {
		return type.visible ? type : undefined;
	}).length;
};

conversations.methods._getSubmitPermissions = function() {
	return this.config.get("auth.allowAnonymousSubmission") ? "allowGuest" : "forceLogin";
};

conversations.methods._assembleCounterQuery = function(componentID) {
	var overrides = name !== "allPosts" ? {"replyNestingLevels": 0} : {};
	return this._assembleSearchQuery(componentID, overrides);
};

conversations.methods._assembleSearchQuery = function(componentID, overrides) {
	var config = this.config.get(componentID, {});
	var query = config.queryOverride;
	var args = query ? {} : this._getQueryArgsBuilder(componentID)();
	var tempCookie = (Echo.Cookie.get("comments_sortorder") && Echo.Cookie.get("comments_sortorder").split("|")) || [];
	var tempValue;
	$.each(tempCookie,function(key,value) {
									var pair = value.split(":");
									if (pair[0] == componentID) {tempValue = pair[1];}
								});
	return this.substitute({
		"template": query || conversations.templates.defaultQuery,
		"data": $.extend({}, config, {
			"targetURL": this.config.get("targetURL"),
			"excludedSources": config.displayTweets === false ? "-source:Twitter" : "",
			"type": config.itemTypes.length ? "type:" + config.itemTypes.join(",") : "",
			"initialSortOrder": tempValue || config.initialSortOrder
		}, args, overrides)
	});
};

conversations.methods._getQueryArgsBuilder = function(componentID) {
	var self = this;
	var config = this.config.get(componentID, {});

	return {
		"topPosts": function() {
			return {
				"operators": self._assembleStates(componentID, true),
				"childrenOperators": (function() {
					var acc = [];
					acc.push(self._assembleStates(componentID));

					var moderation = self._assembleModerationOperators();
					if (moderation) {
						acc = acc.concat(moderation);
					}
					return self._operatorsToString(acc);
				})(),
				"filter": "childrenof",
				"markers": (function() {
					var markers = [].concat(
						config.itemMarkers,
						self.config.get("topMarkers.item")
					);
					return markers.length
						? "markers:" + markers.join(",") : "";
				})()
			};
		},
		"allPosts": function() {
			var operators = (function() {
				var acc = [];
				acc.push(self._assembleStates(componentID));

				// items for current user (if bozo filter enabled)
				var userId = self.user && self.user.get("identityUrl");
				if (self.config.get("bozoFilter") && userId) {
					acc.push("user.id:" + userId);
				}

				var moderation = self._assembleModerationOperators();
				if (moderation) {
					acc = acc.concat(moderation);
				}
				return self._operatorsToString(acc);
			})();
			return {
				"operators": operators,
				"childrenOperators": operators,
				"filter": "childrenof",
				"markers": config.itemMarkers.length
					? "markers:" + config.itemMarkers.join(",")
					: ""
			};
		},
		"moderationQueue": function() {
			var operators = "state:Untouched -user.roles:moderator,administrator" +
					(self._getPremoderationConfig()["approvedUserBypass"] ? " -user.state:ModeratorApproved" : "");
			return {
				"operators": operators,
				"childrenOperators": operators,
				"filter": "scope",
				"markers": config.itemMarkers.length
					? "markers:" + config.itemMarkers.join(",")
					: ""
			};
		}
	}[componentID];
};

conversations.methods._assembleStates = function(componentID, ignorePremoderation) {
	var config = this.config.get(componentID);
	var premoderation = this._getPremoderationConfig();

	var states = premoderation.enable && !ignorePremoderation
		? ["ModeratorApproved"]
		: config.itemStates;

	states = states.concat($.grep(["CommunityFlagged", "SystemFlagged"], function(state) {
		return Echo.Utils.get(config, "moderation.display" + state + "Posts");
	}));
	return "state:" + states.join(",");
};

conversations.methods._assembleModerationOperators = function() {
	var premoderation = this._getPremoderationConfig();
	if (!premoderation.enable) return "";

	var operators = [];
	if (premoderation.approvedUserBypass) {
		operators.push("user.state:ModeratorApproved AND -state:ModeratorDeleted");
	}
	operators.push("(user.roles:moderator,administrator AND -state:ModeratorDeleted)");
	return this._operatorsToString(operators);
};

conversations.methods._operatorsToString = function(operators) {
	return operators.length > 1
		? "(" + operators.join(" OR ") + ")"
		: operators.join("");
};

conversations.methods._retrieveData = function(callback) {
	var app = this;
	var ids = ["featuredPosts", "allPosts", "topPosts"];
	if (this._moderationQueueEnabled()) {
		ids.push("moderationQueue");
	}
	var requests = Echo.Utils.foldl([], ids, function(name, acc) {
		if (!app.config.get(name + ".visible")) return;
		acc.push({
			"id": name + "-search",
			"method": "search",
			"q": app._assembleSearchQuery(name)
		});
		if (app.config.get(name + ".displayCounter")) {
			// for Top Posts we need to count only root items...
			acc.push({
				"id": name + "-count",
				"method": "count",
				"q": app._assembleCounterQuery(name)
			});
		}
	});

	// if both Top Posts and All Posts are hidden
	if (!requests.length) {
		callback();
		return;
	}

	var ssConfig = this.config.get("dependencies.StreamServer");
	Echo.StreamServer.API.request({
		"endpoint": "mux",
		"apiBaseURL": ssConfig.apiBaseURL,
		"data": {
			"appkey": ssConfig.appkey,
			"requests": requests
		},
		"onData": function(data) {
			$.each(data, function(key, value) {
				// Ignore errors.
				// In this case streams/counters will try to fetch initial data by yourself.
				if (!value || value.result === "error") delete data[key];
			});
			app._triggerInitialCounterUpdateEvents(data);
			app.set("data", data);
			callback();
		},
		"onError": function() {
			// Ignore mux error also.
			callback();
		}
	}).send();
};

conversations.methods._moderationQueueEnabled = function() {
	return this.user.is("admin") && this._getPremoderationConfig()["enable"];
};

conversations.methods._isModerationRequired = function() {
	var config = this._getPremoderationConfig();
	return config.enable &&
		!(this.user.is("admin") || (this.user.get("state") === "ModeratorApproved" && config.approvedUserBypass));
};

conversations.methods._getSubmitMarkers = function(excludes) {
	var self = this;
	excludes = excludes || [];
	var groups = {
		"topPost": function() {
			return ~$.inArray(self.config.get("topMarkers.user"), self.user.get("markers", []))
				? self.config.get("topMarkers.item") : [];
		},
		"premoderation": function() {
			return self._isModerationRequired()
				? self._getPremoderationConfig()["markers"] : [];
		}
	};
	var markers = Echo.Utils.foldl([], groups, function(handler, acc, key) {
		if (!~$.inArray(key, excludes)) {
			acc.push(handler());
		}
	});
	return Array.prototype.concat.apply([], markers);
};

conversations.methods._getPremoderationConfig = function() {
	return this.config.get("allPosts.moderation.premoderation");
};

// borrowed from Echo.App
conversations.methods._mergeSpecsByName = function(specs) {
	var self = this;
	var getSpecIndex = function(spec, specs) {
		var idx = -1;
		$.each(specs, function(i, _spec) {
			if (spec.name === _spec.name) {
				idx = i;
				return false;
			}
		});
		return idx;
	};
	// flatten update specs list
	var updateSpecs = $.map(Array.prototype.slice.call(arguments, 1) || [], function(spec) {
		return spec;
	});
	return Echo.Utils.foldl(specs, updateSpecs, function(extender) {
		var id = getSpecIndex(extender, specs);
		if (!~id) {
			specs.push(extender);
			return;
		}
		if (extender.name === specs[id].name) {
			if (extender.nestedPlugins) {
				specs[id].nestedPlugins = specs[id].nestedPlugins || [];
				self._mergeSpecsByName(specs[id].nestedPlugins, extender.nestedPlugins);
				// delete nested plugins in the extender to avoid override effect after extend below
				delete extender.nestedPlugins;
			}
		}
		specs[id] = $.extend(true, {}, specs[id], extender);
	});
};

conversations.methods._triggerInitialCounterUpdateEvents = function(data) {
	var app = this;
	$.map(["featuredPosts", "allPosts", "topPosts", "moderationQueue"], function(component) {
		var response = data[component + "-count"];
		if (response) {
			app._triggerCounterUpdateEvent({
				"component": component,
				"count": response.count
			});
		}
	});
};

conversations.methods._triggerCounterUpdateEvent = function(data) {
	var callback = this.config.get(data.component + ".events.onPostCountUpdate");
	callback && callback(data.count);
};

conversations.css =
	'.{class:streamHeader} { padding: 5px 0px; position: relative; z-index: 20; }' +
	'.{class:streamTitle} { font-size: 14px; }' +
	'.{class:streamCounter} { font-size: 14px; }' +

	// streaming state
	'.{class:streamingStateContainer} { text-align: left; margin-bottom: 5px; font-family: "Helvetica Neue", arial, sans-serif; }' +
	'.{class:streamingState} { padding-left: 15px; float: right; font-size: 13px; color: #c6c6c6; }' +
	'.{class:streamingState-live} { background: url({config:cdnBaseURL.sdk-assets}/images/control_play.png) no-repeat left 3px; }' +
	'.{class:streamingState-paused} { background: url({config:cdnBaseURL.sdk-assets}/images/control_pause.png) no-repeat left 3px; }' +
	'.{class:itemsWaiting} { font-size: 13px; color: #c6c6c6; margin-left: 5px; }' +

	// streamSorter dropdown
	'.{class:streamSorter} { font-size: 13px; }' +
	'.echo-sdk-ui .{class:streamSorter}:focus { outline: none; }' +
	'.{class:streamSorter} > ul > li > a { background: url("//www.washingtonpost.com/wp-stat/echo2/v2/images/conversations/v1.3.8/images/marker.png") no-repeat right center; padding-right: 20px; }' +
	'.{class:streamSorter} ul.nav { margin-bottom: 0px; font-size: 13px; }' +
	'.{class:streamSorter} ul.nav > li > a { text-decoration: none; color: #C6C6C6; line-height: 18px; }' +
	'.{class:streamSorter} .dropdown-menu { float: right; left: auto; right: 0; }' +
	'.echo-sdk-ui .{class:streamSorter} .nav .dropdown .dropdown-toggle { background-color: transparent; border-color: transparent; color: #C6C6C6; }' +
	'.{class:streamSorter} ul.nav > li > a:hover,' +
		'.{class:streamSorter} ul.nav > li > a:focus { background-color: transparent}' +

	// tabs
	'.echo-sdk-ui .tab-content.{class:tabsContent} { overflow: visible; }' +
	'.echo-sdk-ui .nav.{class:tabs} { margin: 0px; padding: 5px 0px; }' +
	'.echo-sdk-ui .nav.{class:tabs} > li { height: 18px; line-height: 18px; }' +
	'.{class:tabs} > li > a, .{class:tabs} > li > a:hover { color: #C6C6C6; }' +
	'.echo-sdk-ui .nav.{class:tabs} { border: 0px; }' +
	'.echo-sdk-ui .nav.{class:tabs} > li > a { font-size: 14px; line-height: 18px; padding: 0px; margin-right: 15px; border: 0px; }' +
	'.echo-sdk-ui .nav.{class:tabs} > li.active > a,' +
		'.echo-sdk-ui .nav.{class:tabs} > li.active > a:hover,' +
		'.echo-sdk-ui .nav.{class:tabs} > li.active > a:focus,' +
		'.echo-sdk-ui .nav.{class:tabs} > li.active > a:active { border-bottom: 0px solid #d8d8d8; outline: none; color: black; }' +
	'.echo-sdk-ui .nav.{class:tabs} > .active > a,' +
		'.echo-sdk-ui .nav.{class:tabs} > .active > a:focus,' +
		'.echo-sdk-ui .nav.{class:tabs} > .active > a:hover { border: 0px; }' +
	'.echo-sdk-ui .{class:tabs} > li.pull-right > a { padding-right: 0px; margin-right: 0px; }' +
	'.echo-sdk-ui .nav.{class:tabs} > li > a:hover, .echo-sdk-ui .nav.{class:tabs} > li > a:focus { background-color: transparent; border: 0px; }' +
	'.echo-sdk-ui .{class:tabs} ul.nav { margin-bottom: 0px; }' +
	'.echo-sdk-ui .nav.{class:tabs} .dropdown-menu { border-radius: 6px; }' +

	// common
	'.{class:container} .echo-control-message { font-family: "Helvetica Neue", arial, sans-serif; color: #42474A; font-size: 15px; line-height: 21px; }' +
	'.{class:container} { position:relative; }' +
	'.{class:resizeFrame} { position:absolute; z-index:-1; border:0; padding:0; }' +
	'.{class:container} { min-height: 200px; }' +
	'.{class:container} li > a, ' +
	'.{class:container} .echo-primaryFont,' +
	'.{class:container} .echo-secondaryFont,' +
	'.{class:container} .echo-linkColor ' +
		'{ font-family: "Helvetica Neue", arial, sans-serif; }' +
	'.{class:postComposer} { margin-bottom: 10px; }' +
	'.{class:topPosts} > div { margin-bottom: 25px; }' +
	// set box-sizing property for all nested elements to default (content-box)
	// as its can be overwritten on the page.
	// TODO: get rid of these rules at all!
	'.{class:container} * { box-sizing: content-box !important; -moz-box-sizing: content-box; }' +
	'.{class:container} ul, .{class:container} li { list-style: inherit; }';

Echo.App.create(conversations);

})(Echo.jQuery);

(function($) {
"use strict";

var auth = Echo.Control.manifest("Echo.StreamServer.Controls.CardUIAuth");

if (Echo.Control.isDefined(auth)) return;

auth.config = {
	"buttons": ["login", "signup"],
	"infoMessages": {"enabled": false}
};

auth.dependencies = [{
	"loaded": function() { return !!Echo.GUI; },
	"url": "{config:cdnBaseURL.sdk}/gui.pack.js"
}, {
	"url": "{config:cdnBaseURL.sdk}/gui.pack.css"
}];

auth.labels = {
	"edit": "Edit",
	"login": "Login",
	"logout": "Logout",
	"loggingOut": "Logging out...",
	"switchIdentity": "Switch Identity",
	"or": "or",
	"via": "via",
	"signup": "signup"
};

auth.templates.anonymous =
	'<div class="{class:userAnonymous}">' +
		'<span class="{class:login} echo-linkColor echo-clickable">' +
			'{label:login}' +
		'</span>' +
		'<span class="echo-primaryFont {class:or}"> {label:or} </span>' +
		'<span class="{class:signup} echo-linkColor echo-clickable">' +
			'{label:signup}' +
		'</span>' +
	'</div>';

auth.templates.logged =
	'<div class="{class:userLogged}">' +
		'<div class="{class:avatar}"><div class="{class:avatarElem}"></div></div>' +
		'<div class="{class:container}">' +
			'<div class="{class:name}"></div>' +
			'<div class="echo-primaryFont {class:via}"></div>' +
		'</div>' +
		'<div class="echo-clear"></div>' +
	'</div>';

auth.renderers.via = function(element) {
	return element.append(this.labels.get("via") + " " + this._detectAuthProvider());
};

auth.renderers.login = function(element) {
	return this._assembleIdentityControl("login", element);
};

auth.renderers.signup = function(element) {
	return this._assembleIdentityControl("signup", element);
};

auth.renderers.or = function(element) {
	var buttons = this.config.get("buttons");
	if (!~$.inArray("login", buttons) ||
		!~$.inArray("signup", buttons) ||
		!this.user.get("sessionID")) {
			element.hide();
	}
	return element;
};

auth.renderers.avatarElem = function(element) {
	var avatarURL = this.user.get("avatar");
	if (!avatarURL) {
		avatarURL = this.config.get("defaultAvatar");
	}
	
	element.css("background-image", 'url("' + avatarURL + '")');
	// we have to do it because filter must work in IE8 only
	// in other cases we will have square avatar in IE 9
	var isIE8 = document.all && document.querySelector && !document.addEventListener;
	if (isIE8) {
		element.css({ "filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + avatarURL + "', sizingMethod='scale')" });
	}
	return element;
};

auth.renderers.name = function(element) {
	var auth = this, isSwitchAssembled = false;

	var template = '<span class="{class:dropdown}"></span>';
	var entries = [{
		"visible": ~$.inArray("login", this.config.get("buttons")),
		"title": this.labels.get("switchIdentity"),
		"handler": function() {
			if (!isSwitchAssembled) {
				var target = $(this);
				auth._assembleIdentityControl("login", target);
				isSwitchAssembled = true;
				target.click();
			}
		}
	}, {
		"visible": true,
		"title": this.labels.get("logout"),
		"handler": function() {
			auth._publishBackplaneEvent("identity/logout/request");
			auth.user.logout();
		}
	}];

	new Echo.GUI.Dropdown({
		"target": element,
		"title": auth.user.get("name", "") + this.substitute({"template": template}),
		"extraClass": "nav",
		"entries": $.grep(entries, function(entry) {
			return !!entry.visible;
		})
	});
	return element;
};

auth.methods.template = function() {
	return this.templates[this.user.is("logged") ? "logged" : "anonymous"];
};

auth.methods._detectAuthProvider = function() {
	// TODO: provide an ability to update this list via plugin config
	var providers = {
		"twitter.com": "Twitter",
		"facebook.com": "Facebook",
		"google.com": "Google",
		"me.yahoo.com": "Yahoo"
	};
	var id = this.user.get("identityUrl", "");
	var domain = Echo.Utils.parseURL(id).domain;
	return providers[domain] || domain || id;
};

auth.methods._assembleIdentityControl = function(type, element) {
	var auth = this;
	var buttons = this.config.get("buttons");
	if (!this.user.get("sessionID") || !~$.inArray(type, buttons)) {
		return element.hide();
	}
	return element.on("click", function() {
		auth._publishBackplaneEvent("identity/login/request");
	});
};

auth.methods._publishBackplaneEvent = function(type, data) {
	Backplane.response([{
		// IMPORTANT: we use ID of the last received message
		// from the server-side to avoid same messages re-processing
		// because of the "since" parameter cleanup...
		"id": Backplane.since,
		"channel_name": Backplane.getChannelName(),
		"message": {
			"type": type,
			"payload": this.user.data || {}
		}
	}]);
};

auth.css =
	'.{class:container} { float: left; }' +
	'.{class:or} { font-size: 14px; }' +
	'.{class:via} { margin-left: 15px; color: #D3D3D3; line-height: 18px; font-size: 14px; }' +
	'.{class:name} .{class:dropdown} { background: url("//www.washingtonpost.com/wp-stat/echo2/v2/images/conversations/v1.3.8/images/marker.png") no-repeat right center; padding-right: 20px; }' +
	'.{class:name} ul.nav .dropdown .dropdown-toggle { font-size: 20px; }' +
	'.{class:name} ul.nav { margin-bottom: 3px; }' +
	'.{class:name} ul.nav .dropdown-menu li > a { font-size: 14px; }' +
	'.{class:avatar} div { border-radius: 50%; background-size:cover; display:inline-block; background-position:center; }' +
	'.{class:login}, .{plugin.class} .{class:signup} { color: #006DCC; }' +
	'.{class:userAnonymous} { margin: 0px 0px 7px 2px; text-align: left; }' +
	'.{class:userLogged} { margin: 0px 0px 5px 3px; }' +
	'.{class:name} { float: none; margin: 3px 0px 0px 15px; font-weight: normal; }' +
	'.class:container} { float: left; }' +
	'.{class:avatar} { float: left; width: 48px; height: 48px; border-radius: 50%; }' +
	'.{class:avatar} > div { width: 48px; height: 48px; background-size:cover; display:inline-block; background-position:center; }';

Echo.Control.create(auth);

})(Echo.jQuery);

(function($) {
"use strict";

var media = Echo.App.manifest("Echo.Conversations.MediaContainer");

if (Echo.App.isDefined(media)) return;

media.templates.main = function() {
	return '<div class="{class:container}"></div>';
};

media.vars = {
	"cards": []
};

media.init = function() {
	this.render();
	this.ready();
};

media.renderers.container = function(element) {
	var media = this.config.get("data", []);
	if (media.length) {
		if (!this.cardParentConfig) {
			this.cardParentConfig = this.config.getAsHash();
		}

		var config = $.extend({
			"target": document.createDocumentFragment(),
			"context": this.config.get("context"),
			"ready": function() {
				element.append(this.config.get("target"));
			}
		}, this.cardParentConfig.card);

		config.parent = this.itemParentConfig;

		this.cards = $.map(media, function(item) {
			return new Echo.Conversations.NestedCard($.extend({
				"data": item
			}, config));
		});

		if (media.length === 1) {
			element.addClass(this.cssPrefix + "single-card");
		}
	} else {
		element.hide();
	}
	return element;
};


media.css =
	'.{class:container} { line-height: 1px; word-wrap: normal; white-space: nowrap; overflow-x: auto; overflow-y: hidden; padding: 8px 0px 8px 8px; }' +
	'.{class:container} > div { display: inline-block; max-width: 90%; vertical-align: top; }' +
	'.{class:container} > div > div { margin-right: 8px; }' +

	// single cards
	'.{class:container}.{class:single-card} { padding: 0px; border: 0px; }' +
	'.{class:container}.{class:single-card} > div { max-width: 100%; display: block; }' +
	'.{class:container}.{class:single-card} > div > div { margin-right: 0; }' +

	// scrollbar
	'.{class:container}::-webkit-scrollbar { height: 10px; }' +
	'.{class:container}::-webkit-scrollbar-track { box-shadow: inset 0 0 6px rgba(0,0,0,0.3); }' +
	'.{class:container}::-webkit-scrollbar-thumb { background: #D2D2D2; box-shadow: inset 0 0 6px rgba(0,0,0,0.5); }';

Echo.App.create(media);

})(Echo.jQuery);

(function($) {
"use strict";

var card = Echo.App.manifest("Echo.Conversations.NestedCard");

if (Echo.App.isDefined(card)) return;

card.templates.photo =
	'<div class="{class:item}">' +
		'<div class="{class:border}">' +
			'<div class="{class:photo}">' +
				'<div class="{class:photoAvatarWrapper}">' +
					'<div class="{class:avatar} {class:photoAvatar}" title="{data:author_name}">' +
						'<div></div>{data:author_name}' +
					'</div>' +
				'</div>' +
				'<div class="{class:photoContainer}">' +
					'<img class="{class:photoThumbnail}" src="{data:thumbnail_url}" title="{data:title}"/>' +
				'</div>' +
				'<div class="{class:photoLabel}">' +
					'<div class="{class:photoLabelContainer}">' +
						'<div class="{class:title} {class:photoTitle}" title="{data:title}">' +
							'<a class="echo-clickable" href="{data:url}" target="_blank">{data:title}</a>' +
						'</div>' +
						'<div class="{class:description} {class:photoDescription}">{data:description}</div>' +
					'</div>' +
				'</div>' +
			'</div>' +
			'<a class="{class:sourceIcon}" target="_blank"></a>' +
		'</div>' +
	'</div>';

card.templates.video =
	'<div class="{class:item}">' +
		'<div class="{class:border}">' +
			'<div class="{class:video}">' +
				'<div class="{class:avatar} {class:videoAvatar}" title="{data:author_name}">' +
					'<div></div>{data:author_name}' +
				'</div>' +
				'<div class="{class:videoWrapper}">' +
					'<div class="{class:videoPlaceholder}">' +
						'<div class="{class:playButton}"></div>' +
						'<img src="{data:thumbnail_url}" title="{data:title}"/>' +
					'</div>' +
				'</div>' +
				'<div class="{class:title} {class:videoTitle}" title="{data:title}">{data:title}</div>' +
				'<div class="{class:description} {class:videoDescription}">{data:description}</div>' +
				'<a class="{class:sourceIcon}" target="_blank"></a>' +
			'</div>' +
		'</div>' +
	'</div>';

card.templates.link =
	'<div class="{class:item}">' +
		'<div class="{class:border}">' +
			'<div class="{class:article}">' +
				'<div class="{class:articleThumbnail}">' +
					'<img src="{data:thumbnail_url}"/>' +
				'</div>' +
				'<div class="{class:articleTemplate}">' +
					'<div class="{class:title} {class:articleTitle}" title="{data:title}">' +
						'<a href="{data:url}" target="_blank">{data:title}</a>' +
					'</div>' +
					'<div class="{class:articleDescriptionContainer}">' +
						'<div class="{class:articleDescription}">{data:description}</div>' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
				'<a class="{class:sourceIcon}" target="_blank"></a>' +
			'</div>' +
		'</div>' +
	'</div>';

card.templates.main = function() {
	return this.templates[this.getRenderType()];
};

card.labels = {
	"noMediaAvailable": "No media available",
	"clickToExpand": "Click to expand"
};


card.events = {
	"Echo.Apps.Conversations.onAppResize": function() {
		if (this.getRenderType() === "photo") {
			this.view.render({"name": "photoContainer"});
		}
	}
};

card.sourceIcons = {};

card.init = function() {
	this.render();
	this.ready();
};

card.config = {
	// we display aricle via different layouts
	// according to thumbnail image width
	"minArticleImageWidth": 320,
	"sourceIcons": {
		"predefined": [{
			"pattern": /http:\/\/instagram\.com/i,
			"url": "http://cdn.echoenabled.com/images/favicons/instagram.png"
		}],
		"forbidden": [{
			"pattern": /\/\/www\.filepicker\.io/i
		}]
	},
	"displaySourceIcon": true,
	"displayAuthor": true,
	"maximumMediaWidth": undefined
};

card.renderers.sourceIcon = function(element) {
	var oembed = this.get("data");

	if (!oembed.provider_url || !this.config.get("displaySourceIcon")) return;

	var icon;

	$.map(this.config.get("sourceIcons.predefined"), function(item) {
		if (item.pattern.test(oembed.provider_url)) {
			icon = item.url;
			return false;
		}
	});

	icon = icon || oembed.provider_url +
		(oembed.provider_url.substr(-1) === "/" ? "" : "/") + "favicon.ico";

	$.map(this.config.get("sourceIcons.forbidden"), function(item) {
		if (item.pattern.test(icon)) {
			card.sourceIcons[icon] = false;
		}
	});

	if (typeof card.sourceIcons[icon] === "undefined") {
		Echo.Utils.loadImage({
			"image": icon,
			"onerror": function() {
				card.sourceIcons[icon] = false;
			},
			"onload": function() {
				$(this).attr("title", oembed.provider_name).appendTo(element);
				card.sourceIcons[icon] = true;
			}
		});
	} else if (card.sourceIcons[icon]) {
		$("<img/>").attr({
			"src": icon,
			"title": oembed.provider_name
		}).appendTo(element);
	}
	if (oembed.original_url) {
		element.attr("href", oembed.original_url);
	}
	return element;
};

card.renderers.avatar = function(element) {
	// we have to do it because filter must work in IE8 only
	// in other cases we will have square avatar in IE 9
	var isIE8 = document.all && document.querySelector && !document.addEventListener;
	if (isIE8) {
		element.children()[0].style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + this.config.get("defaultAvatar") + "', sizingMethod='scale')";
	}
	return this.displayAuthor()
		? element
		: element.hide();
};

card.renderers.title = function(element) {
	return this.get("data.title") ? element : element.hide();
};

card.renderers.description = function(element) {
	return this.get("data.description") ? element : element.hide();
};

/**
 * Video
 */
card.renderers.playButton = function(element) {
	var self = this;
	var oembed = this.get("data");
	element.on("click", function() {
		self.view.get("videoPlaceholder").empty().append($(oembed.html));
	});
	return element;
};

card.renderers.videoPlaceholder = function(element) {
	var oembed = this.get("data");

	if (!oembed.thumbnail_url) {
		element.empty().append($(oembed.html));
	}

	return element.css({
		"width": oembed.width,
		"padding-bottom": oembed.height / oembed.width * 100 + "%"
	});
};

/**
 *  Photo
 */
card.renderers.photoThumbnail = function(element) {
	var self = this;
	var thumbnail = this.get("data.type") === "link"
		? this.get("data.thumbnail_url")
		: this.get("data.url");
	// we are to create empty img tag because of IE.
	// If we have an empty src attribute it triggers
	// error event all the time.
	var img = $("<img />");
	img.attr("class", element.attr("class"));
	if (this.config.get("maximumMediaWidth")) {
		img.css("max-width", this.config.get("maximumMediaWidth"));
	}
	if (element.attr("title")) {
		img.attr("title", element.attr("title"));
	}
	img.load(function(e) {
		self.events.publish({
			"topic": "onMediaLoad"
		});
	}).error(function(e) {
		img.replaceWith(self.substitute({
			"template": '<div class="{class:noMediaAvailable}"><span>{label:noMediaAvailable}</span></div>'
		}));
	}).attr("src", thumbnail);

	return element.replaceWith(img);
};

card.renderers.photoContainer = function(element) {
	var expanded = this.cssPrefix + "expanded";
	var self = this;
	var oembed = this.get("data", {});
	var thumbnailWidth = this.view.get("photoThumbnail").width();
	var expandedHeight = oembed.height;
	var collapsedHeight = (thumbnailWidth || oembed.width) * 9 / 16;
	var imageWidth = oembed.width;
	var imageHeight = oembed.height;
	if (!imageWidth || !imageHeight) {
		imageWidth = oembed.thumbnail_width;
		imageHeight = oembed.thumbnail_height;
	}
	// calc height using aspect ratio 16:9 if image has ratio 1:2
	if (!element.hasClass(expanded) && oembed.height > collapsedHeight && imageHeight >= 2 * imageWidth) {
		var transitionCss = Echo.Utils.foldl({}, ["transition", "-o-transition", "-ms-transition", "-moz-transition", "-webkit-transition"], function(key, acc) {
			acc[key] = 'max-height ease 500ms';
		});

		element.addClass("echo-clickable")
			.attr("title", this.labels.get("clickToExpand"))
			.css("max-height", 250)
			.one("click", function() {
				self.events.publish({
					"topic": "onMediaExpand"
				});
				element.css(transitionCss)
					.css("max-height", expandedHeight)
					.removeClass("echo-clickable")
					.addClass(expanded)
					.attr("title", "");
			});
	} else {
		element.css("max-height", expandedHeight);
	}

	return element;
};

card.renderers.photoLabelContainer = function(element) {
	// calculate photoLabel max-height
	var photoLabelHeight = 20 // photoLabelContainer padding
		+ 2*16; // photoDescription line-height * lines count

	if (this.get("data.title")) {
		photoLabelHeight += 16 // photoTitle width
			+ 5; // photoTitle margin
	}
	this.view.get("photoLabel").css("max-height", photoLabelHeight);

	if (!this.get("data.description") && !this.get("data.title")) {
		element.hide();
	} else {
		this.view.get("photoContainer").css({
			"min-height": 55 + (this.displayAuthor() ? 55 : 0) + photoLabelHeight, // first number is added for default item avatar
			"min-width": 200
		});
	}
	return element;
};

/**
 *  Link
 */
card.renderers.article = function(element) {
	if (!this.get("data.thumbnail_url")) {
		element.addClass(this.cssPrefix + "withoutPhoto");
	}
	return element;
};

card.methods._onViewportChange = function(action, handler) {
	if (action === "subscribe") {
		this.events.subscribe({
			"topic": "Echo.Apps.Conversations.onAppViewScroll",
			"handler": handler
		});
		this.events.subscribe({
			"topic": "Echo.Apps.Conversations.onAppViewResize",
			"handler": handler
		});
	} else if (action === "unsubscribe") {
		this.events.unsubscribe({
			"topic": "Echo.Apps.Conversations.onAppViewScroll",
			"handler": handler
		});
		this.events.unsubscribe({
			"topic": "Echo.Apps.Conversations.onAppViewResize",
			"handler": handler
		});
	}
};

card.methods.displayAuthor = function() {
	return this.get("data.author_name") && this.config.get("displayAuthor");
};

card.methods.getRenderType = function() {
	var defaultType = this.get("data.type");
	var handlers = {
		"link": function(data) {
			return this.config.get("data.thumbnail_width") >= this.config.get("minArticleImageWidth")
				? "photo"
				: "link";
		}
	};
	return handlers[defaultType]
		? handlers[defaultType].call(this)
		: defaultType;
};

var transition = function(value) {
	return $.map(["transition", "-o-transition", "-ms-transition", "-moz-transition", "-webkit-transition"], function(propertyName) {
		return propertyName +': ' + value;
	}).join(";");
};

card.css =
	'.{class:title} { font-weight: bold; margin: 5px 0; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }' +
	'.{class:item} { text-align: left; font-family: "Helvetica Neue", arial, sans-serif; color: #42474A; font-size: 13px; line-height: 16px; display: inline-block; max-width: 100%; vertical-align: top; }' +
	'.{class:border} { white-space: normal; word-break: break-word; background-color: #FFFFFF; border: 1px solid #D2D2D2; border-bottom-width: 2px; }' +
	'.{class:item} .{class:sourceIcon} > img { width: 18px; height: 18px; }' +
	'.echo-sdk-ui .{class:avatar} > div { width: 28px; height: 28px; background-size:cover; display:inline-block; background-position:center; border-radius: 50%; margin-right: 6px; }' +
	'.{class:description} { overflow: hidden; }' +

	// photo
	'.{class:photo} .{class:noMediaAvailable} { position: relative; min-height: 145px; padding: 75px 10px 0 10px; background: #000; color: #FFF; min-width: 260px; text-align: center; }' +
	'.{class:photoAvatarWrapper} { position: absolute; width: 100%; }' +
	'.{class:photoAvatar} { color: #FFF; white-space: nowrap; padding: 12px; text-overflow: ellipsis; overflow: hidden; }' +
	'.{class:photoAvatar} > div { background-image: url("{config:defaultAvatar}"); vertical-align: middle; }' +
	'.{class:photo} { position: relative; left: 0; top: 0; zoom: 1; }' +
	'.{class:photo} + .{class:sourceIcon} > img { padding: 10px; }' +
	'.{class:photoLabel} { position: absolute; bottom: 0; color: #FFF; width: 100%; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.5); }' +
	'.{class:photoContainer} { display: block; overflow: hidden; text-align: center; background-color: #000; }' +

	'.echo-sdk-ui .{class:photoLabel} a:link, .echo-sdk-ui .{class:photoLabel} a:visited, .echo-sdk-ui .{class:photoLabel} a:hover, .echo-sdk-ui .{class:photoLabel} a:active { color: #fff; }' +
	'.{class:photoLabelContainer} { padding: 10px; }' +
	'.{class:photoTitle} { margin: 0 0 5px 0; }' +

	'.{class:photoLabel} { overflow: hidden; }' +
	'.{class:photo}:hover .{class:photoLabel} { max-height: 100% !important; }' +
	'.{class:photoLabel} { ' + transition('max-height ease 300ms') + '; }' +

	// play button
	'.{class:playButton} { cursor: pointer; position: absolute; top: 0; left: 0; bottom: 0; right: 0; z-index: 10; }' +
	'.{class:playButton}:after { content: ""; position: absolute; top: 10px; left: 20px; border-left: 30px solid #FFF; border-top: 20px solid transparent; border-bottom: 20px solid transparent; }' +
	'.{class:playButton} { box-shadow: 0px 0px 40px #000; margin: auto; width: 60px; height: 60px; border-radius: 50%; background-color: rgb(0, 0, 0); background-color: rgba(0, 0, 0, 0.7); }' +
	'.{class:playButton}:hover { background-color: #3498DB; }' +

	// video
	'.{class:video} { padding: 10px; }' +
	'.{class:video} .{class:sourceIcon} > img { padding: 10px 0 0 0; }' +
	'.{class:videoAvatar} { margin-bottom: 8px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }' +
	'.{class:videoTitle} { margin: 10px 0 0 0; }' +
	'.{class:videoAvatar} > div { background-image: url("{config:defaultAvatar}"); vertical-align: middle; }' +
	'.{class:videoDescription} { margin: 5px 0 0 0; }' +
	'.{class:videoWrapper} { background: #000; }' +
	'.{class:videoPlaceholder} img { position: absolute; top: 0; left: 0; right: 0; bottom: 0; margin: auto; }' +
	'.{class:videoPlaceholder} { max-width: 100%; position: relative; padding-bottom: 75%; height: 0; float: none; margin: 0px auto; background: #000000; overflow: hidden; }' +
	'.{class:videoPlaceholder} > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
	'.{class:videoPlaceholder} > video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
	'.{class:videoPlaceholder} > object { position: absolute; top: 0; left: 0; width: 100%;100 height: 100%; }' +

	// article
	'.{class:article} { padding: 10px; min-width: 200px; }' +
	'.{class:article} .{class:sourceIcon} > img { padding: 10px 0 0 0; }' +
	'.{class:article} .{class:articleTitle} > a { color: #42474A; font-weight: bold; }' +
	'.{class:article} .{class:articleTitle} > a:hover { color: #42474A; }' +
	'.{class:articleTitle} { margin-left: 10px; margin-top: 0px; line-height: 16px; }' +
	'.{class:articleDescription} { margin-left: 10px; font-size: 13px; line-height: 16px; }' +
	'.{class:articleThumbnail} { width: 30%; float: left; max-width: 120px; max-height: 120px; text-align:center; overflow:hidden; }' +
	'.{class:articleThumbnail} img { width: auto; height: auto; max-height:120px; max-width:120px; }' +
	'.{class:articleTemplate} { width: 70%; float: left; }' +
	'.{class:article}.{class:withoutPhoto} .{class:articleTitle} { margin-left: 0px; }' +
	'.{class:article}.{class:withoutPhoto} .{class:articleDescription} { margin-left: 0px; }' +
	'.{class:article}.{class:withoutPhoto} .{class:articleThumbnail} { display: none; }' +
	'.{class:article}.{class:withoutPhoto} .{class:articleTemplate} { width: 100%; }';

Echo.App.create(card);

})(Echo.jQuery);

(function($) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.Stream.Plugins.CardUIShim
 * Extends Stream control to look like Card-based app.
 */
var plugin = Echo.Plugin.manifest("CardUIShim", "Echo.StreamServer.Controls.Stream");

plugin.config = {
	"displayEmptyStream": true
};

plugin.init = function() {
	// Stream should trigger 'onActivitiesComplete' event to start items liveUpdate animation
	this.component._executeNextActivity = function() {
		var acts = this.activities;
		if (!acts.queue.length && this.config.get("state.layout") === "full") {
			acts.state = "paused";
		}

		if (!acts.queue.length) {
			this.events.publish({
				"topic": "onActivitiesComplete"
			});
		}

		if (acts.animations > 0 || !this.itemsRenderingComplete ||
				!acts.queue.length ||
				this.config.get("liveUpdates.enabled") &&
				acts.state === "paused" &&
				acts.queue[0].action !== "replace" &&
				!acts.queue[0].byCurrentUser) {
			return;
		}
		acts.queue.shift().handler();
	};

	// disable 'fade' animation
	this.component._spotUpdates.animate.fade = function(item) {
		this.activities.animations--;
		this._executeNextActivity();
	};

};

plugin.component.renderers.state = function(element) {
	var activities = this.component.activities;
	var activitiesCount = Echo.Utils.foldl(0, activities.queue, function(entry, acc) {
		if (entry.affectCounter) return ++acc;
	});
	var currentState = this.component.getState() + activitiesCount;
	if (currentState !== activities.lastState) {
		this.component.events.publish({
			"topic": "onActivitiesCountChange",
			"data": {
				"count": activitiesCount,
				"context": this.component.config.get("context")
			}
		});
	}
	return this.parentRenderer("state", arguments);
};

plugin.component.renderers.header = function(element) {
	return element.hide();
};

plugin.component.renderers.container = function(element) {
	var items = $.grep(this.component.get("threads"), function(item) {
		return !item.deleted;
	});
	return (items.length || this.config.get("displayEmptyStream"))
		? element.show()
		: element.hide();
};

plugin.css =
	'.{plugin.cass} .{class:more} { border: 1px solid #d8d8d8; border-bottom-width: 2px; border-radius: 3px; }' +
	'.{plugin.cass} .{class:messageText} { border: 1px solid #d8d8d8; border-bottom-width: 2px; border-radius: 3px; }' +
	'.{plugin.class:caption} { line-height: 18px; }' +
	'.{plugin.class} .{class:header} { padding: 5px 0px 5px 0px; margin: 0px; font-size: 14px; }' +
	'.{plugin.class} .{class:body} .echo-control-message { margin: 0px 0px 10px; border: 1px solid #d2d2d2; box-shadow: 0px 1px 1px #d2d2d2; border-radius: 3px; color: #c6c6c6; padding: 30px 0px 30px 0px; text-align: left;}' +
	'.{plugin.class} .{class:body} .echo-control-message .echo-control-message-info { height: 35px; display: block; font-size: 14px; line-height: 16px; font-weight: normal; font-style: normal; background-image: url(//www.washingtonpost.com/wp-stat/echo2/v2/images/conversations/v1.3.8/images/info.png); padding-left: 40px; width: 180px; margin: 0px auto; }' +
	'.{plugin.class} .echo-control-message-info { background: url(//www.washingtonpost.com/wp-stat/echo2/v2/images/conversations/v1.3.8/images/info.png) no-repeat; }' +
	'.{plugin.class} .{class:item} { margin: 0px 0px 10px 0px; padding: 0px; border: 1px solid #d8d8d8; border-bottom-width: 2px; border-radius: 3px; background: #ffffff; }' +
	'.{plugin.class} .{class:item-children} .{class:item} { margin: 0px; padding: 0px; box-shadow: 0 0 0; border: 0px; background: #f8f8f8; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.CardUIShim
 * Extends Item control to look like Card-based app.
 */
var plugin = Echo.Plugin.manifest("CardUIShim", "Echo.StreamServer.Controls.Stream.Item");

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onRender": function() {
		this._pageLayoutChange();
	},
	"Echo.Apps.Conversations.onAppResize": function() {
		this._pageLayoutChange();
	},
	"Echo.StreamServer.Controls.FacePile.onRender" : function() {
		this._pageLayoutChange();
	},
	"Echo.StreamServer.Controls.Stream.onActivitiesComplete": function() {
		// TODO check if we can get rig of this event handler ?
		//this._pageLayoutChange();
		this._checkItemContentHeight();
		this._maybeRemoveLiveUpdateIndicator();
	},
	"Echo.Apps.Conversations.onViewportChange": function() {
		if (!this.get("isLiveUpdate") || this.component.config.get("markAsRead") !== "viewportenter") {
			this.events.unsubscribe({"topic": "Echo.Apps.Conversations.onViewportChange"});
		} else {
			this._maybeRemoveLiveUpdateIndicator();
		}
	}
};

plugin.labels = {
	"topPostIndicatorTitle": "Top Post",
	"actions": "Actions",
	"seeMore": "See more"
};

plugin.config = {
	"topPost": {
		"visible": true,
		"marker": "Conversations.TopPost"
	},
	"fadeTimeout": 5000, // 5 seconds
	"collapsedContentHeight": 110 //px
};

plugin.init = function() {

	this.extendTemplate("insertAsFirstChild", "container", plugin.templates.indicator);

	this.set("isLiveUpdate", this.component.config.get("live"));
	this.extendTemplate("replace", "sourceIcon", plugin.templates.sourceIcon);
	this.extendTemplate("insertBefore", "frame", plugin.templates.topPostMarker);
	this.extendTemplate("remove", "date");
	this.extendTemplate("remove", "authorName");
	this.extendTemplate("insertAsFirstChild", "frame", plugin.templates.header);
	this.extendTemplate("insertAsLastChild", "expandChildren", plugin.templates.chevron);
	this.extendTemplate("insertAfter", "body", plugin.templates.seeMore);
	this.set("buttonsLayout", "inline");

	this.component.block = function(label) {
		if (this.blocked) return;
		this.blocked = true;
		// Due to container have padding and we can't calculate width, we should take its parent (wrapper) instead.
		var content = this.view.get("container").parent();
		var width = content.width();
		// we should take into account that the container has a 10px 0px padding value
		var height = content.outerHeight();
		this.blockers = {
			"backdrop": $('<div class="' + this.cssPrefix + 'blocker-backdrop"></div>').css({
				"width": width, "height": height
			}),
			"message": $(this.substitute({
				"template": '<div class="{class:blocker-message}">{data:label}</div>',
				"data": {"label": label}
			})).css({
				"left": ((parseInt(width, 10) - 200)/2) + 'px',
				"top": ((parseInt(height, 10) - 20)/2) + 'px'
			})
		};
		content.addClass("echo-relative")
			.prepend(this.blockers.backdrop)
			.prepend(this.blockers.message);
	};
};

plugin.templates.header =
	'<div class="{plugin.class:header-box}">' +
		'<div class="{plugin.class:header-centered}">' +
			'<div class="{class:authorName}"></div>' +
			'<div class="{class:date}"></div>' +
			'<div class="echo-clear"></div>' +
		'</div>' +
	'</div>';

plugin.templates.wrapper =
	'<div class="{plugin.class:wrapper}"></div>';

plugin.templates.chevron =
	'<span class="{plugin.class:chevron} icon-chevron-down"></span>';

plugin.templates.button =
	'<a class="{class:button} {class:button}-{data:name}">' +
		'<i class="{plugin.class:buttonIcon} {data:icon}"></i>' +
		'<span class="echo-primaryFont {class:buttonCaption}">{data:label}</span>' +
	'</a>';

plugin.templates.topPostMarker =
	'<i class="icon-bookmark {plugin.class:topPostMarker}" title="{plugin.label:topPostIndicatorTitle}"></i>';

plugin.templates.compactButtons =
	'<a title="{data:label}" class="{class:button} {class:compactButton} {class:button}-{data:name}">' +
		'<i class="{plugin.class:buttonIcon} {data:icon}"></i>' +
		'<span class="echo-primaryFont {class:buttonCaption}"></span>' +
	'</a>';

plugin.templates.dropdownButtons =
	'<div class="dropdown">' +
		'<a class="dropdown-toggle {class:button}" data-toggle="dropdown" href="#">' +
			//'<i class="{plugin.class:buttonIcon} icon-list"></i>' +
			'<i class="fa fa-caret-down icon-chevron-down"></i>' +
			'<span class="echo-primaryFont {class:buttonCaption}">{plugin.label:actions}</span>' +
		'</a>' +
	'</div>';

plugin.templates.indicator =
	'<div class="{class:indicator}"></div>';

plugin.templates.sourceIcon =
	'<div class="{class:sourceIcon}"><img></div>';

plugin.templates.seeMore =
	'<div class="{plugin.class:seeMore}">{plugin.label:seeMore}</div>';

plugin.renderers.topPostMarker = function(element) {
	var item = this.component;

	var visible = this.config.get("topPost.visible") && !item.get("depth")
		&& ~$.inArray(this.config.get("topPost.marker"), item.get("data.object.markers", []));

	return visible
		? element.show()
		: element.hide();
};

plugin.component.renderers.sourceIcon = function(element) {
	var item = this.component;
	var source = item.get("data.source", {});
	element.hide();
	var types = $.map(item.get("data.object.objectTypes"), function(item) {
		return item.split("/").pop();
	});
	if (
		item.config.get("viaLabel.icon")
		&& source.icon
		&& !~$.inArray("comment", types)
	) {
		var img = element.find("img");
		return img
			.attr("src", Echo.Utils.htmlize(source.icon))
			.on("error", function() { element.hide(); })
			.on("load", function() {
				element.show();
			});
	}
	return element;
};

plugin.renderers.seeMore = function(element) {
	var self = this;
	var item = this.component;
	return element.one("click", function() {
		self.events.publish({
			"topic": "onItemExpand"
		});
		self.view.remove("seeMore");
		item.view.get("body").css("max-height", "");
	});
};

plugin.component.renderers.avatar = function(element) {
	this.parentRenderer("avatar", arguments);

	var img = element.find("img[src]");
	var defaultAvatar = this.component.config.get("defaultAvatar");

	var avatar = $("<div/>").css("background-image", "url('" + img.attr("src") + "'), url('" + defaultAvatar + "')");
	img.replaceWith(avatar);

	// we have to do it because filter must work in IE8 only
	// in other cases we will have square avatar in IE 9
	var isIE8 = document.all && document.querySelector && !document.addEventListener;
	if (isIE8) {
		avatar.css({
			"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + defaultAvatar + "', sizingMethod='scale'), progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + img.attr("src") + "', sizingMethod='scale')"
		});
	}

	return element;
};

plugin.component.renderers.indicator = function(element) {
	var transition = "background-color " + this.config.get("fadeTimeout") + "ms linear";
	element.css({
		"transition": transition,
		"-o-transition": transition,
		"-ms-transition": transition,
		"-moz-transition": transition,
		"-webkit-transition": transition
	});
	return element;
};

plugin.component.renderers.tags = function(element) {
	return element.hide();
};

plugin.component.renderers.markers = function(element) {
	return element.hide();
};

plugin.component.renderers.container = function(element) {
	if (this.get("isLiveUpdate")) {
		var liveUpdate = this.cssPrefix + "liveUpdate";
		element.addClass(liveUpdate);
		if (this.component.config.get("markAsRead") === "mouseenter") {
			element.one("mouseenter", function() {
				element.removeClass(liveUpdate);
			});
		}
	}
	this.parentRenderer("container", arguments);

	// we should wrap only once
	return element.parent().hasClass(this.cssPrefix + "wrapper")
		? element
		: element.wrap(this.substitute({
			"template": plugin.templates.wrapper
		}));

};

plugin.component.renderers._inlineButtons = function(element) {
	var item = this.component;
	var buttons = $.map(item.buttonsOrder, function(name) {
		return item.get("buttons." + name);
	});
	$.map(buttons, function(button) {
		if (!button || !Echo.Utils.invoke(button.visible)) {
			return;
		}
		item.view.render({
			"name": "_button",
			"target": element,
			"extra": button
		});
	});
};

plugin.component.renderers._compactButtons = function(element) {
	var item = this.component;
	var buttons = $.map(item.buttonsOrder, function(name) {
		return item.get("buttons." + name);
	});
	$.map(buttons, function(button) {
		if (!button || !Echo.Utils.invoke(button.visible)) {
			return;
		}
		button.template = plugin.templates.compactButtons;
		item.view.render({
			"name": "_button",
			"target": element,
			"extra": button
		});
	});
};

plugin.component.renderers._dropdownButtons = function(element) {
	var self = this;
	var item = this.component;
	var elem = $(this.substitute({
		"template": plugin.templates.dropdownButtons
	}));

	var buttons = $.map(item.buttonsOrder, function(name) {
		return self.component.get("buttons." + name);
	});

	var closeDropdown = function(callback) {
		return function() {
			elem.find(".dropdown-toggle").dropdown("toggle");
			callback && callback();
		};
	};

	(function assembleItems(container, buttons, inner) {
		var menu = $('<ul class="dropdown-menu" role="menu">');
		$.map(buttons, function(button) {
			if (!button || !Echo.Utils.invoke(button.visible)) {
				return;
			}
			var menuItem = $("<li>");
			item.view.render({
				"name": "_button",
				"target": menuItem,
				"extra": $.extend({}, button, {"inner": inner, "clickable": true, "callback": closeDropdown(button.callback)})
			});
			if (button.entries) {
				menuItem.addClass("dropdown-submenu");
				assembleItems(menuItem, button.entries, true);
			}
			menu.append(menuItem);
		});
		container.append(menu);
	})(elem, buttons);

	return element.append(elem);
};

plugin.component.renderers.buttons = function(element) {
	var item = this.component;
	item._assembleButtons();
	item._sortButtons();
	element.empty();

	item.view.render({
		"name": "_" + this.get("currentButtonsState") + "Buttons",
		"target": element
	});
	return element;
};

plugin.component.renderers._button = function(element, extra) {
	var item = this.component;
	var template = extra.template || plugin.templates.button;

	var data = {
		"label": extra.label || "",
		"name": extra.name,
		"icon": item.config.get("plugins." + extra.plugin + ".icon") ||
			extra.icon || (!extra.inner && "icon-comment")
	};
	var button = $(this.substitute({"template": template, "data": data}));
	if (extra.inner) {
		button.addClass("echo-clickable");
	}
	var clickables = $(".echo-clickable", button);
	if (!extra.clickable) return element.append(button);

	if (extra.entries) {
		var entries = $.map(extra.entries, function(entry) {
			return Echo.Utils.invoke(entry.visible)
				? {"title": entry.label, "handler": entry.callback}
				: null;
		});
		new Echo.GUI.Dropdown({
			"target": button.find("span"),
			"extraClass": this.cssPrefix + "dropdownButton",
			"entries": $.map(entries, function(entry) { return $.extend({"handler": entry.callback}, entry); }),
			"title": this.get("currentButtonsState") !== "compact" ? extra.label : ""
		});
		extra.callback = function(ev) {
			button.find(".dropdown-menu").addClass("pull-right");
			button.find(".dropdown-toggle").dropdown("toggle");
			ev.preventDefault();
		};
	} else if (this.get("currentButtonsState") === "compact") {
		button.children("span").first().css("display", "none");
	}

	if (!clickables.length) {
		clickables = button;
		button.addClass("echo-clickable");
	}
	clickables[extra.once ? "one" : "on"]({
		"click": function(event) {
			event.stopPropagation();
			if (extra.callback) extra.callback(event);
		}
	});

	if (!extra.inner) {
		var _data = item.get("buttons." + extra.plugin + "." + extra.name);
		_data.element = button;
		_data.clickableElements = clickables;
		if (Echo.Utils.isMobileDevice()) {
			clickables.addClass("echo-linkColor");
		}
	}
	return element.append(button);
};

plugin.component.renderers.authorName = function(element) {
	this.parentRenderer("authorName", arguments);
	return element.wrapInner("<span/>");
};

plugin.methods._maybeRemoveLiveUpdateIndicator = function() {
	var self = this;
	var container = this.component.view.get("container");
	// Item can be created but not rendered. So we check if container exists here.
	if (
		this.component.config.get("markAsRead") !== "viewportenter"
		|| !container
		|| !$.inviewport(container, {"threshold": 0})
	) {
		return;
	}
	this.set("isLiveUpdate", false);
	if (this._transitionSupported()) {
		container.removeClass(this.cssPrefix + "liveUpdate");
	} else {
		setTimeout(function() {
			// IE 8-9 doesn't support transition, so we just remove the highlighting.
			// Maybe we should use jquery.animate (animating colors requires jQuery UI) ?
			container.removeClass(self.cssPrefix + "liveUpdate");
		}, this.config.get("fadeTimeout"));
	}
};

plugin.methods._checkItemContentHeight = function() {
	var body = this.component.view.get("body");
	var button = this.view.get("seeMore");

	if (body && button) {
		var collapsedHeight = this.config.get("collapsedContentHeight");
		var coeffToShow = 1.2; // we don`t need to hide text if it`s height <= 120% of collapsedHeight
		if (body.height() > collapsedHeight * coeffToShow && !button.is(":visible")) {
			body.css("max-height", collapsedHeight);
			button.show();
		} else if (body.height() < collapsedHeight && button.is(":visible")) {
			//body.css("max-height", "");
			//button.hide(); 
		}
	}
};

plugin.methods._pageLayoutChange = function() {
	var item = this.component;
	var footer = item.view.get("footer");
	var buttons = item.view.get("buttons");
	var buttonsStates = [
		"inline",
		"compact",
		"dropdown"
	];
	if (!this.get("buttonsStates")) {
		this.set("buttonsStates", buttonsStates);
	}
	var configuredButtonsState = this.config.get("initialIntentsDisplayMode") ||  buttonsStates[0];

	var currentState = this.get("currentButtonsState");
	if (!currentState) {
		currentState = configuredButtonsState;
		this.set("currentButtonsState", currentState);
	}
	if (!footer || !buttons || !footer.is(":visible")) {
		this._checkItemContentHeight();
		return;
	}
	var footerWidth = footer.width();
	var buttonsWidth = buttons.width();
	var prevFreeSpace = this.get("prevFreeSpace") || 0;
	var freeSpace = footerWidth - footer.children().eq(0).width() - footer.children().eq(1).width();
	if (prevFreeSpace !== freeSpace || footerWidth < buttonsWidth) {
		this.set("prevFreeSpace", freeSpace);
		var index = $.inArray(currentState, buttonsStates);
		if (freeSpace < buttonsWidth) {
			if (buttonsStates[index + 1]) {
				currentState = buttonsStates[index + 1];
			}
			this.set("currentButtonsState", currentState);
			item.view.render({"name": "buttons"});
		} else if (freeSpace > (2 * buttonsWidth)) {
			var indexOfConfiguredState = $.inArray(configuredButtonsState, buttonsStates);
			if (indexOfConfiguredState < index && buttonsStates[index - 1]) {
				currentState = buttonsStates[index - 1];
			} else {
				currentState = configuredButtonsState;
			}
			this.set("currentButtonsState", currentState);
			item.view.render({"name": "buttons"});
		}
	}
	//this._checkItemContentHeight();
};

var cache = {};
plugin.methods._transitionSupported = function() {
	if (!cache.transitionSupported) {
		var s = document.createElement('p').style;
		cache.transitionSupported = 'transition' in s ||
			'WebkitTransition' in s ||
			'MozTransition' in s ||
			'msTransition' in s ||
			'OTransition' in s;
	}
	return cache.transitionSupported;
};

var itemDepthRules = [];
// 100 is a maximum level of children in query, but we can apply styles for ~20
for (var i = 0; i <= 20; i++) {
	itemDepthRules.push('.{plugin.class} .{class:depth}-' + i + ' { margin-left: 0px; padding-left: ' + (i ? 12 + (i - 1) * 39 : 16) + 'px; }');
}

plugin.css =
	// see more
	'.{plugin.class:seeMore}:before { content: ""; display: block; height: 3px; box-shadow: 0 -3px 3px rgba(0, 0, 0, 0.08); position: relative; top: 0px; }' +
	'.{plugin.class:seeMore} { margin-top: -8px; display: none; padding: 0 0 15px 0; border-top: 1px solid #D8D8D8; text-align: center; font-size: 12px; cursor: pointer; color: #C6C6C6; }' +
	'.{plugin.class:seeMore}:hover { color: #262626; }' +

	// source icon
	'.{plugin.class} .{class:sourceIcon} { float: left; margin-right: 10px; }' +
	'.{plugin.class} .{class:sourceIcon} > img { margin-top: 2px; height: 16px; width: 16px; }' +

	// indicator
	'.{plugin.class} .{class:container} { position: relative; }' +
	'.{plugin.class} .{class:indicator} { position: absolute; left: 0px; top: 0px; bottom: 0px; width: 4px; background-color: transparent; z-index: 10; }' +

	// TODO: get rid of this item styles (introduced for DS generated items)
	'.{plugin.class} .{class:body} .echo-item-video { position: relative; padding-bottom: 75%; height: 0; float: none; margin: 0px; }' +
	'.{plugin.class} .{class:body} .echo-item-video > iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
	'.{plugin.class} .{class:body} .echo-item-video > video { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
	'.{plugin.class} .{class:body} .echo-item-video > object { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }' +
	'.{plugin.class} .{class:body} .echo-item-title { font-size: 15px; font-weight: normal; line-height: 21px; margin: 0px; }' +

	// common
	'.{plugin.class} .{plugin.class:dropdownButton} { display: inline; margin-left: 0px; }' +
	'.{plugin.class} .{plugin.class:dropdownButton} > .dropdown { display: inline; }' +
	'.{plugin.class} .{plugin.class:dropdownButton} > .dropdown a { color: inherit; text-decoration: inherit; }' +

	'.{plugin.class:topPostMarker} { float: right; position: absolute; top: -4px; right: 15px; }' +
	'.{plugin.class} .{plugin.class:wrapper} { background: #ffffff; border-bottom: 1px solid #e5e5e5; border-radius: 3px 3px 0px 0px; }' +
	'.{plugin.class} .{class:container}.{class:depth-0} { border-radius: 2px 3px 0px 0px; }' +
	'.{plugin.class} .{class:container}.{plugin.class:liveUpdate} .{class:indicator} { background-color: #f5ba47; }' +

	'.{plugin.class} .echo-trinaryBackgroundColor { background-color: #f8f8f8; }' +
	'.{plugin.class} .{class:date} { float: left; color: #d3d3d3; line-height: 18px; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; word-wrap: normal; max-width: 100%; }' +

	'.{plugin.class} .{class:avatar} { height: 28px; width: 28px; margin-left: 3px; }' +
	'.{plugin.class} .{class:avatar} div { height: 28px; width: 28px; background-size:cover; display:inline-block; background-position:center; border-radius: 50%;}' +

	'.{plugin.class} .{class:content} { background: #f8f8f8; border-radius: 3px; }' +
	'.{plugin.class} .{class:buttons} { margin-left: 0px; white-space: nowrap; line-height: 20px; }' +
	'.{plugin.class} .{class:metadata} { margin-bottom: 8px; }' +
	'.{plugin.class} .{class:body} { padding-top: 0px; margin-bottom: 8px; overflow: hidden; }' +
	'.{plugin.class} .{class:body} .{class:text} { color: #42474A; font-size: 15px; line-height: 21px; }' +
	'.{plugin.class} .{class:authorName} { float: left; color: #595959; font-weight: normal; font-size: 14px; line-height: 16px; max-width: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; word-wrap: normal; }' +
	'.{plugin.class} .{class:authorName} span { padding-right: 5px; }' +

	'.{plugin.class} .{class:container-child} { padding-top: 8px; padding-bottom: 8px; padding-right: 0px; margin: 0px 15px 2px 0px; }' +
	'.{plugin.class} .{class:content} .{class:container-child-thread} { padding-top: 8px; padding-bottom: 8px; padding-right: 0px; margin: 0px 15px 2px 0px; }' +

	'.{plugin.class} .{class:children} .{class:avatar-wrapper} { margin-top: 5px; }' +
	'.{plugin.class} .{class:children} .{class:frame} { margin-left: 5px; }' +
	'.{plugin.class} .{class:children} .{class:data} { margin-top: 2px; padding-top: 0px; }' +
	'.{plugin.class} .{class:children} .{plugin.class:wrapper} { padding-top: 0px; background: none; border: none; }' +
	'.{plugin.class} .{class:expandChildren} { padding: 15px 0px 8px 16px; margin-bottom: 0px; }' +
	'.{plugin.class} .{class:children} .{class:expandChildren} { padding: 8px 0px; margin-bottom: 0px; }' +

	'.echo-sdk-ui .{plugin.class} .{class:buttons} a:focus { outline: none; }' +
	'.{plugin.class} .{class:button} { margin-right: 10px; }' +
	'.{plugin.class} .{class:buttons} .dropdown .{class:button} { margin-right: 0px; }' +
	'.{plugin.class} .{class:button-delim} { display: none; }' +
	'.echo-sdk-ui .{plugin.class:buttonIcon}[class*=" icon-"] { margin-right: 4px; margin-top: 0px; }' +
	'.{plugin.class} .{plugin.class:buttonIcon} { opacity: 0.3; }' +
	'.{plugin.class} .{class:buttons} a.{class:button}.echo-linkColor,' +
	'.echo-sdk-ui .{plugin.class} .{class:button}:active,' +
	'.echo-sdk-ui .{plugin.class} .{class:button}:focus { text-decoration: none; color: #c6c6c6; }' +
	'.{plugin.class} .{class:container}:hover a.{class:button} { color: #262626; text-decoration: none; }' +
	'.{plugin.class} .{class:buttonCaption} { vertical-align: middle; font-size: 12px; }' +
	'.{plugin.class} .{class:buttons} a.{class:button}.echo-linkColor .{plugin.class:buttonIcon},' +
	'.{plugin.class} .{class:container}:hover .{plugin.class:buttonIcon},' +
	'.{class:buttons} a.{class:button}:hover .{plugin.class:buttonIcon} { opacity: 0.8; }' +
	'.{plugin.class} .{class:compactButton} ul.dropdown-menu { left: -20px; }' +

	'.{plugin.class} .{class:depth-0} .{class:date} { line-height: 20px; }' +
	'.{plugin.class} .{plugin.class:chevron} { margin-top: 0px !important; }' +
	'.{plugin.class} .{class:expandChildrenLabel} { margin-right: 5px; }' +
	'.{plugin.class} .{class:expandChildren} .{class:expandChildrenLabel} { color: #D3D3D3; }' +
	'.{plugin.class} .{class:expandChildren}:hover .{class:expandChildrenLabel} { color: #262626; }' +
	'.{plugin.class} .{class:expandChildren} .{plugin.class:chevron} { opacity: 0.3; }' +
	'.{plugin.class} .{class:expandChildren}:hover .{plugin.class:chevron} { opacity: 0.8; }' +
	'.{plugin.class} .{class:expandChildren} .echo-message-icon { padding-left: 0px; background: none; }' +
	'.{plugin.class} .{class:expandChildren} .{class:message-loading} { background: none; }' +
	'.{plugin.class} .{class:depth-0} .{class:footer} { padding: 8px 0px 10px; }' +
	'.{plugin.class} .{class:depth-0} .{class:body} { padding-top: 0px; }' +
	'.{plugin.class} .{class:depth-0} .{class:avatar} { height: 36px; width: 36px; }' +
	'.{plugin.class} .{class:depth-0} .{class:avatar} div { height: 36px; width: 36px; }' +
	'.{plugin.class} .{class:depth-0} .{class:authorName} { font-weight: normal; font-size: 17px; line-height: 18px; }' +
	'.{plugin.class} .{class:depth-0} .{class:subwrapper} { margin-left: 0px; }' +
	'.{plugin.class} .{class:depth-0} .{class:childrenMarker} { display: none; }' +
	'.{plugin.class} .{class:depth-0} .{plugin.class:header-box} { height: 36px; margin-right: 18px; margin-left: 45px; }' +
	'.{plugin.class} .{class:depth-0} .{plugin.class:header-box}:before { content: ""; display: inline-block; height: 100%; vertical-align: middle; }' +
	'.{plugin.class} .{class:depth-0} .{plugin.class:header-centered} { display: inline-block; vertical-align: middle; max-width: 100%; max-width: 90%\\9; }' +

	'.{plugin.class} .{class:data} { padding: 7px 0px 0px 0px; }' +
	'.{plugin.class} .{class:content} .{class:depth-0} { padding: 15px 16px 0px 16px; }' +

	// Edit Plugin
	'.echo-streamserver-controls-submit-plugin-Edit .echo-streamserver-controls-submit-metadataContainer { display: none !important; }' +
	'.{class:depth-0} .echo-streamserver-controls-submit-plugin-Edit .echo-streamserver-controls-submit-plugin-Edit-header { line-height: 38px; margin-left: 45px; }' +
	'.{class:depth-0} .echo-streamserver-controls-submit-plugin-Edit .echo-streamserver-controls-submit-body { padding: 7px 0px 0px 0px; }' +
	'.{class:depth-0} .echo-streamserver-controls-submit-plugin-Edit .echo-streamserver-controls-submit-controls { margin-bottom: 5px; }' +

	itemDepthRules.join("\n");

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.Submit.Plugins.CardUIShim
 * Extends Submit control to look like Card-based app.
 */
var plugin = Echo.Plugin.manifest("CardUIShim", "Echo.StreamServer.Controls.Submit");

plugin.config = {
	"submitPermissions": "forceLogin",
	"displaySharingOnPost": true,
	"contentTypes": {
		"comments": {
			"visible": true,
			"prompt": "What's on your mind",
			"resolveURLs": true
		}
	},
	"confirmation": {
		"enable": false,
		"message": "Thanks, your post has been submitted for review",
		"timeout": 5000,
		"hidingTimeout": 200
	}
};

plugin.events = {
	"Echo.UserSession.onInvalidate": {
		"context": "global",
		"handler": function() {
			if (this.deferredActivity) {
				this.deferredActivity();
				delete this.deferredActivity;
				// clearing up saved text...
				var targetURL = this.component.config.get("targetURL");
				Echo.Utils.set(Echo.Variables, targetURL, "");
			}
		}
	},
	"Echo.StreamServer.Controls.Submit.onSharingOnPostChange": {
		"context": "global",
		"handler": function() {
			this.view.render({"name": "button"});
		}
	},
	"Echo.StreamServer.Controls.Submit.onPostInit": function() {
		if (this.config.get("confirmation.enable")) {
			this.view.get("confirmation").hide();
		}
	},
	"Echo.StreamServer.Controls.Submit.onPostComplete": function() {
		if (this.config.get("confirmation.enable")) {
			var self = this;
			var confirmation = this.view.get("confirmation");
			confirmation.show();
			setTimeout(function() {
				confirmation.slideUp(self.config.get("confirmation.hidingTimeout"));
			}, this.config.get("confirmation.timeout"));
		}
	}
};

plugin.labels = {
	"post": "Post",
	"postAndShare": "Post and Share"
};

plugin.templates.auth = '<div class="{plugin.class:auth}"></div>';

plugin.templates.postButton =
	'<div class="{class:postButton} btn-group">' +
		'<div class="btn btn-primary {plugin.class:button}"></div>' +
		'<div class="btn btn-primary dropdown-toggle {plugin.class:switchSharing}" data-toggle="dropdown">' +
			'<span class="caret"></span>' +
		'</div>' +
		'<ul class="dropdown-menu pull-right">' +
			'<li><a href="#" class="{plugin.class:switchToPost}">{plugin.label:post}</a></li>' +
			'<li><a href="#" class="{plugin.class:switchToPostAndShare}">{plugin.label:postAndShare}</a></li>' +
		'</ul>' +
	'</div>';

plugin.templates.confirmation =
	'<div class="alert alert-success echo-primaryFont {plugin.class:confirmation}">' +
		'{plugin.config:confirmation.message}' +
	'</div>';

plugin.init = function() {
	var self = this, submit = this.component;

	this.extendTemplate("replace", "postButton", plugin.templates.postButton);
	this.extendTemplate("insertBefore", "header", plugin.templates.auth);
	this.extendTemplate("insertAsFirstChild", "container", plugin.templates.confirmation);

	// drop all validators
	submit.validators = [];
	submit.addPostValidator(function() {
		var areFieldsValid = true;
		var isGuestAllowed = self.config.get("submitPermissions") === "allowGuest";

		$.each(isGuestAllowed ? ["name", "text"] : ["text"], function (i, field) {
			areFieldsValid = !submit.highlightMandatory(submit.view.get(field));
			return areFieldsValid;
		});

		// exit in case some required fields are empty
		if (!areFieldsValid) return false;

		if (!isGuestAllowed && !submit.user.is("logged")) {
			self.deferredActivity = function() {
				self.component.post();
			};
			self._requestLoginPrompt();
			return false;
		}
		return true;
	});

	submit.config.set("actionString", this.config.get("contentTypes.comments.prompt"));
};

plugin.renderers.confirmation = function(element) {
	return element.hide();
};

plugin.renderers.button = function(element) {
	var self = this;
	var submit = this.component;

	var states = {
		"normal": {
			"target": element,
			"icon": false,
			"disabled": false,
			"label": this.labels.get(this._sharingOnPost() ? "postAndShare" : "post")
		},
		"posting": {
			"target": element,
			"icon": submit.config.get("cdnBaseURL.sdk-assets") + "/images/loading.gif",
			"disabled": true,
			"label": submit.labels.get("posting")
		}
	};

	var postButton = new Echo.GUI.Button(states.normal);
	submit.posting = submit.posting || {};
	submit.posting.subscriptions = submit.posting.subscriptions || [];
	var subscribe = function(phase, state, callback) {
		var topic = "Echo.StreamServer.Controls.Submit.onPost" + phase;
		var subscriptions = submit.posting.subscriptions;
		if (subscriptions[topic]) {
			submit.events.unsubscribe({
				"topic": topic,
				"handlerId": subscriptions[topic]
			});
		}
		subscriptions[topic] = submit.events.subscribe({
			"topic": topic,
			"handler": function(topic, params) {
				postButton.setState(state);
				if (callback) callback(params);
			}
		});
	};

	subscribe("Init", states.posting);
	subscribe("Complete", states.normal, function(data) {
		if (self._sharingOnPost()) {
			self._share(data);
		}
		submit.view.get("text").val("").trigger("blur");
		submit.view.render({"name": "tags"});
		submit.view.render({"name": "markers"});
	});
	subscribe("Error", states.normal, function(params) {
		var request = params.request || {};
		if (request.state && request.state.critical) {
			submit._showError(params);
		}
	});
	submit.posting.action = submit.posting.action || function() {
		if (submit._isPostValid()) {
			submit.post();
		}
	};
	element.off("click", submit.posting.action).on("click", submit.posting.action);

	return element;
};

plugin.renderers.switchSharing = function(element) {
	if (!this.config.get("displaySharingOnPost")) {
		// it should looks like single button, not buttons group
		element.parent().removeClass("btn-group");
		element.hide();
	}
	return element;
};

plugin.renderers.switchToPost = function(element) {
	var self = this;
	return element.on("click", function(e) {
		self._sharingOnPost(false);
		e.preventDefault();
	});
};

plugin.renderers.switchToPostAndShare = function(element) {
	var self = this;
	return element.on("click", function(e) {
		self._sharingOnPost(true);
		e.preventDefault();
	});
};

plugin.component.renderers.header = function(element) {
	var plugin = this, status = plugin._userStatus();
	if (status === "logged" || status === "forcedLogin") {
		return element.empty();
	}
	return plugin.parentRenderer("header", arguments);
};

plugin.component.renderers.container = function(element) {
	var plugin = this;
	plugin.parentRenderer("container", arguments);
	var _class = function(postfix) {
		return plugin.cssPrefix + postfix;
	};
	return element
		.removeClass($.map(["logged", "anonymous", "forcedLogin"], _class).join(" "))
		.addClass(_class(plugin._userStatus()));
};

plugin.renderers.auth = function(element) {
	var config = this.config.assemble($.extend(true, {"target": element}, this.config.get("auth")));
	new Echo.StreamServer.Controls.CardUIAuth(config);
	return element;
};

plugin.component.renderers.postButton = function(element) {
	return element;
};

plugin.methods._requestLoginPrompt = function() {
	Backplane.response([{
		// IMPORTANT: we use ID of the last received message
		// from the server-side to avoid same messages re-processing
		// because of the "since" parameter cleanup...
		"id": Backplane.since,
		"channel_name": Backplane.getChannelName(),
		"message": {
			"type": "identity/login/request",
			"payload": this.component.user.data || {}
		}
	}]);
};

plugin.methods._share = function(data) {
	var item = data.postData.content[0];
	var payload = {
		"origin": "item",
		"actor": {
			"id": this.component.user.get("identityUrl"),
			"name": item.actor.name,
			"avatar": item.actor.avatar
		},
		"object": {
			"id": data.request.response.objectID,
			"content": item.object.content
		},
		"source": item.source,
		"target": item.targets[0].id
	};
	Backplane.response([{
		// IMPORTANT: we use ID of the last received message
		// from the server-side to avoid same messages re-processing
		// because of the "since" parameter cleanup...
		"id": Backplane.since,
		"channel_name": Backplane.getChannelName(),
		"message": {
			"type": "content/share/request",
			"payload": payload
		}
	}]);

};

plugin.methods._sharingOnPost = function(enabled) {
	if (typeof enabled !== "undefined") {
		Echo.Cookie.set("sharingOnPost", !!enabled);
		this.component.events.publish({
			"topic": "onSharingOnPostChange",
			"contenxt": "global"
		});
	}
	return this.config.get("displaySharingOnPost")
		&& Echo.Cookie.get("sharingOnPost") === "true";
};

plugin.methods._userStatus = function() {
	return this.component.user.is("logged")
		? "logged"
		: this.config.get("submitPermissions") === "forceLogin"
			? "forcedLogin"
			: "anonymous";
};

plugin.css =
	'.echo-sdk-ui .{plugin.class:confirmation} { margin-bottom: 10px; }' +
	'.{plugin.class} .{class:urlContainer} { display: none; }' +
	'.{plugin.class} .{class:avatar} { display: none; }' +
	'.{plugin.class} .{class:fieldsWrapper} { margin-left: 0px; }' +
	'.{plugin.class} .{class:plugin-JanrainAuth-forcedLogin} .{class:header} { display: none; }' +
	'.{plugin.class} .{class:fieldsWrapper} input { font-weight: normal; }' +
	'.{plugin.class} .{class:nameContainer} { padding: 3px 2px 3px 5px; }' +
	'.{plugin.class} .{class:tagsContainer} { display: none !important; }' +
	'.{plugin.class} .{class:markersContainer} { display: none !important; }' +
	'.{plugin.class} .{class:content} textarea.{class:textArea} { height: 75px; }' +
	'.{plugin.class} .{class:controls} { margin: 0px; padding: 5px; border: 1px solid #d8d8d8; border-top: 0px; background: #ffffff;}' +
	'.{plugin.class} .{class:container} { padding: 20px 20px 20px; border: 1px solid #d8d8d8; border-bottom-width: 2px; border-radius: 3px; }' +
	'.{plugin.class} .{class:header} { margin-top: 10px; }' +
	'.{plugin.class} .{class:postContainer} .dropdown-menu { min-width: 100px; }' +
	'.{plugin.class} .{class:postButton} { font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; }' +
	'.{plugin.class} .{control.class:buttons} .dropdown { min-width: 77px; }' +
	'.{plugin.class} .btn.{plugin.class:button} { padding: 3px 12px 5px 12px; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

var plugin = Echo.Plugin.manifest("CardUISocialSharing", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	this.component.addButtonSpec("CardUISocialSharing", this._assembleButton("Share"));
};

plugin.labels = {
	"share": "Share"
};

plugin.methods._prepareData = function(item) {
	return {
		"origin": "item",
		"actor": {
			"id": item.actor.id,
			"name": item.actor.title,
			"avatar": item.actor.avatar
		},
		"object": {
			"id": item.object.id,
			"content": item.object.content
		},
		"source": item.source,
		"target": item.target.id
	};
};

plugin.methods._share = function(data) {
	Backplane.response([{
		// IMPORTANT: we use ID of the last received message
		// from the server-side to avoid same messages re-processing
		// because of the "since" parameter cleanup...
		"id": Backplane.since,
		"channel_name": Backplane.getChannelName(),
		"message": {
			"type": "content/share/request",
			"payload": data
		}
	}]);
};

plugin.methods._assembleButton = function(name) {
	var self = this;
	return function() {
		var item = this;
		return {
			"name": name,
			"icon": "icon-share",
			"label": self.labels.get("share"),
			"visible": true,
			"callback": function() {
				self._share(self._prepareData(item.data));
			}
		};
	};
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.Submit.Plugins.URLResolver
 * Extends Stream Item control to enable url media resoving.
 */
var itemPlugin = Echo.Plugin.manifest("URLResolver", "Echo.StreamServer.Controls.Stream.Item");

itemPlugin.vars = {
	"media": [],
	"content": undefined
};

itemPlugin.templates.media = '<div class="{plugin.class:mediaContent}"></div>';

itemPlugin.init = function() {
	this.extendTemplate("insertAsLastChild", "data", itemPlugin.templates.media);
};

itemPlugin.component.renderers.body = function(element) {
	var self = this;
	var item = this.component;

	var original = item.get("data.object.content");
	var content = $("<div/>").append(original);
	var media = self._getMediaAttachments();
	$("div[oembed], div[data-oembed]", content).remove();

	// hide all item content if item type is article, photo or video
	// and item has media attachments
	if (media.length && this._getItemRenderType()) {
		element.hide();
	}

	Echo.Utils.safelyExecute(function() {
		var text = $(".echo-item-text", content);
		if (media.length && text.length) {
			item.set("data.object.content", text.html());
		} else if (media.length) {
			item.set("data.object.content", content.html());
		}
	});

	this.parentRenderer("body", arguments);

	item.set("data.object.content", original);

	return element;
};

itemPlugin.renderers.mediaContent = function(element) {
	var self = this;
	var item = this.component;
	var media = this._getMediaAttachments();
	var type = this._getItemRenderType();
	var cardConfig = media.length && type
		? { "displaySourceIcon": false, "displayAuthor": false }
		: {};
	cardConfig.maximumMediaWidth = this.config.get("presentation.maximumMediaWidth");
	new Echo.Conversations.MediaContainer(this.config.assemble({
		"target": element.empty(),
		"data": media,
		"card": cardConfig,
		"ready": function() {
			if (media.length && item.isRoot() && type) {
				var cardType = this.cards[0].getRenderType();
				item.view.get("container").addClass(self.cssPrefix + cardType);
			}
		}
	}));



	return element.addClass(this.cssPrefix + (media.length > 1 ? "multiple" : "single"));
};

itemPlugin.methods._getItemRenderType = function() {
	var availableTypes = ["article", "image", "video"];
	var result;
	$.each(this.component.get("data.object.objectTypes", []), function(i, objectType) {
		var type = (objectType.match("[^/]+$") || []).pop();
		if (~$.inArray(type, availableTypes)) {
			result = type;
			return false;
		}
	});

	return result;
};

itemPlugin.methods._getMediaAttachments = function() {
	var item = this.component;
	if (this.get("content") !== item.get("data.object.content") || typeof this.get("media") === "undefined") {
		var result = [];
		Echo.Utils.safelyExecute(function() {
			var content = $("<div/>").append(item.get("data.object.content"));
			result = $("div[oembed], div[data-oembed]", content).map(function() {
				return $.parseJSON($(this).attr("oembed") || $(this).attr("data-oembed"));
			}).get();
		});
		this.set("content", item.get("data.object.content"));
		this.set("media", result);
	}
	return this.get("media", []);
};

itemPlugin.css =
	'.{class:depth-0} .{plugin.class:mediaContent}.{plugin.class:multiple} { margin-left: -16px; margin-right: -16px; }' +
	'.{class:depth-0} .{plugin.class:mediaContent} { margin-bottom: 0px; }' +
	'.{plugin.class:mediaContent}.{plugin.class:multiple} > div { border-top: 1px solid #D2D2D2; border-bottom: 1px solid #D2D2D2; background-color: #F1F1F1; }' +
	'.{plugin.class:video} .{plugin.class:mediaContent} .echo-conversations-nestedcard-border { border: 0px; }' +
	'.{plugin.class:video} .{plugin.class:mediaContent} .echo-conversations-nestedcard-video { padding: 0px; }' +

	'.{plugin.class:photo}.{class:container}.{class:depth-0} { padding-top: 0; }' +
	'.{plugin.class:photo} .{plugin.class:mediaContent} { margin: 0 -16px; }' +
	'.{plugin.class:photo} .{plugin.class:mediaContent} .echo-conversations-nestedcard-border { border: 0px; }' +
	'.{plugin.class:photo} .echo-conversations-nestedcard-photoContainer { border-top-left-radius: 3px; border-top-right-radius: 3px; }' +
	'.{plugin.class:photo} .{class:data} { padding-top: 0; }' +
	'.{plugin.class:photo} .{class:authorName} { color: #FFFFFF; text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7); }' +
	'.{plugin.class:photo} .{class:date} { text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.7); padding-right: 1px; }' +
	'.{plugin.class:photo} .{class:avatar-wrapper} { z-index: 10; position: absolute; top: 15px; }' +
	'.{plugin.class:photo} .echo-streamserver-controls-stream-item-plugin-CardUIShim-header-box { z-index: 10; position: relative; top: 50px; margin-top: -36px; }' +

	'.{plugin.class:link} .{plugin.class:mediaContent} .echo-conversations-nestedcard-border { border: 0px; }' +
	'.{plugin.class:link} .{plugin.class:mediaContent} .echo-conversations-nestedcard-article { padding: 0px; }' +

	'.{plugin.class:mediaContent} { margin-bottom: 8px; }';

Echo.Plugin.create(itemPlugin);

/**
 * @class Echo.StreamServer.Controls.Submit.Plugins.URLResolver
 * Extends Submit control to enable url media resoving.
 */
var submitPlugin = Echo.Plugin.manifest("URLResolver", "Echo.StreamServer.Controls.Submit");

submitPlugin.config = {
	"embedlyAPIKey": "5945901611864679a8761b0fcaa56f87",
	"maxDescriptionCharacters": "200",
	"resolveURLs": "all" // all, disabled, only-roots, only-children
};


submitPlugin.labels = {
	"attachTitle": "Click to add attachments"
};

submitPlugin.init = function() {
	this.set("timer", null);

	$.embedly.defaults.key = this.config.get("embedlyAPIKey");

	this._setDefinedMedia(this._getMediaAttachments());
	this.extendTemplate("insertAfter", "content", submitPlugin.templates.preview);

	// TODO: get this option from dashboard in future
	// for postComposer and replyComposer.
	var isAttachmentTurnedOn = this.config.get("filePicker.visible") || false;
	if (isAttachmentTurnedOn) {
		this.extendTemplate("insertAsFirstChild", "controls", submitPlugin.templates.attach);
	}

};

submitPlugin.events = {
	"Echo.StreamServer.Controls.Submit.onPostError": function(topic, args) {
		this._restoreTextarea();
	},
	//TODO: remove this subscription then postComposer will be implemented
	"Echo.StreamServer.Controls.Submit.Plugins.URLResolver.onURLsAdded": function(topic, args) {
		var urls = args.urls || [];
		this.resolveURLs(urls, $.proxy(this.attachMedia, this));
	},
	"Echo.StreamServer.Controls.Submit.onPostInit": function(topic, args) {
		var self = this;
		var mediaContent = $.map($.extend({}, self._getResolvedMedia(), self._getDefinedMedia()), function(media) {
			var template = submitPlugin.templates.media[media.type];
			if (!template) return null;
			return self.substitute({
				"template": template,
				"data": $.extend(true, {}, media, {
					"oembed": self.jsonEncode(media)
				})
			});
		});

		if (!mediaContent.length) return;

		args.postData.content[0].object.content = self.substitute({
			"template": submitPlugin.templates.message,
			"data": {
				"text": args.postData.content[0].object.content,
				"media": mediaContent.join("")
			}
		});
		this._replaceTextarea();
		this.component.view.get("text").val(args.postData.content[0].object.content);
	},
	"Echo.StreamServer.Controls.Submit.onPostComplete": function(topic, args) {
		this._setResolvedMedia({});
		this._setDefinedMedia([]);
		this.view.get("mediaContent").empty();
		this.component.view.get("body").removeClass(this.cssPrefix + "enabledMedia");
		this._restoreTextarea();
	}
};

submitPlugin.dependencies = [{
	"url": "{config:cdnBaseURL.apps}/conversations/v1.3.8/third-party/jquery.embedly.js",
	"loaded": function() { return !!$.fn.embedly; }
}];

submitPlugin.templates.preview = '<div class="{plugin.class:mediaContent}"></div>';

submitPlugin.templates.message =
  '<div class="echo-item-text">{data:text}</div>' +
	'<div class="echo-item-files">{data:media}</div>';


submitPlugin.templates.media = {
	"link":
		'<div class="echo-media-item" data-oembed="{data:oembed}">' +
			'<div class="echo-item-article" style="width: {plugin.config:linkWidth}">' +
				'<div class="echo-item-template-article-thumbnail" style="width: 30%; float: left; max-width: 120px; max-height: 120px; text-align:center; overflow:hidden;">' +
					'<img src="{data:thumbnail_url}" style="width: auto; height: auto; max-height:120px; max-width:120px;" />' +
				'</div>' +
				'<div class="echo-item-template-article" style="width: 70%; float: left;">' +
					'<div class="echo-item-template-article-title" style="margin-left: 10px;">' +
						'<a href="{data:url}" target="_blank">{data:title}</a>' +
					'</div>' +
					'<div class="echo-item-template-article-descriptionContainer">' +
						'<div class="echo-item-template-article-description" style="margin-left: 10px;">{data:description}</div>' +
					'</div>' +
				'</div>' +
				'<div class="echo-clear"></div>' +
			'</div>' +
		'</div>',

	"photo":
		'<div class="echo-media-item" data-oembed="{data:oembed}">' +
			'<a href="{data:original_url}" target="_blank">' +
				'<img src="{data:thumbnail_url}"/>' +
			'</a>' +
		'</div>',

	"video":
		'<div class="echo-media-item" data-oembed="{data:oembed}">' +
			'<div class="echo-item-video">{data:html}</div>' +
		'</div>'
};

submitPlugin.templates.attach =
	'<div class="{plugin.class:attach}">' +
		'<img class="{plugin.class:attachPic}" src="//www.washingtonpost.com/wp-stat/echo2/v2/images/conversations/v1.3.8/images/attach.png" />' +
	'</div>';


submitPlugin.component.renderers.text = function(element) {
	var self = this;
	var item = this.component;

	function isRootItem() {
		return item.get("data.object.id") === item.get("data.target.conversationID");
	}

	if (this.config.get("resolveURLs") === "all" ||
			this.config.get("resolveURLs") === "only-roots" && isRootItem() ||
			this.config.get("resolveURLs") === "only-children" && !isRootItem()
	) {
		element.on("keyup paste", function() {
			clearTimeout(self.timer);
			self.timer = setTimeout(function() {
				var urls = self.getURLs(element.val());
				self.resolveURLs(urls, $.proxy(self.attachMedia, self));
			}, 1000);
		});
	}

	var original = item.get("data.object.content");

	Echo.Utils.safelyExecute(function() {
		var content = $("<div/>").append(item.get("data.object.content"));
		var media = self._getMediaAttachments();
		var text = $(".echo-item-text", content);

		$("div[oembed], div[data-oembed]", content).remove();

		if (media.length && text.length) {
			item.set("data.object.content", text.html());
		} else if (media.length) {
			item.set("data.object.content", content.text());
		}
	});

	this.parentRenderer("text", arguments);
	item.set("data.object.content", original);

	return element;
};

function oembedInArray(oembed, array) {
	var result = -1;
	var oembedJSON = JSON.stringify(oembed);
	$.each(array, function(i, val) {
		if (oembedJSON === JSON.stringify(val)) {
			result = i;
			return false;
		}
	});
	return result;
}

submitPlugin.renderers.mediaContent = function(element) {
	element.empty();
	this.attachMedia(this._getDefinedMedia());
	this.attachMedia(this._getResolvedMedia());
	return element;
};

submitPlugin.renderers.attach = function(element) {
	var self = this;
	element.children("img").attr("title", this.labels.get("attachTitle"));
	element.on({
		"click": function(event) {
			var callback = function() {
				window.filepicker.setKey(self.config.get("filePicker.key"));
				var sources = self.config.get("filePicker.sources")
					? self.config.get("filePicker.sources").replace(" ", "").toUpperCase().split(",")
					: undefined;
				try {
					window.filepicker.pickMultiple({
						"mimetype": "image/*",
						"container": "modal",
						"services": sources
					}, function(InkBlob) {
						self.events.publish({
							"topic": "onURLsAdded",
							"data": {
								"urls": $.map(InkBlob, function(picture) {
									return picture.url;
								})
							}
						});
					}, function(FPError) { });
				} catch(e) {
					Echo.Utils.log({
						"message": e.toString(),
						"component": "FilePicker",
						"type": "error"
					});
				}
			};
			Echo.Loader.download([{
				"url": "//api.filepicker.io/v1/filepicker.js"
			}], callback);
		}
	});
	return element;
};

submitPlugin.mediaContent = {};

submitPlugin.methods._setDefinedMedia = function(definedMedia) {
	var key = this._getUniqueFormKey();
	if (!submitPlugin.mediaContent[key]) {
		submitPlugin.mediaContent[key] = {};
	}
	submitPlugin.mediaContent[key].definedMedia = definedMedia;
};

submitPlugin.methods._setResolvedMedia = function(resolvedMedia) {
	var key = this._getUniqueFormKey();
	if (!submitPlugin.mediaContent[key]) {
		submitPlugin.mediaContent[key] = {};
	}
	submitPlugin.mediaContent[key].resolvedMedia = resolvedMedia;
};

submitPlugin.methods._getDefinedMedia = function() {
	var key = this._getUniqueFormKey();
	if (!submitPlugin.mediaContent[key]) {
		submitPlugin.mediaContent[key] = {};
	}
	if (!submitPlugin.mediaContent[key].definedMedia) {
		submitPlugin.mediaContent[key].definedMedia = [];
	}
	return submitPlugin.mediaContent[key].definedMedia;
};

submitPlugin.methods._getResolvedMedia = function() {
	var key = this._getUniqueFormKey();
	if (!submitPlugin.mediaContent[key]) {
		submitPlugin.mediaContent[key] = {};
	}
	if (!submitPlugin.mediaContent[key].resolvedMedia) {
		submitPlugin.mediaContent[key].resolvedMedia = {};
	}
	return submitPlugin.mediaContent[key].resolvedMedia;
};

submitPlugin.methods._getUniqueFormKey = function() {
	var key = "app-";
	var item = this.component;
	if (item.data.unique) {
		key += item.data.unique;
	} else if (item.config.get("intentID")) {
		key += item.config.get("intentID") + item.config.get("targetURL");
	} else {
		key += "rootItem";
	}
	return key;
};

submitPlugin.methods._replaceTextarea = function() {
	// workflow for Edit Plugin
	var content = this.component.view.get("text").val();
	var clone = this.component.view.get("text").clone().val(content);
	this.component.view.get("text").hide().parent().append(clone);
	this.set("textareaClone", clone);
};

submitPlugin.methods._restoreTextarea = function() {
	var clone = this.get("textareaClone");
	if (clone) {
		this.component.view.get("text").val(clone.val()).show();
		this.set("textareaClone", null);
		clone.remove();
	}
};

submitPlugin.methods._getMediaAttachments = function() {
	var item = this.component;
	if (this.get("content") !== item.get("data.object.content") || typeof this.get("media") === "undefined") {
		var result = [];
		Echo.Utils.safelyExecute(function() {
			var content = $("<div/>").append(item.get("data.object.content"));
			result = $("div[oembed], div[data-oembed]", content).map(function() {
				return $.parseJSON($(this).attr("oembed") || $(this).attr("data-oembed"));
			}).get();
		});
		this.set("content", item.get("data.object.content"));
		this.set("media", result);
	}
	return this.get("media", []);
};

submitPlugin.methods.getURLs = function(text) {
	var reURL = /(https?:\/\/)\S+\.\S{2,}|(https?:\/\/)?\S+\.\w{2,}\/\S*/;
	var reSearch = new RegExp(reURL.source, "g"); // add global modificator
	return $.map(text.match(reSearch) || [], function(url) {
		var matches = url.match(reURL);
		return (!matches[1] && !matches[2])
			? "http://" + url
			: url;
	});
};

submitPlugin.methods.resolveURLs = function(urls, callback) {
	var self = this;
	var unresolvedURLs = $.grep(urls, function(url) {
		var media = self._getResolvedMedia();
		if (!media[url]) {
			media[url] = {};
			return true;
		} else {
			return false;
		}
	});

	if (unresolvedURLs.length) {
		$.embedly.oembed(unresolvedURLs, {
			"query": {
				"chars": self.config.get("maxDescriptionCharacters")
				}
		}).progress(function(data) {
			var media = self._getResolvedMedia();
			media[data.original_url] = data;
		}).done(function(data) {
			// check if resolved media already defined
			// and try to move it in resolved media
			var definedMedia = self._getDefinedMedia();
			data = $.grep(data, function(oembed) {
				var index = oembedInArray(oembed, definedMedia);
				if (~index) {
					delete definedMedia[index];
					self._setDefinedMedia(definedMedia);
					return false;
				} else {
					return true;
				}
			});
			callback(data);
		});
	} else {
		callback();
	}
};

submitPlugin.methods.jsonEncode = function(json) {
	return JSON.stringify(json)
		.replace(/&/g, '&amp;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;');
};

submitPlugin.methods.attachMedia = function(data) {
	if (!data) return;
	var self = this;
	var container = this.view.get("mediaContent");
	var body = this.component.view.get("body");

	$.map(data, function(oembed) {
		// TODO get rig of available types list here (move it into NestedCard?)
		if (!~$.inArray(oembed.type, ["link", "photo", "video"])) { return false; }
		body.addClass(self.cssPrefix + "enabledMedia");
		var html = $("<div>");
		var card = new Echo.Conversations.NestedCard({
			"target": html,
			"context": self.config.get("context"),
			"width":  self.config.get("mediaWidth"),
			"data": oembed
		});
		var detachBtn = $(self.substitute({
			"template": '<div class="echo-primaryFont {plugin.class:Close}">&times;</div>'
		})).one("click", function() {
			var media = self._getResolvedMedia();
			if (media[oembed.original_url]) {
				media[oembed.original_url] = {};
			} else {
				// remove from defined media
				var definedMedia = self._getDefinedMedia();
				var index = oembedInArray(oembed, definedMedia);
				if (~index) {
					delete definedMedia[index];
					self._setDefinedMedia(definedMedia);
				}
			}
			card.destroy();
			html.remove();
			if (container.is(":empty")) {
				body.removeClass(self.cssPrefix + "enabledMedia");
			}
		});
		html.append(detachBtn).appendTo(container);
	});
};

submitPlugin.css =
	'.{class:body}.{plugin.class:enabledMedia} .{class:content}.{class:border} { border-bottom: none; }' +
	'.{class:body}.{plugin.class:enabledMedia} .{plugin.class:mediaContent} { overflow: auto; border: 1px solid #DEDEDE; border-top-style: dashed; background-color: #F1F1F1; padding: 10px 5px; }' +

	'.{plugin.class:Close} { line-height: 1; opacity: 0.5; filter: alpha(opacity=70); font-size: 30px; font-weight: bold; position: absolute; top: 4px; right: 8px; cursor: pointer; color: #D2D2D2; text-shadow: 0 0 1px #000; }' +
	'.{plugin.class:Close}:hover { opacity: 1; filter: alpha(opacity=100); }' +
	'.{plugin.class:mediaContent} .echo-conversations-nestedcard-videoAvatar { margin-right: 20px; }' +
	'.{plugin.class:mediaContent} .echo-conversations-nestedcard-articleTitle { margin-right: 15px; }' +
	'.{plugin.class:mediaContent} .echo-conversations-nestedcard-photoAvatar { margin-right: 15px; }' +

	'.{plugin.class:mediaContent} { white-space: nowrap; word-wrap: normal; }' +
	'.{plugin.class:mediaContent} > div { display: inline-block; white-space: normal; margin-right: 8px; position: relative; vertical-align: top; max-width: 90%; }' +

	// scrollbar
	'.{plugin.class:mediaContent}::-webkit-scrollbar { height: 10px; }' +
	'.{plugin.class:mediaContent}::-webkit-scrollbar-track { box-shadow: inset 0 0 6px rgba(0,0,0,0.3); }' +
	'.{plugin.class:mediaContent}::-webkit-scrollbar-thumb { background: #D2D2D2; box-shadow: inset 0 0 6px rgba(0,0,0,0.5); }' +

	'.{plugin.class:attach} { margin: 5px; float: left; cursor: pointer; }';
Echo.Plugin.create(submitPlugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI
 * Adds extra Flag/Unflag buttons to each item in the Echo Stream
 * control for the authenticated users. The item will receive the
 * CommunityFlagged state as soon as it is flagged by a certain number
 * of users. By default this number is 3, but it may be updated by
 * contacting Echo Solutions team at solutions@aboutecho.com. The plugin
 * also shows the number of flags already set for the item next to the
 * Flag/Unflag control.
 *
 * 	new Echo.StreamServer.Controls.Stream({
 * 		"target": document.getElementById("echo-stream"),
 * 		"appkey": "echo.jssdk.demo.aboutecho.com",
 * 		"plugins": [{
 * 			"name": "CommunityFlagCardUI"
 * 		}]
 * 	});
 *
 * More information regarding the plugins installation can be found
 * in the [“How to initialize Echo components”](#!/guide/how_to_initialize_components-section-initializing-plugins) guide.
 *
 * @extends Echo.Plugin
 *
 * @package streamserver/plugins.pack.js
 * @package streamserver.pack.js
 */
var plugin = Echo.Plugin.manifest("CommunityFlagCardUI", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	this.component.addButtonSpec("CommunityFlagCardUI", this._assembleButton("Flag"));
	this.component.addButtonSpec("CommunityFlagCardUI", this._assembleButton("Unflag"));
};

plugin.config = {
	/**
	 * @cfg {Boolean} showUserList
	 * Specifies the visibility of the list of users who flagged a particular
	 * item. Note that the list is only visible for the users with
	 * administrative privileges.
	 */
	"showUserList": true
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"flagged": "Flagged",
	/**
	 * @echo_label
	 */
	"flaggedThis": " flagged this.",
	/**
	 * @echo_label
	 */
	"flagControl": "Flag",
	/**
	 * @echo_label
	 */
	"unflagControl": "Unflag",
	/**
	 * @echo_label
	 */
	"flagProcessing": "Flagging...",
	/**
	 * @echo_label
	 */
	"unflagProcessing": "Unflagging..."
};

plugin.dependencies = [{
	"control": "Echo.StreamServer.Controls.FacePile",
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js"
}];

/**
 * @echo_template
 */
plugin.templates.main = '<div class="{plugin.class:flaggedBy}"></div>';

/**
 * @echo_renderer
 */
plugin.renderers.flaggedBy = function(element) {
	var plugin = this, item = this.component;
	var flags = item.get("data.object.flags", []);
	if (!flags.length || !item.user.is("admin") || !plugin.config.get("showUserList")) {
		return element.hide();
	}
	var flagsPerPage = 5;
	var visibleUsersCount = plugin.get("facepile")
		? plugin.get("facepile").getVisibleUsersCount()
		: flagsPerPage;
	var config = plugin.config.assemble({
		"target": element,
		"data": {
			"entries": flags,
			"itemsPerPage": flagsPerPage
		},
		"initialUsersCount": visibleUsersCount,
		"suffixText": plugin.labels.get("flaggedThis")
	});
	plugin.set("facepile", new Echo.StreamServer.Controls.FacePile(config));
	return element.show();
};

plugin.methods._assembleButton = function(name) {
	var plugin = this;
	var callback = function() {
		var item = this;
		var buttonNode = item.get("buttons." + plugin.name + "." + name + ".element");
		$("." + item.cssPrefix + "buttonCaption", buttonNode)
			.empty()
			.append(plugin.labels.get(name.toLowerCase() + "Processing"));
		var activity = {
			"verbs": ["http://activitystrea.ms/schema/1.0/" + name.toLowerCase()],
			"targets": [{"id": item.get("data.object.id")}]
		};
		var request = Echo.StreamServer.API.request({
			"endpoint": "submit",
			"secure": plugin.config.get("useSecureAPI", false, true),
			"submissionProxyURL": plugin.config.get("submissionProxyURL", "", true),
			"data": {
				"content": activity,
				"appkey": item.config.get("appkey"),
				"sessionID": item.user.get("sessionID"),
				"target-query": item.config.get("parent.query")
			},
			"onData": function(response) {
				/**
				 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI.onFlagComplete
				 * Triggered if flag operation was completed.
				 */
				/**
				 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI.onUnflagComplete
				 * Triggered if reverse flag operation was completed.
				 */
				plugin._publishEventComplete({
					"name": name,
					"state": "Complete",
					"response": response
				});
				if (name === "Flag" && !item.config.get("parent.showFlags")) {
					plugin.set("flagged", true);
					item.view.render({"name": "buttons"});
				}
				plugin.requestDataRefresh();
			},
			"onError": function(response) {
				/**
				 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI.onFlagError
				 * Triggered if flag operation failed.
				 */
				/**
				 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.CommunityFlagCardUI.onUnflagError
				 * Triggered if reverse flag operation failed.
				 */
				plugin._publishEventComplete({
					"name": name,
					"state": "Error",
					"response": response
				});
				item.render();
			}
		});
		request.send();
	};
	return function() {
		var item = this;
		var flags = item.get("data.object.flags");
		var label = plugin.labels.get(name.toLowerCase() + "Control");
		var action = plugin._myFlags(flags).length > 0 ? "Unflag" : "Flag";
		var flagged = name === "Flag" && !item.config.get("parent.showFlags") && plugin.get("flagged");
		var data = {
			"name": name,
			"icon": "icon-flag",
			"label": !flagged
				? label + (item.user.is("admin") && flags.length ? " (" + flags.length + ")" : "")
				: plugin.labels.get("flagged"),
			"visible": item.user.is("logged") && action === name,
			"clickable": !flagged,
			"once": true,
			"callback": callback
		};
		if (flagged) {
			data.template = '<span>{data:label}</span>';
		}
		return data;
	};
};

plugin.methods._publishEventComplete = function(args) {
	var item = this.component;
	this.events.publish({
		"topic": "on" + args.name + args.state,
		"data": {
			"item": {
				"data": item.get("data"),
				"target": item.config.get("target")
			},
			"response": args.response
		}
	});
};

plugin.methods._myFlags = function(flags) {
	var item = this.component;
	return $.map(flags, function(entry) {
		if (item.user.has("identity", entry.actor.id)) return entry;
	});
};

plugin.css = '.{plugin.class:flaggedBy} { background: url({config:cdnBaseURL.sdk-assets}/images/curation/status/communityflagged.png) no-repeat 0px 4px; padding: 0px 0px 4px 21px; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var plugin = Echo.Plugin.manifest("CounterCardUI", "Echo.StreamServer.Controls.Counter");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.events = {
	"Echo.StreamServer.Controls.Counter.onUpdate": function() {
		this.component.render({"name": "count"});
	}
};

plugin.templates.main =
	'<span class="{class:count}">({data:count})</span>';

plugin.init = function() {
	this.component.templates.main = plugin.templates.main;
};

plugin.component.renderers.count = function(element) {
	var count = this.component.get("data.count");
	var visible = (typeof count === "string" && count === "5000+")
		|| (typeof count === "number" && count > 0);
	return visible
		? element.show()
		: element.hide();
};

plugin.css =
	'.{plugin.class} { margin-left: 5px; }' +
	'.{plugin.class} .echo-control-message { display: none; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

var plugin = Echo.Plugin.manifest("ItemEventsProxy", "Echo.StreamServer.Controls.Stream");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.config = {
	"onAdd": $.noop,
	"onDelete": $.noop
};

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onAdd": function() {
		var onAdd = this.config.get("onAdd");
		onAdd && onAdd.call(this.component);
	},
	"Echo.StreamServer.Controls.Stream.Item.onDelete": function() {
		var onDelete = this.config.get("onDelete");
		onDelete && onDelete.call(this.component);
	}
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("ItemsRollingWindow", "Echo.StreamServer.Controls.Stream");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.config = {
	"moreButton": false,
	"maxCount": 50
};

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onRender": function() {
		var self = this;
		var maxCount = this.get("maxCount");
		var itemsToRemove = this.component.get("threads").slice(maxCount);
		$.map(itemsToRemove, function(item) {
			self.component._spotUpdates.remove.call(self.component, item);
		});
		if (this.config.get("moreButton") && itemsToRemove.length) {
			this._updateNextPageAfter();
			if (!this.component.view.get("more").is(":visible")) {
				this.component.isViewComplete = false;
				this.component.view.render({"name": "more"});
			}
		}
	},
	"Echo.StreamServer.Controls.Stream.onRerender": function() {
		this._setMaxCount();
	},
	"Echo.StreamServer.Controls.Stream.onDataReceive": function(topic, args) {
		if (args.type === "children" || args.type === "live") return;
		this._setMaxCount(args.type === "more");
	}
};

plugin.component.renderers.more = function(element) {
	var item = this.component;
	if (!this.config.get("moreButton")) {
		return element.empty().hide();
	}
	return item.parentRenderer("more", arguments);
};

plugin.methods._setMaxCount = function(incremental) {
	var maxCount = +this.component.config.get("itemsPerPage");
	if (incremental) {
		maxCount += this.get("maxCount");
	}
	this.set("maxCount", maxCount);
};

plugin.methods._updateNextPageAfter = function() {
	var lastItem = this.component.get("threads")[this.component.threads.length - 1];
	if (lastItem.get("data.pageAfter")) {
		this.component.set("nextPageAfter", lastItem.get("data.pageAfter"));
	}
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function($) {
"use strict";

var createPlugin = function(component) {

	var plugin = Echo.Plugin.manifest("JanrainBackplaneHandler", component);

	if (Echo.Plugin.isDefined(plugin)) return;

	// define global storage for this plugin
	Echo.Variables.JanrainHandler = Echo.Variables.JanrainHandler || {};

	plugin.config = {
		"appId": undefined,
		"authWidgetConfig": {},
		"sharingWidgetConfig": {}
	};

	plugin.init = function() {
		var plugin = this;
		var global = Echo.Variables.JanrainHandler;

		// subscribe only once!
		if (global.initialized) return;

		global.initialized = true;

		Backplane.subscribe(function(message) {
			// if login is requested
			if (message.type === "identity/login/request") {
				global.modal && global.modal.destroy();
				global.modal = plugin._openAuthDialog();
			}
			// when login/logout is complete
			if (message.type === "identity/ack") {
				global.modal && global.modal.destroy();
			}
			// if sharing is requested
			if (message.type === "content/share/request") {
				plugin._openSharingDialog(message.payload);
			}
		});
	};

	plugin.methods._openAuthDialog = function() {
		var plugin = this, config = plugin.config.get("authWidgetConfig");
		var configStr = Echo.Utils.objectToJSON(config);
		var url = this.component.config.get("cdnBaseURL.sdk") +
				"/third-party/janrain/auth.html?appId=" + plugin.config.get("appId") +
				"&signinConfig=" + encodeURIComponent(configStr) +
				"&bpChannel=" + encodeURIComponent(Backplane.getChannelID());
		var modal = new Echo.GUI.Modal({
			"data": {"title": config.title || ""},
			"href": url,
			"width": config.width || 400,
			"height": config.height || 240,
			"padding": "0 0 5px 0",
			"footer": false,
			"fade": true,
			"onShow": function() {
				Backplane.expectMessages("identity/ack");
			},
			"onHide": function() {
				plugin.modal = null;
			}
		});
		modal.show();
		return modal;
	};

	// copied over from JanrainSharing plugin with a slight modification...
	plugin.methods._openSharingDialog = function(data) {
		var url, plugin = this;
		var config = plugin.config.get("sharingWidgetConfig");
		var callback = function() {
			plugin.set("foreignConfig", $.extend(true, {}, janrain.engage.share.getState()));
			plugin._showPopup(data, config);
		};
		if (window.janrain && janrain.engage && janrain.engage.share || plugin.get("janrainInitialized")) {
			callback();
			return;
		}
		plugin.set("janrainInitialized", true);

		if (typeof window.janrain !== "object") window.janrain = {};
		if (typeof janrain.settings !== "object") janrain.settings = {};
		if (typeof janrain.settings.share !== "object") janrain.settings.share = {};
		if (typeof janrain.settings.packages !== "object") janrain.settings.packages = [];
		janrain.settings.packages.push("share");
		// we can reach this line only after DOM is loaded so no need to use "onload" event
		janrain.ready = true;

		var foreignOnload = window.janrainShareOnload;
		window.janrainShareOnload = function() {
			// let the previous onload handler do its stuff first
			if (foreignOnload) {
				foreignOnload();
				window.janrainShareOnload = foreignOnload;
			}
			callback();
		};

		url = "https:" === document.location.protocol
			? "https://rpxnow.com/js/lib/" + plugin.config.get("appId") + "/widget.js"
			: "http://widget-cdn.rpxnow.com/js/lib/" + plugin.config.get("appId") + "/widget.js";
		Echo.Loader.download([{"url": url}]);
	};

	// copied over from JanrainSharing plugin with a slight modification...
	plugin.methods._showPopup = function(data, config) {
		var image, plugin = this;
		var share = janrain.engage.share;
		var idx = janrain.events.onModalClose.addHandler(function() {
			janrain.events.onModalClose.removeHandler(idx);
			share.reset();
			share.setState(plugin.get("foreignConfig"));
			plugin.remove("foreignConfig");
		});
		var getOG = function(field) {
			return $("meta[property=\"og:" + field + "\"]").attr("content");
		};
		share.reset();
		share.setState(config);
		share.setTitle(config.title || getOG("title") || document.title);
		share.setDescription(config.description || getOG("description") || "");
		share.setMessage(config.message || Echo.Utils.stripTags(data.object.content));
		share.setUrl(config.url || getOG("url") || location.href.replace(/([#\?][^#\?]*)+$/, ""));
		image = config.image || getOG("image") || "";
		image && share.setImage(image);
		share.show();
	};

	Echo.Plugin.create(plugin);
};

$.map(["Echo.StreamServer.Controls.Stream", "Echo.StreamServer.Controls.Submit"], createPlugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.Like
 * Adds extra Like/Unlike buttons to each item in the Echo Stream
 * control for authenticated users.
 *
 * 	new Echo.StreamServer.Controls.Stream({
 * 		"target": document.getElementById("echo-stream"),
 * 		"appkey": "echo.jssdk.demo.aboutecho.com",
 * 		"plugins": [{
 * 			"name": "Like"
 * 		}]
 * 	});
 *
 * More information regarding the plugins installation can be found
 * in the [“How to initialize Echo components”](#!/guide/how_to_initialize_components-section-initializing-plugins) guide.
 *
 * @extends Echo.Plugin
 *
 * @package streamserver/plugins.pack.js
 * @package streamserver.pack.js
 */
var plugin = Echo.Plugin.manifest("LikeCardUI", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	this.extendTemplate("insertAsFirstChild", "footer", plugin.templates.main);
	this.component.addButtonSpec("LikeCardUI", this._assembleButton("Like"));
	this.component.addButtonSpec("LikeCardUI", this._assembleButton("Unlike"));
};

plugin.config = {
	/**
	 * @cfg {Boolean} asyncFacePileRendering
	 * This parameter is used to enable FacePile control rendering in async mode.
	 */
	"asyncFacePileRendering": false,
	"likesPerPage": 5,
	"displayStyle": "facepile"
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"likeThis": " like this.",
	/**
	 * @echo_label
	 */
	"likesThis": " likes this.",
	/**
	 * @echo_label
	 */
	"likeControl": "Like",
	/**
	 * @echo_label
	 */
	"unlikeControl": "Unlike",
	/**
	 * @echo_label
	 */
	"likeProcessing": "Liking...",
	/**
	 * @echo_label
	 */
	"unlikeProcessing": "Unliking..."
};

plugin.dependencies = [{
	"control": "Echo.StreamServer.Controls.FacePile",
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js"
}];

plugin.events = {
	"Echo.StreamServer.Controls.FacePile.Item.Plugins.LikeCardUI.onUnlike": function(topic, args) {
		this._sendActivity("Unlike", this.component, args.actor);
		return {"stop": ["bubble"]};
	},
	"Echo.UserSession.onInvalidate": {
		"context": "global",
		"handler": function() {
			if (this.deferredActivity) {
				this.deferredActivity();
				delete this.deferredActivity;
			}
		}
	}
};

/**
 * @echo_template
 */
plugin.templates.main =
	'<div class="{plugin.class:likesArea}">' +
		'<div class="{plugin.class:likedBy}"></div>' +
		'<div class="echo-clear"></div>' +
	'</div>';

/**
 * @echo_renderer
 */
plugin.renderers.likedBy = function(element) {
	var plugin = this;
	var item = this.component;
	if (!item.get("data.object.likes").length) {
		return element.hide();
	}

	var youLike = false;
	var userId = item.user.get("identityUrl");
	var users = item.get("data.object.likes");
	$.each(users, function(i, like) {
		if (like.actor.id === userId) {
			youLike = true;
			return false; // break
		}
	});

	var config = plugin.config.assemble({
		"target": element.get(0),
		"data": {
			"itemsPerPage": this.config.get("likesPerPage"),
			"entries": users
		},
		"initialUsersCount": this.config.get("likesPerPage"),
		"totalUsersCount": item.get("data.object.accumulators.likesCount"),
		"item": {
			"avatar": true,
			"text": false
		}
	});
	config.plugins.push({
		"name": "LikeCardUI",
		"displayStyle": this.config.get("displayStyle")
	});

	if (item.user.is("admin")) {
		element.addClass(plugin.cssPrefix + "highlight");
	}
	if (this.config.get("asyncFacePileRendering")) {
		setTimeout($.proxy(this._initFacePile, this, config), 0);
	} else {
		this._initFacePile(config);
	}
	return element.show();
};

plugin.methods._getLikesCount = function() {
	return this.component.get("data.object.accumulators.likesCount");
};

plugin.methods._initFacePile = function(config) {
	this.set("facePile", new Echo.StreamServer.Controls.FacePile(config));
};

plugin.methods._sendRequest = function(data, callback, errorCallback) {
	Echo.StreamServer.API.request({
		"endpoint": "submit",
		"secure": this.config.get("useSecureAPI", false, true),
		"submissionProxyURL": this.component.config.get("submissionProxyURL"),
		"onData": callback,
		"onError": errorCallback,
		"data": data
	}).send();
};

plugin.methods._sendActivity = function(name, item, actor) {
	var plugin = this;
	var activity = {
		"verbs": ["http://activitystrea.ms/schema/1.0/" + name.toLowerCase()],
		"targets": [{"id": item.get("data.object.id")}]
	};
	if (actor && actor.id) {
		activity.author = actor.id;
	}

	this._sendRequest({
		"content": activity,
		"appkey": item.config.get("appkey"),
		"sessionID": item.user.get("sessionID"),
		"target-query": item.config.get("parent.query")
	}, function(response) {
		/**
		 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.Like.onLikeComplete
		 * Triggered when the Like operation is finished.
		 */
		/**
		 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.Like.onUnlikeComplete
		 * Triggered when the reverse Like operation is finished.
		 */
		plugin._publishEventComplete({
			"name": name,
			"state": "Complete",
			"response": response
		});
		plugin.requestDataRefresh();
	}, function(response) {
		/**
		 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.Like.onLikeError
		 * Triggered when the Like operation failed.
		 */
		/**
		 * @echo_event Echo.StreamServer.Controls.Stream.Item.Plugins.Like.onUnlikeError
		 * Triggered when the reverse Like operation failed.
		 */
		plugin._publishEventComplete({
			"name": name,
			"state": "Error",
			"response": response
		});
	});
};

plugin.methods._publishEventComplete = function(args) {
	var item = this.component;
	this.events.publish({
		"topic": "on" + args.name + args.state,
		"data": {
			"item": {
				"data": item.get("data"),
				"target": item.config.get("target")
			},
			"response": args.response
		}
	});
};

plugin.methods._requestLoginPrompt = function() {
        Backplane.response([{
                // IMPORTANT: we use ID of the last received message
                // from the server-side to avoid same messages re-processing
                // because of the "since" parameter cleanup...
                "id": Backplane.since,
                "channel_name": Backplane.getChannelName(),
                "message": {
                        "type": "identity/login/request",
                        "payload": this.component.user.data || {}
                }
        }]);
};

plugin.methods._assembleButton = function(name) {
	var self = this;
	var callback = function() {
		var item = this;

		var buttonHandler = function() {
			var buttonNode = item.get("buttons." + self.name + "." + name + ".element");
			buttonNode.off("click");
			$("." + item.cssPrefix + "buttonCaption", buttonNode)
				.empty()
				.append(self.labels.get(name.toLowerCase() + "Processing"));
			self._sendActivity(name, item);
		};

		if (!item.user.is("logged")) {
			self.deferredActivity = function() {
				buttonHandler();
			};
			self._requestLoginPrompt();
		} else {
			buttonHandler();
		}
	};
	return function() {
		var item = this;
		var action =
			($.map(item.get("data.object.likes"), function(entry) {
				if (item.user.has("identity", entry.actor.id)) return entry;
			})).length > 0 ? "Unlike" : "Like";
		return {
			"name": name,
			"icon": "icon-heart",
			"label": self.labels.get(name.toLowerCase() + "Control"),
			"visible": action === name,
			"callback": callback
		};
	};
};

plugin.css =
	'.{plugin.class:likesArea} { float: right; }' +
	'.{plugin.class:likedBy} { float: left; height: 20px; margin-right: 3px; line-height: 10px; }' +
	'.{plugin.class:likedBy} .echo-streamserver-controls-facepile-container { line-height: 12px; vertical-align: top; }' +
	'.{plugin.class} .echo-streamserver-controls-facepile-item-container { position: relative; }' +
	'.{plugin.class} .echo-streamserver-controls-facepile-item-avatar { border-radius: 50%; width: 22px; height: 22px; }' +
	'.{plugin.class} .echo-streamserver-controls-facepile-item-avatar img { border-radius: 50%; height: 22px; width: 22px; }' +
	'.{plugin.class} .echo-streamserver-controls-facepile-and { display: none; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var plugin = Echo.Plugin.manifest("LikeCardUI", "Echo.StreamServer.Controls.FacePile");

if (Echo.Plugin.isDefined(plugin)) return;


plugin.config = {
	"displayStyle": "facepile"
};

plugin.labels = {
	"facepileCount": "+{count}",
	"numberCount": "{count}",
	"likeNumberTitle": "This item has {count} like",
	"likesNumberTitle": "This item has {count} likes"
};

plugin.component.renderers.more = function(element) {
	var pile = this.component;
	var style = this.config.get("displayStyle");
	element.empty();

	var visible = style === "number" || (style === "facepile" && pile._isMoreButtonVisible());

	if (style === "number") {
		element.attr("title", this.labels.get(
			pile.get("count.total") > 1 ? "likesNumberTitle" : "likeNumberTitle",
			{"count": pile.get("count.total")}
		));
	}
	return visible
		? element
			.show()
			.append(this.labels.get(style + "Count", {
				"count": style === "facepile"
					? pile.get("count.total") - pile.get("count.visible")
					: pile.get("count.total")
			}))
		: element.hide();
};

plugin.component.renderers.actors = function() {
	var element = this.parentRenderer("actors", arguments);
	return this.config.get("displayStyle") === "facepile"
		? element.show()
		: element.hide();
};

plugin.css =
	'.{plugin.class} .{class:more} { float: right; font-size: 12px; margin-top: 5px;  white-space: nowrap; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

/**
 * @class Echo.StreamServer.Controls.FacePile.Item.Plugins.Like
 * Adds extra controls to items in the Echo FacePile control.
 *
 * @extends Echo.Plugin
 * @private
 */
var plugin = Echo.Plugin.manifest("LikeCardUI", "Echo.StreamServer.Controls.FacePile.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	this.extendTemplate("insertAsLastChild", "container", plugin.templates.main);
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"unlikeOnBehalf": "Unlike on behalf of {data:title}"
};

/**
 * @echo_template
 */
plugin.templates.main = '<i class="{plugin.class:adminUnlike} icon-remove" title="{plugin.label:unlikeOnBehalf}"></i>';

/**
 * @echo_renderer
 */
plugin.component.renderers.container = function() {
	var self = this, item = this.component;
	var element = this.parentRenderer("container", arguments);

	return !item.user.is("admin")
		? element
		: element.on("mouseenter", function() {
			self.view.get("adminUnlike").show();
			item.view.get("avatar").addClass(self.cssPrefix + "pale");
		}).on("mouseleave", function() {
			self.view.get("adminUnlike").hide();
			item.view.get("avatar").removeClass(self.cssPrefix + "pale");
		});
};

/**
 * @echo_renderer
 */
plugin.renderers.adminUnlike = function(element) {
	var plugin = this;
	var item = this.component;
	if (!item.user.is("admin")) {
		return element.remove();
	}
	return element.one("click", function() {
		/**
		 * @echo_event Echo.StreamServer.Controls.FacePile.Item.Plugins.Like.onUnlike
		 * Triggered when the item is "unliked" by admin on behalf of a user.
		 */
		plugin.events.publish({
			"topic": "onUnlike",
			"data": {
				"actor": item.get("data"),
				"target": item.config.get("parent.target").get(0)
			},
			"global": false,
			"propagation": false
		});
	}).hide();
};

/**
 * @echo_renderer
 */
plugin.component.renderers.avatar = function() {
	var item = this.component;
	if (this.config.get("displayStyle") === "facepile") {
		var element = this.parentRenderer("avatar", arguments);

		return !item.user.is("admin")
			? element
			: element.removeAttr("title");
	}	
};

plugin.css =
	'.{plugin.class:pale} { opacity: 0.2; }' +
	'.{plugin.class:adminUnlike} { cursor: pointer; position: absolute; top: 3px; left: 4px; opacity: 0.8; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.ModerationCardUI
 */
var plugin = Echo.Plugin.manifest("ModerationCardUI", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	var item = this.component;
	this.set("itemStatus", item.get("data.object.status"));
	item.addButtonSpec("ModerationCardUI", this._assembleModerateButton());
};

plugin.config = {
	"removePersonalItemsAllowed": false,
	"statusAnimationTimeout": 1000, // milliseconds
	"itemActions": ["approve", "untouch", "spam", "delete"],
	"extraActions": ["topPost", "topContributor"],
	"userActions": ["approveUser", "ban", "permissions"],
	"topMarkers": {
		"item": "Conversations.TopPost",
		"user": "Conversations.TopContributor"
	}
};

plugin.labels = {
	"addTopPostButton": "Add to Top Posts",
	"removeTopPostButton": "Remove from Top Posts",
	"addingTopPost": "Adding to Top Posts",
	"removingTopPost": "Removing from Top Posts",
	"addTopContributorButton": "Add to Top Contributors",
	"removeTopContributorButton": "Remove from Top Contributors",
	"addingTopContributor": "Add to Top Contributors",
	"removingTopContributor": "Removing from Top Contributors",
	"moderateButton": "Moderate",
	"approveButton": "Approve",
	"deleteButton": "Delete",
	"spamButton": "Spam",
	"untouchButton": "Untouch",
	"approveUser": "Approve User",
	"untouchUser": "Return User to Untouched",
	"approvingUser": "Approving User...",
	"untouchingUser": "Returning User to Untouched",
	"changingStatusToCommunityFlagged": "Flagging...",
	"changingStatusToModeratorApproved": "Approving...",
	"changingStatusToModeratorDeleted": "Deleting...",
	"changingStatusToUserDeleted": "Deleting...",
	"changingStatusToUntouched": "Untouching...",
	"changingStatusToModeratorFlagged": "Marking as spam...",
	"statusCommunityFlagged": "Flagged by Community",
	"statusModeratorApproved": "Approved by Moderator",
	"statusModeratorDeleted": "Deleted by Moderator",
	"statusUserDeleted": "Deleted by User",
	"statusModeratorFlagged": "Flagged by Moderator",
	"statusSystemFlagged": "Flagged by System",
	"banUser": "Ban User",
	"unbanUser": "Unban User",
	"userBanned": "Banned User",
	"processingAction": "Setting up '{state}' user state...",
	"moderatorRole": "Moderator",
	"administratorRole": "Administrator",
	"userButton": "Demote to User",
	"moderatorButton": "Promote to Moderator",
	"administratorButton": "Promote to Admin",
	"setRoleAction": "Setting up '{role}' role...",
	"unsetRoleAction": "Removing '{role}' role...",
	"statusUntouched": "New"
};

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onRerender": function() {
		var item = this.component;
		if (item.user.is("admin")) {
			var element = item.view.get("container");
			var indicator = item.view.get("indicator");
			var itemStatus = this.get("itemStatus") || "Untouched";
			var newStatus = item.get("data.object.status") || "Untouched";

			if (itemStatus !== newStatus) {
				var transition = "background-color " + this.config.get("statusAnimationTimeout") + "ms linear";
				indicator.css({
					"transition": transition,
					"-o-transition": transition,
					"-ms-transition": transition,
					"-moz-transition": transition,
					"-webkit-transition": transition
				});

				// we should trigger some dom event in order to make transition work:
				// http://stackoverflow.com/questions/12814612/css3-transition-to-highlight-new-elements-created-in-jquery
				element.focus();

				element.addClass(this.cssPrefix + "status-" + newStatus);
				element.removeClass(this.cssPrefix + "status-" + itemStatus);
				this.set("itemStatus", newStatus);
			}
		}
	},
	"Echo.StreamServer.Controls.Stream.Plugins.ModerationCardUI.onUserUpdate": function(topic, args) {
		var target = this.component;
		var source = args.item;
		if (target.get("data.actor.id") !== source.data.actor.id) return;
		target.set("data.actor." + (args.field === "state" ? "status" : args.field), args.value);
		target.render();
		return {"stop": ["bubble"]};
	}
};

plugin.templates.buttonLabels = {
	"banned": '<span class="{plugin.class:button-state} {plugin.class:button-state-banned}">{plugin.label:userBanned}</span>' +
		'(<span>{plugin.label:unbanUser}</span>)',
	"unbanned": '<span>{plugin.label:banUser}</span>'
};

plugin.component.renderers.avatar = function(element) {
	var item = this.component;

	if (item.user.is("admin")) {
		var status = item.get("data.actor.status") || "Untouched";
		element.addClass(this.cssPrefix + "actorStatus-" + status);
	}
	return this.parentRenderer("avatar", arguments);
};

plugin.component.renderers.container = function(element) {
	var item = this.component;

	if (item.user.is("admin")) {
		var status = this.get("itemStatus") || "Untouched";
		element.addClass(this.cssPrefix + "status-" + status);
	}

	return this.parentRenderer("container", arguments);
};

plugin.statuses = [
	"Untouched",
	"ModeratorApproved",
	"ModeratorDeleted",
	"UserDeleted",
	"CommunityFlagged",
	"ModeratorFlagged",
	"SystemFlagged"
];

plugin.button2status = {
	"Spam": "ModeratorFlagged",
	"Delete": "ModeratorDeleted",
	"Approve": "ModeratorApproved",
	"Untouch": "Untouched"
};

plugin.roles = ["", "moderator", "administrator"];


plugin.methods._changeItemStatus = function(status) {
	var item = this.component;
	this.set("selected", false);
	item.set("data.object.status", status);
	item.view.render({"name": "buttons"});
	// rerender status recursive
	// since it contains other renderers
	this.view.render({
		"name": "status",
		"recursive": true
	});
};

plugin.methods._sendRequest = function(data, callback, errorCallback) {
	Echo.StreamServer.API.request({
		"endpoint": "submit",
		"secure": this.config.get("useSecureAPI", false, true),
		"submissionProxyURL": this.component.config.get("submissionProxyURL"),
		"onData": callback,
		"onError": errorCallback,
		"data": data
	}).send();
};

plugin.methods._publishCompleteActionEvent = function(args) {
	this.events.publish({
		"topic": "on" + args.name + args.state,
		"data": {
			"item": {
				"data": this.component.get("data"),
				"target": this.component.get("view.content")
			},
			"response": args.response
		}
	});
};

plugin.methods._sendUserUpdate = function(config) {
	var item = this.component;
	Echo.IdentityServer.API.request({
		"endpoint": "update",
		"submissionProxyURL": this.component.config.get("submissionProxyURL"),
		"secure": this.config.get("useSecureAPI", false, true),
		"data": {
			"content": {
				"field": config.field,
				"value": config.value,
				"identityURL": item.get("data.actor.id"),
				"username": item.get("data.actor.title")
			},
			"appkey": item.config.get("appkey"),
			"sessionID": item.user.get("sessionID", ""),
			"target-query": item.config.get("parent.query", "")
		},
		"onData": config.onData,
		"onError": function() {
			item.render();
		}
	}).send();
};

plugin.methods._assembleButton = function(name) {
	var self = this;
	var item = this.component;

	if (
		!item.user.is("admin")
		&& (
			name !== "Delete"
			|| !item.user.has("identity", item.data.actor.id)
			|| !this.config.get("removePersonalItemsAllowed")
		)
	) {
		return false;
	}

	var getStatus = function(item) {
		var status = plugin.button2status[name];
		if (!item.user.is("admin") &&
			name === "Delete" &&
			self.config.get("removePersonalItemsAllowed") &&
			item.user.has("identity", item.data.actor.id)
		) {
			status = "UserDeleted";
		}
		return status;
	};
	// do not display button if item already has new status
	if (item.get("data.object.status") === getStatus(item)) {
		return false;
	}
	return {
		"label": this.labels.get(name.toLowerCase() + "Button"),
		"visible": true,
		"callback": function() {
			var status = getStatus(item);
			item.block(self.labels.get("changingStatusTo" + status));
			var activity = {
				"verbs": ["http://activitystrea.ms/schema/1.0/update"],
				"targets": [{"id": item.get("data.object.id")}],
				"actor": {"title": item.get("data.actor.id")},
				"object": {
					"state": status
				}
			};

			self._sendRequest({
				"content": activity,
				"appkey": item.config.get("appkey"),
				"sessionID": item.user.get("sessionID"),
				"target-query": item.config.get("parent.query")
			}, function(response) {
				self._publishCompleteActionEvent({
					"name": name,
					"state": "Complete",
					"response": response
				});
				self._changeItemStatus(status);
				item.unblock();
				self.requestDataRefresh();
			}, function(response) {
				self._publishCompleteActionEvent({
					"name": name,
					"state": "Error",
					"response": response
				});
				item.unblock();
			});
		}
	};
};

plugin.methods._assembleTopContributorButton = function(name) {
	var self = this, item = this.component;

	var disabled = item.get("depth") ||
		item.get("data.actor.id") === item.user.config.get("fakeIdentityURL");

	if (disabled) {
		return false;
	}

	var marker = this.config.get("topMarkers.user");
	var userMarkers = item.get("data.actor.markers", []);
	var action = ~$.inArray(marker, userMarkers) ? "remove" : "add";

	return {
		"label": this.labels.get(action + name + "Button"),
		"visible": true,
		"callback": function() {
			item.block(self.labels.get(
				(action === "add" ? "adding" : "removing") + name
			));
			var markers = (function() {
				if (action === "add") {
					userMarkers.push(marker);
				} else {
					userMarkers = $.grep(userMarkers, function(_) {
						return _ !== marker;
					});
				}
				return userMarkers.length
					? userMarkers.join(",") : "-";
			})();
			self._sendUserUpdate({
				"field": "markers",
				"value": markers,
				"onData": function(response) {
					self._publishCompleteActionEvent({
						"name": action,
						"state": "Complete",
						"response": response
					});
					self._publishUserUpdateEvent({
						"item": item,
						"field": "markers",
						"value": markers
					});
					item.unblock();
				},
				"onError": function(response) {
					self._publishCompleteActionEvent({
						"name": action,
						"state": "Error",
						"response": response
					});
					item.unblock();
				}
			});
		}
	};
};

plugin.methods._assembleTopPostButton = function(name) {
	var self = this;
	var item = this.component;

	// moderators can add/remove markers for root items only
	if (item.get("depth")) {
		return false;
	}

	var marker = this.config.get("topMarkers.item");
	var itemMarkers = item.get("data.object.markers", []);
	var action = ~$.inArray(marker, itemMarkers) ? "remove" : "add";

	return {
		"label": this.labels.get(action + name + "Button"),
		"visible": true,
		"callback": function() {
			item.block(self.labels.get(
				(action === "add" ? "adding" : "removing") + name
			));
			var activity = {
				"verbs": ["http://activitystrea.ms/schema/1.0/" + (action === "add" ? "mark" : "unmark")],
				"targets": [{"id": item.get("data.object.id")}],
				"object": {
					"content": marker
				}
			};
			self._sendRequest({
				"content": activity,
				"appkey": item.config.get("appkey"),
				"sessionID": item.user.get("sessionID"),
				"target-query": item.config.get("parent.query")
			}, function() {
				// TODO publish some event
				item.unblock();
				self.requestDataRefresh();
			}, function() {
				// TODO publish some event
				item.unblock();
			});
		}
	};
};

plugin.methods._assembleModerateButton = function() {
	var self = this;

	var actions = Echo.Utils.foldl([], ["item", "extra", "user"], function(v, acc) {
		acc = [].concat(acc, self.config.get(v + "Actions"));
		return acc;
	});

	return function() {
		return {
			"name": "Moderate",
			"icon": "icon-ok",
			"visible": this.user.is("admin"),
			"entries": $.map(actions, function(action) {
				var _action = Echo.Utils.capitalize(action);
				var handler = ~$.inArray(action, self.config.get("itemActions"))
					? "_assembleButton"
					: "_assemble" + _action + "Button";
				var button = self[handler](_action);
				return button || undefined;
			})
		};
	};
};

plugin.methods._assembleBanButton = function() {
	var self = this;
	var isBanned = this._isUserBanned();
	var item = this.component;

	if (item.get("data.actor.id") === item.user.config.get("fakeIdentityURL")) {
		return false;
	}

	return {
		"label": this.labels.get(isBanned ? "unbanUser" : "banUser"),
		"visible": true,
		"callback": function() {
			var newState = isBanned ? "Untouched" : "ModeratorBanned";
			var action = isBanned ? "UnBan" : "Ban";
			item.block(self.labels.get("processingAction", {"state": newState}));
			self._sendUserUpdate({
				"field": "state",
				"value": newState,
				"onData": function(response) {
					self._publishCompleteActionEvent({
						"name": action,
						"state": "Complete",
						"response": response
					});
					self._publishUserUpdateEvent({
						"item": item,
						"field": "state",
						"value": newState
					});
					item.unblock();
				},
				"onError": function(response) {
					self._publishCompleteActionEvent({
						"name": action,
						"state": "Error",
						"response": response
					});
					item.unblock();
				}
			});
		}
	};
};

// TODO merge this method with '_assembleBanButton'
plugin.methods._assembleApproveUserButton = function() {
	var self = this;
	var item = this.component;

	if (item.get("data.actor.id") === item.user.config.get("fakeIdentityURL")) {
		return false;
	}
	var action = item.get("data.actor.status") === "ModeratorApproved"
		? "untouch"
		: "approve";

	return {
		"label": this.labels.get(action === "approve" ? "approveUser" : "untouchUser" ),
		"visible": true,
		"callback": function() {
				item.block(self.labels.get(action === "approve" ? "approvingUser" : "untouchingUser"));
				var newStatus = action === "approve" ? "ModeratorApproved" : "Untouched";
				self._sendUserUpdate({
					"field": "state",
					"value": newStatus,
					"onData": function(response) {
						self._publishCompleteActionEvent({
							"name": action,
							"state": "Complete",
							"response": response
						});
						self._publishUserUpdateEvent({
							"item": item,
							"field": "state",
							"value": newStatus
						});
						item.unblock();
					},
					"onError": function(response) {
						self._publishCompleteActionEvent({
							"name": action,
							"state": "Error",
							"response": response
						});
						item.unblock();
					}
				});
		}
	};
};

plugin.methods._assemblePermissionsButton = function() {
	var self = this;
	var item = this.component;
	var role = this._getRole();
	var next = this._getNextRole(role);

	if (item.get("data.actor.id") === item.user.config.get("fakeIdentityURL")) {
		return false;
	}

	return {
		"label": this.labels.get((next || "user") + "Button"),
		"visible": true,
		"callback": function() {
			var action = "UserPermissions";
			var roles = next !== ""
				? (item.get("data.actor.roles") || []).concat(next)
				: Echo.Utils.foldl([], item.get("data.actor.roles") || [], function(_role, acc) {
					if ($.inArray(_role, plugin.roles) < 0) acc.push(_role);
				});
				var label = next === "" ? "unset" : "set";
				item.block(self.labels.get(label + "RoleAction", {"role": next || role}));
				self._sendUserUpdate({
					"field": "roles",
					"value": roles.length ? roles.join(",") : "-",
					"onData": function(response) {
						self._publishCompleteActionEvent({
							"name": action,
							"state": "Complete",
							"response": response
						});
						self._publishUserUpdateEvent({
							"item": item,
							"field": "roles",
							"value": roles
						});
						item.unblock();
					},
					"onError": function(response) {
						self._publishCompleteActionEvent({
							"name": action,
							"state": "Error",
							"response": response
						});
						item.unblock();
					}
				});
		}
	};
};

plugin.methods._publishUserUpdateEvent = function(data) {
	this.events.publish({
		"topic": "onUserUpdate",
		"data": {
			"item": data.item,
			"field": data.field,
			"value": data.value
		},
		"global": false,
		"propagation": false
	});
	this.requestDataRefresh();
};

plugin.methods._isUserBanned = function() {
	return this.component.get("data.actor.status") === "ModeratorBanned";
};

plugin.methods._getRole = function() {
	var result = "";
	$.each(this.component.get("data.actor.roles") || [], function(id, role) {
		if ($.inArray(role, plugin.roles) > 0) {
			result = role;
			if (role === "administrator") {
				return false; // break;
			}
		}
	});
	return result;
};

plugin.methods._getNextRole = function(role) {
	return plugin.roles[($.inArray(role, plugin.roles) + 1) % plugin.roles.length];
};


plugin.css =
	// hide switch for now
	'.{plugin.class} .{class:modeSwitch} { width: 0px; height: 0px; }' +

	// Moderate button
	'.echo-sdk-ui ul.{plugin.class:moderateButton} { display: inline-block; margin-bottom: 0px; }' +
	'.echo-sdk-ui .{plugin.class:moderateButton} .dropdown-toggle { color: inherit; }' +

	'.echo-sdk-ui .{plugin.class:moderateButton}.nav > li > a,' +
	'.echo-sdk-ui .{plugin.class:moderateButton}.nav > li > a:hover,' +
	'.echo-sdk-ui .{plugin.class:moderateButton}.nav > li > a:focus' +
	'  { background-color: transparent; }' +

	// item statuses
	'.{plugin.class} .{plugin.class:status-Untouched} .{class:indicator} { background-color: #3498db; }' +
	'.{plugin.class} .{plugin.class:status-ModeratorApproved} .{class:indicator} { background-color: #15c177; }' +
	'.{plugin.class} .{plugin.class:status-ModeratorDeleted} .{class:indicator} { background-color: #bf383a; }' +
	'.{plugin.class} .{plugin.class:status-SystemFlagged} .{class:indicator}, .{plugin.class:status-CommunityFlagged} .{class:indicator}, .{plugin.class:status-ModeratorFlagged} .{class:indicator} { background-color: #ff9e00; }' +

	// actor statuses
	($.map({
		"Untouched": "#3498db",
		"ModeratorApproved": "#15c177",
		"ModeratorBanned": "#bf383a",
		"ModeratorDeleted": "#bf383a"
	}, function(color, status) {
		return [
			'.{plugin.class} .{class:avatar}.{plugin.class:actorStatus-' + status + '} > div { border: 2px solid ' + color + '; width: 20px; height: 20px; }',
			'.{plugin.class} .{class:depth-0} .{class:avatar}.{plugin.class:actorStatus-' + status + '} div { height: 32px; width: 32px; border-radius: 50%;}'
		].join("");
	})).join("");

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function() {
"use strict";

var plugin = Echo.Plugin.manifest("ModerationCardUI", "Echo.StreamServer.Controls.Stream");

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.Plugins.ModerationCardUI.onUserUpdate": function(topic, args) {
		this.events.publish({
			"topic": "onUserUpdate",
			"data": args,
			"global": false
		});
	}
};

Echo.Plugin.create(plugin);
})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("ReplyCardUI", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	var self = this, item = this.component;
	this.extendTemplate("insertAsLastChild", "content", plugin.templates.form);
	// insert element to add addditional spacing above the children container
	this.extendTemplate("insertBefore", "expandChildren", plugin.templates.childrenSpacing);
	var form = Echo.Utils.get(Echo.Variables, this._getSubmitKey());
	$.each(form || {}, function(key, value) {
		self.set(key, value);
	});
	item.addButtonSpec("ReplyCardUI", this._assembleButton());
	this.set("documentClickHandler", this._getClickHandler());
	$(document).on('click', this.get("documentClickHandler"));
};

plugin.config = {
	"actionString": "Add a comment...",
	"pauseTimeout": 0,
	"submitFormTimeout": 300,
	"compactFormTimeout": 200,
	"displayCompactForm": false
};

plugin.labels = {
	"replyControl": "Reply"
};

plugin.dependencies = [{
	"control": "Echo.StreamServer.Controls.Submit",
	"url": "{config:cdnBaseURL.sdk}/streamserver.pack.js"
}];

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Plugins.ReplyCardUI.onFormExpand": function(topic, args) {
		var item = this.component;
		var context = item.config.get("context");
		if (this.get("expanded") && context && context !== args.context) {
			this._hideSubmit();
		}
	},
	"Echo.StreamServer.Controls.Submit.onPostComplete": function() {
		var self = this;
		setTimeout(function() {
			self._hideSubmit(true);
		}, this.config.get("pauseTimeout"));
	},
	"Echo.StreamServer.Controls.Stream.Item.onRender": function() {
		if (this.get("expanded")) {
			this._showSubmit();
		}
	}
};

plugin.templates.form =
	'<div class="{plugin.class:replyForm}">' +
		'<div class="{plugin.class:submitForm}"></div>' +
		'<div class="{plugin.class:compactForm}">' +
			'<div class="pull-left {plugin.class:avatar}"><div></div></div>' +
			'<div class="{plugin.class:compactContent} {plugin.class:compactBorder}">' +
				'<input type="text" class="{plugin.class:compactField} echo-primaryFont echo-secondaryColor">' +
			'</div>' +
		'</div>' +
	'</div>';

plugin.templates.childrenSpacing =
	'<div class="{plugin.class:childrenSpacing}"></div>';

plugin.component.renderers.container = function(element) {
	var item = this.component;
	var threading = item.threading;
	if (this.get("expanded")) {
		item.threading = true;
	}
	item.parentRenderer("container", arguments);
	item.threading = threading;
	return element;
};

plugin.component.renderers.children = function() {
	var item = this.component;
	// perform reply form rerendering *only* when we have exactly 1 item
	// (the first item is being added or the last one is being deleted)
	if (item.get("children").length === 1) {
		var child = item.get("children")[0];
		if (child.get("added") || child.get("deleted")) {
			this.view.render({"name": "compactForm"});
		}
	}
	return item.parentRenderer("children", arguments);
};

plugin.component.renderers.expandChildren = function() {
	var item = this.component;
	var element = item.parentRenderer("expandChildren", arguments);

	return !this.config.get("displayCompactForm")
		? element.addClass(this.cssPrefix + "expandChildren")
		: element;
};

plugin.renderers.replyForm = function(element) {
	var item = this.component;
	return element
		.addClass(item.get("cssPrefix") + "depth-" + (item.get("depth") + 1));
};

plugin.renderers.submitForm = function(element) {
	if (!this.config.get("displayCompactForm")) {
		element.addClass(this.cssPrefix + "additionalSpacing");
	}
	return this.get("expanded")
		? element.show() : element.empty().hide();
};

plugin.renderers.avatar = function(element) {
	var item = this.component;
	var avatarURL = item.user.get("avatar");
	if (!avatarURL) {
		avatarURL = item.config.get("defaultAvatar");
	}
	var avatarElem = element.children()[0];
	$(avatarElem).css("background-image", 'url("' + avatarURL + '")');
	// we have to do it because filter must work in IE8 only
	// in other cases we will have square avatar in IE 9
	var isIE8 = document.all && document.querySelector && !document.addEventListener;
	if (isIE8) {
		$(avatarElem).css({"filter": "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + avatarURL + "', sizingMethod='scale')"});
	}
	return item.get("depth") && !this.get("expanded")
		? element.hide() : element.show();
};

plugin.renderers.childrenSpacing = function(element) {
	return this._isCompactFormVisible()
		? element.show()
		: element.hide();
};

plugin.renderers.compactForm = function(element, extra) {
	extra = extra || {};
	return this._isCompactFormVisible()
		? element.slideDown(+extra.animate && this.config.get("compactFormTimeout"))
		: element.hide();
};

plugin.renderers.compactField = function(element) {
	var plugin = this;
	return element.focus(function() {
		plugin._showSubmit();
	}).val(this.config.get("actionString"));
};

plugin.methods.destroy = function() {
	if (this.get("submit")) {
		Echo.Utils.set(Echo.Variables, this._getSubmitKey(), {
			"expanded": this.get("expanded"),
			"data": {
				"object": this._getSubmitData()
			}
		});
	}
	$(document).off('click', this.get("documentClickHandler"));
};

plugin.methods._submitConfig = function(target) {
	var plugin = this, item = this.component;
	return plugin.config.assemble({
		"target": target,
		"parent": item.config.getAsHash(),
		"data": plugin.get("data") || {},
		"markers": this.config.get("extraMarkers"),
		"targetURL": item.get("data.object.id"),
		"targetQuery": item.config.get("query", ""),
		"ready": function() {
			plugin.set("submit", this);
			plugin._expand();
		}
	});
};

plugin.methods._showSubmit = function() {
	var item = this.component;
	var target = this.view.get("submitForm");
	var submit = this.get("submit");
	if (submit) {
		submit.config.set("target", target);
		submit.render();
		this._expand();
		return target;
	}
	var config = this._submitConfig(target);
	// add plugin for submit
	config.plugins.splice(0, 0, {
		"name": "ReplyCardUI",
		"inReplyTo": item.get("data")
	});
	// add plugin for auth
	$.map(config.plugins, function(plugin) {
		if (plugin.name === "JanrainAuth") {
			plugin.nestedPlugins = plugin.nestedPlugins || [];
			plugin.nestedPlugins.push({
				"name": "ReplyCardUI"
			});
		}
	});
	new Echo.StreamServer.Controls.Submit(config);
	return target;
};

plugin.methods._hideSubmit = function(animate) {
	var self = this, item = this.component;

	var submit = this.get("submit");
	if (submit) {
		submit.set("data", undefined);
	}
	this.set("expanded", false);

	var timeout = +animate && this.config.get("submitFormTimeout");
	this.view.get("submitForm")
		.slideUp(timeout, function() {
			self.view.render({"name": "avatar"});
			self.view.render({
				"name": "compactForm",
				"extra": {"animate": animate}
			});
			item.view.render({"name": "container"});
			self.events.publish({
				"topic": "onCollapse"
			});
		});
};

plugin.methods._isCompactFormVisible = function() {
	var item = this.component;
	return !item.get("depth") && !this.get("expanded") && this.config.get("displayCompactForm");
};

plugin.methods._expand = function() {
	var item = this.component;
	this.set("expanded", true);

	this.view.render({"name": "submitForm"});
	this.view.render({"name": "compactForm"});
	this.view.render({"name": "avatar"});
	
	this.events.publish({
		"topic": "onExpand",
		"data": {
			"context": item.config.get("context")
		}
	});
	item.view.render({"name": "container"});
};

plugin.methods._getClickHandler = function() {
	var plugin = this;
	return function(event) {
		var submit = plugin.get("submit");
		var submitForm = plugin.view.get("submitForm");
		var isClickedInSubmitForm = submitForm && submitForm.find(event.target).length;
		if (plugin.get("expanded") && submit && !submit.view.get("text").val() && !isClickedInSubmitForm) {
			plugin._hideSubmit();
		}
	};
};

plugin.methods._assembleButton = function() {
	var plugin = this;
	var callback = function() {
		plugin._showSubmit();
	};
	return function() {
		var item = this;
		return {
			"name": "ReplyCardUI",
			"icon": "icon-comment",
			"label": plugin.labels.get("replyControl"),
			"visible": item.get("depth") < item.config.get("parent.children.maxDepth"),
			"callback": callback
		};
	};
};

plugin.methods._getSubmitKey = function() {
	var item = this.component;
	var applicationContext = item.config.get("context").split("/")[0];
	return "forms." + item.data.unique + "-" + applicationContext;
};

plugin.methods._getSubmitData = function() {
	var data = {};
	var submit = this.get("submit");

	data["content"] = submit.view.get("text").val();
	$.map(["tags", "markers"], function(field) {
		var elements = submit.view.get(field).val().split(", ");
		data[field] = elements || [];
	});
	return data;
};

plugin.css =
	'.{plugin.class} .{plugin.class:childrenSpacing} { margin-top: 8px; }' +
	'.{plugin.class} .{class:children} .{plugin.class:childrenSpacing} { margin-top: 0px; }' +
	'.{plugin.class} .{plugin.class:replyForm} { margin-right: 15px; border-left: 4px solid transparent; }' +
	'.{plugin.class} .{plugin.class:submitForm} { padding: 8px 0px 15px 0px; }' +
	'.{plugin.class} .{plugin.class:compactForm} { padding: 8px 0px 15px 0px; }' +
	'.{plugin.class} .{class:content} .{class:expandChildren} { padding: 8px 0px; }' +
	'.{plugin.class} .{class:content} .{plugin.class:expandChildren} { padding: 15px 0px 8px 0px; }' +
	'.{plugin.class} .{plugin.class:additionalSpacing} { padding-top: 15px; }' +
	'.{plugin.class:compactContent} { padding: 0px 5px 0px 6px; background-color: #fff; height: 28px; line-height: 28px; }' +
	'.{plugin.class:avatar} { width: 28px; height: 28px; border-radius: 50%; margin: 1px 0px 0px 3px; }' +
	'.{plugin.class} .{plugin.class:avatar} > div { width: 28px; height: 28px; background-size:cover; display:inline-block; background-position:center; border-radius: 50%; }' +
	'.{plugin.class:compactBorder} { margin-left: 39px; border: 1px solid #d8d8d8; }' +
	'.{plugin.class:compactContent} input.{plugin.class:compactField}[type="text"].echo-secondaryColor { color: #C6C6C6 }' +
	'.{plugin.class:compactContent} input.{plugin.class:compactField}[type="text"].echo-primaryFont { font-size: 12px; line-height: 24px; }' +
	'.{plugin.class:compactContent} input.{plugin.class:compactField}[type="text"] { width: 100%; height: 24px; border: none; margin: 0px; padding: 0px; box-shadow: none; vertical-align: middle; }' +
	'.{plugin.class:compactContent} input.{plugin.class:compactField}[type="text"]:focus { outline: 0; box-shadow: none; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function() {
"use strict";

var plugin = Echo.Plugin.manifest("ReplyCardUI", "Echo.StreamServer.Controls.Stream");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.Plugins.ReplyCardUI.onExpand": function(topic, args) {
		this.events.publish({
			"topic": "onFormExpand",
			"data": {
				"context": args.context
			}
		});
	}
};

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

var plugin = Echo.Plugin.manifest("ReplyCardUI", "Echo.StreamServer.Controls.Submit");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	var plugin = this, submit = plugin.component;
	var _prepareEventParams = submit._prepareEventParams;

	submit._prepareEventParams = function(params) {
		var _params = _prepareEventParams.call(submit, params);
		_params.inReplyTo = plugin.config.get("inReplyTo");
		return _params;
	};
};

$.map(["onRender", "onRerender"], function(topic) {
	plugin.events["Echo.StreamServer.Controls.Submit." + topic] = function() {
		var submit = this.component;
		submit.config.get("target").show();
		submit.view.get("text").focus();
	};
});

plugin.css =
	'.{plugin.class} div.{class:container} { padding: 0px; border: 0px; box-shadow: none; }';

Echo.Plugin.create(plugin);

})(Echo.jQuery);

(function(jQuery) {
"use strict";

var $ = jQuery;

/**
 * @class Echo.StreamServer.Controls.Stream.Item.Plugins.TweetDisplayCardUI
 * Adds the Twitter intents controls into the item UI and updates the
 * item UI to look and behave like a Twitter item. The item UI update includes:
 *
 * + by clicking on the avatar or the user name - the user account on Twitter
 * will be opened;
 * + the item timestamp transforms from a static field to a permanent item
 * link on Twitter.
 *
 * More information about Twitter Intents is available on the page
 * <https://dev.twitter.com/docs/intents>.
 *
 * #### How to use
 * To enable this plugin should be taken add the corresponding section into the
 * Echo Stream configuration parameter plugins:
 *
 * 	new Echo.StreamServer.Controls.Stream({
 * 		"target": document.getElementById("echo-stream"),
 * 		"appkey": "echo.jssdk.demo.aboutecho.com",
 * 		"plugins": [{
 * 			"name": "TweetDisplayCardUI"
 * 		}]
 * 	});
 *
 * <b>Note</b>: plugin must be at the very beginning of the plugin list to
 * work correctly. If {@link Echo.StreamServer.Controls.Stream.Plugins.PinboardVisualization PinboardVisualization}
 * plugin is also enabled in the Stream then this plugin must be placed right after it.
 *
 * <b>Note</b>: if TweetDisplayCardUI plugin is added to the stream then Reply and
 * Like plugins will be disabled for tweet items. Moreover Reply control is
 * renamed with Comment on non-tweet items to avoid possible confusion.
 *
 * More information regarding the plugins installation can be found
 * in the [“How to initialize Echo components”](#!/guide/how_to_initialize_components-section-initializing-plugins) guide.
 *
 * @extends Echo.Plugin
 *
 * @package streamserver/plugins.pack.js
 * @package streamserver.pack.js
 */
var plugin = Echo.Plugin.manifest("TweetDisplayCardUI", "Echo.StreamServer.Controls.Stream.Item");

if (Echo.Plugin.isDefined(plugin)) return;

plugin.init = function() {
	var item = this.component;

	var config = item.config.get("contentTransformations");
	$.map(["text", "html", "xhtml"], function(contentType) {
		config[contentType].hashtags = false;
	});

	item.config.set("contentTransformations", config);
	item.config.set("plugins.LikeCardUI.enabled", false);
	item.config.set("plugins.ReplyCardUI.enabled", false);
	item.config.set("plugins.CardUISocialSharing.enabled", false);
	item.config.set("plugins.CommunityFlagCardUI.enabled", false);
	// icon must be visible to show that the item is from Twitter
	item.config.set("viaLabel.icon", true);

	this.extendTemplate("replace", "date", plugin.templates.date);
	this.extendTemplate("replace", "authorName", plugin.templates.username);
	item.addButtonSpec(this.name, this._assembleButton("tweet"));
	item.addButtonSpec(this.name, this._assembleButton("retweet"));
	item.addButtonSpec(this.name, this._assembleButton("favorite"));
};

plugin.labels = {
	/**
	 * @echo_label
	 */
	"tweet": "Reply",
	/**
	 * @echo_label
	 */
	"retweet": "Retweet",
	/**
	 * @echo_label
	 */
	"favorite": "Favorite",
	/**
	 * @echo_label
	 */
	"comment": "Comment",
	/**
	 * @echo_label
	 */
	"secondsAgo": "{seconds}s",
	/**
	 * @echo_label
	 */
	"minutesAgo": "{minutes}m",
	/**
	 * @echo_label
	 */
	"hoursAgo": "{hours}h",
	/**
	 * @echo_label
	 */
	"monthsAgo": "{day} {month}",
	/**
	 * @echo_label
	 */
	"yearsAgo": "{day} {month} {year}",
	/**
	 * @echo_label
	 */
	"fullDate": "{time} - {date}",
	/**
	 * @echo_label
	 */
	"month1": "Jan",
	/**
	 * @echo_label
	 */
	"month2": "Feb",
	/**
	 * @echo_label
	 */
	"month3": "Mar",
	/**
	 * @echo_label
	 */
	"month4": "Apr",
	/**
	 * @echo_label
	 */
	"month5": "May",
	/**
	 * @echo_label
	 */
	"month6": "Jun",
	/**
	 * @echo_label
	 */
	"month7": "Jul",
	/**
	 * @echo_label
	 */
	"month8": "Aug",
	/**
	 * @echo_label
	 */
	"month9": "Sep",
	/**
	 * @echo_label
	 */
	"month10": "Oct",
	/**
	 * @echo_label
	 */
	"month11": "Nov",
	/**
	 * @echo_label
	 */
	"month12": "Dec"
};

plugin.enabled = function() {
	return this._isTweet();
};

plugin.events = {
	"Echo.StreamServer.Controls.Stream.Item.onRender": function(topic, args) {
		if (window.twttr) {
			window.twttr.widgets && window.twttr.widgets.load();
		} else {
			Echo.Loader.download([{
				"url": "//platform.twitter.com/widgets.js"
			}], function() {
				window.twttr && window.twttr.widgets && window.twttr.widgets.load();
			});
		}
		$.map(this.component.buttons[this.name], function(name) {
			if (name && name.element) {
				name.element.unbind("click");
			}
		});
	}
};

plugin.templates.username =
	'<div class="{plugin.class:tweetUserName}"></div>';

plugin.templates.date =
	'<div class="{plugin.class:tweetDate} echo-secondaryFont"></div>';

/**
 * @echo_renderer
 */
plugin.component.renderers.authorName = function(element) {
	var item = this.component;
	return item.parentRenderer("authorName", arguments)
		.removeClass("echo-linkColor")
		.addClass(this.cssPrefix + "tweetScreenName").wrapInner(
			Echo.Utils.hyperlink({
				"href": item.get("data.actor.id")
			}, {
				"openInNewWindow": true,
				"skipEscaping": true
			})
		);
};

/**
 * @echo_renderer
 */
plugin.component.renderers.avatar = function(element) {
	var item = this.component;
	return item.parentRenderer("avatar", arguments).wrap(
		Echo.Utils.hyperlink({
			"href": item.get("data.actor.id")
		}, {
			"openInNewWindow": true,
			"skipEscaping": true
		})
	);
};

/**
 * @echo_renderer
 */
plugin.component.renderers.date = function(element) {
	var item = this.component;
	this.view.render({"name": "tweetDate"});
	return item.parentRenderer("date", arguments);
};

plugin.component.renderers._buttonsDelimiter = function(element) {
	var item = this.component;
	var posDelimiter = item.buttonSpecs[this.name].length;

	return item.parentRenderer("_buttonsDelimiter", arguments)
		.find("span[class*='button-delim']").eq(posDelimiter).text(" | ");
};

/**
 * @echo_renderer
 */
plugin.renderers.tweetUserName = function(element) {
	var item = this.component;
	return element.html(Echo.Utils.hyperlink({
		"href": item.get("data.actor.id"),
		"caption": "@" + this._extractTwitterID(),
		"class": "echo-streamserver-controls-stream-item-authorName"
	}, {
		"openInNewWindow": true,
		"skipEscaping": true
	}));
};

plugin.renderers.tweetDate = function(element) {
	var item = this.component;
	return element.html(Echo.Utils.hyperlink({
		"caption": this._getTweetTime(),
		"href": item.get("data.object.id"),
		"class": "echo-secondaryFont echo-secondaryColor",
		"title": this._getTweetTime(true)
	}, {
		"openInNewWindow": true,
		"skipEscaping": true
	}));
};

plugin.methods._assembleButton = function(name) {
	var plugin = this, item = this.component;
	var match = item.get("data.object.id").match(/\/(\d+)$/);
	var id = match && match[1];
	return function() {
		return {
			"name": name,
			"icon": "icon-" + name,
			"label": plugin.labels.get(name),
			"template": Echo.Utils.hyperlink({
				"href": "https://twitter.com/intent/" + name + "?in_reply_to=" + id + "&tweet_id=" + id,
				"class": "{class:button} intentControl {class:button}-{data:name}",
				"caption":
					'<i class="{plugin.class:buttonIcon} icon-{data:name}"></i>' +
					'<span class="echo-primaryFont {class:buttonCaption}">{data:label}</span>'
			}, {
				"openInNewWindow": true,
				"skipEscaping": true
			}),
			"visible": id && plugin._isTweet()
		};
	};
};

plugin.methods._isTweet = function() {
	var item = this.component;
	return item.get("data.source.name") === "Twitter";
};

plugin.methods._getTweetTime = function(getFull) {
	var item = this.component;
	var d = new Date(item.timestamp * 1000);
	var now = (new Date()).getTime();
	var diff = Math.floor((now - d.getTime()) / 1000);
	var result;
	if (getFull) {
		result = this.labels.get("fullDate", {"time": d.toLocaleTimeString(), "date": d.toLocaleDateString()});
	} else {
		if (diff < 60) {
			result = this.labels.get("secondsAgo", {"seconds": diff});
		} else if(diff < 60 * 60) {
			result = this.labels.get("minutesAgo", {"minutes": Math.floor(diff / 60)});
		} else if(diff < 60 * 60 * 24) {
			result = this.labels.get("hoursAgo", {"hours": Math.floor(diff / (60 * 60))});
		} else if (diff < 60 * 60 * 24 * 365) {
			result = this.labels.get("monthsAgo", {"day": d.getDate(), "month": this.labels.get("month" + (d.getMonth() + 1))});
		} else {
			result = this.labels.get("yearsAgo", {"day": d.getDate(), "month": this.labels.get("month" + (d.getMonth() + 1)), "year": d.getFullYear()});
		}
	}
	return result;
};

plugin.methods._extractTwitterID = function() {
	var item = this.component;
	var match = item.get("data.actor.id").match(/twitter.com\/(.*)/);
	return match ? match[1] : item.get("data.actor.id");
};

plugin.css =
	".{plugin.class} .{class:avatar} a img { border: 0px; }" +
	".{plugin.class} .{class:data} a { text-decoration: none; }" +
	".{plugin.class} .{class:data} a:hover { text-decoration: underline; }" +
	".{plugin.class} .{class:modeSwitch} { margin-left: 6px; }" +
	".{plugin.class:userName} { float: left; font-size: 15px; font-weight: bold; }" +
	".{plugin.css:screenName} { margin-left: 4px; font-size: 11px; font-weight: normal; padding-top: 1px; }" +
	".{plugin.class:userName} a, .{plugin.class:tweetUserName} a, .{plugin.class:intentControl} { text-decoration: none; }" +
	".{plugin.class:intentControl} { margin-right: 10px }" +
	".{plugin.class:tweetUserName} { margin-left: 4px; padding-right: 5px; float: left; }" +
	".{plugin.class:date} { text-decoration: none; color: #C6C6C6; }" +
	".{plugin.class:tweetScreenName} a { text-decoration: none; color: #333333; }" +
	".{plugin.class:tweetDate} a.echo-secondaryFont { text-decoration: none; color: #C6C6C6; }" +
	".{plugin.class:tweetDate} a:hover { text-decoration: underline;  }" +
	".{plugin.class:tweetDate} { float: right; }" +
	".{class:button} i.icon-favorite { background-position: -143px 0px; }" +
	".{class:button} i.icon-tweet {background: url(https://si0.twimg.com/images/dev/cms/intents/icons/sprites/everything-spritev2.png) no-repeat; background-position: -17px -2px; }";
Echo.Plugin.create(plugin);

})(Echo.jQuery);