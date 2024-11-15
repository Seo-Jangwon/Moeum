package com.weseethemusic.music.dto.visualization;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LyricListDto {

    List<LyricDto> lyrics;

}