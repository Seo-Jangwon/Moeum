package com.weseethemusic.music.controller;

import com.weseethemusic.music.common.exception.CustomException;
import com.weseethemusic.music.common.exception.ErrorCode;
import com.weseethemusic.music.dto.ResponseDto;
import com.weseethemusic.music.dto.visualization.MusicVisualizationDto;
import com.weseethemusic.music.service.MusicVisualizationServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/musics/visualization")
@RequiredArgsConstructor
public class MusicVisualizationController {

    private final MusicVisualizationServiceImpl visualizationService;

    @GetMapping("/{musicId}")
    public ResponseDto<MusicVisualizationDto> getMusicVisualization(@PathVariable long musicId) {
        MusicVisualizationDto result;

        try {
            result = visualizationService.getMusicVisualization(musicId);
        } catch (Exception e) {
            throw new CustomException(ErrorCode.INTERNAL_SERVER_ERROR, "내부 서버 오류");
        }

        return ResponseDto.res(200, result);
    }

}