var myController = function ($scope){

}

var authorCtrl = function ($scope, $http){
    $http.get('http://localhost:8000/api/buku/1').then(function (res){
    console.log(res.data);
 })

}

var bookCtrl = function ($scope, $http){
    var url = ('http://localhost:8000/api/buku');
  var init = function (){
    $http.get(url).then(function (res){
        console.log(res.data);
        $scope.books = res.data;
    })
  }
 init();
 $scope.selectBook = function (a){
    a.tanggal_publikasi = new Date(a.tanggal_publikasi); //merubah data string ke date
    $scope.form = angular.copy(a);
 }

 $scope.cancel = function (){
    $scope.form = {};
 }

 $scope.save = function(){
    var a = angular.copy($scope.form);
    if (!a.id){
        $http.post(url, a).then(function (res){
            init(); //untuk memanggil data api kembali
            $scope.cancel(); //untuk membersihkan form
        })
    } else {
        $http.put(url, a).then(function (res){
            init();
            $scope.cancel(); //untuk membersihkan form

        })
    }
 }
 $scope.delete = function(){
    var id = $scope.form.id;
    if (!id){
        alert("Pilih data yang akan dihapus");
        return;
    }
    $http.delete(url + "/" + id).then(function (res){
        init();
        $scope.cancel();
    })
 }
}

var perpusConfig = function ($stateProvider, $urlRouterProvider){

    var myState = {
        home:{
            name: 'home',
            url: '/',
            template: '<h1>This is Home</h1>'
        },
        about:{
            name: 'about',
            url: '/about',
            template: '<h1>This is ABout</h1>'
        },
        author:{
            name: 'author',
            url: '/author',
            templateUrl: 'template/author.html',
            controller: 'author-ctrl'
        },
        book:{
            name: 'book',
            url: '/book',
            templateUrl: 'template/book.html',
            controller: 'book-ctrl'
        }
    };

    $stateProvider
        .state(myState.home)
        .state(myState.about)
        .state(myState.author)
        .state(myState.book);

    $urlRouterProvider
        .otherwise("/");
}

angular.module('perpus', ["ui.router"])
.config(perpusConfig)
.controller('my-controller', myController)
.controller('book-ctrl', bookCtrl)
.controller('author-ctrl', authorCtrl);