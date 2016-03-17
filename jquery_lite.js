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

  DOMNodeCollection.prototype.children = function() {
    var kids = [];
    // debugger
    for (var i = 0; i < this.nodes.length; i++) {
      for (var j = 0; j < this.nodes[i].children.length; j++) {
        kids.push(new DOMNodeCollection(this.nodes[i].children[j]));
      }
    }
    return kids;
  };

  DOMNodeCollection.prototype.parent =  function() {
    var parent = [];
    for (var i = 0; i < this.nodes.length; i++) {
      parent.push(this.nodes[i].parentNode);
    }
    parent = parent.myUniq();
    return new DOMNodeCollection(parent);
  };

  Array.prototype.myUniq = function(){
    var uniq = [];
    for (var i = 0; i < this.length; i ++ ){
      if ( !uniq.includes(this[i])){
        uniq.push(this[i]);

      }
    }
    return uniq;
  };

  DOMNodeCollection.prototype.find = function(selector) {
    var matches1 = [];
    var empty;
    for (var i = 0; i < this.nodes.length; i++) {
      // debugger;
      var nnnodes = this.nodes[i].querySelectorAll(selector);
      empty1 = [].slice.call(nnnodes);
      matches1 = matches1.concat(empty1);
    }

    return new DOMNodeCollection(matches1);
  };



  DOMNodeCollection.prototype.remove = function(selector) {
    // var collections = this.find(selector);
    // var parents = [];
    // for (var i = 0; i < collections.length; i++) {
    //   var ancestor = collections[i].parent();
    //   parents.push(ancestor);
    // }
    // for (j = 0; j < this.length< )
  };



})(this);
