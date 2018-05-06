app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});


app.filter('highlight', function($sce) {
  return function(text, phrase) {
    if (phrase) text = text.replace(new RegExp('(' + phrase.replace(/^\s+|\s+$/g, '') + ')', 'gi'),
      '<span class="highlighted">$1</span>')

    return $sce.trustAsHtml(text)
  }
});

app.filter('filterNotes', function () {
  return function (items, filter) {
    var filtered = [];
    if(filter!=""){
        for (var i = 0; i < items.length; i++) {
            for(j=0;j<filter.length;j++){
                if (items[i].color == filter[j]) {
                    filtered.push(items[i]);
                    break;
                }          
            }
          
        }    
    }else{
        return items;
    }
    
    return filtered;
  };
});