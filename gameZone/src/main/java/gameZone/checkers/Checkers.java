package gameZone.checkers;

import gameZone.components.GlobalResources;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.*;
import java.util.Random;

@Embeddable
@Table(name = "Checkers")
public class Checkers {

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Transient
    private final GlobalResources gRec = new GlobalResources(null, null);

    /**
     * 2D array for this {@code TicTacToe}. Used to play the game. 0 is empty, 1 red, 2 is black, 3 is red kings, 4 is black kings.
     */
    private Integer board[][];

    /* END INSTANCE VARIABLES */

    /* START CONSTRUCTORS */

    /**
     * Default Constructor
     */
    public Checkers()
    {
        this.board = new Integer[8][8];
        board[0][0] = 0;
        board[0][1] = 2;
        board[0][2] = 0;
        board[0][3] = 2;
        board[0][4] = 0;
        board[0][5] = 2;
        board[0][6] = 0;
        board[0][7] = 2;
        board[1][0] = 2;
        board[1][1] = 0;
        board[1][2] = 2;
        board[1][3] = 0;
        board[1][4] = 2;
        board[1][5] = 0;
        board[1][6] = 2;
        board[1][7] = 0;
        board[2][0] = 0;
        board[2][1] = 2;
        board[2][2] = 0;
        board[2][3] = 2;
        board[2][4] = 0;
        board[2][5] = 2;
        board[2][6] = 0;
        board[2][7] = 2;
        board[3][0] = 0;
        board[3][1] = 0;
        board[3][2] = 0;
        board[3][3] = 0;
        board[3][4] = 0;
        board[3][5] = 0;
        board[3][6] = 0;
        board[3][7] = 0;
        board[4][0] = 0;
        board[4][1] = 0;
        board[4][2] = 0;
        board[4][3] = 0;
        board[4][4] = 0;
        board[4][5] = 0;
        board[4][6] = 0;
        board[4][7] = 0;
        board[5][0] = 1;
        board[5][1] = 0;
        board[5][2] = 1;
        board[5][3] = 0;
        board[5][4] = 1;
        board[5][5] = 0;
        board[5][6] = 1;
        board[5][7] = 0;
        board[6][0] = 0;
        board[6][1] = 1;
        board[6][2] = 0;
        board[6][3] = 1;
        board[6][4] = 0;
        board[6][5] = 1;
        board[6][6] = 0;
        board[6][7] = 1;
        board[7][0] = 1;
        board[7][1] = 0;
        board[7][2] = 1;
        board[7][3] = 0;
        board[7][4] = 1;
        board[7][5] = 0;
        board[7][6] = 1;
        board[7][7] = 0;
    }

    public Integer[][] getBoard()
    {
        return this.board;
    }

    public void setBoard(Integer[][] board)
    {
        this.board = board;
    }

    public int redCount()
    {
        return count(1);
    }

    public int blackCount()
    {
        return count(2);
    }

    public int count(int color)
    {
        int count = 0;
        for(int i = 0; i < board.length; i++)
        {
            for(int j = 0; j < board.length; j++)
            {
                if(board[i][j] == color || board[i][j] == color + 2)
                {
                    count++;
                }
            }
        }
        return count;
    }

    public Boolean checkForWin()
    {
        if(redCount() == 0)
            return true;
        else if(blackCount() == 0)
            return true;
        else
            return false;
    }

    //This is gonna get really complicated really fast
    public Integer[][] AImove()
    {
        Random r = new Random();
        List<Move> L = getLegalMoves(this.board);
        applyMove(L.get(r.nextInt(L.size())));
        return getBoard();
    }

