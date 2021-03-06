angular.module('futurism')
    .run(function(autoLogin, session, $rootScope, lang, unread, notificationListener, socketErrors, _, langUrl, musicLooper) {
        'use strict';
        
        autoLogin.activate();
        session.renew();
        langUrl.init();
        musicLooper.init();
        
        lang.loadData('data/phrases.json');
        $rootScope.lang = lang;
        
        _.delay(function() {
            unread.start();
        }, 4000);
        
        notificationListener.add('Welcome to Futurism!'); // pretty much a pointless command... this is a dirty way to get notificationListener to be created
        socketErrors();
    });