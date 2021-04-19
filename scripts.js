$(document).ready(function() {
  function hideCarousel(carouselId, parentElement, auxFunction, loaderId) {
    // const carousel = $('#carouselContent')[0];
    const carousel = $(`${carouselId}`)[0];
    // console.log(carousel)
    $(carousel).css('display', 'none');
    showLoader(parentElement, loaderId);
    // createQuoteItem(carousel);
    auxFunction(carousel);
  }

  function createQuoteItem(carousel){
    const item = $(`<div class="carousel-item active mt-4" id="carouselItem">
      <div class="row w-100 row-cols-1 row-cols-sm-2 text-white justify-content-center align-items-center">
        <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2 mb-3 mt-3 text-center">
          <img src="" alt="avatar-pic" class="testimonial-avatar rounded-circle" id="carouselItemPic">
        </div>
        <blockquote class="carousel-text col-sm-6 mx-sm-0 px-4 pl-sm-5 pl-md-3">
          <p class="" id="carouselItemText">
            <cite class="d-block font-weight-bold mt-3" id="carouselItemName"></cite>
            <span class="d-block" id="carouselItemTitle"></span>
          </p>
        </blockquote>
      </div>
    </div>`);
    $(carousel).prepend(item);
    requestQuoteCarousel();
  }

  function showLoader(parentElement, loaderId){
    $(`${parentElement}`).append($(`<div class="loader" id="${loaderId}"></div>`));
  }

  function hideLoader(loaderId, carouselId){
    const loader = $(`${loaderId}`)[0];
    const carousel = $(`${carouselId}`)[0];
    $(loader).css('display', 'none');
    $(carousel).css('display', 'block');
  }

  function addProp(prop, element, value, key, type, elementId){
    const item = $(`${element}`)[0];
    if (!item){
      return;
    }
    switch (key){
      case "id":
        break;
      case "text":
        let cpItem = item.cloneNode(true);
        item[prop] = `${value}`;
        item.append(cpItem.children[0]);
        item.append(cpItem.children[0]);
        break;
      case "star":
        starContent(value, item);
      default:
        item[prop] = `${value}`;
    }
    item.id = `car${type}${key}${elementId}`;
  }
  
  function requestQuoteCarousel(){
    const myHash = {
      "id": ["id", "#carouselItem"],
      "pic_url": ["src", "#carouselItemPic"],
      "name": ["textContent", "#carouselItemName"],
      "title": ["textContent", "#carouselItemTitle"],
      "text": ["textContent", "#carouselItemText"]
    };
    let carouselItem = $('#carouselItem')[0];
    let copyCarouselItem = carouselItem.cloneNode(true);
    copyCarouselItem.className = copyCarouselItem.className.replace("active", "");
    const url = 'https://smileschool-api.hbtn.info/quotes';
    let request = $.get(url, function(data, status, response){
      if (response.status == 200) {
        data.forEach(element => {
          if (element != data[0]){
            let aux = copyCarouselItem.cloneNode(true);
            $(aux).insertAfter(carouselItem);
            carouselItem = aux;
          }
          for (key in element){
            addProp(myHash[key][0], myHash[key][1], element[key], key, 'quote', element["id"]);
          }
        });
        setTimeout(function(){
          hideLoader('#quoteslLoader', '#carouselContent');
        }, 500);
      }
    }).fail(function(){
      alert('Server Error');
    });
  }

  function starContent(stars, item){
    let totalStars = 5;
    let starSet = "";
    for (let i = 0; i < parseInt(stars); i++, totalStars--){
      $(item).append($('<img src="assets/images/star_on.png" alt="Star on" width="15" height="15" class=""></img>'))
    }
    for (let j = 0; j < totalStars; j++){
      $(item).append($('<img src="assets/images/star_off.png" alt="Star off" width="15" height="15" class=""></img>'))
    }
  }
  
  function createVideoItems(carousel){

    const itemClass = "carousel-item active px-5";
    const item = $(`<div class="${itemClass}" id="popularVideoId"></div>`);
    const card = $(`<div class="card border-0" id="cardId">
      <img src="" class="card-img-top" alt="Diagonal smile" id="cardThumbImg">
      <div class="card-img-overlay d-flex flex-row align-items-start justify-content-center mt-3">
        <img src="assets/images/play.png" alt="Diagonal smile" width="65" height="65" class="">
      </div>
      <div class="card-body">
        <h5 class="card-title font-weight-bold" id="cardTitle"></h5>
        <small class="card-text text-muted" id="cardSubTitle"></small>
      </div>
      <div class="mx-4 mb-2">
        <img src="" alt="Author avatar" width="30" height="30" class="rounded-circle mr-2" id="authorImg">
        <span class="text-purple font-weight-bold" id="cardAuthor"></span>
      </div>
      <div class="mx-4 d-flex flex-row justify-content-center justify-content-between">
        <div id="tutorialRating"></div>
        <span class="text-purple font-weight-bold" id="tutorialDuration"></span>
      </div>
    </div>`);
    $(item).append(card)
    $(carousel).prepend(item);
    requestTutorialCarousel();
  }

  function requestTutorialCarousel(){
    const myHash = {
      "id": ["id", "#popularVideoId"],
      "title": ["textContent", "#cardTitle"],
      "sub-title": ["textContent", "#cardSubTitle"],
      "thumb_url": ["src", "#cardThumbImg"],
      "author": ["textContent", "#cardAuthor"],
      "author_pic_url": ["src", "#authorImg"],
      "star": ["star", "#tutorialRating"],
      "duration": ["textContent", "#tutorialDuration"]
    };
    let carouselItem = $('#popularVideoId')[0];
    let copyCarouselItem = carouselItem.cloneNode(true);
    copyCarouselItem.className = copyCarouselItem.className.replace("active", "");
    const url = 'https://smileschool-api.hbtn.info/popular-tutorials';
    let request = $.get(url, function(data, status, response){
      if (response.status == 200) {
        // console.log(data);
        data.forEach(element => {
          if (element != data[0]){
            let aux = copyCarouselItem.cloneNode(true);
            $(aux).insertAfter(carouselItem);
            carouselItem = aux;
          }
          for (key in element){
            // console.log(key)
            // console.log(element[key])
            if (myHash[key]){
              addProp(myHash[key][0], myHash[key][1], element[key], key, 'tutorial', element["id"]);
            }
          }
        });
        setTimeout(function(){
          hideLoader('#tutorialLoader', '#popularItems');
        }, 500);
      }
    }).fail(function(){
      alert('Server Error');
    });
  }

  hideCarousel('#carouselContent', '#carouselContainer', createQuoteItem, 'quoteslLoader');
  hideCarousel('#popularItems', '#carouselTutorials', createVideoItems, 'tutorialLoader');
  // getVideoData();
});
