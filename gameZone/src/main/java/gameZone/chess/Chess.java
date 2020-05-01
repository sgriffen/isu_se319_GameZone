package gameZone.chess;

import gameZone.chess.player.*;
import gameZone.chess.pieces.*;
import gameZone.components.GlobalResources;

import javax.persistence.Embeddable;
import javax.persistence.Table;
import javax.persistence.Transient;
import java.util.Random;

@Embeddable
@Table(name = "Chess")
public class Chess {

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Transient
    private final GlobalResources gRec = new GlobalResources(null, null);


    /**
     * 2D array for this {@code TicTacToe}. Used to play the game. 0 is empty, 1 black pawn, 2 is black bishop,
     * 3 is black knight, 4 is black rook, 5 is black queen, 6 is black king, 7 is white pawn, 8 is white bishop,
     * 9 is white knight, 10 is white rook, 11 is white queen, 12 is white king
     */
    private Integer board[][];

    /**
     * True board
     */
    @Transient
    private Board trueBoard;

    /**
     * FEN
     */
    @Transient
    private String fen;

    public Chess()
    {
        this.trueBoard = new Board();
        this.board = new Integer[8][8];
        board[7][0] = 4;
        board[7][1] = 3;
        board[7][2] = 2;
        board[7][3] = 5;
        board[7][4] = 6;
        board[7][5] = 2;
        board[7][6] = 3;
        board[7][7] = 4;
        board[6][0] = 1;
        board[6][1] = 1;
        board[6][2] = 1;
        board[6][3] = 1;
        board[6][4] = 1;
        board[6][5] = 1;
        board[6][6] = 1;
        board[6][7] = 1;
        board[5][0] = 0;
        board[5][1] = 0;
        board[5][2] = 0;
        board[5][3] = 0;
        board[5][4] = 0;
        board[5][5] = 0;
        board[5][6] = 0;
        board[5][7] = 0;
        board[4][0] = 0;
        board[4][1] = 0;
        board[4][2] = 0;
        board[4][3] = 0;
        board[4][4] = 0;
        board[4][5] = 0;
        board[4][6] = 0;
        board[4][7] = 0;
        board[3][0] = 0;
        board[3][1] = 0;
        board[3][2] = 0;
        board[3][3] = 0;
        board[3][4] = 0;
        board[3][5] = 0;
        board[3][6] = 0;
        board[3][7] = 0;
        board[2][0] = 0;
        board[2][1] = 0;
        board[2][2] = 0;
        board[2][3] = 0;
        board[2][4] = 0;
        board[2][5] = 0;
        board[2][6] = 0;
        board[2][7] = 0;
        board[1][0] = 7;
        board[1][1] = 7;
        board[1][2] = 7;
        board[1][3] = 7;
        board[1][4] = 7;
        board[1][5] = 7;
        board[1][6] = 7;
        board[1][7] = 7;
        board[0][0] = 10;
        board[0][1] = 9;
        board[0][2] = 8;
        board[0][3] = 11;
        board[0][4] = 12;
        board[0][5] = 8;
        board[0][6] = 9;
        board[0][7] = 10;
    }

    public String getFEN()
    {
        return fen;
    }

    public void setFEN(String fen)
    {
        this.fen = fen;
    }

    public Integer[][] getBoard()
    {
        return board;
    }

    public void setBoard(Integer[][] board)
    {
        this.board = board;
        trueBoard.translateBoard(board);
    }

    public Integer[][] AImove()
    {
        AlphaBetaPlayer abp = new AlphaBetaPlayer(false, 3);
        Move m = abp.getNextMove(trueBoard);
        int x = trueBoard.makeMove(m);
        for(int i = 0; i < 8; i++)
        {
            for(int j = 0; j < 8; j++)
            {
                Tile t = trueBoard.getTile(i, j);
                if(t.isOccupied() == false)
                {
                    board[i][j] = 0;
                }
                if(t.getPiece() instanceof Pawn)
                {
                    if(t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 1;
                    }
                    else
                    {
                        board[i][j] = 7;
                    }
                }
                if(t.getPiece() instanceof Bishop)
                {
                    if(t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 2;
                    }
                    else
                    {
                        board[i][j] = 8;
                    }
                }
                if(t.getPiece() instanceof Knight)
                {
                    if(t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 3;
                    }
                    else
                    {
                        board[i][j] = 9;
                    }
                }
                if(t.getPiece() instanceof Rook)
                {
                    if(t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 4;
                    }
                    else
                    {
                        board[i][j] = 10;
                    }
                }
                if(t.getPiece() instanceof Queen)
                {
                    if(t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 5;
                    }
                    else
                    {
                        board[i][j] = 11;
                    }
                }
                if(t.getPiece() instanceof King) {
                    if (t.getPiece().getColor() == Piece.BLACK) {
                        board[i][j] = 6;
                    } else {
                        board[i][j] = 12;
                    }
                }
            }
        }
        this.generateFEN();
        return board;
    }