    private List<Move> getLegalMoves(Integer[][] state)
    {
        List<Move> slideMoves = new ArrayList<Move>();
        List<Move> jumpMoves = new ArrayList<Move>();
        //Iterate over the entire board
        for(int i = 0; i < 8; i++)
        {
            for(int j = 0; j < 8; j++)
            {
                if(board[i][j] == 1 || board[i][j] == 3)
                {
                    getJumps(jumpMoves, null, board[i][j], i, j, board);
                    //stop looking for slides if we find any jumps
                    if(jumpMoves.isEmpty())
                    {
                        getSlides(slideMoves, board[i][j], i, j, board);
                    }
                }
            }
        }
        if(jumpMoves.isEmpty())
            return slideMoves;
        return jumpMoves;
    }

    private void getSlides(List<Move> moves, int pieceType, int startRow, int startCol, Integer[][] state)
    {
        ArrayList<Integer> endRow = new ArrayList<Integer>();
        ArrayList<Integer> endCol = new ArrayList<Integer>();

        switch(pieceType){
            case 1:
                endRow.add(startRow - 1);
                endRow.add(startRow - 1);
                endCol.add(startCol + 1);
                endCol.add(startCol - 1);
                break;
            case 3:
                endRow.add(startRow + 1);
                endRow.add(startRow + 1);
                endRow.add(startRow - 1);
                endRow.add(startRow - 1);
                endCol.add(startCol + 1);
                endCol.add(startCol - 1);
                endCol.add(startCol + 1);
                endCol.add(startCol - 1);
                break;
        }

        int numMoves = endRow.size();

        for(int i = 0; i < numMoves; i++)
        {
            //check if inside board
            if(endRow.get(i) < 0 || endRow.get(i) > 7 || endCol.get(i) < 0 || endCol.get(i) > 7) continue;
            //check if end position is occupied
            if(state[endRow.get(i)][endCol.get(i)] == 0) {
                //move was legal so add it to list
                moves.add(new Move(startRow, startCol, endRow.get(i), endCol.get(i), state));
            }
        }
    }

