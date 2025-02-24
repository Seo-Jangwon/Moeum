package com.weseethemusic.music.dto.detail;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MusicDetailArtistDto {

    private long id;
    private String name;
    private Boolean isLike;

}
