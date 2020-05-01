package gameZone.ticTacToe;

import static org.junit.Assert.*;

public class TicTacToeTest {
    TicTacToe tic = new TicTacToe();

    @org.junit.Test
    public void getBoard() {
        Integer[][] test = new Integer[3][3];
        test[0][0] = 1;
        test[0][1] = 0;
        test[0][2] = 1;
        test[1][0] = 0;
        test[1][1] = 1;
        test[1][2] = 0;
        test[2][0] = 1;
        test[2][1] = 0;
        test[2][2] = 1;
        tic.setBoard(test);
        for(int i = 0; i < 3; i++)
            for(int j = 0; j < 3; j++)
                assertEquals(test[i][j], tic.getBoard()[i][j]);
    }

    @org.junit.Test
    public void setBoard() {
        Integer[][] test = new Integer[3][3];
        test[0][0] = 1;
        test[0][1] = 0;
        test[0][2] = 1;
        test[1][0] = 0;
        test[1][1] = 1;
        test[1][2] = 0;
        test[2][0] = 1;
        test[2][1] = 0;
        test[2][2] = 1;
        tic.setBoard(test);
        for(int i = 0; i < 3; i++)
            for(int j = 0; j < 3; j++)
                assertEquals(test[i][j], tic.getBoard()[i][j]);
    }

    @org.junit.Test
    public void getSpace(){
        tic.setSpace(1, 1, 1);
        assertEquals(tic.getSpace(1, 1), 1);
    }

    @org.junit.Test
    public void setSpace() {
        tic.setSpace(1, 1, 1);
        assertEquals(tic.getSpace(1, 1), 1);
    }

    @org.junit.Test
    public void getNumMoves() {
        tic.setNumMoves(20);
        assertEquals((int)tic.getNumMoves(), 20);
    }

    @org.junit.Test
    public void setNumMoves() {
        tic.setNumMoves(20);
        assertEquals((int)tic.getNumMoves(), 20);
    }

    @org.junit.Test
    public void checkForWin() {
        Integer[][] test = new Integer[3][3];
        test[0][0] = 1;
        test[0][1] = 1;
        test[0][2] = 1;
        test[1][0] = 0;
        test[1][1] = 0;
        test[1][2] = 0;
        test[2][0] = 0;
        test[2][1] = 0;
        test[2][2] = 0;
        tic.setBoard(test);
        assertEquals(true, tic.checkForWin());
        test[0][0] = 1;
        test[0][1] = 0;
        test[0][2] = 1;
        test[1][0] = 0;
        test[1][1] = 0;
        test[1][2] = 0;
        test[2][0] = 1;
        test[2][1] = 0;
        test[2][2] = 1;
        assertEquals(false, tic.checkForWin());
    }

    @org.junit.Test
    public void checkForCat() {
        Integer[][] test = new Integer[3][3];
        test[0][0] = 1;
        test[0][1] = 1;
        test[0][2] = 1;
        test[1][0] = 0;
        test[1][1] = 0;
        test[1][2] = 0;
        test[2][0] = 0;
        test[2][1] = 0;
        test[2][2] = 0;
        tic.setBoard(test);
        assertEquals(false, tic.checkForCat());
        tic.setNumMoves(8);
        assertEquals(false, tic.checkForCat());
        test[0][0] = 1;
        test[0][1] = 2;
        test[0][2] = 1;
        test[1][0] = 1;
        test[1][1] = 2;
        test[1][2] = 1;
        test[2][0] = 2;
        test[2][1] = 1;
        test[2][2] = 2;
        tic.setBoard(test);
        assertEquals(true, tic.checkForCat());
    }

    @org.junit.Test
    public void AImove() {
        Integer[][] test = new Integer[3][3];
        test[0][0] = 1;
        test[0][1] = 2;
        test[0][2] = 1;
        test[1][0] = 1;
        test[1][1] = 2;
        test[1][2] = 1;
        test[2][0] = 2;
        test[2][1] = 1;
        test[2][2] = 0;
        test = tic.AImove(test);
        assertEquals(2, (int)test[2][2]);
    }
}