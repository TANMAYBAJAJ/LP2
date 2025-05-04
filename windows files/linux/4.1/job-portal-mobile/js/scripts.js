// Existing code + this

$(document).on('pageinit', '#home', function() {
    renderRecentJobs();
    updateFavCount();
  });
  
  function renderRecentJobs() {
    $('#recent-jobs').empty();
    $.each(jobs.slice(0, 2), function(i, job) {
      $('#recent-jobs').append(`
        <div class="job-card">
          <img src="${job.img}">
          <h2>${job.title}</h2>
          <p>${job.company} - ${job.location}</p>
        </div>
      `);
    });
  }
  
  function updateFavCount() {
    const favs = Storage.loadFavorites();
    $('#fav-count').text(favs.length);
  }
  