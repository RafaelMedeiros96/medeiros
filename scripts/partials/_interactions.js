// WHAT HAPPENS WHEN YOU CLICK ON STUFF

// timewasted in minutos
var timeWastedInminutos = 0,
    totalTimeWastedInminutos = 0,
    episodesPerSeason = 0,
    seasons = 0;


    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width,
        height = (window.innerHeight > 0) ? window.innerHeight : screen.height;

    // $('.container--small').css('height', height);


// on submit button, adds a TV show to the list
$('.submit').on('click touchstart', function() {
  seasons = $('.seasons').val();

  // average how many episodes there are in a season
  episodesPerSeason = episodes / totalSeasons;

  // adds # of seasons to the text info of TV show
  $('.show-to-add').find('.container__list-of-shows__info__seasons').html(seasons);

  // for CSS animations (adds TV show in list)
  $('.show-to-add').removeClass('visuallyhidden').addClass('showing');
  setTimeout(function() {
    $('.show-to-add').removeClass('showing').addClass('show');
  }, 100);

  // avoids clash of classes .show-to-add
  setTimeout(function() {
    $('.show-to-add').removeClass();
  }, 500);



  // calculate time wasted watchin specific show in minutos
  timeWastedInminutos = runtime * (episodesPerSeason * seasons);

  // add # of minutos to the show so that when user removes show
  // this number is subtacted from total
  $('.show-to-add').find('.container__list-of-shows__info__wasted-time').html(timeWastedInminutos);

  // calculate total time wasted in minutos
  totalTimeWastedInminutos = totalTimeWastedInminutos + timeWastedInminutos;

  // convert into dias, horas, minutos
  convertminutos(totalTimeWastedInminutos);

  // save to localstorage
  save(totalTimeWastedInminutos);



  // clean up everything
  $('input').val("");

  // for CSS animations (hiding submit button)
  $(this).removeClass('show').addClass('hiding');
  setTimeout(function() {
    $('.submit').removeClass('hiding').addClass('visuallyhidden');
  }, 100);

  // focus on input again
  $('.select2-input').focus();



  // show results (time wasted) container
  if ($('.result-container').is('.visuallyhidden')) {
    $('.result-container').removeClass('visuallyhidden');
    $('.result-container').parent().removeClass('hiding');
  } else {

    // calculates previous time of show (only if more than 1 show is in list)
    showTemporaryTimerOfPreviousShow(timeWastedInminutos);
  }


  return false;
})




// shows temporary timer of previous show above global timer
function showTemporaryTimerOfPreviousShow(timeWasted, subtractShow) {
  var previousShowTime = convertminutos(timeWasted, true);

  // if removing TV show, display "-" instead of "+"
  if (subtractShow) {
    $('.container__top__previous-show-time').html('- ' + previousShowTime);
  } else {
    $('.container__top__previous-show-time').html('+ ' + previousShowTime);
  }

  $('.container__top__previous-show-time').removeClass('visuallyhidden').addClass('show');

  // CSS animations for hiding the temporary counter number
  setTimeout(function() {
    $('.container__top__previous-show-time').removeClass('show').addClass('hiding');
    setTimeout(function() {
      $('.container__top__previous-show-time').removeClass('hiding').addClass('visuallyhidden');
    }, 400);
  }, 3000);
}



// converts minutos into dias, horas, minutos
function convertminutos(totalminutos, dontUpdateClock) {
  var dias = Math.floor(totalminutos / 1440);
  var horas = Math.floor((totalminutos - dias * 1440) / 60);
  var minutos = Math.floor(totalminutos - (dias * 1440) - (horas * 60))

  // formats 8 into 08
  dias = formatNumber(dias, 2);
  horas = formatNumber(horas, 2);
  minutos = formatNumber(minutos, 2);

  // updates clock counter if no flag is set
  if (dontUpdateClock) {
    return (dias + ' : ' + horas + ' : ' + minutos);

  } else {
    // updates clock counter
    updateClock(dias, horas, minutos);
  }
}



