package com.weseethemusic.music.dto.detail;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@EqualsAndHashCode
@Builder
public class ArtistDto {

    private long id;
    private String name;

}