    public Boolean checkForWin()
    {
        RandomPlayer rp = new RandomPlayer(false);
        RandomPlayer r = new RandomPlayer(true);
        Move m = rp.getNextMove(trueBoard);
        Move m2 = r.getNextMove(trueBoard);
        if(m == null && trueBoard.isCheck(Piece.BLACK))
            return true;
        if(m2 == null && trueBoard.isCheck(Piece.WHITE))
            return true;
        return false;
    }

    private void generateFEN(){
        fen = "";
        int empty = 0;
        for(int i = 0; i < 8; i++) {
            int emptyCounter = 0;
            for (int j = 0; j < 8; j++) {
                int x = board[i][j];
                if(emptyCounter != 0 && x != 0){
                    fen += emptyCounter;
                    emptyCounter = 0;
                }
                if(x == 0)
                {
                    emptyCounter++;
                }
                else if(x == 1)
                {
                    fen += 'p';
                }
                else if(x == 2)
                {
                    fen += 'b';
                }
                else if(x == 3)
                {
                    fen += 'n';
                }
                else if(x == 4)
                {
                    fen += 'r';
                }
                else if(x == 5)
                {
                    fen += 'q';
                }
                else if(x == 6)
                {
                    fen += 'k';
                }
                else if(x == 7)
                {
                    fen += 'P';
                }
                else if(x == 8)
                {
                    fen += 'B';
                }
                else if(x == 9)
                {
                    fen += 'N';
                }
                else if(x == 10)
                {
                    fen += 'R';
                }
                else if(x == 11)
                {
                    fen += 'Q';
                }
                else if(x == 12)
                {
                    fen += 'K';
                }
            }
            if(emptyCounter != 0)
                fen += emptyCounter;
            if(i != 0)
                fen += "/";
        }
        fen += " w ---- - - -";
    }

    /*
    public static void main(String[] args) {
        int iter = 100;
        float player1Score = 0;
        int draw = 0;
        for(int i = 0; i < iter; i++) {
            Board board = new Board();
            //System.out.println(board.toString());
            Player player1 = new AlphaBetaPlayer(Piece.WHITE,2);
            //Player player2 = new RandomPlayer(Piece.BLACK);
            Player player2 = new AlphaBetaPlayer(Piece.BLACK,1);
            //Player player2 = new DeterministicPlayer(Piece.BLACK);

            int winner = play(player1, player2, board);

            if(winner == 1)
                player1Score++;
            if(winner == 0) {
                player1Score += 0.5f;
                draw++;
            }
        }

        System.out.println(player1Score);
    }

    /** Returns 1 if player1 wins
     * Returns 0 if draw
     * Returns -1 if player2 wins
     */
    /*
    public static int play(Player player1, Player player2, Board b) {
        Move move;
        int result;
        int turn = 0;
        while(true) {
            if(turn++ > 200)
                return 0;

            move = player1.getNextMove(b);
            if(move == null && b.isCheck(player1.getColor())) // check and can't move
                return -1;
            if(move == null) // no check but can't move
                return 0;

            result = b.makeMove(move);
            System.out.println(b);
            //if(result == -1) return (player1.getColor() == Piece.WHITE) ? -1 : 1; // black wins
            //if(result == 1) return (player1.getColor() == Piece.WHITE) ? 1 : -1; // white wins


            move = player2.getNextMove(b);
            if(move == null && b.isCheck(player2.getColor())) // check and can't move
                return 1;
            if(move == null) // no check but can't move
                return 0;

            result = b.makeMove(move);
            System.out.println(b);
            //if(result == -1) return (player1.getColor() == Piece.WHITE) ? 1 : -1; // black wins
            //if(result == 1) return (player1.getColor() == Piece.WHITE) ? -1 : 1; // white wins

        }
    }
    */
}