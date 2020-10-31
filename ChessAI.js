//Choosing side
  let toShow=document.querySelector("#toShow");
  toShow.style.display="none";

  $('#black').on('click',0, startGame)
  $('#white').on('click',1, startGame)
  const whiteSquareGrey = '#a9a9a9'
  const blackSquareGrey = '#696969'

  var game;
  var board;
  let side;
  let playerSide;
  let moveToMake;
  let bonus;
  let DEPTH=3;
  let moveSound;
  let captureSound;
  let totalScore=0;
  /*let playerTime=0;
  let compTime=0;
  let Ctimer;
  let Ptimer;*/

  function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.volume = 0.1;
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function init(){
       let pawn=[ 0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
     5,  5, 10, 25, 25, 10,  5,  5,
     0,  0,  0, 20, 20,  0,  0,  0,
     5, -5,-10,  0,  0,-10, -5,  5,
     5, 10, 10,-20,-20, 10, 10,  5,
     0,  0,  0,  0,  0,  0,  0,  0];

       let knight=[-50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50]

       let bishop= [-20,-10,-10,-10,-10,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5, 10, 10,  5,  0,-10,
    -10,  5,  5, 10, 10,  5,  5,-10,
    -10,  0, 10, 10, 10, 10,  0,-10,
    -10, 10, 10, 10, 10, 10, 10,-10,
    -10,  5,  0,  0,  0,  0,  5,-10,
    -20,-10,-10,-10,-10,-10,-10,-20]

       let rook=[  0,  0,  0,  0,  0,  0,  0,  0,
      5, 10, 10, 10, 10, 10, 10,  5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
     -5,  0,  0,  0,  0,  0,  0, -5,
      0,  0,  0,  5,  5,  0,  0,  0]

       let queen=[-20,-10,-10, -5, -5,-10,-10,-20,
    -10,  0,  0,  0,  0,  0,  0,-10,
    -10,  0,  5,  5,  5,  5,  0,-10,
     -5,  0,  5,  5,  5,  5,  0, -5,
      0,  0,  5,  5,  5,  5,  0, -5,
    -10,  5,  5,  5,  5,  5,  0,-10,
    -10,  0,  5,  0,  0,  0,  0,-10,
    -20,-10,-10, -5, -5,-10,-10,-20]

      let king=[-30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -30,-40,-40,-50,-50,-40,-40,-30,
    -20,-30,-30,-40,-40,-30,-30,-20,
    -10,-20,-20,-20,-20,-20,-20,-10,
     20, 20,  0,  0,  0,  0, 20, 20,
     20, 30, 10,  0,  0, 10, 30, 20]

     let blackp=pawn.slice().reverse();
     let blackn=knight.slice().reverse();
     let blackb=bishop.slice().reverse();
     let blackr=rook.slice().reverse();
     let blackq= queen.slice().reverse();
     let blackk=king.slice().reverse();
     let whitepieces= [pawn, knight, bishop, rook, queen, king];
     let blackpieces= [blackp, blackn, blackb, blackr, blackq, blackk];
     for (let j=0; j<6;j++){
       for (let i=0; i<64;i++){
         whitepieces[j][i]=[game.SQUARES[i],whitepieces[j][i]]
         blackpieces[j][i]=[game.SQUARES[i],blackpieces[j][i]]
       }
     }
     let wp=new Map(whitepieces[0]);let bp= new Map(blackpieces[0])
     let wn= new Map(whitepieces[1]); let bn=new Map(blackpieces[1])
     let wb= new Map(whitepieces[2]); let bb= new Map(blackpieces[2])
     let wr= new Map(whitepieces[3]);let br= new Map(blackpieces[3])
     let wq= new Map(whitepieces[4]); let bq= new Map(blackpieces[4])
     let wk= new Map(whitepieces[5]); let bk= new Map(blackpieces[5])
     let white=[["p",wp],["n",wn],["b",wb],["r",wr],["q",wq],["k",wk]], black=[["p",bp],["n",bn],["b",bb],["r",br],["q",bq],["k",bk]];
     let w= new Map(white), b=new Map(black);
     let bonusarr=[["w",w],["b",b]];
     bonus= new Map(bonusarr);
  }
  function startGame(data){
    moveSound = new sound("./asssets/moveSound.wav");
    captureSound= new sound("./assets/captureSound.wav");
    side= data.data
    playerSide= (side)?'w':'b'
    let toRemove= document.querySelector("#choice");
    toRemove.style.display= "none";
    createBoard(moveSound)
    toShow.style.display='inline';
    toShow.style.margin='0px';
  }


  // Creating Board with pieces
  function createBoard(){
    $('#restartBtn').on('click', restart)
    $('#resetBtn').on('click', reset)
    game= new Chess()
    init()
    const boardConfig= {
      draggable: true,
      position: 'start',
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      showErrors: 'console',
      pieceTheme: 'https://koblenski.github.io/javascript/chessboardjs-0.3.0/img/chesspieces/wikipedia/{piece}.png',
      moveSpeed: 450,
      onMouseoutSquare: onMouseoutSquare,
      onMouseoverSquare: onMouseoverSquare,
      orientation: (side)?'white':'black'
    }

    //Only move your pieces
    function onDragStart (source, piece, position, orientation) {
      if (game.game_over()) return false
      if (piece.search(playerSide) === -1) {
        return false
      }
    }
    board = new Chessboard("board",boardConfig);

    //Only allow legal moves
    function onDrop (source, target) {
      var tar=game.get(target);
      var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
      })
      if (move === null) return 'snapback'
      removeGreySquares();
      if(move.flags === 'c' || move.flags ==='e'){
        captureSound.play()
        var t=tar.type; var c= tar.color;
        updateScore(t,c,"#playScore","#compScore")
        var p=c+t.toUpperCase();
        $('#playPieces').prepend("<img src='https://koblenski.github.io/javascript/chessboardjs-0.3.0/img/chesspieces/wikipedia/"+p+".png' width='25'/>" );
      }
      else {
        moveSound.play()
      }
      window.setTimeout(makeBestMove, 250);
      updateStatus()
    }

    //Update board position
    function onSnapEnd () {
      board.position(game.fen())
    }

    function makeBestMove(){
      minimax(new Chess(game.fen()),DEPTH,Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY)
      var tar=game.get(moveToMake.to)
      game.move(moveToMake)
      board.position(game.fen())
      if(moveToMake.flags === 'c' || moveToMake.flags ==='e' ){
        captureSound.play()
        var t=tar.type; var c= tar.color;
        updateScore(t,c,"#compScore","#playScore")
        var p=c+t.toUpperCase();
        $('#compPieces').prepend("<img src='https://koblenski.github.io/javascript/chessboardjs-0.3.0/img/chesspieces/wikipedia/"+p+".png' width='25'/>" );
      }
      else {
        moveSound.play()
      }
      updateStatus()
    }

    //Show available moves
    function onMouseoverSquare (square, piece) {
      if(piece  && piece.search(playerSide) !== -1 && ! game.game_over()){
        var moves = game.moves({
          square: square,
          verbose: true
        })
        if (moves.length === 0) return
        greySquare(square)
        for (var i = 0; i < moves.length; i++) {
          greySquare(moves[i].to)
        }
      }
    }

    function onMouseoutSquare (square, piece) {
      removeGreySquares()
    }

    function removeGreySquares () {
      $('#board .square-55d63').css('background', '')
    }

    function greySquare (square) {
      var $square = $('#board .square-' + square)

      var background = whiteSquareGrey
      if ($square.hasClass('black-3c85d')) {
        background = blackSquareGrey
      }

      $square.css('background', background)
    }
    // Update game score in the web page
    function updateScore(t,c,player,notPlayer){
      console.log("test")
      $(player).empty();
      $(notPlayer).empty();
      if(c ==='w'){
        totalScore+=(t == 'p')?1:(t == 'n')?3:(t=='b')?3:(t == 'r')?5:9;
      }
      else{
        totalScore-=(t == 'p')?1:(t == 'n')?3:(t=='b')?3:(t == 'r')?5:9;
      }

      if(totalScore > 0){
        if(side){
          $('#compScore').append("+"+totalScore);
        }
        else {
          $('#playScore').append("+"+totalScore);
        }
      }
      else if(totalScore < 0){
        if(side){
          $('#playScore').append("+"+Math.abs(totalScore));
        }
        else {
          $('#compScore').append("+"+Math.abs(totalScore));
        }
      }
    }
    // Update game status in the web page
    function updateStatus () {
      var status = ''
      var moveColor = 'White'
      if (game.turn() === 'b') {
        moveColor = 'Black'
      }
      if (game.in_checkmate()) {
        status = 'Game over, ' + moveColor + ' is in checkmate.'
        alert(status);
      }

      else if (game.in_draw()) {
        status = 'Game over, drawn position'
        alert(status)
      }

      else {
        status = moveColor + ' to move'
        if (game.in_check()) {
          status += ', ' + moveColor + ' is in check'
          colorKing(game.turn())
        }
      }

      $('#status').html(status)
      $('#pgn').html(game.pgn({ max_width: 10, newline_char: '<br />' }))
    }

    //Color in red the cell of the king in check

    function colorKing(t){
      var sq;
      for(let i=0; i<64 ; i++){
        let square= game.SQUARES[i];
        let piece= game.get(square);
        if(piece){
          if(piece.color === t && piece.type === 'k'){
            sq=square;
          }
        }

      }
      $('#board .square-' + sq).css("background","red");
    }

    // Make the best move decision
    function minimax(position, depth, alpha, beta){
      if((depth == 0)|| position.game_over()){
        return evaluation(position)
      }
      var legalMoves= position.moves()
      var bestVal= (position.turn()=== 'w')? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
      for (var i = 0; i < legalMoves.length; i++) {
        position.move(legalMoves[i])
        var val= minimax(new Chess(position.fen()),depth-1,alpha, beta)
        let m=position.undo()
        bestVal=(position.turn()=== 'w')? MAX(bestVal,val, depth, m): MIN(bestVal, val, depth, m);
         if(position.turn()==='w'){
          alpha = Math.max(alpha, bestVal)
        }else{
          beta = Math.min(beta, bestVal)
        }
        if(beta <= alpha){
          return bestVal;
        }
      }
      return bestVal
    }


    function MAX(bestVal, val, depth, m){
      if(val > bestVal && depth == DEPTH){
        moveToMake=m;
      }
      return Math.max(bestVal, val)
    }

    function MIN(bestVal, val, depth,m){
      if(val < bestVal && depth == DEPTH){
        moveToMake=m;
      }
      return Math.min(bestVal, val)
    }

    function evaluation(position){
      let eval=0;
      for(let i=0; i<64 ; i++){
        let square= position.SQUARES[i];
        let piece= position.get(square);
        if(piece){
          eval+=pieceEval(piece,square);
        }
      }
      return eval ;
    }
    // evaluation of onboard pieces
    function pieceEval(piece, square){
      let t=piece.type;
      let c=piece.color;
      let coeff=(c =='w')?1:-1;
      let val=(t == 'p')?100:(t == 'n')?320:(t=='b')?330:(t == 'r')?500:(t == 'q')?900: 10000;
      val+=bonus.get(c).get(t).get(square);
      return coeff*val;
    }
    updateStatus()

    // restart game
    function restart(){
      clearTimeout(makeBestMove)
      clearTimeout(board.position)
      board.start();
      game.reset();
      $('#compPieces').empty();
      $('#playPieces').empty();
      $('#compPieces').append("<b><p id='compScore'></p></b>")
      $('#playPieces').append("<b><p id='playScore'></p></b>")
      totalScore=0;
      updateStatus();
      if(!side){
        window.setTimeout(makeBestMove, 750);
      }
    }

    //reset game
    function reset(){
      window.location.reload(true);
    }

    /*function updateTimer(){
      playingSide=game.turn();
      orientation= board.orientation()[0];
      if(playingSide === orientation ){
        if(Ptimer) clearInterval(Ptimer)
        document.getElementById('playerTimer').innerHTML=playerTime++;
        Ctimer= setInterval(function(){document.getElementById('playerTimer').innerHTML=playerTime++;},1000);
      }else{
        console.log("Comp "+compTime)
        if(Ctimer) clearInterval(Ctimer)
        document.getElementById('compTimer').innerHTML=compTime++;
        Ptimer= setInterval(function(){document.getElementById('compTimer').innerHTML=compTime++;},900);
      }
    }*/

    if(! side){
      window.setTimeout(makeBestMove, 250);
    }
    createBoard.restart=restart

  }
