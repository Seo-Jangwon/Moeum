package com.weseethemusic.music.controller;

import com.weseethemusic.music.common.exception.CustomException;
import com.weseethemusic.music.common.exception.ErrorCode;
import com.weseethemusic.music.dto.ResponseDto;
import com.weseethemusic.music.dto.detail.AlbumDetailDto;
import com.weseethemusic.music.dto.detail.ArtistDetailDto;
import com.weseethemusic.music.dto.detail.MusicDetailDto;
import com.weseethemusic.music.service.musicDetail.MusicDetailService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/musics/detail")
@RequiredArgsConstructor
public class MusicDetailController {

    private final MusicDetailService musicDetailService;

    // 앨범 상세 정보 조회
    @GetMapping("/album/{albumId}")
    public ResponseDto<AlbumDetailDto> getAlbumDetail(@PathVariable Long albumId,
        @RequestHeader(value = "X-Member-Id", required = false) Long memberId) {
        AlbumDetailDto result;

        try {
            result = musicDetailService.getAlbumDetail(albumId, memberId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "내부 서버 오류");
        }

        return ResponseDto.res(200, result);
    }

    // 아티스트 상세 정보 조회
    @GetMapping("/artist/{artistId}")
    public ResponseDto<ArtistDetailDto> getArtistDetail(@PathVariable Long artistId,
        @RequestHeader(value = "X-Member-Id", required = false) Long memberId) {
        ArtistDetailDto result;

        try {
            result = musicDetailService.getArtistDetail(artistId, memberId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "내부 서버 오류");
        }

        return ResponseDto.res(200, result);
    }

    // 음악 상세 정보 조회
    @GetMapping("/music/{musicId}")
    public ResponseDto<MusicDetailDto> getMusicDetail(@PathVariable("musicId") Long musicId,
        @RequestHeader(value = "X-Member-Id", required = false) Long memberId) {
        MusicDetailDto result;

        try {
            result = musicDetailService.getMusicDetail(musicId, memberId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "내부 서버 오류");
        }

        return ResponseDto.res(200, result);
    }

}
