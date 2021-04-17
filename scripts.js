$(document).ready(function() {
  function hideInitCarousel() {
    const carousel = $('#carouselContent')[0];
    $(carousel).css('display', 'none');
    showLoader();
    createCarouselItem(carousel);
  }

  function createCarouselItem(carousel){
    const item = $(`<div class="carousel-item active mt-4" id="carouselItem">
      <div class="row w-100 row-cols-1 row-cols-sm-2 text-white justify-content-center align-items-center">
        <div class="col-12 col-sm-3 col-md-3 col-lg-3 col-xl-2 mb-3 mt-3 text-center">
          <img src="" alt="weather presenter" class="testimonial-avatar rounded-circle" id="carouselItemPic">
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
    requestCarousel();
  }

  function showLoader(){
    $('#carouselContainer').append('<div class="loader"></div>');
  }

  function hideLoader(){
    const loader = $('.loader')[0];
    const carousel = $('#carouselContent')[0];
    $(loader).css('display', 'none');
    $(carousel).css('display', 'block');
  }

  function addProp(prop, element, value, key, elementId){
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
      default:
        item[prop] = `${value}`;
    }
    item.id = `car${key}${elementId}`;
  }
  
  function requestCarousel(){
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
            addProp(myHash[key][0], myHash[key][1], element[key], key, element["id"]);
          }
        });
        setTimeout(function(){
          hideLoader();
        }, 500);
      }
    }).fail(function(){
      alert('Server Error');
    });

  }

  hideInitCarousel();
  
});
