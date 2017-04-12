app.factory('boardService', function ($http) {

    var factory = {};

    factory.notices = []

    factory.load = function (articleType, page, pageSize, searchText) {
        // console.log("articleType :::: " + articleType)
        return $http.get('/board?page=' + page + '&rows=' + pageSize + '&articleType=' + articleType + '&searchText=' + searchText);
    }

    factory.get = function (sid) {
        return $http.get('/board/' + sid);
    }


    factory.post = function (item) {
        return $http.post('/board', item);
    }

    factory.update = function (sid, item) {
        return $http.put('/board/' + sid, item);
    }


    factory.delete = function (sid) {
        return $http.delete('/board/' + sid);
    }


    return factory;

});

app.factory('menuService', function () {

    var factory = {};


    factory.get = function (state) {

        if (state.articleType === 'notice') {
            return {menu: 'news', boardTitle: '공지사항', boardType:"board"};
        }
        if (state.articleType === 'news') {
            return {menu: 'news', boardTitle: 'NEWS', boardType:"board"};
        }
        if (state.articleType === 'un-sdsn') {
            return {menu: 'news', boardTitle: 'UN SDSN 소식', boardType:"board"};
        }
        if (state.articleType === 'korea-sdsn') {
            return {menu: 'news', boardTitle: 'Korea SDSN 소개', boardType:"board"};
        }

        if (state.articleType === 'issue') {
            return {menu: 'resources', boardTitle: '연구 발간물', boardType:"gallary" };
        }
        if (state.articleType === 'public') {
            return {menu: 'resources', boardTitle: '성명서', boardType:"public" };
        }
        if (state.articleType === 'event-docs') {
            return {menu: 'resources', boardTitle: '행사자료집', boardType:"gallary" };
        }


    }

    return factory;

});
