class Quiz {
  constructor(){}

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
    question.hide()
    background("#805B56")
    fill(0)
    textSize(30)
    text("result of the quiz",340,50)
    text("------------------",320,65)
    Contestant.getPlayerInfo()
    if(allContestants!==undefined){
      var displayAnswer=230
      fill("green")
      textSize(20)
      text("Note:contestants who answered corrected are highlighted in pink",130,230)
      for(var plr in allContestants){
        var correctanswer="2"
        if(correctanswer===allContestants[plr].answer){
          fill("pink")
        }
        else{
          fill("red")
        }
        displayAnswer=displayAnswer+30
        //fill(0)
        textSize(20)
        text(allContestants[plr].name+": "+allContestants[plr].answer,250,displayAnswer)
      }
    }
  }

}