    private void getJumps(List<Move> moves, Move move, int pieceType, int startRow, int startCol, Integer[][] state)
    {
        //endRow/endCol list to add all possible squares to move to from each piece
        //captureRow/captureCol list to add all possible squares that can be captured
        ArrayList<Integer> endRow = new ArrayList<Integer>();
        ArrayList<Integer> endCol = new ArrayList<Integer>();
        ArrayList<Integer> captureRow = new ArrayList<Integer>();
        ArrayList<Integer> captureCol = new ArrayList<Integer>();

        switch(pieceType){
            case 1:
                endRow.add(startRow - 2);
                endRow.add(startRow - 2);
                endCol.add(startCol - 2);
                endCol.add(startCol + 2);
                captureRow.add(startRow - 1);
                captureRow.add(startRow - 1);
                captureCol.add(startCol - 1);
                captureCol.add(startCol + 1);
                break;
            case 3:
                endRow.add(startRow + 2);
                endRow.add(startRow + 2);
                endRow.add(startRow - 2);
                endRow.add(startRow - 2);
                endCol.add(startCol - 2);
                endCol.add(startCol + 2);
                endCol.add(startCol - 2);
                endCol.add(startCol + 2);
                captureRow.add(startRow + 1);
                captureRow.add(startRow + 1);
                captureRow.add(startRow - 1);
                captureRow.add(startRow - 1);
                captureCol.add(startCol - 1);
                captureCol.add(startCol + 1);
                captureCol.add(startCol - 1);
                captureCol.add(startCol + 1);
                break;
        }

        int numMoves = endRow.size();
        boolean anyValidMoves = false;
        boolean[] whichAreValid = new boolean[numMoves];

        for(int i = 0; i <  numMoves; i++)
        {
            // check if inside the board
            if (endRow.get(i) < 0 || endRow.get(i) > 7 || endCol.get(i) < 0 || endCol.get(i) > 7) continue;
            // check if end position is occupied
            if (move != null) {
                // check if end position is occupied but allow piece to land on initial position
                if (state[endRow.get(i)][endCol.get(i)] != 0 && state[endRow.get(i)][endCol.get(i)] != state[move.initialRow][move.initialCol])
                    continue;
                // check if we're trying to capture a piece we've already captured in current move
                if (move.capturedSquares.contains(new Pair(captureRow.get(i), captureCol.get(i)))) continue;
            }
            else {
                // if move is null, make sure end position isn't occupied
                if (state[endRow.get(i)][endCol.get(i)] != 0) continue;
            }

            if (!(state[captureRow.get(i)][captureCol.get(i)] == 2 || state[captureRow.get(i)][captureCol.get(i)] == 4)) continue;

            //if we get this far, the move is valid
            anyValidMoves = true;
            whichAreValid[i] = true;
        }

        if (move != null && !anyValidMoves) {
            moves.add(move);
            return;
        }

        if (move == null && anyValidMoves) {
            for (int i = 0; i < numMoves; i++) {
                if (whichAreValid[i]) {
                    Move newMove = new Move(startRow, startCol, endRow.get(i), endCol.get(i), state);
                    newMove.initialRow = startRow;
                    newMove.initialCol = startCol;
                    newMove.startRow = startRow;
                    newMove.startCol = startCol;
                    newMove.endRow = endRow.get(i);
                    newMove.endCol = endCol.get(i);
                    newMove.listCaptureRow.add(captureRow.get(i));
                    newMove.listCaptureCol.add(captureCol.get(i));
                    newMove.listVisitedRow.add(endRow.get(i));
                    newMove.listVisitedCol.add(endCol.get(i));
                    newMove.capturedSquares.add(new Pair(captureRow.get(i), captureCol.get(i)));
                    getJumps(moves, newMove, pieceType, newMove.endRow, newMove.endCol, state);
                }
            }
        }
        if (move != null && anyValidMoves) {
            for (int i = 0; i < numMoves; i++) {
                if (whichAreValid[i]) {
                    Move newMove = new Move(move);
                    newMove.startRow = startRow;
                    newMove.startCol = startCol;
                    newMove.endRow = endRow.get(i);
                    newMove.endCol = endCol.get(i);
                    newMove.listCaptureRow.add(captureRow.get(i));
                    newMove.listCaptureCol.add(captureCol.get(i));
                    newMove.listVisitedRow.add(endRow.get(i));
                    newMove.listVisitedCol.add(endCol.get(i));
                    newMove.capturedSquares.add(new Pair(captureRow.get(i), captureCol.get(i)));
                    getJumps(moves, newMove, pieceType, newMove.endRow, newMove.endCol, state);
                }
            }
        }
        return;
    }

    // function to a apply a move to the board
    private void applyMove(Move move) {
        // handle slide move
        if (move.listCaptureRow.isEmpty()) {
            // update end position to match current piece
            board[move.endRow][move.endCol] = board[move.startRow][move.startCol];
            // make the piece a king if it is in the back row of the opposite team's side
            if (board[move.startRow][move.startCol] == 1 && move.endRow == 7) {
                board[move.endRow][move.endCol] += 2;
            }
            if (board[move.startRow][move.startCol] == 2 && move.endRow == 0) {
                board[move.endRow][move.endCol] += 2;
            }
            // clear initial position
            board[move.startRow][move.startCol] = 0;
        }
        // handle jump move
        else {
            // clear capture positions
            for (int i = 0; i < move.listCaptureRow.size(); i++) {
                board[move.listCaptureRow.get(i)][move.listCaptureCol.get(i)] = 0;
            }
            // update end position to match current piece
            board[move.endRow][move.endCol] = board[move.initialRow][move.initialCol];
            // make the piece a king if it is in the back row of the opposite team's side
            if (board[move.initialRow][move.initialCol] == 1 && move.endRow == 7) {
                board[move.endRow][move.endCol] += 2;
            }
            if (board[move.initialRow][move.initialCol] == 2 && move.endRow == 0) {
                board[move.endRow][move.endCol] += 2;
            }
            //  clear initial position
            board[move.initialRow][move.initialCol] = 0;
        }
    }
}
