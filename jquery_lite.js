(function (root) {
  root.$l = root.$l || function (arg) {
    var nodes;
    if (arg instanceof HTMLElement) {
      nodes = [arg];
    }
    else {
      nodes = root.document.querySelectorAll(arg);
      nodes = [].slice.apply(nodes);
    }
    return new DOMNodeCollection(nodes);
  };

  root.DOMNodeCollection =
    root.DOMNodeCollection || function (nodes) {
    this.nodes = nodes;
  };

  DOMNodeCollection.prototype.html = function(string){
    if (typeof string === "undefined"){
      return this.nodes[0].innerHTML;
    } else {
      for (var i = 0; i < this.nodes.length; i++) {
        this.nodes[i].innerHTML = string;
      }
    }
  };

  DOMNodeCollection.prototype.empty = function() {
    for (var i = 0; i < this.nodes.length; i++) {
      // debugger
      this.nodes[i].html = "";
    }
  };


  DOMNodeCollection.prototype.append = function(input) {
    if (input instanceof DOMNodeCollection) {
      input = input.html();
    }
    this.html(this.html() + input);
  };


  DOMNodeCollection.prototype.attr = function(string) {
    return this.nodes[0].getAttribute(string);
  };

  DOMNodeCollection.prototype.addClass = function(string) {
    for (var i = 0; i < this.nodes.length; i++) {
      if (this.nodes[i].className === "") {
        this.nodes[i].className = string;
      }
      else {
        this.nodes[i].className += " " + string;
      }
    }
  };

  DOMNodeCollection.prototype.removeClass = function(string) {
    // var classes = string.split(" ");
    for (var i = 0; i < this.nodes.length; i++) {
      var classArr= this.nodes[i].className.split(" ");
      for ( var j = 0; j < classArr.length; j++){
        if (classArr[j] === string){
          var idx = classArr.indexOf(string);
          classArr.splice(idx,1);
        }
      }
      this.nodes[i].className = classArr.join(' ');
      if (this.nodes[i].className === "") {
        this.nodes[i].removeAttribute("class");
      }
    }
  };


})(this);
