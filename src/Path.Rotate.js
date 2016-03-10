L.Handler.PathRotate = L.Handler.PathScale.extend({

});


L.Path.addInitHook(function() {
  if (this.options.rotatable) {
    this.rotating = new L.Handler.PathRotate(this);
  }
});
