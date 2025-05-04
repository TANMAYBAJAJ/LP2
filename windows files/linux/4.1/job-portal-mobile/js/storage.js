const Storage = {
    saveProfile(profile) {
      localStorage.setItem('profile', JSON.stringify(profile));
    },
    loadProfile() {
      return JSON.parse(localStorage.getItem('profile')) || {};
    },
    saveFavorites(favs) {
      localStorage.setItem('favorites', JSON.stringify(favs));
    },
    loadFavorites() {
      return JSON.parse(localStorage.getItem('favorites')) || [];
    }
  };
  