  
//Demo Two
(function(){
    var ele = document.querySelector('.demo_two');
    
    ele.addEventListener('click', function(){
        ele.className = ele.className + ' clicked';
    })
}());
  
  //Demo Three
  
(function(){
    //using html 5
    var ele = document.querySelector('.demo_three');
    
    ele.addEventListener('click', function(){
        this.style.background = 'rgba(0,0,0,.3)';  
    });
}());
  
  
//Detection script

var supportTranstion;
(function(){
    supportTranstion = function (){
        //Test for each vendor and W3C properties 
        if(	'WebkitTransition' in document.body.style ||
            'MozTransition' in document.body.style ||
            'OTransition' in document.body.style ||
            'MsTransition' in document.body.style ||
            'transition' in document.body.style){
              return true;
            }
        
        return false;
    }   
}());

// Jquery Fallback

(function($){
    
    var styles = {width : '500px'},
    duration = 500,
    type = ['css', 'animate'],
    // Using feature detection function from above
    support = (supportTransition()) ? 0 : 1;
    
    $('.element')[type[support]](styles, duration);
    
}(jQuery))
  