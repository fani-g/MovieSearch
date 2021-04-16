function getMovies(searchText,page){
	$("#answer").empty();
	var plot="";
	var request = new XMLHttpRequest();
	console.log(searchText);

	request.open('GET', 'https://www.omdbapi.com/?s='+searchText+'&page='+page+'&apikey=2be0ca3b', true);
	request.onload = function() {
	// Accessing JSON data here
		
		var data = JSON.parse(this.response);
		console.log(data);
		if (request.status >= 200 && request.status < 400) {
			var movies = data.Search;
			$.each(movies, function(index, movie) {
				getShortPlot(movie.imdbID);
				plot=localStorage.getItem(movie.imdbID);
				if(plot==null) plot="";
				$("#answer").append('<div class="results"><h3 class="title" >' + movie.Title +'('+movie.Year+')</h3><img src="' + movie.Poster + '" onerror="imgError(this);"><p>'+plot+'</p><button onclick="getPlot(\''+movie.imdbID+'\')" class="btn" href="#">More Info</button></div></div>');
				$("#pagination").empty();
				$("#pagination").append('<div class="buttons"><button onclick="prevPage(\'' + page + '\',\'' + searchText + '\')" id ="btn_prev" href="#">Previous</button><button onclick="nextPage(\'' + page + '\',\'' + searchText + '\')" id ="btn_next" href="#">Next</button></div>');
				localStorage.removeItem(movie.imdbID);
			});
			

		} else {
			console.log('error');

		}	
		

		
	};
	
	
	request.send();	 
	$("#pagination").empty();
	$("#answer").empty();

}



function getPlot(movieID){
	$("#answer").empty();
	$("#pagination").empty();
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.omdbapi.com/?i='+movieID+'&plot=full'+'&apikey=2be0ca3b', true);
	request.onload = function() {
	// Accessing JSON data here
		var movie = JSON.parse(this.response);
		console.log(movie);
		if (request.status >= 200 && request.status < 400) {
			console.log('ok');
				
				$("#answer").append('<div class="movie"><img src="' + movie.Poster + '" onerror="imgError(this);"><div class="card" style="width: 300px;"><div class="card-header"><br><div id="title">'+movie.Title+'</div></div><hr><p>'+movie.Runtime+'<b> | </b>'+ movie.Genre+'<b> | </b>'+movie.Year+'</p><hr><p>'+movie.Plot+'</p><hr><p><b>Creators: </b>'+movie.Director+','+movie.Writer+'</p><hr><p><b>Actors: </b>'+movie.Actors+'</p><hr><div id="imdblink"><p>See more on <a href="http://imdb.com/title/' + movieID + '">IMDB</a><br><hr><p></div></div></div>');
			
		} else {
			console.log('error');
		}
	};
	request.send();	 
	

}

function getShortPlot(movieID){
	var plot;
	console.log(movieID);
	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.omdbapi.com/?i='+movieID+'&plot=short'+'&apikey=2be0ca3b', true);
	request.onload = function() {
	// Accessing JSON data here
		var movie = JSON.parse(this.response);
		
		if (request.status >= 200 && request.status < 400) {
			console.log('ok');
			localStorage.setItem(movieID,movie.Plot);
			console.log(movie.Plot);		
		} else {
			console.log('error');
		}
	};
	request.send();	 
	
}

function imgError(image) {
	image.onerror = "";
    image.src = "http://placehold.jp/d9d9d9/003366/300x400.png?text=NO%20PHOTO%20%0AAVAILABLE";
    return true;
	
}

function nextPage(page,searchText){
	var btn_next = document.getElementById("btn_next");
    page++;
    console.log(searchText);
    console.log(page);
    getMovies(searchText,page);
 
}



function prevPage(page,searchText){
	var btn_prev = document.getElementById("btn_prev");
	if (page == 1 ) {
		//$('#btn_prev').hide();
        btn_prev.style.visibility = "hidden";
    }else{ //(page>1)
	  btn_prev.style.visibility = "visible";
      page--;
      getMovies(searchText,page);
    }
    console.log(searchText);
    console.log(page);
    
 
}