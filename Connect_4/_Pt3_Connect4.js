
// SETUP:

var click_count = 0;

alert("Welcome to Connect Four!");
var player_1_colour = prompt("Player 1, would you like to be red or blue?");
if(player_1_colour === 'blue'){
  click_count = 0;
}else{
  click_count = 1;
}


// COLUMN CLICK EVENT HANDLERS:


$('.a').on('click',function(){
  click_function('a');
})


$('.b').on('click',function(){
  click_function('b');
})


$('.c').on('click',function(){
  click_function('c');
})


$('.d').on('click',function(){
  click_function('d');
})


$('.e').on('click',function(){
  click_function('e');
})


$('.f').on('click',function(){
  click_function('f');
})


$('.g').on('click',function(){
  click_function('g');
})


// FUNCTIONS:


function click_function(letter){

  click_count+=1;
  to_change = make_move(letter);
  if(to_change){
    change_marker(to_change,click_count);
    if(horizontal_check(to_change) === false && vertical_check(to_change) === false && diagonal_check(to_change) === false){
      if(full_board()){
        console.log("draw");
        return draw_alert();
      }else{
        console.log("game still on");
        return false;}
    }else{
    console.log("Connect 4");
          }
        }
  return who_won();
}



function make_move(col){

   for(i=0;i<6;i++){
     var res = $('.' + col)[i];
     var resId1 = res.id;
     var res_id = $('#' + resId1);

     try{
        if(res_id.css("background-color") !== 'rgb(128, 128, 128)'){
          if(i === 0){
            console.log("Column full, try again");
            alert("Column full! Try again")
            click_count -= 1;
            return false;
          }else{
            var f_id = resId1 - 7;
            return f_id;}
      }}catch(TypeError){
            console.log("found");
            break;
        }
    }
    if(res_id.css("background-color") === 'rgb(128, 128, 128)'){
      var res = $('.' + col)[5];
      var resId1 = res.id;
      var f_id = resId1;
      return f_id;
    }
}



function change_marker(_id, click_count){

    if(click_count%2 === 0){
      $('#' + _id).css("background-color",'rgb(255, 0, 0)');
    }else{
      $('#' + _id).css("background-color",'rgb(0, 0, 255)');
    }
}



function full_board(){

    var count = 0;
    for(i=1;i<8;i++){
      var test = $('#'+[i]);
      if(test.css("background-color") !== 'rgb(128, 128, 128)'){
        console.log("taken");
        count += 1;}
      }
    if(count === 7){
      console.log("board full");
      return true;
    }else{
      console.log("still space");
      return false;
    }
}



function vertical_check(id){

    console.log("vertical check for number " + id);
    if(colourMatchCheck(getColour(id),getColour(id+7),getColour(id+14),getColour(id+21))){
      console.log("vertical down found")
      return true;
    };
    if(colourMatchCheck(getColour(id),getColour(id-7),getColour(id-14),getColour(id-21))){
      console.log("vertical up found")
      return true;
    };
    return false;
}



function type_tester(id){
  return ((typeof id === 'string'));
}



function horizontal_check(id){

  console.log("horizontal check for number " + id);

  if(type_tester(id)){
    id = Number(id);
  }

  var row = diagonal_setup(id);
  var min_row = diagonal_setup(id-3);
  var max_row = diagonal_setup(id+3);


  if(colourMatchCheck(getColour(id),getColour(id+1),getColour(id+2),getColour(id+3))){
    if(row === max_row){
    console.log("horizontal right found")
    return true;}
    else{
      console.log("diff row");
    }
  };
  if(colourMatchCheck(getColour(id),getColour(id-1),getColour(id-2),getColour(id-3))){
    if(row === min_row){
    console.log("horizontal left found")
    return true;}
    else{
      console.log("diff row");
    }
  };
  return false;
}



