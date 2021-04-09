class Quiz {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements

    question.hide();

    //write code to change the background color here

    background("yellow");

    //write code to show a heading for showing the result of Quiz

    fill(255,0,0);
    textSize(30);   
    text("RESULT FOR THE QUIZ!!",225,50);

    //call getContestantInfo( ) here

    Contestant.getContestantInfo();

    //write condition to check if contestantInfor is not undefined

    if(allContestants !== undefined){
      var display_position = 250;
      for(var plr in allContestants){
        var correctAns = 2;
        if (plr === "contestant" + contestant.index || correctAns === 2)
          fill("green")
        else 
          fill("red");
          display_position+=20;
          textSize(15);
          text(allContestants[plr].name + "  ==> " + allContestants[plr].answer, 120,display_position)
      }
    }

    //write code to add a note here

    fill(0,0,255);
    textSize(20);
    text("Note: Contestant who answered correct are highlighted in green colour!",130,230);

    //write code to highlight contest who answered correctly
    
    
  }

}
