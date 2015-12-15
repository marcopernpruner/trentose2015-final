/* SantaModel assists santa's helpers in packing children's requests.
 * It provides quality control by checking if the requests are being
 * fulfilled
 */

var SantaModel = {
  /* Initializes the model with a list of requests, 
   * and sets the first one as the current one 
   */
   init : function(list){
       this.listQuestions = list;
       this.currentElement = 0;
       this.currentScore = 0;
   },
  
   /* It moves "current" to the next request */
   next : function (){
       if (this.currentElement + 1 < this.listQuestions.length) {
           this.currentElement++;
       } else {
            SantaController.showScore();
        }
       
   },
  
   /* Returns the current request. 
    * If all requests have been processed (there is no current one), it returns null 
    */
   getCurrentRequest : function () {
       return this.listQuestions[currentElement];
   },  
    
   /* Packs the given item if it fulfills the current request.       
    * returns 1 if the given item fulfills the request (= answer)
    * returns 0 if the given item does not fulfill the request
    */
   pack : function(item) {
       console.log(item);
       if (this.listQuestions[this.currentElement].answer == item) {
           this.currentScore++
           this.next();
           return 1;
       } else {
           this.next();
           return 0;
       }
   }      
};

var SantaController = {
    init: function(list) {
        SantaModel.init(list);
        SantaView.init();
    },
    
    getCurrentElement : function() {
        return SantaModel.currentElement;
    },
    
    getList : function() {
        return SantaModel.listQuestions;
    },
    
    pack : function(item) {
        SantaModel.pack(item);
        this.newQuestion();
    },
    
    newQuestion : function() {
        SantaView.cleanOptions();
        SantaView.newQuestion();
    },
    
    showScore : function() {
        SantaView.showOnlyResult();
    },
    
    getCurrentScore : function() {
        return SantaModel.currentScore;
    }
};

var SantaView = {
    init : function() {
        this.emptyAll();
        this.hideResult();
        this.newQuestion();
    },
    
    emptyAll : function() {
        $(".question").empty();
        $(".question-items").empty();
        $(".result").empty();
    },
    
    hideResult : function() {
        $(".result").hide();
    },

    showOnlyResult : function() {
        $(".result").show();
        $(".result").html(SantaController.getCurrentScore());
        $(".question").hide();
        $(".question-items").hide();
    },
    
    cleanOptions : function() {
        $(".question-items").empty();
    },
    
    newQuestion : function() {
        var list = SantaController.getList();
        var currentElement = SantaController.getCurrentElement();
        var actualItem = list[currentElement];
        
        $(".question").html(actualItem.question);
        for (var i=0; i<actualItem.options.length; i++) {
            $(".question-items").append("<li>"+actualItem.options[i]+"</li>");
        };
    }
};

$(document).ready(function() {
    SantaController.init(requests);
    
    $(".question-items").on("click", "li", function() {
        SantaController.pack($(this).text());
    });
});