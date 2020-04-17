package gameZone.checkers;

import gameZone.components.GlobalResources;

import javax.persistence.*;

@Embeddable
@Table(name = "Checkers")
public class Checkers {

    /**
     * {@code GlobalResources} {@code Component}. Grants the ability to use global variables and methods common to other {@code classes} in this Application
     */
    @Transient
    private final GlobalResources gRec = new GlobalResources(null);

    /**
     * 2D array for this {@code TicTacToe}. Used to play the game. 0 is empty, 1 red, 2 is black.
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
                if(board[i][j] == color)
                {
                    count++;
                }
            }
        }
        return count;
    }

    public int win()
    {
        if(redCount() == 0)
            return 2;
        else if(blackCount() == 0)
            return 1;
        else
            return 0;
    }
}
