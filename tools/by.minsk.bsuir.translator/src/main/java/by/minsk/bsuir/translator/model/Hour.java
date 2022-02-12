package by.minsk.bsuir.translator.model;

import lombok.Data;

import java.util.List;

@Data
public class Hour {

    private final List<Interval> intervals;

    private final boolean everyday;

}
