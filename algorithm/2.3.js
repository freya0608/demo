/**
 * Created by Administrator on 2016/12/31.
 */
function displayList(list){
    for(list.font();list.getCurrentPos()<list.length;list.next()){
        if(list.getElement() instanceof Customer){
            print(list.getElement()['name'] + ','+list.getElement()['movie']);
        }else {
            print(list.getElement());
        }
    }
}
var customers = new List();
function Customs(name,movie){
    this.name = name;
    this.movie = movie;
}
function checkOut(name, movie, filmList, customList){
    if(movieList.contains(movie)){
        var c = new Customs(name,movie);
        customeList.append(c);
        filmList.remove(movie);
    }else{
        print(movie + 'is not available');
    }
}


var movies = createArr('film.txt');
var moviesList = new List();
var customers = new List();
for(var i = 0;i<movies.length;++i){
    moviesList.append(movies[i]);
}