function diagonal_setup(test){

    if(test >= 1 && test < 8){
      var test_row = 0;
    }else if(test >= 8 && test < 15){
      var test_row = 1;
    }else if(test >= 15 && test < 22){
      var test_row = 2;
    }else if(test >= 22 && test < 29){
      var test_row = 3;
    }else if(test >= 29 && test < 36){
      var test_row = 4;
    }else if(test >= 36 && test < 43){
      var test_row = 5;
    }
    return test_row;
  }



function diagonal_check(id){

    console.log("Diagonal check for number " + id);

    if(id >= 1 && id < 8){
      var row = 0;
    }else if(id >= 8 && id < 15){
      var row = 1;
    }else if(id >= 15 && id < 22){
      var row = 2;
    }else if(id >= 22 && id < 29){
      var row = 3;
    }else if(id >= 29 && id < 36){
      var row = 4;
    }else if(id >= 36 && id < 43){
      var row = 5;
    }

    // Going up and left:
    var test = id - 8;
    var test_row = diagonal_setup(test)
    if(test_row === row || test_row > row+1 || test_row < row-1){
      console.log("up and left, row error");
    }else if(colourMatchCheck(getColour(id),getColour(id-8),getColour(id-16),getColour(id-24))){
      console.log("Up and left found")
      return true;
    };

    // Going up and right:
    var test = id - 6;
    var test_row = diagonal_setup(test)
    if(test_row === row || test_row > row+1 || test_row < row-1){
      console.log("up and right, row error");
    }else if(colourMatchCheck(getColour(id),getColour(id-6),getColour(id-12),getColour(id-18))){
      console.log("Up and right found")
      return true;
    };

    // Going down and left:
    var test = id + 6;
    var test_row = diagonal_setup(test)
    if(test_row === row || test_row > row+1 || test_row < row-1){
      console.log("down and left, row error");
    }
    else if(colourMatchCheck(getColour(id),getColour(id+6),getColour(id+12),getColour(id+18))){
      console.log("down and left found")
      return true;
    };

    // Going down and right:
    var test = id + 8;
    var test_row = diagonal_setup(test)
    if(test_row === row || test_row > row+1 || test_row < row-1){
      console.log("down and right, row error");
    }
    else if(colourMatchCheck(getColour(id),getColour(id+8),getColour(id+16),getColour(id+24))){
      console.log("down and right found")
      return true;
    };
    return false;
}



function getColour(id){

    if($('#' + id).css("background-color")=== "rgb(255, 0, 0)"){
      return 'r';
    }else if($('#' + id).css("background-color")=== "rgb(0, 0, 255)"){
      return 'b';
    }else{
      return 'g';
    }
}



function colourMatchCheck(one,two,three,four){

    if(one===two && one===three && one===four && one !== 'g' && one !== undefined){
      console.log("colour match true");
    }else{
      console.log("colour match false");
    }

    return (one===two && one===three && one===four && one !== 'g' && one !== undefined);

}



function who_won(){

    console.log("Finding out who won")

    if(player_1_colour == 'blue'){
        if(click_count%2 == 0){
           console.log("Player 2 won");
           player2_winAlert();
           return false;

        }else{
           console.log("Player 1 won");
           player1_winAlert();
           return true;}

    }else{
        if(click_count%2 == 0){
           console.log("Player 1 won");
           player1_winAlert();
           return true;

         }else{
           console.log("Player 2 won");
           player2_winAlert();
           return false;}
         }
     }


function player2_winAlert(){
  alert("Player 2, you have won!");
  alert("Refresh the page to play again!");
  document.addEventListener("click",handler,true);
}

function player1_winAlert(){
  alert("Player 1, you have won!");
  alert("Refresh the page to play again!");
  document.addEventListener("click",handler,true);
}

function handler(e){
  e.stopPropagation();
  e.preventDefault();
}

function draw_alert(){
  alert("It's a draw!");
  alert("refresh the page to play again!");
  document.addEventListener("click",handler,true);
}
