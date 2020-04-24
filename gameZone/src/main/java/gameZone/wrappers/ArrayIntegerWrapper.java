package gameZone.wrappers;

import java.util.ArrayList;
import java.util.List;

public class ArrayIntegerWrapper<T> {
    
    private List<T> array;
    
    private Integer integer;
    
    public ArrayIntegerWrapper() {
    
        array = null;
        integer = -1;
    }
    
    public ArrayIntegerWrapper(ArrayList<T> array, Integer integer) {
        this();
        
        this.setInteger(integer);
        this.setArray(array);
    }
    
    public Integer getInteger() {
        return integer;
    }
    
    public void setInteger(Integer integer) {
        this.integer = integer;
    }
    
    public List<T> getArray() {
        return array;
    }
    
    public void setArray(ArrayList<T> array) {
        this.array = array;
    }
}
