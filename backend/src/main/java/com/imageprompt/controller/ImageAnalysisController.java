package com.imageprompt.controller;

import com.imageprompt.model.ImageAnalysisResponse;
import com.imageprompt.service.ImageAnalysisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/analyze")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageAnalysisController {

    private final ImageAnalysisService imageAnalysisService;

    @Autowired
    public ImageAnalysisController(ImageAnalysisService imageAnalysisService) {
        this.imageAnalysisService = imageAnalysisService;
    }

    @PostMapping("/image")
    public ResponseEntity<ImageAnalysisResponse> analyzeImage(
            @RequestParam("image") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                ImageAnalysisResponse errorResponse = new ImageAnalysisResponse();
                errorResponse.setError("Please upload a valid image file");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            ImageAnalysisResponse response = imageAnalysisService.analyzeImage(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            ImageAnalysisResponse errorResponse = new ImageAnalysisResponse();
            errorResponse.setError("Error processing image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(errorResponse);
        }
    }
}