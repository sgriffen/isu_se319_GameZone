package gameZone.wrappers;

import java.util.ArrayList;
import java.util.List;

public class StringIntegerWrapper {
    
    private List<String> strings;
    
    private Integer integer;
    
    public StringIntegerWrapper() {
        
        strings = null;
        integer = -1;
    }
    
    public StringIntegerWrapper(ArrayList<String> strings, Integer integer) {
        this();
        
        this.setInteger(integer);
        this.setStrings(strings);
    }
    
    public Integer getInteger() {
        return integer;
    }
    
    public void setInteger(Integer integer) {
        this.integer = integer;
    }
    
    public List<String> getStrings() {
        return strings;
    }
    
    public void setStrings(ArrayList<String> strings) {
        this.strings = strings;
    }
}
