function Result(place){
    var time = place.time.charAt(0)+":00 " + place.time.slice(-1).toUpperCase()+".M.";
    var sport = place.sport.charAt(0).toUpperCase() + place.sport.slice(1);
    return (
        <div class="d-flex justify-content-evenly result">
            <div class="fs-6 text-center">{place.name}</div>
            <div class="fs-6 text-center">{time}</div>
            <div class="fs-6 text-center">{sport}</div>
        </div>
    );
}

export default Result;