// converts 5 into 05
function formatNumber(number, targetLength) {
  var output = number + '';
  while (output.length < targetLength) {
    output = '0' + output;
  }
  return output;
}



// updates the clock counter with new value
function updateClock(dias, horas, minutos) {
  var $container = $('.container__top__horas-wasted'),
      $diasContainer = $container.find('.horas-wasted__dias'),
      $horasContainer = $container.find('.horas-wasted__horas'),
      $minutosContainer = $container.find('.horas-wasted__minutos');

  // replace content
  // $diasContainer.find('.numbers').text(dias);
  // $horasContainer.find('.numbers').text(horas);
  // $minutosContainer.find('.numbers').text(minutos);

  // countUp plugin update number
  var diasCount = new countUp("dias", 00, dias, 0, 2),
      horasCount = new countUp("horas", 00, horas, 0, 4),
      minutosCount = new countUp("minutos", 00, minutos, 0, 6);
  diasCount.reset();
  horasCount.reset();
  minutosCount.reset();
  diasCount.start();
  horasCount.start();
  minutosCount.start();

  // check label "1 minute" not "1 minutos"
  (dias == '01') ? $diasContainer.find('.description').text('dia') : $diasContainer.find('.description').text('dias');
  (horas == '01') ? $horasContainer.find('.description').text('hora') : $horasContainer.find('.description').text('horas');
  (minutos == '01') ? $minutosContainer.find('.description').text('minute') : $minutosContainer.find('.description').text('minutos');



  // tweet link text change
  if (dias < 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + horas + ' horas and ' + minutos + ' minutos of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if (dias == 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dia, ' + horas + ' horas, and ' + minutos + ' minutos of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if (horas < 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias and ' + minutos + ' minutos of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if (horas == 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias, ' + horas + ' hora, and ' + minutos + ' minutos of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if (minutos < 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias and ' + horas + ' horas of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if (minutos == 01) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias, ' + horas + ' horas, and ' + minutos + ' minute of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else if ((horas < 01) && (minutos < 01)) {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  } else {
    $('.sharing-link').attr('href', 'https://twitter.com/share?text=I’ve wasted ' + dias + ' dias, ' + horas + ' horas, and ' + minutos + ' minutos of my life watching TV shows. Calculate your time:&url=http://tiii.me');
  }
}





// on seasons focus check if there is TV show added and show submit button
$('.seasons').on('keyup change', function() {
  if ($('.select2-input').val().length !== 0)
    if (hasSelectedShow)
      if ($(this).val().length !== 0)
        showSubmitButton()
})





// shows submit button
function showSubmitButton() {
  var $this = $('.submit');
  if ($this.hasClass('show')) {

  } else {
    $this.removeClass('visuallyhidden').addClass('showing');

    setTimeout(function() {
      $this.removeClass('showing').addClass('show');
    }, 100);
  }
}





// shows modal window on click
$('.js-show-modal').on('click touchstart', function() {
  showModalWindow();
  return false;
})

// clicking anywhere inside navigation or heading won’t close main menu popover
$('.about__content__inner').on('click touchstart', function(e){
    e.stopPropagation();
})

// hides modal window on click
$('.about__content').on('click touchstart', function(e){
  hideModalWindow();
  return false;
})



// shows modal window
function showModalWindow() {
  $('.about__content').removeClass('hide').addClass('show');
  $('.js-hide-modal').removeClass('visuallyhidden');

  // keyboard navigation ordering (first popover links)
  $('.about__content a').attr('tabindex','');
  $('.about__content a.about__icon').attr('tabindex', '0');

  $('body').addClass('noScroll');
}

// hides modal window
function hideModalWindow() {
  $('.about__content').removeClass('show').addClass('hiding');
  setTimeout(function() {
    $('.about__content').addClass('hide').removeClass('hiding show');
    $('.js-hide-modal').addClass('visuallyhidden');
  }, 150);
  $('body').removeClass('noScroll');

  // keyboard navigation ordering (hides popover links)
  $('.about__content a').attr('tabindex','-1');
}





// resets all data button click calls function
$('.reset-local-storage').on('click touchstart', function() {
  reset();
  return false;
})
