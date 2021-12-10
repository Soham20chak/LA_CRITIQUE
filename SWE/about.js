

let movie_id = location.pathname;
console.log(movie_id);


fetch(`${movie_detail_http}${movie_id}?` + new URLSearchParams({
    api_key : API_KEY
}))

.then(res => res.json())
.then(data =>{
    setupMovieInfo(data);
})

const setupMovieInfo = (data) =>{
    const movieName = document.querySelector('.movie-name');
    const genres = document.querySelector('.genres');
    const description = document.querySelector('.description');
    const title = document.querySelector('title');
    const backdrop = document.querySelector('.movie-info');

    title.innerHTML= movieName.innerHTML= data.title;
    genres.innerHTML = ` ${data.release_date.split('-')[0]} | `;
    for(let i=0;i<data.genres.length;i++){
        genres.innerHTML += data.genres[i].name + '| ';
    }
    if(data.backdrop_path == null){
        data.backdrop_path = data.poster_path;
    }
    description.innerHTML = data.overview.substring(0,2600) + '...';

    backdrop.style.backgroundImage = `url(${original_img_url}${data.backdrop_path})`;

    fetch(`${movie_detail_http}${movie_id}/credits?` + new URLSearchParams({
        api_key:API_KEY
    }))
    .then(res => res.json()
    .then(data =>{
        console.log(data);
        const cast =document.querySelector('.starring');
        for(let i=0;i<5;i++){
            cast.innerHTML += data.cast[i].name + '   |' ;
        }
        const crew =document.querySelector('.crew');
        for(let i=0;i<5;i++){
            crew.innerHTML += data.crew[i].name + '   |' ;
        }
        


    }))
   

    

    fetch(`${movie_detail_http}${movie_id}/reviews?` + new URLSearchParams({
        api_key:API_KEY
    }))
    .then(res => res.json()
    .then(data =>{
        console.log(data);
        const results =document.querySelector('.review');
        for(let i=0;i<3;i++){
            results.innerHTML += data.results[i].author + ':' + "<br>";
            results.innerHTML += data.results[i].content.substring(0,1000) + '...' + "<br>" + "<br>" + "<br>";
        }  
    }))

    

}



    

